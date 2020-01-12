package service

import (
	"log"
	"net/http"

	"github.com/adrianosela/nwfacts/api/config"
	"github.com/gorilla/mux"
	"github.com/pkg/errors"

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
}

// NewFactsService returns an HTTP router multiplexer with
// attached handler functions
func NewFactsService(c *config.Config) *Service {
	newsAPIClient, err := newsapi.New(http.DefaultClient, c.NewsAPISettings.APIKey, c.NewsAPISettings.URL)
	if err != nil {
		log.Fatal(errors.Wrap(err, "could not get https://newsapi.org client"))
	}

	svc := &Service{
		Router:              mux.NewRouter(),
		config:              c,
		NewsAPIClient:       newsAPIClient,
		ArticleParserClient: artparser.NewClient(c.ArticleParserSettings.URL),
	}

	svc.addKeywordEndpoints()

	// conditionally add debug endpoints
	if c.ServerSettings.Debug {
		svc.addDebugEndpoints()
	}

	return svc
}
