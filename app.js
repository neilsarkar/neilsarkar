var express = require('express')
var app = express()

app.use(express.static(__dirname + '/app'))
app.use(express.static(__dirname + '/bower_components'))

var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address
  var port = server.address().port

  console.log('Neil listening at http://%s:%s', host, port)
})
