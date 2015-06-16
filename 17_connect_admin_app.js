var connect = require("connect");

connect().use(logger).use("/admin",restrict).use("/admin",admin).use(hello).listen(4000);


function logger (req, res, next) {
	console.log("%s %s", req.method, req.url);
	next();
}

function restrict (req, res, next) {
	var authorization = req.headers.authorization;
	
	if (!authorization) { return next(new Error('Unauthorized')) };

	var parts = authorization.split(' ');
	var scheme = parts[0];
	var auth = new Buffer(parts[1],'base64').toString().split(':');
	var user = auth[0];
	var pass = auth[1];

	if ('loki' == user && 'badboy' == pass) {
		next();
	}else{
		next(new Error('Unauthorized'));
	}

}

function admin (req, res, next) {
	switch(req.url){
		case '/':
			console.log('try /users');
			break;
		case '/users':
			console.log(JSON.stringify(['tobi', 'loki', 'jane']));
			break;
	}
}

function hello (req, res) {
	res.setHeader("Content-Type","text/plain");
	res.end("Hello World");
}

