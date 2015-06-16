var http = require("http");

var req = http.request({
	method: "POST",
	port: 4000,
	headers: {
		"Content-Type":"application/json",
		'Content-Length': 40 * 1024
	}
});

req.write('[');
var n = 300000;

while(n--){
	req.write('"Foo",');
}

req.write('"bar"]');

req.end();

