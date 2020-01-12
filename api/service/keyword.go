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

	// TODO: for every article, parse text
	// TODO: for every parsed text, run NLP
	// TODO: for every NLP result, build object around it and append to results array
	// TODO: marshal results array instead of data object from newaspi response

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
