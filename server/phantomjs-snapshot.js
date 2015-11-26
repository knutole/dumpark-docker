// create page
var page = require('webpage').create();
var system = require('system');
var address, output, size;

// console.log('system args: ', system.args);

// parse args
var args 	 = JSON.parse(system.args[1]);
var serverUrl 	 = args.url;
var width 	 = args.width || 1620;
var height 	 = args.height || 1080;
var imageFormat  = args.format || 'jpeg';
var imageQuality = args.quality || 100;
var outPath 	 = args.outPath + '.' + imageFormat;

// connect to page
var page = require('webpage').create();
page.viewportSize = { width : width, height: height };
page.open(serverUrl, 'get', function (status, why) {

	// if not success, exit
	if (status !== 'success') {
		console.log('\nSTATUS: ' + status + '! \nURL: ' + serverUrl);
		return phantom.exit();
	}

	// make sure page is loaded
	waitFor(function () {

		// evaluate based on .ready() on client
		return page.evaluate(function(args) {
			if (!systemapic) return false;
			if (systemapic.ready()) return true;
			return false;
		}, args);
	}, 

	// page loaded!
	function () {

		// wait an extra few seconds
		var extraWait = 3000;
		setTimeout(function () {
		
			// take the shot
			create_screenshot();
		
		}, extraWait);

	});
});


// save screen to disk
function create_screenshot() {
	page.viewportSize = { 
		width : width, 
		height: height 
	};
	page.render(outPath, {
		format: imageFormat, 
		quality: imageQuality
	});
	phantom.exit();
}

// waitFor times
var repeatCheckTime = 250; // repeat check every 250ms
var defaultMaxTimeout = 5000; // default max timeout is 5s

// waitFor helper fn
function waitFor(testFx, onReady, timeOutMillis) {
	var maxtimeOutMillis = timeOutMillis ? timeOutMillis : defaultMaxTimeout; 
	var start = new Date().getTime();
	var condition = false;
	var interval = setInterval(function() {

		// if not timeout yet and condition not yet fulfilled, check again
		if ( (new Date().getTime() - start < maxtimeOutMillis) && !condition ) {
			
			// check again
			condition = (typeof(testFx) === "string" ? eval(testFx) : testFx()); //< defensive code
		
		} else {

			// do screenshot
			typeof(onReady) === "string" ? eval(onReady) : onReady();

			// stop this interval
			clearInterval(interval); 
		}

	}, repeatCheckTime); 	
};
