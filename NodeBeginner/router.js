/**
 * Routing information
 */
var url = require('url');

function route(req, res, handle) {
	var pathname = url.parse(req.url).pathname;
	console.log("About to route a request for ", pathname);
	
	if (typeof handle[pathname] === 'function') {
		return handle[pathname](req, res);
	} else {
		console.log("No request handler found for ", pathname);
		res.writeHead(404, {"Content-Type": "text/plain"});
		res.end("404 Not Found");
	}
	
}

exports.route = route;