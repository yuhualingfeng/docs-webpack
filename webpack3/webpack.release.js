const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


/** plgins */
const uglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false
    },
    output: {
        comments: false,
    }
});
const definePlugin = new webpack.DefinePlugin({
    "process.env": {
        NODE_ENV: JSON.stringify("production")
    }
});
const htmlWebpackPlugin = new HtmlWebpackPlugin({
    filename: '../index.html',
    template: './template.html',
    hash: true
});
const cleanWebpackPlugin = new CleanWebpackPlugin(['dist']);
const webpackManifestPlugin = new WebpackManifestPlugin();
const providePlugin = new webpack.ProvidePlugin({
    $: 'jquery',
    jquery: 'jquery',
    'windows.jQuery': 'jquery',
    jQuery: 'jquery',
    React: 'react',
    ReactRedux: 'react-redux',
    d3: 'd3'
});
const dlllibs = ['bootstrap', 'jquery', 'react', 'redux', 'd3'];
const dllReferencePlugins = dlllibs.map((item) => {
    return new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require(`./dll/manifest-${item}.json`),
    });
});
const extractCSS = new ExtractTextPlugin('[name]_1.css');
const extractLESS = new ExtractTextPlugin('[name]_2.css');

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
    use: extractCSS.extract(['css-loader'])
};
const lessLoader = {
    test: /\.less$/i,
    use: extractLESS.extract(['css-loader', 'less-loader'])
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
        app: ['babel-polyfill','./src/index.js']
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'dist'),
        publicPath: './dist/',
        chunkFilename: '[name].chunk.js'
    },
    module: {
        rules: [
            cssLoader,
            lessLoader,
            babelLoader,
            fileLoader 
        ]
    },
    plugins: [
        uglifyJsPlugin,
        definePlugin,
        htmlWebpackPlugin,
        cleanWebpackPlugin,
        webpackManifestPlugin,
        providePlugin,
        extractCSS,
        extractLESS
    ].concat(dllReferencePlugins)
}