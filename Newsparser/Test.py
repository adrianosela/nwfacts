from flask import Flask, request, jsonify
from newspaper import Article
app = Flask(__name__)

## Test client for the function


@app.route("/")
def home():
    URLS_KEY = 'urls'
    print(request.json)
    if request.json:
        request_json = request.get_json()
        
        urls = request_json.get(URLS_KEY)
        url_to_text = {}
        article_parser = ArticleParser()
        for url in urls:
            url_to_text[url] = article_parser.get_text(url)
        return Flask.jsonify(url_to_text)
    else:
        return 'Error', 500
    

class ArticleParser:

    def get_text(self, url):
        print(f'Url rcvd: {url}')
        article = Article(url)
        article.download()
        article.parse()
        text = article.text
        return text

if __name__ == "__main__":
    app.run(debug=True)