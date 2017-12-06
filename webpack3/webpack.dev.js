const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackManifestPlugin = require('webpack-manifest-plugin');

/** plgins */

const providePlugin = new webpack.ProvidePlugin({
    $: 'jquery',
    jquery: 'jquery',
    'windows.jQuery': 'jquery',
    jQuery: 'jquery',
    React: 'react',
    ReactRedux: 'react-redux',
    d3: 'd3'
});

/** plgins */

/** loaders */
const babelLoader = {
    test: /\.js$/,
    exclude: /(node_modules)/,
    use: {
        loader: 'babel-loader',
        options: {
            presets: ['react', 'env']
        }
    }
};
const cssLoader = {
    test: /\.css$/,
    use: ['style-loader','css-loader']
};
const lessLoader = {
    test: /\.less$/i,
    use: ['style-loader','css-loader','less-loader']
};
const fileLoader = {
    test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
    use: [
        'file-loader'
    ]
};

/** loaders */


module.exports = {
    entry: {
        app:['babel-polyfill','./src/index.js']
    },
    output: {
        filename: '[name].js',
        path:  path.join(__dirname, 'dist'),
        publicPath: 'http://localhost:8082/',
    },
    module:{
    	rules:[
            cssLoader,
            lessLoader,
            babelLoader,
            fileLoader
    	]
    },
    plugins:[
    	providePlugin
    ],
    devServer: {
    	contentBase: './',
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
        },
        port:8082,
        hot:true,
        compress:true
    },
    devtool:'inline-source-map'
}
