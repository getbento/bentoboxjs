var webpack = require("webpack");

module.exports = {
	entry: __dirname + "/app/bentobox.js",
	
	output: {
		path: __dirname + "/dist",
		filename: "bentobox.dist.js"
	}
}