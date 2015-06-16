var connect = require("connect");

var bodyparser = require("body-parser");

var app = connect();
app.use(bodyparser({limit: '32kb'}));
app.listen(4000);