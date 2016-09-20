var path = require("path");
var webpack = require('webpack');
module.exports = {
  entry: {
    app: ["./app/main.js"]
  },
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/assets/",
    filename: "bundle.js"
  },
  devServer: {
  	inline:true
  },
  plugins:[new webpack.HotModuleReplacementPlugin()]
};