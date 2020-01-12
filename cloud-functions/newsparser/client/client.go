package client

import (
	"errors"
	"net/http"
	"fmt"
    "encoding/json"
    "bytes"
    "io/ioutil"
)

const FUNCTION_URL = "https://us-central1-nwfacts.cloudfunctions.net/ArticleParser"

// Function that returns a map of URLs to Text Content
// takes an array of urls and then makes a request to a service to get
// the text content of articles from provided urls
func GetTextFromArticles(urls string[]) (map[string]string, error) {
	if len(urls) == 0 {
		return nil, errors.New("Empty URLs array")
	}
	urlsMap := make(map[string][]string)
	urlsMap["urls"] = urls
	jsonUrls, err := json.Marshal(urlsMap)
	if err != nil {
        fmt.Println(err)
		return nil, errors.New(fmt.Sprintf("JSON could not be generated, %v", err))
	}
    res, err := http.Post(FUNCTION_URL, "application/json", bytes.NewBuffer(jsonUrls))
    if err != nil {
        fmt.Println(err)
        return nil, errors.New("Error in http request")
    }
    body, err := ioutil.ReadAll(res.Body)

    if err != nil {
        fmt.Println(err)
        return nil, errors.New("Error in reading response body")
    }
	var returnedUrlsMap map[string]string
	defer res.Body.Close()
    err = json.Unmarshal([]byte(body), &returnedUrlsMap)
    if err != nil {
        return nil, errors.New("Error in reading response from JSON")
    }
	return returnedUrlsMap, nil
}

