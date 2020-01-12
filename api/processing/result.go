package processing

// Result represents a processing result
type Result struct {
	// article metadata
	Source      string `json:"source"`
	Title       string `json:"title"`
	Description string `json:"description"`
	URL         string `json:"url"`
	PublishedAt string `json:"publishedAt"`
	Author      string `json:"author,omitempty"`
	// article scores for different named scoring functions
	Scores map[string]float32 `json:"scores"`
}
