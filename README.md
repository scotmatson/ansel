# Geppetto

> The Geppetto API is a file viewer microservice that melds together the rendering power of [Puppeteer](https://github.com/GoogleChrome/puppeteer) with the versatility of the [filepreview](https://github.com/maxlabelle/filepreview) package.

# Usage

```curl -X POST -H "Content-Type: application/json" -d '{"url": "http://example.com"}' http://127.0.0.1:3000/api/url-preview -o example.jpg```

```curl -F "data=@/path/to/file" http://127.0.0.1:3000/api/file-preview -o example.jpg```
