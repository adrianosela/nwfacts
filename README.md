# nwfacts

[![license](https://img.shields.io/github/license/adrianosela/nwfacts.svg)](https://github.com/adrianosela/nwfacts/blob/master/LICENSE)
[![Generic badge](https://img.shields.io/badge/nwfacts.tech-GREEN.svg)](https://nwfacts.tech)

The ultimate anti-bias tool for browsing the news.

## Contents

* [Aim and Motivations](#project-aim)
* [High Level Design](#design-specification)
* [Monetization](#means-to-monetization)

## Project Aim and Motivations

All humans are susceptible to a large number of well-understood [congnitive biases](https://en.wikipedia.org/wiki/List_of_cognitive_biases). These biases ultimately impact how we see and understand the world.

This is an [nwHacks](https://www.nwhacks.io/) 2020 project which aims to empower everyone to browse news articles consciously, scoring sources for measurable bias indicators such as sensational language and non-neutral sentiment.

Our final product is the result of the following secondary goals:

* Create something simple that makes the world a slightly better place by fighting misinformation, aligning with [Mozilla's campaign](https://foundation.mozilla.org/en/campaigns/eu-misinformation/)
* Explore the use of new technologies
	* [StdLib](https://stdlib.com/)'s AutoCode feature (in beta testing at the moment)
	* Google Cloud Platform's [Cloud Functions](https://cloud.google.com/functions/)
	* Google Cloud Platform's [Natural Language](https://cloud.google.com/natural-language/) processing
	* Delegating and managing DNS multiple domains from [Domain.com](https://domain.com)
* Leverage team members' (very distinct) skills without having to settle for a single programming language by employing a microservice-like architecture, where different components are fully isolated and modular
* Take a shot at winning prizes! We have focused on featured challenges from Google Cloud, StdLib, and Domain.com

## Design Specification

* **Keyword Processing Server (Golang)**
  * Receives keyword queries from HTTP clients
  * Fetches relevant news article URLs using the free [NewsAPI](https://newsapi.org/)
  * Parses articles' contents using our homegrown article-parsing Cloud Function
  * Runs several algorithmic and integrated third-party API bias-measuring functions (mostly [Natural Language Processing](https://en.wikipedia.org/wiki/Natural_language_processing) which gives us metrics that can help us understand the legitimacy, intent, and biases associated with a piece of text)
  * Returns article metadata along with relevant metric scores back to the client
  * *Caches article results by URL due to the expensive nature of text and ML processing

* **Keyword Processing Client (ReactJS)**
  * Landing page style UI with a simple keyword search
  * Styled cards where each card contains releavant metadata and bias-metrics for a single article
  * Processing results export-to-CSV functionality

* **Article HTML-to-Text Parsing Cloud Function (Python)**
  * Receives a list of URLs from HTTP clients
  * Uses the [Newspaper3k](https://newspaper.readthedocs.io/en/latest/) library to extract body text from an article given its URL
  * Returns a populated map of URL-to-body (text of article) back to the client

* **Processing Results Export Flow StdLib Function (NodeJS)**
  * Receives a list of URLs from HTTP clients
  * Uses the [Newspaper3k](https://newspaper.readthedocs.io/en/latest/) library to extract body text from an article given its URL
  * Returns a populated map of URL-to-body (text of article) back to the client

## Means to Monetization

The website [nwhacks.tech](https://nwhacks.tech) is and will remain free whenever it is running. Eventually we could consider adding premium account functionality with access to more computationally expensive machine learning.
