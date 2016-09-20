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

##基本内容