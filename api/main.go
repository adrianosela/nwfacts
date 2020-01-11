package main

import (
	"log"
	"net/http"

	"github.com/adrianosela/nwfacts/api/config"
	"github.com/adrianosela/nwfacts/api/service"
)

const filePath = "./config/config.yaml"

var (
	version string // injected at build-time
)

func main() {
	c := config.BuildConfig(filePath, version)
	svc := service.NewFactsService(c)
	if err := http.ListenAndServe(c.ServerSettings.Port, svc.Router); err != nil {
		log.Fatal(err)
	}
}
