const express = require('express')
const proxy = require('http-proxy-middleware');
const path = require('path')
const port = 80
const app = express()

var target ='http://172.17.202.239:8080';


// serve static assets normally
app.use(express.static(__dirname + '/'))

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
const broserHistory = false;

app.use('/', proxy({target: target, changeOrigin: true}));

if(broserHistory)
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'dev.html'))
})

app.listen(port)
console.log("server started on port " + port)