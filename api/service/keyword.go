package service

import (
	"encoding/json"
	"fmt"
	"net/http"
)

func (s *Service) addKeywordEndpoints() {
	s.Router.Methods(http.MethodGet, http.MethodOptions).Path("/search").HandlerFunc(s.searchKeywordHandler)
}

func (s *Service) searchKeywordHandler(w http.ResponseWriter, r *http.Request) {
	allowCORS(w)

	// parse keywords from get param
	keyword, ok := r.URL.Query()["keyword"]
	if !ok {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("no keyword in request URL"))
		return
	}

	res, err := s.ProcessingEngine.ProcessKeywords(keyword)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(fmt.Sprintf("could not process given keywords: %s", err)))
		return
	}

	// marshal response and return success
	byt, err := json.Marshal(&res)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(fmt.Sprintf("could not marshal json: %s", err)))
		return
	}
	w.WriteHeader(http.StatusOK)
	w.Write(byt)
	return
}

func allowCORS(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "*")
}
