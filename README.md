# nwfacts

The ultimate anti-bias tool for browsing the news

## Contents

* [Why use this?](#motivations)
* [High Level Design](#design-specification)

## Motivations

All humans are susceptible to a large number of well-understood [congnitive biases](https://en.wikipedia.org/wiki/List_of_cognitive_biases). These biases ultimately impact how we see and understand the world. NWFacts aims to empower everyone to browse news articules while scoring their sources for measured biases.

## Design Specification

- Filter Processing server (Golang): processes keyword queries, essentially proxying responses from [NewsAPI](https://newsapi.org/) and running subsequent algorithmic bias-measuring functions 
- WebApp server (Golang): serves the HTML and JS resources of the UI and responds to POST forms in the UI
- WebApp client (JS): caches query responses from the processing server for individual algorithms, computes and displays final score next to each news article 
