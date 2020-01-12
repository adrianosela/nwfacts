package service

import (
	"context"
	"log"
	"net/http"

	"github.com/adrianosela/nwfacts/api/config"
	"github.com/gorilla/mux"
	"github.com/pkg/errors"

	language "cloud.google.com/go/language/apiv1"

	artparser "github.com/adrianosela/nwfacts/cloud-functions/newsparser/client"
	newsapi "github.com/robtec/newsapi/api"
)

// Service holds the service configuration
// necessary for endpoints to respond to requests
type Service struct {
	Router *mux.Router
	config *config.Config

	NewsAPIClient       *newsapi.Client
	ArticleParserClient *artparser.Client
	NLPClient           *language.Client
}

// NewFactsService returns an HTTP router multiplexer with
// attached handler functions
func NewFactsService(c *config.Config) *Service {
	// news api gives us relevant news article URLs given keywords
	newsAPIClient, err := newsapi.New(http.DefaultClient, c.NewsAPISettings.APIKey, c.NewsAPISettings.URL)
	if err != nil {
		log.Fatal(errors.Wrap(err, "could not get newsAPI client"))
	}

	// article parser gives us article text given article URL
	articleParserClient := artparser.NewClient(c.ArticleParserSettings.URL)

	// google ml engine nlp client gives us metrics given text
	nlpClient, err := language.NewClient(context.Background())
	if err != nil {
		log.Fatal(errors.Wrap(err, "could not get Google Language client"))
	}

	svc := &Service{
		Router:              mux.NewRouter(),
		config:              c,
		NewsAPIClient:       newsAPIClient,
		ArticleParserClient: articleParserClient,
		NLPClient:           nlpClient,
	}

	svc.addKeywordEndpoints()

	// conditionally add debug endpoints
	if c.ServerSettings.Debug {
		svc.addDebugEndpoints()
	}

	return svc
}
