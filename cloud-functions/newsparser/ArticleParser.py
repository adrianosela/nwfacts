from newspaper import Article
from flask import jsonify

class ArticleParser:

    def get_text(self, url):
        article = Article(url)
        article.download()
        article.parse()
        text = article.text
        return text

# Main Function entry point
URLS_KEY = 'urls'
def get_text(request):
    request_json = request.get_json()
    if request_json is not None:
        urls = request_json.get(URLS_KEY)
        url_to_text = {}
        article_parser = ArticleParser()
        print(f'urls: {urls}')
        for url in urls:
            try:
                url_to_text[url] = article_parser.get_text(url)
            except Exception:
                pass
        return jsonify(url_to_text)
    else:
        return 'Error', 500