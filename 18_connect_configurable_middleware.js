var connect = require("connect");

var app = connect();

app.use(logger(":method :url")).listen(4000);

function setup (format) {
	
	var regexp = /:(\w+)/g;

	return function logger (req, res, next) {
		var str = format.replace(regexp,function (match, property) {
			return req[property];
		});
		console.log(str);
		next();
	}
}

module.export = setup;