package service

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strings"

	"github.com/adrianosela/nwfacts/api/payloads"
	"github.com/adrianosela/nwfacts/api/processing"
	newsapi "github.com/robtec/newsapi/api"
	languagepb "google.golang.org/genproto/googleapis/cloud/language/v1"
)

func (s *Service) addKeywordEndpoints() {
	s.Router.Methods(http.MethodGet).Path("/search").HandlerFunc(s.searchKeywordHandler)
}

func (s *Service) searchKeywordHandler(w http.ResponseWriter, r *http.Request) {
	// parse keywords from get param
	keyword, ok := r.URL.Query()["keyword"]
	if !ok {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("no keyword in request URL"))
		return
	}

	// get top headlines articles for query
	data, err := s.NewsAPIClient.TopHeadlines(newsapi.Options{
		Language: "en",
		Q:        strings.Join(keyword, " "),
		SortBy:   "popularity",
	})
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(fmt.Sprintf("error getting everything for query: %s", err)))
		return
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
	urlToBodyTextMap, err := s.ArticleParserClient.GetTextFromArticles(uniqueURLs...)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(fmt.Sprintf("error getting text for articles: %s", err)))
		return
	}

	// populate response object while scoring each text
	resp := &payloads.SearchResponse{Results: []processing.Result{}}
	for url, text := range urlToBodyTextMap {
		article := visited[url]
		scores := make(map[string]float32) // map of scoring func to score

		// score the sentiment of the text
		sentiment, err := s.NLPClient.AnalyzeSentiment(context.Background(), &languagepb.AnalyzeSentimentRequest{
			Document: &languagepb.Document{
				Source: &languagepb.Document_Content{
					Content: text,
				},
				Type: languagepb.Document_PLAIN_TEXT,
			},
			EncodingType: languagepb.EncodingType_UTF8,
		})
		if err != nil {
			log.Printf("Failed to analyze text: %s\n", err)
			continue // soft fail
		}
		scores["sentiment"] = sentiment.DocumentSentiment.Score

		resp.Results = append(resp.Results, processing.Result{
			Source:      article.Source.Name,
			Title:       article.Title,
			Description: article.Description,
			PublishedAt: article.PublishedAt,
			Author:      article.Author,
			URL:         article.URL,
			Scores:      scores,
		})
	}

	// marshal response and return success
	byt, err := json.Marshal(&resp)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(fmt.Sprintf("could not marshal json: %s", err)))
		return
	}
	w.WriteHeader(http.StatusOK)
	w.Write(byt)
	return
}

func score(text string) map[string]int {

	return nil
}
