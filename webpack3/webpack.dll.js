/**
 * 用于打包生成引用的类库文件
 */
const path = require('path');
const webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');


/** plgins */
var uglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false
    },
    output: {
        comments: false,
    }
});
var definePlugin = new webpack.DefinePlugin({
    "process.env": {
        NODE_ENV: JSON.stringify("production")
    }
});
var dllPlugin = new webpack.DllPlugin({
    path: path.join(__dirname, 'dll', 'manifest-[name].json'),
    name: '[name]'
});
var htmlWebpackPlugin = new HtmlWebpackPlugin({
    title: "LEAP BI",
    filename: '../template.html',
    template: './template-dll.html',
    favicon: "./favicon.ico",
    hash: true,
    chunks: ["jquery", "react", "d3", "bootstrap", "redux"]
});

/** plgins */


module.exports = {
    entry: {
        jquery: ["jquery"],
        react: ["react", "react-dom", "react-router"],
        d3: ["d3"],
        bootstrap: ["bootstrap"],
        redux: ["react-redux", "redux"]
    },
    output: {
        path: path.join(__dirname, 'dll'),
        filename: '[name].js',
        library: '[name]'
    },
    plugins: [
        dllPlugin, // 生成公用文件json
        htmlWebpackPlugin, // 生成html文件
        uglifyJsPlugin, // 压缩文件
        definePlugin // 上面压缩文件会产生警告，这个消除警告
    ]
};