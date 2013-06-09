/**
 * Main code to handle requests.
 */
var qs = require('querystring');
var fs = require('fs');
var formidable = require('formidable');
var uploadFilename = "./public/image.jpg";


function start(req, res) {
	console.log("Request handler 'start' was called");
	var body = 
		'<!doctype html>' +
		'<html>' +
		'<head>' +
		'<meta charset="UTF-8" />' +
		'</head>' +
		'<body>' +
		'<form action="/upload" enctype="multipart/form-data" method="post">' +
		'<input type="file" name="upload" >' +
		'<input type="submit" value="Upload File">' +
		'</form>' +
		'</body>' +
		'</html>';
	
	res.writeHead(202, {"Content-Type": "text/html"});
	res.write(body);
	res.end();
}

function upload(req, res) {
	console.log("Request handler 'upload' was called");
	
	var form = new formidable.IncomingForm();
	console.log("about to parse");
	form.parse(req, function (err, fields, files) {
		console.log("parsing done.");
		
		// possible error on windows systems.
		fs.rename(files.upload.path, uploadFilename, function (err) {
			if (err) {
				fs.unlink(uploadFilename);
				fs.rename(files.upload.path, uploadFilename);
			}
		});
		
		res.writeHead(202, {"Content-Type": "text/html"});
		res.write("received image:<br>");
		res.write("<img src='/show' />");
		res.end();
	});
}

function show(req, res) {
	console.log("Request handler 'show' was called.");
	fs.readFile(uploadFilename, 'binary', function (err, data) {
		if (err) {
			res.writeHead(500, {"Content-Type": "text/plain"});
			res.write(err + "\n");
			res.end();
		} else {
			res.writeHead(200, {"Content-Type": "image/jpeg"});
			res.write(data, "binary");
			res.end();
		}
	});
}

exports.start = start;
exports.upload = upload;
exports.show = show;