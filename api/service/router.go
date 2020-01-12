package service

import (
	"log"

	"github.com/adrianosela/nwfacts/api/config"
	"github.com/adrianosela/nwfacts/api/processing"
	"github.com/gorilla/mux"
	"github.com/pkg/errors"
)

// Service holds the service configuration
// necessary for endpoints to respond to requests
type Service struct {
	Router *mux.Router
	config *config.Config

	ProcessingEngine *processing.Engine
}

// NewFactsService returns an HTTP router multiplexer with
// attached handler functions
func NewFactsService(c *config.Config) *Service {
	engine, err := processing.NewEngine(c, nil)
	if err != nil {
		log.Fatal(errors.Wrap(err, "could not initialize new processing engine"))
	}

	svc := &Service{
		Router:           mux.NewRouter(),
		ProcessingEngine: engine,

		config: c,
	}

	svc.addKeywordEndpoints()

	// conditionally add debug endpoints
	if c.ServerSettings.Debug {
		svc.addDebugEndpoints()
	}

	return svc
}
