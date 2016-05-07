var express = require('express');
var fs = require('fs');
var https = require('https');
var bodyParser = require('body-parser');

// our handlers
var handler = require('./handler');

var app = express();

// parse post data
app.use(bodyParser.urlencoded({limit: '2000mb', extended : true}));
app.use(bodyParser.json({limit:'2000mb'}));

// allow cross-site requests
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});


// set store
app.post('/map/set', function(req, res) {
	handler.setStore(req, res);
});

// get store
app.post('/map/get', function(req, res) {
	handler.getStore(req, res);
});

// create print
app.post('/map/print', function(req, res) {
	handler.createPrint(req, res);
});

// download print
app.get('/map/print/*', function(req, res) {
	handler.getPrint(req, res);
});


// server options
var port = 443;
var options = {
	key: fs.readFileSync('/home/ssl/privatekey.pem'),
	cert: fs.readFileSync('/home/ssl/certificate.pem'),
};

// start server
var server = https.createServer(options, app).listen(port, function(){
	console.log("Express server listening on port " + port);
});
