#Code Splitting(代码分割)

对于大型web应用将所有代码放在单个文件中效率是很低的,特别是某些chunk只在特别情况下使用.`Webpack`有一个特性可以将你的代码分成按需加载的`chunk`,这个特性称为`Code Splitting`

这是一个可选的特性.你可以在你的代码库中定义分割点,然后`webpack`便会明白依赖性，输出文件及运行哪些代码.

**澄清一个普遍的误区:**代码分割不只是打包一个公用chunk,更重要得特性是将代码分割成按需加载的chunk.这能够保证初始化加载的资源更小,且部分代码当需要时再进行加载.

##定义一个分割点
AMD和CommonJs定义了不同的方法来按需加载代码,ES6 Moudle不支持按需加载

###CommonJs:require.ensure
```
	require.ensure(dependencies,callback)
```
callback方法没有参数,只有当dependencies加载成功后才会执行callback方法


例子：
```
 require.ensure(["module-a","module-b"],function(){
 	var a = require("module-a");
 })
```

###AMD:require

```
require(dependencies,callback)
```

例子:

```
require(["module-a","module-b"],function(a,b){
	// coding
})
```
**注意:**这里即加载了modules也执行了modules,modules是从左到右执行,callback方法是可选的.


##chunk内容
被分割点分割的所有依赖代码都会添加到chunk中，它们都会被依次添加。如果将函数表达式（或绑定函数表达式）作为回调传递给分割点，webpack会自动将此函数表达式中所需的所有依赖项放入该块。

##chunk优化
如果两个块包含同样的modules，他们会被合并成一个。这就导致了块拥有多个父级。
如果module在一个chunk的所有父对象中都可用，那么它将从该chunk中移除。
如果一个chunk包含另一个chunk的所有modules，则将其存储。它满足多个chunks

##块加载
根据配置选项`target`，用于chunk装入的运行时逻辑被添加到bundle,用于web的chunks将通过jsonp来加载,每个chunk只会加载一次,并行加载的将会被合并为一个。

##chunk类型
### Entry chunk
 Entry chunk包含运行时和一堆modules，这里面的所有modules都会被执行.
### Normal chunk
Normal chunk不包含运行时,它只包含一堆moudles,它的结构取决于加载方式，例如通过jsonp加载的则把moudles放在一个jsonp的回调函数中.
### Initial chunk
initial chunk 是一个 normal chunk，唯一的不同时优化将它看得更加重要，因为它影响初始化加载时间，这种类型的chunk可以结合`CommonsChunkPlugin`使用。

##拆分app和vendor代码
将你的应用分割为两个文件，即`app.js`和`vendor.js`,你可以在`vendor.js`中require引用的文件，然后将这个名字传到`CommonsChunkPlugin`中.
```
var webpack = require("webpack");
moudle.exports = {
	entry:{
	app:"./app.js",
	vendor:["jquery","underscore",...]
	},
	output:{
	filename:"bundle.js"
	},
	plugins:[
		new webpack.optmize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js")
	]
}
```
这里会将所有verdor chunk中包含的modules从app chunk中移除，`bundle.js`中只包含应用代码，它的依赖代码都在`vendor.bundle.js`中.
##多个入口块
##共享块
##优化
##命名块

