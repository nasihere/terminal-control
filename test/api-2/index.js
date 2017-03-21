var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('Hello World 3010 port! ')
})

app.listen(3010, function () {
  console.log('Example app listening on port 3010!')
})