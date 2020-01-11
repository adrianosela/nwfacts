package service

import (
	"github.com/adrianosela/nwfacts/api/config"
	"github.com/gorilla/mux"
)

// Service holds the service configuration
// necessary for endpoints to respond to requests
type Service struct {
	Router *mux.Router
	config *config.Config
}

// NewFactsService returns an HTTP router multiplexer with
// attached handler functions
func NewFactsService(c *config.Config) *Service {
	svc := &Service{
		Router: mux.NewRouter(),
		config: c,
	}

	svc.addKeywordEndpoints()

	// conditionally add debug endpoints
	if c.ServerSettings.Debug {
		svc.addDebugEndpoints()
	}

	return svc
}
