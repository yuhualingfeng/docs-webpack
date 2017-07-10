var webpack = require("webpack");
var path = require("path");

module.exports = {
	entry:{
	app:"./app.js",
	commons:["jquery"],
	commons1:["underscore"]
	
	// ,
	// jquery:"jquery",
	// underscore:"underscore"
	},
	output:{
	path: path.join(__dirname, 'build'),	
	filename:"bundle.js"
	},
	plugins:[
		
		new webpack.optimize.CommonsChunkPlugin({
		  name: "commons1",

		  filename: "commons1.js",
		  chunks:["app"]
		}),
		new webpack.optimize.CommonsChunkPlugin({
		  name: "commons",

		  filename: "commons.js",
		  chunks:["app"]
		})
	]
}