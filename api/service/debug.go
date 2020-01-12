package service

import (
	"encoding/json"
	"net/http"
)

type healthcheckResponse struct {
	Version    string `json:"version,omitempty"`
	DeployTime string `json:"deployed_at"`
}

func (s *Service) addDebugEndpoints() {

	// healthcheck endpoint
	s.Router.Methods(http.MethodGet).Path("/healthcheck").HandlerFunc(
		func(w http.ResponseWriter, r *http.Request) {
			byt, _ := json.Marshal(&healthcheckResponse{
				Version:    s.config.ServerSettings.Version,
				DeployTime: s.config.ServerSettings.DeployTime.String(),
			})
			w.WriteHeader(http.StatusOK)
			w.Write(byt)
			return
		},
	)

}
