var path = require("path");
var webpack = require("webpack");
module.exports = {
	entry:{
		app:["./main.js"]
	},
	output:{
		path:path.resolve(__dirname,"build"),
		publicPath:"/assets/",
		filename:"bundle.js"
	},
	module:{
		loaders:[
			{
	                test: /\.js$/,
	                loader: 'babel',
	                exclude: /node_modules/,
	                query: {
	                    "presets": ["react", "es2015"],
	                    "env": {
	                        "development": {
	                            "presets": ["react-hmre"]
	                        }
	                    }

	                }
	            }
		]
	},
	plugins:[new webpack.HotModuleReplacementPlugin(),new webpack.DefinePlugin({
    "process.env": {
        NODE_ENV: JSON.stringify("production")
    }
})],
	devtool: 'inline-source-map'
}