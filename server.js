var express = require('express');
var app = express();
var path = require('path');
var http = require('http')
var server = http.createServer()
var PORT = 3000;
var bodyParser = require('body-parser');
var usatoday = require('./USAToday/usatoday.js');
var youtube = require('./Youtube/youtube.js');

server.on('request', app);

server.listen(PORT, function () {
  console.log('Server listening on PORT', PORT);
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function(req,res,next){
	res.sendFile(path.join(__dirname, './index.html'));
})

app.get('/usatoday', function(req,res,next){
	console.log("Here");
	usatoday()
	.then(function(answer){
    	res.json(answer);
	});
})

app.get('/youtube', function(req,res,next){
	console.log("Here");
	youtube()
	.then(function(answer){
    	res.json(answer);
	});
})

app.use('/', function (req, res, next) {
	res.sendFile(path.join(__dirname, './index.html'));
});

module.exports = app;