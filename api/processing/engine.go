package processing

import (
	"context"
	"log"
	"net/http"
	"strings"

	language "cloud.google.com/go/language/apiv1"

	"github.com/adrianosela/nwfacts/api/config"
	artparser "github.com/adrianosela/nwfacts/cloud-functions/newsparser/client"
	"github.com/pkg/errors"
	newsapi "github.com/robtec/newsapi/api"
	languagepb "google.golang.org/genproto/googleapis/cloud/language/v1"
)

// Engine represents a news processing engine
type Engine struct {
	ResultCache Cache

	newsAPI           *newsapi.Client
	parserAPI         *artparser.Client
	googleLanguageAPI *language.Client
}

// NewEngine is the news processing engine constructor
func NewEngine(c *config.Config, cache Cache) (*Engine, error) {
	// news api gives us relevant news article URLs given keywords
	newsAPIClient, err := newsapi.New(http.DefaultClient, c.NewsAPISettings.APIKey, c.NewsAPISettings.URL)
	if err != nil {
		return nil, errors.Wrap(err, "could not get newsAPI client")
	}

	// article parser gives us article text given article URL
	articleParserClient := artparser.NewClient(c.ArticleParserSettings.URL)

	// google ml engine nlp client gives us metrics given text
	nlpClient, err := language.NewClient(context.Background())
	if err != nil {
		return nil, errors.Wrap(err, "could not get Google Language client")
	}

	e := &Engine{
		ResultCache:       cache,
		newsAPI:           newsAPIClient,
		parserAPI:         articleParserClient,
		googleLanguageAPI: nlpClient,
	}

	if cache == nil {
		e.ResultCache = newMemoryCache()
	}

	return e, nil
}

// ProcessKeywords processes a given set of keywords, caching where possible
func (e *Engine) ProcessKeywords(kw []string) (*SearchResponse, error) {
	// get top headlines articles for query
	data, err := e.newsAPI.TopHeadlines(newsapi.Options{
		Language: "en",
		Q:        strings.Join(kw, " "),
		SortBy:   "popularity",
	})
	if err != nil {
		return nil, errors.Wrap(err, "error getting everything for query")
	}

	// deduplicate gotten articles (by URL as key).
	// we do this because sometimes we get the same article URL from different
	// sources i.e. CNN USA and CNN UK may share same URL for an article
	visited := make(map[string]newsapi.Article)
	uniqueURLs := []string{} // array of no-dup urls
	for _, article := range data.Articles {
		if _, ok := visited[article.URL]; !ok {
			visited[article.URL] = article // mark visited
			uniqueURLs = append(uniqueURLs, article.URL)
		}
	}

	// get article text given the URL
	urlToBodyTextMap, err := e.parserAPI.GetTextFromArticles(uniqueURLs...)
	if err != nil {
		errors.Wrap(err, "error getting text for articles")
	}

	// populate response object while scoring each text
	resp := &SearchResponse{Results: []Result{}}
	for url, text := range urlToBodyTextMap {
		if cached, ok := e.ResultCache.getResult(url); ok {
			resp.Results = append(resp.Results, *cached)
			continue
		}

		article := visited[url]
		scores := make(map[string]interface{}) // map of scoring func to score

		analysis, err := e.googleLanguageAPI.AnnotateText(context.Background(), &languagepb.AnnotateTextRequest{
			Document: &languagepb.Document{
				Source: &languagepb.Document_Content{
					Content: text,
				},
				Type: languagepb.Document_PLAIN_TEXT,
			},
			EncodingType: languagepb.EncodingType_UTF8,
			Features: &languagepb.AnnotateTextRequest_Features{
				// get likely text classifications with an associated confidence level
				ClassifyText: true,
				// get the overall sentiment of the whole document. A negative value
				// implies negative sentiment/emotion, and a positive value implies
				// positive sentiment/emotion (positive emotion)
				ExtractDocumentSentiment: true,
				// categorize all tokens in the text as a single part-of-speech
				ExtractSyntax: true,
			},
		})
		if err != nil {
			log.Printf("Failed to analyze text: %s\n", err)
			continue // soft fail
		}

		cleanUpCategories(analysis.Categories)
		scores["categories"] = analysis.Categories

		scores["sentiment"] = analysis.DocumentSentiment.Score

		// score the sensationalizm of the text as the ratio of tokens
		// in the text that are adverbs, this is a value between 0.0 and 1.0
		adv, all := 0, 0
		for _, t := range analysis.Tokens {
			if t.PartOfSpeech.Tag == languagepb.PartOfSpeech_ADV {
				adv++
			}
			all++
		}

		scores["sensationalism"] = 0.0
		if all != 0 {
			scores["sensationalism"] = float32(adv) / float32(all)
		}

		currentResult := Result{
			Source:      article.Source.Name,
			Title:       article.Title,
			Description: article.Description,
			PublishedAt: article.PublishedAt,
			Author:      article.Author,
			URL:         article.URL,
			ImgURL:      article.URLToImage,
			Scores:      scores,
		}

		e.ResultCache.putResult(currentResult.URL, &currentResult)
		resp.Results = append(resp.Results, currentResult)
	}

	return resp, nil
}

// cleanUpCategories removes any start-of-string forward slash '/', and replaces
// any additional forward slashes '/' with ', '
func cleanUpCategories(categories []*languagepb.ClassificationCategory) {
	for _, category := range categories {
		category.Name = strings.Replace(strings.TrimPrefix(category.GetName(), "/"), "/", ", ", -1)
	}
}
