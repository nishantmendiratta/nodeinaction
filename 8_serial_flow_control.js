setTimeout(function () {
	console.log("I executed first");
	setTimeout(function () {
		console.log("I executed next");
		setTimeout(function () {
			console.log("I executed last");
		},100);
	},500);
},1000)