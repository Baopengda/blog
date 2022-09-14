# React项目实战-《IT猿题库》

[[toc]]

## 实战课学习目标

结合React、React Redux、React Router、Hooks、Axios与material-ui，完成《IT猿题库》项目。

## 一、项目参考

项目地址：[http://codesohigh.com/yuantiku](http://codesohigh.com/yuantiku)

备用地址：[http://47.93.114.103/yuantiku](http://47.93.114.103/yuantiku)

界面效果：

![image-20210514194820474](https://tva1.sinaimg.cn/large/008i3skNgy1gqi74xkwc8j30kk18mwu3.jpg)

## 二、技术栈

### 1、React

简介：使用React开发移动端项目

官网地址：[https://react.docschina.org/](https://react.docschina.org/)

### 2、Material-UI

简介：一个基于 Preact / React / React Native 的 UI 组件库

官网地址：[https://material-ui.com/zh/](https://material-ui.com/zh/)

## 三、项目创建与安装

### 1、依赖安装

使用 `npx create-react-app yuantiku` 创建完项目后，安装material-ui：

```shell
# 用npm安装
$ npm install @material-ui/core

# 用yarn安装
$ yarn add @material-ui/core

# 顺便安装SVG 图标
# 通过 npm
$ npm install @material-ui/icons

# 通过 yarn
$ yarn add @material-ui/icons
```

### 2、FastClick解决

解决js点击事件延迟加载的

在 `public/index.html` 的 `head` 标签中插入：  

```html
<title>IT猿题库</title>
<script src="https://as.alipayobjects.com/g/component/fastclick/1.0.6/fastclick.js"></script>
<script>
  if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
      FastClick.attach(document.body);
    }, false);
  }
  if(!window.Promise) {
    document.writeln('<script src="https://as.alipayobjects.com/g/component/es6-promise/3.2.2/es6-promise.min.js"'+'>'+'<'+'/'+'script>');
  }
</script>
```

> 这里建议把 https://as.alipayobjects.com/g/component/fastclick/1.0.6/fastclick.js 和 https://as.alipayobjects.com/g/component/es6-promise/3.2.2/es6-promise.min.js 保存到本地

### 3、调用

在 `App.js` 中：

```shell
import React, { Component } from 'react'
import Button from '@material-ui/core/Button';

export default class App extends Component {
  render() {
    return (
      <Button variant="contained" color="primary">你好，世界</Button>
    )
  }
}
```

然后就可以看到按钮被正式引入： 

![image-20210428111957851](https://tva1.sinaimg.cn/large/008i3skNgy1gpzaj1o26sj32ag0d6djx.jpg)

### 4、清除默认边距与样式

npm包路径：[https://www.npmjs.com/package/reset-css](https://www.npmjs.com/package/reset-css)

安装：

```shell
$ yarn add reset-css     npm install reset-css
```

使用：

```js
// index.js中
import 'reset-css';
```

## 四、蓝湖

将设计图用photoshop打开，并上传至蓝湖。此时的设计图是3x尺寸，因此要勾选对应的1125px尺寸。

## 五、配置rem

### 1、安装依赖包     px to rem

```shell
$ yarn add lib-flexible postcss-px2rem    npm install xxxx
```

接下来需要配置 webpack.config.js

react 默认是看不见 webpack.config.js 想让它出现 , 需要解包 , 解包过程 不可逆的 

### 2、解包

解包需要先做git提交，否则无法解包，因此先执行：

```shell
$ git add .
$ git commit -m 'eject之前的提交'
```

接下来直接解包：

```shell
$ yarn eject
```

![image-20210425145931070](https://tva1.sinaimg.cn/large/008i3skNgy1gpw00im87kj31o606eq76.jpg)

### 3、配置loader

解包后，可以看到项目目录下多了一个 `config` 文件夹。打开 `config/webpack.config.js` ：

```js
// 引入 postcss-px2rem 
const px2rem = require('postcss-px2rem')
```

搜索 `postcss-loader` ，添加：

```js
const loaders = [
 	 ...,
  {
    loader: require.resolve('postcss-loader'),
      options: {
        ident: 'postcss',
          plugins: () => [
            require('postcss-flexbugs-fixes'),
            require('postcss-preset-env')({
              autoprefixer: {
                flexbox: 'no-2009'
              },
              stage: 3
            }),
            px2rem({ remUnit: 112.5 }),  //  添加的代码
            postcssNormalize()
          ],
            sourceMap: isEnvProduction && shouldUseSourceMap
      }
  },
  ...
]
```

这里的 `px2rem({ remUnit: 112.5 })` 的意思就是1rem = 112.5px 这个是根据1125px设计稿来的。

### 4、flexible引入

在 `入口文件 index.js` 里引入 `lib-flexible`：

```js
import 'lib-flexible'
```

### 5、rem测试

在 `App.js` 中写个类名，创建 `App.css` ，并写入：

```jsx
// App.js
import React, { Component } from 'react'
import './App.css'

export default class App extends Component {
  render() {
    return (
      <div className="box">
        盒子
      </div>
    )
  }
}

// App.css
.box{
    width: 1125px;
    height: 186px;
    background: pink;
}
```

接下来打开浏览器：

![](https://tva1.sinaimg.cn/large/008i3skNgy1gpw15bihnuj32a10u0dv1.jpg)

可以看到，iphoneX的尺寸下，html的字体大小为37.5px，此时box的宽度为10rem，再来看看其他尺寸：

![image-20210425154110249](https://tva1.sinaimg.cn/large/008i3skNgy1gpw17uy4wij32la0u07h9.jpg)

当其他尺寸下时，可以发现html字体大小为41.1px，而此时box的宽度仍为10rem，这就代表我们rem配置成功了。

### 6、兼容ipad

但是，当你点开ipad时，会发现盒子兼容出了问题，这是因为淘宝弹性布局方案lib-flexible不兼容ipad和ipad pro。我们这里给出解决方案：

> 在public>index.html的head标签中添加：

```html
<script>
        /(iPhone|iPad|iPhone OS|Phone|iPod|iOS)/i.test(navigator.userAgent)&&(head=document.getElementsByTagName('head'),viewport=document.createElement('meta'),viewport.name='viewport',viewport.content='target-densitydpi=device-dpi, width=480px, user-scalable=no',head.length>0&&head[head.length-1].appendChild(viewport));
</script>
```

这样，我们就解决ipad的兼容问题了。

### 7、修改meta标签

```html
<meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
```

## 六、配置less

### 1、安装

```shell
$ yarn add less less-loader@5.0.0
# 或者
$ npm install less less-loader@5.0.0
```

### 2、解包

接下来要解包，如果上一步你已经解包过，就直接跳过。

如果未解包，请以上参考第五步。

### 3、配置loader

找到 `webpack.config.js` ，搜索 `sassRegex`：

```js
const lessModuleRegex = /\.less$/;
```

搜索 `sass-loader` 后，在其下方添加：

```js
module: {
  ...,
  // less加载器 
	{
    test: lessModuleRegex,
    use: getStyleLoaders(
        {
            //暂不配置
        },
        'less-loader'
    ),
	},
}
```

修改了配置文件，记得重新 `yarn start` 哦！

### 4、测试less

将 `App.css` 改为 `App.less` 进行测试，依然没问题。

### 5、文字三属性

在 `src` 下新建 `base.less` ：

```less
#app {
    font-size: 38px;
    font-family: NotoSansHans;
    color: #333333;
}
```

并在 `index.js` 中引入：

```js
import './base.less'
```

在 `App.js` 中定义 `id="app" `：

```jsx
import React, { Component } from 'react'
import './App.less'

export default class App extends Component {
  render() {
    return (
      <div id="app">
        页面内容
      </div>
    )
  }
}
```

这里注意，由于html和body标签已被强行设定了font-size，因此我们设定#app的font-size即可。 

## 七、登录判断

如果我们每个页面都需要在 `componentWillMount` 判断是否已经登录，那么太麻烦。React中有mixins，但已经被淘汰了。取而代之，我们使用高阶函数来操作。

在src下创建 `hoc>index.js` ：

```jsx
import {Component} from 'react'

export const ifLoginFn = (Comp) => {
    // 定义一个判断登录的高阶组件，在需要判断登录的页面套上这个组件
    return class extends Component {
        UNSAFE_componentWillMount(){
            let token = localStorage.getItem('token');
            if(!token){
                this.props.history.push("/login")
            }
        }
        render(){
            return <Comp />
        }
    }
}
```

在任何一个页面都可以如下调用（这里以Home页面举例）：

```jsx
import React, { Component } from 'react'
import "./Home.less"
import {ifLoginFn} from '../../components/hoc'

class Home extends Component {
    render() {
        return (
            <div>
                首页
            </div>
        )
    }
    
}

// 使用高阶函数
export default ifLoginFn(Home)
```

## 八、request封装

### 1、接口文档

IT猿题库【IT猿题库】 http://www.docway.net/project/1eRv5Lh2UW9/share/1evckeXPiQy 阅读密码:zhaowenxian

### 2、封装request

react的数据请求我们依然使用axios，我们先封装request：

```js
import axios from 'axios'

const instance = axios.create({
  baseURL: '/api',	// 通过使用配置的proxy来解决跨域
  timeout: 5000
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  let token = localStorage.getItem("x-auth-token");
  if (token) {
    config.headers = {
      "x-auth-token": token
    }
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});


export default instance;
```

##### Token过期：

如果后端判断到token过期，可以在响应拦截器到reject之前：

```js
import {HashRouter} from 'react-router-dom' // 借用HashRouter协助路由操作

if (error.response.status === 500 && error.response.data.errCode === 1002) {
  // 使用HashRouter
  const router = new HashRouter();
  // 如果是token过期，直接跳到登录页
  router.history.push('/login');
}
```

### 3、解决跨域

#### 方案一：

react简单解决跨域可以直接在 `package.json` 中添加 `proxy` 属性

#### 方案二：

如果你已经进行了 `npm run eject` ，建议你直接修改 `config>webpackDevServer.config.js` ：

```js
proxy: {
  '/api': {
    target: 'https://www.ahsj.link/rambo', // 后台服务地址以及端口号
    changeOrigin: true, //是否跨域
    pathRewrite: { '^/api': '/' }
  }
}
```

#### 方案三（推荐）：

安装 `http-proxy-middleware` ：

```shell
yarn add http-proxy-middleware
```

这里注意，http-proxy-middleware 模块是有版本区别的，默认安装最新版本，然后在 src 目录下新建 `setupProxy.js` ：

```js
const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "https://www.ahsj.link/rambo",
            changeOrigin: true,
            pathRewrite: {
                "/api": "",
            },
        })
    );
};
```

重新 `npm run start` 即可解决跨域。

### 4、api导出

我们做请求时的api需要导出：

```js
import request from './request'

// 首页默认数据
export const HomeDefaultApi = () => request.get('/6666');
```

### 5、请求

```js
componentDidMount(){
  // 获取token，判断是否有token，有则做请求
  let token = localStorage.getItem("x-auth-token");
  if(token){
    // 首页默认数据
    HomeDefaultApi().then(res=>{
      console.log(res)
    })
  }
}
```

## 九、路由配置

### 1、安装

安装 `react-router-dom`：

```shell
$ yarn add react-router-dom
```

### 2、路由配置

`src` 下创建 `router/index.js`：

```js
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import App from '../App'

export const BaseRoute = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" component={App}></Route>
            </Switch>
        </Router>
    )
}
```

`App.js` 中：

```js
import React, { Component } from 'react';
import './App.less'

class App extends Component {
  render() {
    return (
      <div id="app">
        App
      </div>
    );
  }
}

export default App;
```

而 `src/index.js` 下：

```js
import ReactDOM from 'react-dom';
import 'reset-css';
import './base.less'
import 'lib-flexible'
import {BaseRoute} from './router'

ReactDOM.render(
  BaseRoute(),
  document.getElementById('root')
);
```

可以看到：

![image-20210428115443204](https://tva1.sinaimg.cn/large/008i3skNgy1gpzbj65hv8j32is0cyqfo.jpg)

### 3、创建五个页面

src下创建 `views/Home.js+Fast.js+User.js+Login.js+Error.js`，分别代表：首页+快速刷题+我的+登录页+404页面，并在router下做配置：

```js
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import App from '../App'
import Home from '../views/Home'
import Fast from '../views/Fast'
import User from '../views/User'
import Login from '../views/Login'
import Error from '../views/Error'

export const BaseRoute = () => {
    return (
        <Router>
            <Route path="/" component={() =>
                <App>
                    <Switch>
                        <Route exact path="/home" component={Home}></Route>
                        <Route exact path="/fast" component={Fast}></Route>
                        <Route exact path="/user" component={User}></Route>
                        <Route exact path="/login" component={Login}></Route>
                        <Route exact path="/404" component={Error}></Route>
                        <Redirect exact from="/" to="/home"></Redirect>
                        {/* 配置跳转去404的页面 */}
                        <Redirect from="*" to="/404"></Redirect>
                    </Switch>
                </App>
            }></Route>
        </Router>
    )
}
```

修改 `App.js` ：

```jsx
import React, { Component } from 'react';
import './App.less'

class App extends Component {
  render() {
    return (
      <div id="app">
        {this.props.children}
      </div>
    );
  }
}

export default App;
```

如此，当我们在浏览器输入 `http://localhost:3000` 时，就会帮我们自动跳到 `http://localhost:3000/home` ，如果随意输入 `http://localhost:3000/aaa` ，就会自动重定向到 `http://localhost:3000/404` 。

## 十、Tabbar配置

这里参照 `material-ui` 的 `Bottom Navigation 底部导航栏` ：[https://material-ui.com/zh/components/bottom-navigation/](https://material-ui.com/zh/components/bottom-navigation/) 。

### 1、Tabbar引用

src下创建 `components/Tabbar.js` :

```jsx
import React from 'react';
import './less/Tabbar.less'
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeTab from './HomeTab'
import FastTab from './FastTab'
import UserTab from './UserTab'

export default function SimpleBottomNavigation() {
    const [value, setValue] = React.useState(0);

    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            showLabels
        >
            <BottomNavigationAction label="首页" icon={<HomeTab num={value} />} />
            <BottomNavigationAction label="快速刷题" icon={<FastTab />} />
            <BottomNavigationAction label="我的" icon={<UserTab num={value} />} />
        </BottomNavigation>
    );
}
```

`src/components/less/Tabbar.less`:

```less
.MuiBottomNavigation-root{
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    .MuiBottomNavigationAction-wrapper {
        .MuiBottomNavigationAction-label {
            font-size: 30px;
        }
        img{
            width: 64px;
        }
    }
    
    .MuiBottomNavigationAction-root.Mui-selected{
        .MuiBottomNavigationAction-label {
            font-size: 30px;
        }
    }
}
```

`src/components/HomeTab.js`、`src/components/FastTab.js` 及 `src/components/UserTab.js` :

```jsx
// HomeTab.js
import React, { Component } from 'react';
import home1 from '../images/tabbar/home_1.png'
import home2 from '../images/tabbar/home_2.png'

class HomeTab extends Component {
    render() {
        return (
            <img src={this.props.num===0 ? home1 : home2} width="61" alt="" />
        );
    }
}

export default HomeTab;

// FastTab.js
import React, { Component } from 'react';
import fast from '../images/tabbar/fast.png'

class FastTab extends Component {
    render() {
        return (
            <img src={fast} width="60" alt="" />
        );
    }
}

export default FastTab;

// UserTab.js
import React, { Component } from 'react';
import user1 from '../images/tabbar/my_1.png'
import user2 from '../images/tabbar/my_2.png'

class UserTab extends Component {
    render() {
        return (
            <img src={this.props.num===2 ? user1 : user2} width="64" alt="" />
        );
    }
}

export default UserTab;
```

### 2、函数式组件路由

在 `Tabbar.js` 中，使用hooks：

```jsx
import {useHistory} from 'react-router-dom'		// 路由中含有 useHistory

export default function SimpleBottomNavigation() {
  let history = useHistory();		//  使用history
  return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
                switch (newValue) {
                    case 0:
                        history.push('/home');
                        break;
                    case 1:
                        history.push('/fast');
                        break;
                    case 2:
                        history.push('/user');
                        break;
                    default:
                        break;
                }
            }}
            showLabels
        >
            <BottomNavigationAction label="首页" icon={<HomeTab num={value} />} />
            <BottomNavigationAction label="快速刷题" icon={<FastTab />} />
            <BottomNavigationAction label="我的" icon={<UserTab num={value} />} />
        </BottomNavigation>
    );
}
```

如此，就实现了路由切换。

### 3、Tabbar动态化

```jsx
import React, {useEffect} from 'react';

export default function SimpleBottomNavigation() {
  const [showNav, setShowNav] = React.useState(false);
  
  useEffect(()=>{
    // if可改写为switch，建议写为switch
    if(window.location.pathname==='/home' || window.location.pathname==='/fast' || window.location.pathname==='/user'){
      setShowNav(true)
    }else{
      setShowNav(false)
    }
  }, [window.location.pathname])
  
  return (
  	<BottomNavigation style={{display: showNav ? 'flex' : 'none'}}></BottomNavigation>
  )
}
```

### 4、最终Tabbar代码

```jsx
import React, { useEffect } from 'react';
import './less/Tabbar.less'
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeTab from './HomeTab'
import FastTab from './FastTab'
import UserTab from './UserTab'
import { useHistory } from 'react-router-dom'

export default function SimpleBottomNavigation() {
    const [value, setValue] = React.useState(0);
    const [showNav, setShowNav] = React.useState(false);
    let history = useHistory();

    useEffect(() => {
        switch (history.location.pathname) {
            case '/home':
                setShowNav(true);   // 根据url来决定是否显示tabbar
                setValue(0);    // 根据url来决定现在是哪个tabbar为当前项
                break;
            case '/fast':
                setShowNav(true);
                setValue(1);
                break;
            case '/user':
                setShowNav(true);
                setValue(2);
                break;
            default:
                setShowNav(false);
                break;
        }
        // eslint-disable-next-line
    }, [history.location.pathname])

    return (
        <BottomNavigation
            style={{ display: showNav ? 'flex' : 'none' }}
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
                switch (newValue) {
                    case 0:
                        history.push('/home');
                        break;
                    case 1:
                        history.push('/fast');
                        break;
                    case 2:
                        history.push('/user');
                        break;
                    default:
                        break;
                }
            }}
            showLabels
        >
            <BottomNavigationAction label="首页" icon={<HomeTab num={value} />} />
            <BottomNavigationAction label="快速刷题" icon={<FastTab />} />
            <BottomNavigationAction label="我的" icon={<UserTab num={value} />} />
        </BottomNavigation>
    );
}
```

