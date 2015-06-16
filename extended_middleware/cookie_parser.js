var connect = require("connect");
var cookieParser = require('cookie-parser');

var app = connect().use(cookieParser('working with cookie parser'))
	.use(function (req, res){
		res.setHeader('Set-Cookie', 'foo=bar');
		console.log(req.cookies);
		console.log(req.signedCookies);
		res.end("hello\n");
	}).listen(4000);
