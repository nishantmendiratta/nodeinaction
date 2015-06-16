var connect = require("connect");
var url = require('url');

var app = connect()

app.use(function (req, res, next) {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	
	res.setHeader("Content-Type","application/json");
	res.end(JSON.stringify(query));
}).listen(4000);

