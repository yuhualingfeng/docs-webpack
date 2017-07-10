var path = require("path");
var webpack = require('webpack');
console.log(path.resolve(__dirname, "build"));
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry: {
        app: ["./app/main.js"],
        index:["./app/index.js"]
    },
    output: {
        path: path.resolve(__dirname, "build"),
        // publicPath: "/assets/",
        filename: "[name].js",
        chunkFilename: "[id].js"
    },
    module: {
        loaders: [{
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            // {
            //     test: /.css$/,
            //     loader: 'style-loader!css-loader'
            // },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            }, {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
            }
        ]
    },
    devtool: 'inline-source-map',
    // devServer: {
    // 	inline:true
    // },
    plugins: [new webpack.HotModuleReplacementPlugin(), new ExtractTextPlugin("[name].css")]
};
