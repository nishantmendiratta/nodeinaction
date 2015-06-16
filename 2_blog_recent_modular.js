var http = require("http");

var fs = require("fs");

http.createServer(function (request,response) {
	
	if (request.url!="/") {
		return hadError("Page not found!",response);
	}

	getTitles(response);
	
}).listen(4000,"127.0.0.1");

console.log("Listening to 127.0.0.1:4000");

function getTitles (response) {
	
	fs.readFile("titles.json",function (error,data) {
	
		if (error) {
			return hadError(error,response);
		}
		
		getTemplate(data,response);
		
	});
}

function getTemplate (data,response) {
	
	var titles = JSON.parse(data.toString());

	fs.readFile("template.html",function (error,data) {
		
		if (error) {
			return hadError(error,response);
		}

		formatHtml(titles,data.toString(),response);
	});
}

function formatHtml (titles,template,response) {
		var html = template.replace("%",titles.join("</li><li>"));
		response.writeHead(200,{"Content-type":"text-html"});
		response.end(html);
}

function hadError (error,response) {
	response.end(error);
}