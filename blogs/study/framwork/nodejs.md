# node.js

> 定义:就是一个基于服务端的一款软件,node.js是基于js开发的一款框架

```
HTML  CSS  JS  JQ  Bootstrap ....  都是前端的语言及框架

Bootstrap  => 封装好的大量css的类文件
	bootstrap.min.css
		.btn{
          属性:属性值
		}
		....
		
		<元素 class="类名"></元素>
		
	原生的css
		xxx.css
			选择器{
              属性:属性值;
			}
		xxxx.html
			通过link 进入这个css文件
Jq:
	就是把js中比较复杂的方法或属性名变成简单语法
	

前端: H5

node.js   可以搭建服务器:  就可以操作数据库  => 使用node.js来写接口

后端:JAVA    服务器端  =>  写接口  => 前端调用接口

网页中 访问百度
http://www.baidu.com  域名  租的  =>  ip
云服务器(代码 index.html  h1  我是服务器中的代码)  =>   192.168.11.34
index.html


[美女              ]  => 服务器 => 请求数据库  => 服务器  =>  客户端
```

## node.js的安装

```
1.我们需要在百度搜索 node.js
  node.js的官网:http://nodejs.cn/
  关于node的版本:
  	最新  18的版本  不建议安装的  不稳定容易出现不兼容问题
  	我们推荐安装16版本
  	注意:如果你是win7版本的系统,最大支持的版本是 12
  	如果是win7+ 任何版本都可以直接安装
  	
  	扩展名为.msi的,一通下一步
  	
  	可以在百度搜索 node.js历史版本:https://nodejs.org/zh-cn/download/releases/
  	
2.判断是否安装完成:
	在键盘上按 win+r  输入 cmd
	在黑窗口中 输入  node -v
	C:\Users\duan>node -v
	v12.13.1
	
	在安装node的同时还一并安装了 npm 我们还需要看一下npm的版本
	C:\Users\duan>npm -v
	6.12.1
	
	npm的功能就是安装模块
	npm install 模块名
```

## node.js能干什么

```
1.可以解析js代码
2.可以搭建服务器
3.可以操作数据库
```

## 关于node.js的使用

```
1.创建一个扩展名为 js 的文件
	1.js
2.如果执行js文件
	在cmd中输入 node 文件名.js
	
	番外篇:
    	cmd  cd 切换目录   cd ./abc
    	cmd 中盘符切换  C:   D:
        cd 绝对路径
        查看 目录中有哪些文件或目录
        C:\Users\duan\Desktop\h5-69\node>dir
         C:\Users\duan\Desktop\h5-69\node 的目录

        2022/07/14  11:43    <DIR>          .
        2022/07/14  11:43    <DIR>          ..
        2022/07/14  11:44                28 1.js
        2022/07/14  11:41             2,155 node.md
                       2 个文件          2,183 字节
                       2 个目录 44,404,092,928 可用字节

        C:\Users\duan\Desktop\h5-69\node>
        
        使用node 命令进行执行 js文件
        js文件中的console.log 是打印在 cmd的黑窗口中

        
```

## 服务器搭建

```
1.创建一个js文件
xxx.js
1.引入 http 模块 用于创建服务器的模块
let http = require("http");
2.使用http模块搭建一个http服务器
let server = http.createServer(function(req,res){
  	console.log("this is server")
})
3.设置监听端口
server.listen(8090);
```

