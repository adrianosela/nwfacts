package service

import (
	"encoding/json"
	"net/http"

	"github.com/adrianosela/nwfacts/api/payloads"
)

func (s *Service) addDebugEndpoints() {
	// healthcheck endpoint
	s.Router.Methods(http.MethodGet).Path("/healthcheck").HandlerFunc(
		func(w http.ResponseWriter, r *http.Request) {
			w.WriteHeader(http.StatusOK)
			byt, _ := json.Marshal(&payloads.HealthcheckResponse{
				Version:    s.config.ServerSettings.Version,
				DeployTime: s.config.ServerSettings.DeployTime.String(),
			})
			w.Write(byt)
			return
		},
	)
}
