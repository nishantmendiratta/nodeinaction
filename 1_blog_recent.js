var http = require("http");

var fs = require("fs");

http.createServer(function (request, response) {
	if (request.url!="/") {
		response.writeHead(404,{"Content-type":"text/plain"});
		response.end("Page not found!");
	}else{
		fs.readFile("titles.json",function (error, data) {
			if (error) {
				response.writeHead(500,{"Content-type":"text/plain"});
				response.end("Server error :" + error);
			}else{
				var titles = JSON.parse(data.toString());
				fs.readFile("template.html",function (error, data) {
					if (error) {
						response.writeHead(500,{"Content-type":"text/plain"});
						response.end("Server error :" + error);
					}else{
						var template = data.toString();
						var html = template.replace("%",titles.join("</li><li>"));
						response.end(html);
					}
				});
			}
		});
	}
}).listen(5000,"127.0.0.1");

console.log("Listening to http://127.0.0.1:5000");