package processing

// SearchResponse contains the response of a keyword search analysis
type SearchResponse struct {
	Results []Result `json:"results"`
}

// Result represents a processing result
type Result struct {
	// article metadata
	URL         string `json:"url"` // note: treated as unique identifier
	Source      string `json:"source"`
	Title       string `json:"title"`
	Description string `json:"description"`
	ImgURL      string `json:"imgURL"`
	PublishedAt string `json:"publishedAt"`
	Author      string `json:"author,omitempty"`
	// article scores for different named scoring functions
	Scores map[string]interface{} `json:"scores"`
}
