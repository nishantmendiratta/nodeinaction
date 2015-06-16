var connect = require("connect");
var favicon = require('serve-favicon');

var app = connect();

app.use(favicon(__dirname+'/favicon.ico')).use(function (req, res) {
	res.end("Hello World");
}).listen(5000);