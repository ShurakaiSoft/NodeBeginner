/**
 * Module to start a http server.
 */

var http = require("http");

function start(port, route, handle) {
	function onRequest(req, res) {
		route(req, res, handle);
	}
	
	http.createServer(onRequest).listen(port);
	console.log("Listening on port ", port);
}

// public API
exports.start = start;