package service

import (
	"fmt"
	"net/http"
)

func (s *Service) addKeywordEndpoints() {
	s.Router.Methods(http.MethodGet).Path("/search").HandlerFunc(s.searchKeywordHandler)
}

func (s *Service) searchKeywordHandler(w http.ResponseWriter, r *http.Request) {
	keyword, ok := r.URL.Query()["keyword"]
	if !ok {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, "no keyword in request URL")
		return
	}

	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "received keywords: %v", keyword)
}
