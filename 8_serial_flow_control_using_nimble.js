var flow = require("nimble");

flow.series([
function (callback) {
	setTimeout(function(){
		console.log("I executed first");
		callback();
	},1000);
},
function (callback) {
	setTimeout(function(){
		console.log("I executed next");
		callback();
	},500);
},
function (callback) {
	setTimeout(function(){
		console.log("I executed last");
		callback();
	},10);
}
]);