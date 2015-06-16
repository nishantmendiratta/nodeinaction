var connect = require("connect");
var logger = require("morgan");

var fs = require('fs');

var log = fs.createWriteStream('myapp.log', { flags: 'a' });

var app = connect();

app.use(logger({ format: ':method :url :status :response-time', stream: log,immediate: true })).use(hello).listen(4000);

function hello () {
	console.log("Hello World!");
}