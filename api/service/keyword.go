package service

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	newsapi "github.com/robtec/newsapi/api"
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

	// get all news articles for query
	data, err := s.NewsAPIClient.Everything(newsapi.Options{
		Language: "en",
		Q:        strings.Join(keyword, " "),
		SortBy:   "popularity",
	})
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(fmt.Sprintf("error getting everything for query: %s", err)))
		return
	}

	// marshal response and return success
	byt, err := json.Marshal(&data)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(fmt.Sprintf("could not marshal json: %s", err)))
		return
	}
	w.WriteHeader(http.StatusOK)
	w.Write(byt)
	return
}
