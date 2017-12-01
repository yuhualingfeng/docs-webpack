const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path:  path.join(__dirname, 'dist'),
        publicPath: './dist/',
    },
    module:{
    	rules:[
    		{
    			test: /\.css$/,
    			use: [
    				'style-loader',
    				'css-loader'
    			]
    		},
    		{
    			test:/\.(png|svg|jpg|gif)$/,
    			use: [
    				'file-loader'
    			]
    		},
    		{
    			test:/\.(woff|woff2|eot|ttf|otf)$/,
    			use: [
    				'file-loader'
    			]
    		}
    	]
    },
    plugins:[
    	new HtmlWebpackPlugin({
    		title:'output Management',
    		filename:'../index.html',
    		template:'./template.html'
    	}),
    	new CleanWebpackPlugin(['dist']),
    	new WebpackManifestPlugin()
    ],
    devServer: {
    	contentBase: './'
    },
    devtool:'inline-source-map'
}
