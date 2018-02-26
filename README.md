# webpack docs
## 特点
### Plugins(插件)
webpack有着丰富的插件接口,这使得webpack非常的灵活
### Performance(性能)
webpack使用异步I/O和多级缓存,这使得webpack在增量编译上极其快.
### Loader(装载机)
webpack支持通过装载机预处理文件.这允许你处理任何静态资源(不仅仅是JavaScript),你可以很轻松的写出在Nodejs上运行的装载机.
### Suport(支持)
webpack支持`AMD`和`CommonJs`模块样式.它巧妙的在你代码的AST中进行静态分析,它甚至还能处理简单的表达式,这样就允许你支持更多的类库.
### Code Splitting(代码拆分)
webpack允许你将你的代码拆分成块,每块代码按需加载,这样就可以减少初始化加载时间.
### Optimizations(优化)
webpack可以大量的优化来减少输出的大小,并使用hashes来实现请求缓存.
### Development Tools(开发工具)
webpack支持SourceUrls和SourceMaps进行简单的调试.通过`development middleware`来监控文件和`development server`来自动刷新.
### Multiple targets(多个目标)
webpack的主要目标是web,同时它也支持为`nodejs`和WebWorkers上的代码打包.
## Motivation(动机)
现在的`website`正在慢慢演变为webapps:

+ 越来越多的JavaScript代码被使用
+ 现代浏览器提供了丰富的接口
+ 更少的全页面重载，也就意味着单页面需要加载更多的代码.

这样的结果就是大量的代码会存在于`client side`.这样大量的代码就需要被组织.模块系统可以有效的管理你的代码.

### 组织代码的方式.

#### `<script>`标签方式(不存在模块系统)
缺点:
+ 容易导致全局冲突
+ 文件加载的顺序很重要(被依赖的需放到前面)
+ 开发者需要处理类库之间的依赖
+ 在大型项目中加载列表(`<script>`标签)可能会很长，并且难于管理
#### CommonJS
缺点:
+ 阻塞调用在网络中调用并不是很好,网络请求是异步的.
+ 多个模块无平行加载
#### AMD及其衍生
缺点
+ 编码开销。阅读和编写都更加困难.
+ 似乎是某种变通方法
#### ES6 Modules
缺点
+ 浏览器支持需要时间
+ 非常少的模块化管理是以这种方式进行管理

### Transferring(传输)
这里有两个使用最广泛的传输方式
+ 1个模块1个请求(缺点:请求越多，开销越大)
+ 所有模块在只需1个请求(缺点:暂时不需要的模块也会一并加载)

在这两个极端的传输方式中妥协在大多数情况下会更好.那就是拆分一组模块为多个更小的批次,在初始化不会被用到的模块可以随后按需加载.

### 为什么只是JavaScript ?
需要被处理的资源不仅仅是JavaScript，还有stylesheets,images,webfonts etc.
### 静态分析
聪明的解析器应该允许更多存在的代码可以运行。如果开发者做一些奇怪的行为，它也可以找到最好的解决方案.
## 什么是webpack?
`webpack`是一个`模块打包器`

webpack获取带依赖的模块并产生出与这些模块相对于的静态资源.

webpack的目标:
+ 拆分依赖树成块并按需加载
+ 让初始化加载时间更少
+ 每一个静态资源应该是一个模块
+ 能够集成第三方类库
+ 适用于大型项目
+ 能够定制模块打包的每一个部分
##Configuration(配置)
webpack的配置信息可以直接在命令行中指明,但更多情况下我们会选择使用配置文件,配置文件的命名为`webpack.config.js`,文件即为一个Nodejs的模块,输出的对象就是我们的配置信息.
```javascript
module.exports = {
    context: __dirname + "/app",
    entry: "./entry",
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js"
    }
};
```
下面介绍每个配置选项的作用.
###context
Type：`String`

解决`entry`选项的基本目录(绝对路径!),

### entry
Type:[`String`|`Array`|`Object`]

打包的入口

+ 如果你传递一个字符串：字符串被解析为它在启动时加载的模块
+ 如果你传递一个数组：所有模块都在启动时加载。最后一个出口
+ 如果你传递一个对象：多次入口块创建。键值是块的名称。值可以是一个字符串或数组

## Dev Tools(开发工具)

