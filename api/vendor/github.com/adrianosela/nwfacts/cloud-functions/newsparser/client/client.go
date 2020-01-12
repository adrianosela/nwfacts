package client

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"net/http"

	"github.com/pkg/errors"
)

// Client is a client for the newsparser cloud function
type Client struct {
	URL   string
	Cache map[string]string
}

// NewClient is the constructor for the Client
func NewClient(host string) *Client {
	return &Client{
		URL:   host,
		Cache: make(map[string]string),
	}
}

type payload struct {
	URLs []string `json:"urls"`
}

// GetTextFromArticles returns a map of article URL to the text contained in it
func (c *Client) GetTextFromArticles(urls ...string) (map[string]string, error) {
	cached := make(map[string]string)
	uncached := []string{}

	for _, url := range urls {
		if data, ok := c.Cache[url]; ok {
			cached[url] = data
		} else {
			uncached = append(uncached, url)
		}
	}

	byt, err := json.Marshal(&payload{URLs: uncached})
	if err != nil {
		return nil, errors.Wrap(err, "could not marshal json payload")
	}

	res, err := http.Post(c.URL, "application/json", bytes.NewBuffer(byt))
	if err != nil {
		return nil, errors.Wrap(err, "could not make http request")
	}
	defer res.Body.Close()

	bodyByt, err := ioutil.ReadAll(res.Body)
	if err != nil {
		return nil, errors.Wrap(err, "could not read response body")
	}

	var urlToBodyMap map[string]string
	if err = json.Unmarshal(bodyByt, &urlToBodyMap); err != nil {
		return nil, errors.Wrap(err, "could not unmarshal response")
	}

	// add returned data to cache
	for url, data := range urlToBodyMap {
		c.Cache[url] = data
	}

	// join returned data with cached data
	for url, data := range cached {
		urlToBodyMap[url] = data
	}

	return urlToBodyMap, nil
}
