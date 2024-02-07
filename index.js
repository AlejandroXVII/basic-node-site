let http = require("http");
let url = require("url");
let fs = require("fs");

http.createServer(function (req, res) {
	let q = url.parse(req.url, true);
	let filename = "." + q.pathname + ".html";

	if (q.pathname.length === 1) {
		filename = "index.html";
	} else if (
		filename !== "./about.html" &&
		filename !== "./contact-me.html"
	) {
		filename = "404.html";
	}
	fs.readFile(filename, function (err, data) {
		if (err) {
			res.writeHead(404, { "Content-Type": "text/html" });
			return res.end(q.pathname.length + ".html");
		}
		console.log("data: " + filename + " / " + data);
		res.writeHead(200, { "Content-Type": "text/html" });
		res.write(data);
		return res.end();
	});
}).listen(8080);
