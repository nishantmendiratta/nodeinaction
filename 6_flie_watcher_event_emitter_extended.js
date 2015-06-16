function Watcher (watchDir, processedDir) {
	this.watchDir = watchDir;
	this.processedDir = processedDir;
}

var events = require("events");
var util = require("util");

util.inherits(Watcher,events.EventEmitter);

var fs = require("fs"),
	watchDir = "./watchDir",
	processedDir = "./done";

Watcher.prototype.watch = function() {
	var watcher = this;
	fs.readdir(this.watchDir,function (err, files) {
		if (err) { cosnole.log(err); }
		for(var index in files){
			console.log("processed : " + files[index]);
			watcher.emit("process",files[index]);
		}
	
	}) 
}

Watcher.prototype.start = function () {
	var watcher = this;
	fs.watchFile(watchDir,function(){
		watcher.watch();
	});
}

var watcher = new Watcher(watchDir,processedDir);

watcher.on("process",function (file) {
	var watchFile =  this.watchDir + "/" + file;
	var processedFile = this.processedDir + "/" + file.toLowerCase(); 
	fs.rename(watchFile,processedFile,function(err){
		if (err) {console.log(err);}
	});
});

watcher.start();