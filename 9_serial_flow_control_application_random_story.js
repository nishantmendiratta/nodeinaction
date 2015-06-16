var fs = require("fs");
var request = require("request");
var htmlparser = require("htmlparser");

var configFilename = "rss_feeds.txt";

function checkRSSFile () {
	fs.exists(configFilename,function (exists) {
		if (!exists) {
			return next(new Error("Missing RSS file " + configFilename));
		};

		next(null,configFilename);
	});
}


function readRSSFile (configFilename) {
	fs.readFile(configFilename,function (err,feedList) {
		if (err) {
			return next(err);
		};

		feedList = feedList.toString().split("\n");;
		next(null,feedList[0]);
	});
}

function downloadRSSFile (feedUrl) {
	request({uri:feedUrl},function (err, res, body) {
		if (err) {next(err)};

		if (res.statusCode!=200) {
			next(new Error("Abnormal server response"));
		};

		next(null,body);
	});
}

function parseRSSFeed (rss) {
	var handler = new htmlparser.RssHandler();
	var parser = new htmlparser.Parser(handler);
	parser.parseComplete(rss);

	if (!handler.dom.items.length) {
		return next(new Error("No RSS found"));
	};

	var item = handler.dom.items.shift();
	console.log("********************************* TITLE *********************************");
	console.log(item.title);
	console.log("********************************* LINK *********************************");
	console.log(item.link);
}

var tasks = [checkRSSFile,
			 readRSSFile,
			 downloadRSSFile,
			 parseRSSFeed
			];

function next (err, result) {
	if (err) {throw err};

	var currentTask = tasks.shift();

	if (currentTask) {
		currentTask(result);
	};
}

next();