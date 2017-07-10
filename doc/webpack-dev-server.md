#webpack-dev-server
webpack-dev-server是一个小型的`Node.js Express`服务器,它使用`webpack-dev-middleware`来服务于webpack的包,除此自外，它还有一个通过[Sock.js](http://sockjs.org)来连接到服务器的微型运行时.

服务器发射编译状态的信息到客户端来反应发生的事件,根据你的情况,你可以选择不同模式.

我们来看一下下面的配置文件(`webpack.config.js`)

```javascript
var path = require("path");
module.exports = {
	entry:{
	app:["./app/main.js"]
	},
	output:{
	path:path.resolve(__dirname,"build"),
	publicPath:"/assets/",
	filename:"bundles.js"
}
}
```

这里你将你的源文件放在`app`文件夹下,并通过`webpack`将其打包到`build`文件夹下的`bundle.js`中.

**注意:**`webpack-dev-server`是一个独立的NPM包,你可以通过`npm install webpack-dev-server`来安装它.

##基本目录
webpack-dev-server默认会以当前目录为基本目录,除非你制定它.
```
webpack-dev-server --content-base build/
```
上述命令是在命令行中执行的,它将`build`目录作为根目录.有一点需要注意的是:webpack-dev-server生成的包并没有放在你的真实目录中,而是放在了内存中.

我们在基本目录下新建一个`index.html`文件,然后在浏览器中输入`http://localhost:8080`访问.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
  <script src="assets/bundle.js"></script>
</body>
</html>
```

##自动刷新
webpack-dev-server支持两种模式来自动刷新页面.

+ iframe模式(页面放在iframe中,当发生改变时重载)
+ inline模式(将webpack-dev-sever的客户端入口添加到包(bundle)中)

两种模式都支持热模块替换(Hot Module Replacement).**热模块替换的好处是只替换更新的部分,而不是页面重载**.

###iframe模式
使用这种模式不需要额外的配置,只需要以下面这种URL格式访问即可
```
http://«host»:«port»/webpack-dev-server/«path»
```
例如:http://localhost:8080/webpack-dev-server/index.html.

###inline模式
inline模式下我们访问的URL不用发生变化,启用这种模式分两种情况:

1 当以命令行启动webpack-dev-server时,需要做两点：

+ 在命令行中添加`--inline`命令
+ 在`webpack.config.js`中添加`devServer:{inline:true}`

2 当以Node.js API启动`webpack-dev-server`时,我们也需要做两点:

+ 由于`webpack-dev-server`的配置中无`inline`选项,我们需要添加`webpack-dev-server/client?http://«path»:«port»/`到webpack配置的entry入口点中.
+ 将`<script src="http://localhost:8080/webpack-dev-server.js"></script>`添加到html文件中

```javascript
    var config = require("./webpack.config.js");
    var webpack = require('webpack');
    var WebpackDevServer = require('webpack-dev-server');

config.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/");

var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
	contentBase:'build/',
	publicPath: "/assets/"
});
server.listen(8080);
```

在`Node`中运行上面的代码即可。

**注意：**webpack配置中的`devSever`配置项只对在命令行模式有效。

##(Hot Module Replacement)热模块替换

###在命令行中运行inline模式，并启用热模块替换
这里只需要多增加 `--hot`指令就OK了.如下所示.

```
webpack-dev-server --content-base build --inline --hot
```

**注意:**命令行模式下,`webpack.config.js`中一定要配置`output.publicPath`来指定编译后的包(bundle)的访问位置.
###在Nodejs API中运行inline模式，并启用热模块替换
这里需要做以下三点:
 
+ 在`webpack.config.js`的`entry`选项中添加:webpack/hot/dev-server
+ 在`webpack.config.js`的`plugins`选项中添加:`new webpack.HotModuleReplacementPlugin()`
+ 在`webpack-dev-server`的配置中添加：`hot:true`

## webpack-dev-server中的配置选项

```
var WebpackDevServer = require("webpack-dev-server");
var webpack = require("webpack");

var compiler = webpack({
  // configuration
});
var server = new WebpackDevServer(compiler, {
  // webpack-dev-server options

  contentBase: "/path/to/directory",
  // Can also be an array, or: contentBase: "http://localhost/",

  hot: true,
  // Enable special support for Hot Module Replacement
  // Page is no longer updated, but a "webpackHotUpdate" message is send to the content
  // Use "webpack/hot/dev-server" as additional module in your entry point
  // Note: this does _not_ add the `HotModuleReplacementPlugin` like the CLI option does. 

  // Set this as true if you want to access dev server from arbitrary url.
  // This is handy if you are using a html5 router.
  historyApiFallback: false,

  // Set this if you want to enable gzip compression for assets
  compress: true,

  // Set this if you want webpack-dev-server to delegate a single path to an arbitrary server.
  // Use "**" to proxy all paths to the specified server.
  // This is useful if you want to get rid of 'http://localhost:8080/' in script[src],
  // and has many other use cases (see https://github.com/webpack/webpack-dev-server/pull/127 ).
  proxy: {
    "**": "http://localhost:9090"
  },

  setup: function(app) {
    // Here you can access the Express app object and add your own custom middleware to it.
    // For example, to define custom handlers for some paths:
    // app.get('/some/path', function(req, res) {
    //   res.json({ custom: 'response' });
    // });
  },

  // pass [static options](http://expressjs.com/en/4x/api.html#express.static) to inner express server
  staticOptions: {
  },

  // webpack-dev-middleware options
  quiet: false,
  noInfo: false,
  lazy: true,
  filename: "bundle.js",
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  // It's a required option.
  publicPath: "/assets/",
  headers: { "X-Custom-Header": "yes" },
  stats: { colors: true }
});
server.listen(8080, "localhost", function() {});
// server.close();
```
