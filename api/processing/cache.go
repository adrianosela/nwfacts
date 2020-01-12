package processing

// Cache represents necessary operations to cache results
type Cache interface {
	putResult(string, *Result) error
	getResult(string) (*Result, bool)
}

// memCache is an in-memory implementation of the Cache interface
type memCache struct {
	m map[string]*Result
}

func newMemoryCache() *memCache {
	return &memCache{
		m: make(map[string]*Result),
	}
}

func (c *memCache) putResult(url string, r *Result) error {
	c.m[url] = r
	return nil
}

func (c *memCache) getResult(url string) (*Result, bool) {
	val, ok := c.m[url]
	return val, ok
}
