var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var config = require('./webpack.config.js');
// config.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/");
config.entry.app.unshift("webpack/hot/dev-server");
var compiler = webpack(config);
var server = new WebpackDevServer(compiler,{
  contentBase: "./",
  publicPath: "/assets/",
  hot:true,
  proxy: {
    '/api': {
      target: 'http://localhost:80',
      secure: false
    }
  }
});
server.listen(80);