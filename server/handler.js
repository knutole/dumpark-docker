var redis = require("redis");
var fs = require('fs');
var path = require('path');
var glob = require('glob');
var store = redis.createClient();

// enable debug feedback
var debug = false;

module.exports = handler = { 

	setStore : function (req, res) {

		var options = req.body;
		var map_id = options.map;
		var json = handler.stringify(options);
		var key = 'map:store:' + map_id;

		// save to redis
		store.set(key, json, function (err) {
			if (err && debug) console.log('redis set err: ', err);

			// return to client
			res.json({
				error : err,
				map : map_id
			});

			// debug: check that data got stored
			debug && store.get(key, function (err, data) {
				console.log('\nThis data was stored to redis:\n ', err, data);
			});
		});
		
	},

	getStore : function (req, res) {

		// get options
		var options = req.body;
		var map_id = options.map;
		var key = 'map:store:' + map_id;

		// get store from redis
		store.get(key, function (err, json) {

			// parse
			var data = handler.parse(json);

			// return to client
			res.json({
				err : err,
				data : data
			});
		});
	},

	createPrint : function (req, res) {
		debug && console.log('\nhandler.createPrint() \noptions:', req.body);

		// get options
		var options = req.body;
		var map_id = options.map;
		var key = 'map:store:' + map_id;

		// get store from redis
		store.get(key, function (err, json) {

			// parse
			var data = handler.parse(json);
			var url = data.state.print_url;
			var outFile = 'screenshot-' + map_id;
			var outPath = '/data/' + outFile;

			// set phantomjs options
			var phantomOptions = {
				url 	: url,
				outPath : outPath,
				format 	: options.format || 'jpeg',
				quality : parseInt(options.quality || 80),
				width 	: parseInt(options.width || 1620),
				height 	: parseInt(options.height || 1080)
			};

			// path to phantomjs snapshot script
			var script_path = './phantomjs-snapshot.js';

			// command
			var cmd = [
				'phantomjs', 			// phantomjs binary
				'--ignore-ssl-errors=true',	// for less bugs
				'--web-security=false', 	
				script_path,			
				" '" + JSON.stringify(phantomOptions) + "'",
			].join(' ');

			// run phantomjs
			var exec = require('child_process').exec;
			exec(cmd, function (err, stdout, stdin) {

				// debug
				debug && console.log('phantomjs: err, stdout, stdin:', err, stdout, stdin);
				
				// return 
				res.json({
					print_id : outFile,
					err : err
				});
			});
		});
	},


	getPrint : function (req, res) {

		// file_id
		var file_id = req.params[0];

		// error handling
		if (!file_id) return res.end('Something went wrong. Check your url, or try to make another screenshot!')

		// find file
		glob('/data/' + file_id + '*', function (err, files) {

			// get file
			var filepath = files[0];

			// debug
			debug && console.log('\nhandler.getPrint() \nfilepath:', filepath, '\nfile_id:', file_id);

			// error handling
			if (!filepath) return res.end('Something went wrong. Please try to make another screenshot!')

			// send file
			res.sendFile(path.join(__dirname, filepath));
		});
	},





	// helper fn with try/catch
	parse : function (json) {
		try {
			var data = JSON.parse(json);
		} catch (e) {
			debug && console.log('error parsing: ', e, json);
			var data = false;
		}
		return data;
	},

	// helper fn with try/catch
	stringify : function (obj) {
		try {
			var data = JSON.stringify(obj);
		} catch (e) {
			debug && console.log('error parsing: ', e, obj);
			var data = false;
		}
		return data;
	},
}
