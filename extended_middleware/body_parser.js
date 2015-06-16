var connect = require("connect");
var bodyparser = require("body-parser");

var app = connect();

app.use(bodyparser()).use(function (req, res) {
	res.end("Registered new user : " + req.body.username);
});

app.listen(4000);