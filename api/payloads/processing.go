package payloads

import "github.com/adrianosela/nwfacts/api/processing"

// SearchResponse contains the response of a keyword search and analysis
type SearchResponse struct {
	Results []processing.Result `json:"results"`
}
