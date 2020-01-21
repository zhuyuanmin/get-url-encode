var express = require('express')
var url = require('url')
var proxy = require('http-proxy-middleware')
var baseUrl = 'https://tinyurl.com'

var app = express()
app.use(express.static("public"))

app.use(
  '/api',
  proxy({
    target: baseUrl,
    changeOrigin: true,
    pathRewrite: { '^/api': '/api-create.php' }
  })
)
app.use(
  '/api2',
  proxy({
    target: baseUrl,
    changeOrigin: true,
    pathRewrite: { '^/api2/': '/' }
  })
)
app.get('/', (req, res) => {
  var query = url.parse(req.url, true).query
  if (query) {
    res.send(query)
  }
})
app.listen(3000)
