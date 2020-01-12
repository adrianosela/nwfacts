package config

import (
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"time"

	"gopkg.in/yaml.v2"
)

// Config holds the service configuration
// necessary for endpoints to respond to requests
type Config struct {
	ServerSettings struct {
		Port       string `yaml:"http_port"`
		Debug      bool   `yaml:"debug"`
		Version    string // server git hash
		DeployTime time.Time
	} `yaml:"server_settings"`
	NewsAPISettings struct {
		URL    string `yaml:"url"`
		APIKey string `yaml:"api_key"`
	} `yaml:"newsapi_settings"`
	ArticleParserSettings struct {
		URL string `yaml:"url"`
	} `yaml:"articleparser_settings"`
}

// BuildConfig returns a populated config struct from a yaml file
func BuildConfig(filePath, version string) *Config {
	config := configFromYaml(filePath)

	config.ServerSettings.DeployTime = time.Now()
	config.ServerSettings.Version = version

	// When running on Google App Engine, the PORT env
	// variable is set by the runtime. If set, we will
	// serve on the port specified there.
	if port := os.Getenv("PORT"); port != "" {
		config.ServerSettings.Port = fmt.Sprintf(":%s", port)
	}

	return config
}

func configFromYaml(filePath string) *Config {
	yamlFile, err := ioutil.ReadFile(filePath)
	if err != nil {
		log.Fatal(err)
	}
	config := &Config{}
	if err = yaml.Unmarshal(yamlFile, config); err != nil {
		log.Fatal(err)
	}
	return config
}
