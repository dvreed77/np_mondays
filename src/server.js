var express = require('express')
var path = require('path')

var app = express()

app.get('/test', function (req, res) {
  res.send('Hello, Hot Reload!')
})

app.use('/data', express.static('src/data'))

var server = app.listen(1337, '127.0.0.1', function () {
  var port = server.address().port
  var host = server.address().address
  console.log('Application started at http://' + host + ':' + port)
})


module.exports = app
