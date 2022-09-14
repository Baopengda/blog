---
title: Vue 面经篇
date: 2022-05-20
tags:
 - 面经
categories:
 - 面经
---
## （掌握）用Vue实现样式绑定，可以用class或者内联样式，最少写出2个？

```
<!-- 第一种绑定class -->
<div :class="['classA', 'classB']"></div>

<!-- 第二种绑定class -->
<div :class="{'classA': true, 'classB' : false}"></div>

<!-- 第一种绑定style -->
<div :style="{fontSize: '16px', color: 'red'}"></div>

<!-- 第二种绑定style -->
<div :style="[{fontSize: '16px', color: 'red'}]"></div>

```

## [#](http://kumanxuan1.f3322.net:8360/static/interview/vue/#%E6%8E%8C%E6%8F%A1-%E8%83%BD%E8%AF%B4%E4%B8%8B-vue-router-%E4%B8%AD%E5%B8%B8%E7%94%A8%E7%9A%84%E8%B7%AF%E7%94%B1%E6%A8%A1%E5%BC%8F%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86%E5%90%97)（掌握）能说下 vue-router 中常用的路由模式实现原理吗

**hash 模式**

1. location.hash 的值实际就是 URL 中#后面的东西 它的特点在于：hash 虽然出现 URL 中，但不会被包含在 HTTP 请求中，对后端完全没有影响，因此改变 hash 不会重新加载页面。
2. 可以为 hash 的改变添加监听事件

```
window.addEventListener("hashchange", funcRef, false);
复制代码

```

每一次改变 hash（window.location.hash），都会在浏览器的访问历史中增加一个记录利用 hash 的以上特点，就可以来实现前端路由“更新视图但不重新请求页面”的功能了

> 特点：兼容性好但是不美观

**history 模式**

利用了 HTML5 History Interface 中新增的 pushState() 和 replaceState() 方法。

这两个方法应用于浏览器的历史记录站，在当前已有的 back、forward、go 的基础之上，它们提供了对历史记录进行修改的功能。这两个方法有个共同的特点：当调用他们修改浏览器历史记录栈后，虽然当前 URL 改变了，但浏览器不会刷新页面，这就为单页应用前端路由“更新视图但不重新请求页面”提供了基础。

> 特点：虽然美观，但是刷新会出现 404 需要后端进行配置

## [#](http://kumanxuan1.f3322.net:8360/static/interview/vue/#%E6%8E%8C%E6%8F%A1-vue-router-%E6%9C%89%E5%87%A0%E7%A7%8D%E5%AF%BC%E8%88%AA%E9%92%A9%E5%AD%90)（掌握）vue-router 有几种导航钩子？

1、全局守卫： `router.beforeEach`

2、全局解析守卫： `router.beforeResolve`

3、全局后置钩子： `router.afterEach`

4、路由独享的守卫： `beforeEnter`

5、组件内的守卫： `beforeRouteEnter、beforeRouteUpdate (2.2 新增)、beforeRouteLeave`

## [#](http://kumanxuan1.f3322.net:8360/static/interview/vue/#%E6%8E%8C%E6%8F%A1-%E5%89%8D%E7%AB%AF%E8%B7%AF%E7%94%B1%E5%92%8C%E5%90%8E%E7%AB%AF%E8%B7%AF%E7%94%B1%E7%9A%84%E5%8C%BA%E5%88%AB)（掌握）前端路由和后端路由的区别

**什么是路由　**

路由是根据不同的 url 地址展示不同的内容或页面；

**前端路由**

很重要的一点是页面不刷新，前端路由就是把不同路由对应不同的内容或页面的任务交给前端来做，每跳转到不同的URL都是使用前端的锚点路由.

随着（SPA）单页应用的不断普及，前后端开发分离，目前项目基本都使用前端路由，在项目使用期间页面不会重新加载。

优点:

\1. 用户体验好，和后台网速没有关系，不需要每次都从服务器全部获取，快速展现给用户
  　 2. 可以再浏览器中输入指定想要访问的url路径地址 　 3. 实现了前后端的分离，方便开发。有很多框架都带有路由功能模块。

缺点:

\1. 使用浏览器的前进，后退键的时候会重新发送请求，没有合理地利用缓存
 　2. 单页面无法记住之前滚动的位置，无法在前进，后退的时候记住滚动的位置

**后端路由**

浏览器在地址栏中切换不同的url时，每次都向后台服务器发出请求，服务器响应请求，在后台拼接html文件传给前端显示, 返回不同的页面,

意味着浏览器会刷新页面，网速慢的话说不定屏幕全白再有新内容。后端路由的另外一个极大的问题就是 前后端不分离。

优点：

1. 分担了前端的压力，html和数据的拼接都是由服务器完成。

缺点：

1. 当项目十分庞大时，加大了服务器端的压力，同时在浏览器端不能输入制定的url路径进行指定模块的访问。另外一个就是如果当前网速过慢，那将会延迟页面的加载，对用户体验不是很友好。

## [#](http://kumanxuan1.f3322.net:8360/static/interview/vue/#%E6%8E%8C%E6%8F%A1-refs-%E5%92%8C-el%E7%9A%84%E7%94%A8%E6%B3%95)（掌握）$refs 和 $el的用法

ref 有三种用法：

1、ref 加在普通的元素上，用this.$refs（ref值） 获取到的是dom元素。

2、ref 加在子组件上，用 this.$refs 获取到的是组件实例，可以使用组件的所有方法。在使用方法的时候直接this.$refs.XX。

vm.$el：

获取Vue实例关联的DOM元素；

比方说我这里想获取自定义组件tabControl，并获取它的OffsetTop，就需要先获取该组件。

在组件内设置 属性 ref='一个名称(tabControl2)', 然后 this.$refs.tabControl2，就拿到了该组件

切记：ref属性，而获取组件的时候要用$refs

获取 OffsetTop，组件不是DOM元素，是没有OffsetTop的，无法通过.OffsetTop来获取的。就需要通过$el来获取组件中的DOM元素:

```
this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop

```

## [#](http://kumanxuan1.f3322.net:8360/static/interview/vue/#%E6%8E%8C%E6%8F%A1-vue%E5%B8%B8%E7%94%A8%E7%9A%84%E4%BF%AE%E9%A5%B0%E7%AC%A6)（掌握）vue常用的修饰符？

.prevent: 提交事件不再重载页面；

.stop: 阻止单击事件冒泡；

.self: 当事件发生在该元素本身而不是子元素的时候会触发；

.capture: 事件侦听，事件发生的时候会调用；

## [#](http://kumanxuan1.f3322.net:8360/static/interview/vue/#%E6%8E%8C%E6%8F%A1-vue%E4%B8%ADv-if%E4%B8%8Ev-show%E7%9A%84%E5%8C%BA%E5%88%AB%E4%BB%A5%E5%8F%8A%E4%BD%BF%E7%94%A8%E5%9C%BA%E6%99%AF)（掌握）vue中v-if与v-show的区别以及使用场景

**区别**

- 1.手段：v-if是通过控制dom节点的存在与否来控制元素的显隐；v-show是通过设置DOM元素的display样式，block为显示，none为隐藏；
- 2.编译过程：v-if切换有一个局部编译/卸载的过程，切换过程中合适地销毁和重建内部的事件监听和子组件；v-show只是简单的基于css切换；
- 3.编译条件：v-if是惰性的，如果初始条件为假，则什么也不做；只有在条件第一次变为真时才开始局部编译; v-show是在任何条件下（首次条件是否为真）都被编译，然后被缓存，而且DOM元素保留；
- 4.性能消耗：v-if有更高的切换消耗；v-show有更高的初始渲染消耗；

**使用场景**

基于以上区别，因此，如果需要非常频繁地切换，则使用 v-show 较好；如果在运行时条件很少改变，则使用 v-if 较好。

## [#](http://kumanxuan1.f3322.net:8360/static/interview/vue/#%E6%8E%8C%E6%8F%A1-v-if%E5%92%8Cv-for%E4%B8%BA%E4%BB%80%E4%B9%88%E9%81%BF%E5%85%8D%E4%B8%80%E8%B5%B7%E7%94%A8)（掌握）v-if和v-for为什么避免一起用

v-if和v-for一起使用，v-for的优先级要高于v-if，先循环再控制显示隐藏

- 为了过滤一个列表中的项目（比如`v-for = "user in users" v-if = "user.isActive"`）。在这种情况下，请将`users`替换为一个计算属性（比如`activeUsers`），让其返回过滤后的列表。
- 为了避免渲染本应该被隐藏的列表（比如`v-for = "user in users" v-if = "shouldShowUsers"`）。这种情况下，请将`v-if`移动至容器元素上（比如`ul`，`ol`）。

## [#](http://kumanxuan1.f3322.net:8360/static/interview/vue/#vuex-%E4%B8%BA%E4%BB%80%E4%B9%88%E8%A6%81%E5%88%86%E6%A8%A1%E5%9D%97%E5%B9%B6%E4%B8%94%E5%8A%A0%E5%91%BD%E5%90%8D%E7%A9%BA%E9%97%B4)Vuex 为什么要分模块并且加命名空间

**模块**:由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块。

**命名空间**：默认情况下，模块内部的 action、mutation 和 getter 是注册在全局命名空间的——这样使得多个模块能够对同一 mutation 或 action 作出响应。如果希望你的模块具有更高的封装度和复用性，你可以通过添加 namespaced: true 的方式使其成为带命名空间的模块。当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名。

## [#](http://kumanxuan1.f3322.net:8360/static/interview/vue/#%E4%BD%BF%E7%94%A8%E8%BF%87-vue-ssr-%E5%90%97-%E8%AF%B4%E8%AF%B4-ssr)使用过 Vue SSR 吗？说说 SSR

SSR 也就是服务端渲染，也就是将 Vue 在客户端把标签渲染成 HTML 的工作放在服务端完成，然后再把 html 直接返回给客户端。

**优点：**

SSR 有着更好的 SEO、并且首屏加载速度更快

**缺点：** 开发条件会受到限制，服务器端渲染只支持 beforeCreate 和 created 两个钩子，当我们需要一些外部扩展库时需要特殊处理，服务端渲染应用程序也需要处于 Node.js 的运行环境。

服务器会有更大的负载需求

## [#](http://kumanxuan1.f3322.net:8360/static/interview/vue/#vue-%E4%B8%AD%E4%BD%BF%E7%94%A8%E4%BA%86%E5%93%AA%E4%BA%9B%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F)vue 中使用了哪些设计模式

1.工厂模式 - 传入参数即可创建实例

虚拟 DOM 根据参数的不同返回基础标签的 Vnode 和组件 Vnode

2.单例模式 - 整个程序有且仅有一个实例

vuex 和 vue-router 的插件注册方法 install 判断如果系统存在实例就直接返回掉

3.发布-订阅模式 (vue 事件机制)

4.观察者模式 (响应式数据原理)

5.装饰模式: (@装饰器的用法)

6.策略模式 策略模式指对象有某个行为,但是在不同的场景中,该行为有不同的实现方案-比如选项的合并策略

## [#](http://kumanxuan1.f3322.net:8360/static/interview/vue/#%E4%BD%A0%E9%83%BD%E5%81%9A%E8%BF%87%E5%93%AA%E4%BA%9B-vue-%E7%9A%84%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96)你都做过哪些 Vue 的性能优化

- 对象层级不要过深，否则性能就会差
- 不需要响应式的数据不要放到 data 中（可以用 Object.freeze() 冻结数据）
- v-if 和 v-show 区分使用场景
- computed 和 watch 区分使用场景
- v-for 遍历必须加 key，key 最好是 id 值，且避免同时使用 v-if
- 大数据列表和表格性能优化-虚拟列表/虚拟表格
- 防止内部泄漏，组件销毁后把全局变量和事件销毁
- 图片懒加载
- 路由懒加载
- 第三方插件的按需引入
- 适当采用 keep-alive 缓存组件
- 防抖、节流运用
- 服务端渲染 SSR or 预渲染

## [#](http://kumanxuan1.f3322.net:8360/static/interview/vue/#vue-mixin-%E7%9A%84%E4%BD%BF%E7%94%A8%E5%9C%BA%E6%99%AF%E5%92%8C%E5%8E%9F%E7%90%86)Vue.mixin 的使用场景和原理

在日常的开发中，我们经常会遇到在不同的组件中经常会需要用到一些相同或者相似的代码，这些代码的功能相对独立，可以通过 Vue 的 mixin 功能抽离公共的业务逻辑，原理类似“对象的继承”，当组件初始化时会调用 mergeOptions 方法进行合并，采用策略模式针对不同的属性进行合并。当组件和混入对象含有同名选项时，这些选项将以恰当的方式进行“合并”。

## [#](http://kumanxuan1.f3322.net:8360/static/interview/vue/#keep-alive-%E4%BD%BF%E7%94%A8%E5%9C%BA%E6%99%AF%E5%92%8C%E5%8E%9F%E7%90%86)keep-alive 使用场景和原理

keep-alive 是 Vue 内置的一个组件，可以实现组件缓存，当组件切换时不会对当前组件进行卸载。

- 常用的两个属性 include/exclude，允许组件有条件的进行缓存。
- 两个生命周期 activated/deactivated，用来得知当前组件是否处于活跃状态。
- keep-alive 的中还运用了 LRU(最近最少使用) 算法，选择最近最久未使用的组件予以淘汰。

## [#](http://kumanxuan1.f3322.net:8360/static/interview/vue/#vue-set-%E6%96%B9%E6%B3%95%E5%8E%9F%E7%90%86)Vue.set 方法原理

了解 Vue 响应式原理的同学都知道在两种情况下修改数据 Vue 是不会触发视图更新的

1.在实例创建之后添加新的属性到实例上（给响应式对象新增属性）

2.直接更改数组下标来修改数组的值

Vue.set 或者说是$set 原理如下

因为响应式数据 我们给对象和数组本身都增加了__ob__属性，代表的是 Observer 实例。当给对象新增不存在的属性 首先会把新的属性进行响应式跟踪 然后会触发对象__ob__的 dep 收集到的 watcher 去更新，当修改数组索引时我们调用数组本身的 splice 方法去更新数组

## [#](http://kumanxuan1.f3322.net:8360/static/interview/vue/#vue-extend-%E4%BD%9C%E7%94%A8%E5%92%8C%E5%8E%9F%E7%90%86)Vue.extend 作用和原理

官方解释：Vue.extend 使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象。

其实就是一个子类构造器 是 Vue 组件的核心 api 实现思路就是使用原型继承的方法返回了 Vue 的子类 并且利用 mergeOptions 把传入组件的 options 和父类的 options 进行了合并

## [#](http://kumanxuan1.f3322.net:8360/static/interview/vue/#%E5%86%99%E8%BF%87%E8%87%AA%E5%AE%9A%E4%B9%89%E6%8C%87%E4%BB%A4%E5%90%97-%E5%8E%9F%E7%90%86%E6%98%AF%E4%BB%80%E4%B9%88)写过自定义指令吗 原理是什么

指令本质上是装饰器，是 vue 对 HTML 元素的扩展，给 HTML 元素增加自定义功能。vue 编译 DOM 时，会找到指令对象，执行指令的相关方法。

自定义指令有五个生命周期（也叫钩子函数），分别是 bind、inserted、update、componentUpdated、unbind

```
1. bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。

2. inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。

3. update：被绑定于元素所在的模板更新时调用，而无论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新。

4. componentUpdated：被绑定元素所在模板完成一次更新周期时调用。

5. unbind：只调用一次，指令与元素解绑时调用。

```

**原理**

1.在生成 ast 语法树时，遇到指令会给当前元素添加 directives 属性

2.通过 genDirectives 生成指令代码

3.在 patch 前将指令的钩子提取到 cbs 中,在 patch 过程中调用对应的钩子

4.当执行指令对应钩子函数时，调用对应指令定义的方法

## [#](http://kumanxuan1.f3322.net:8360/static/interview/vue/#vue-%E6%A8%A1%E6%9D%BF%E7%BC%96%E8%AF%91%E5%8E%9F%E7%90%86)Vue 模板编译原理

Vue 的编译过程就是将 template 转化为 render 函数的过程 分为以下三步

```
第一步是将 模板字符串 转换成 element ASTs（解析器）
第二步是对 AST 进行静态节点标记，主要用来做虚拟DOM的渲染优化（优化器）
第三步是 使用 element ASTs 生成 render 函数代码字符串（代码生成器）
复制代码

```

相关代码如下

```
export function compileToFunctions(template) {
  // 我们需要把html字符串变成render函数
  // 1.把html代码转成ast语法树  ast用来描述代码本身形成树结构 不仅可以描述html 也能描述css以及js语法
  // 很多库都运用到了ast 比如 webpack babel eslint等等
  let ast = parse(template);
  // 2.优化静态节点
  // 这个有兴趣的可以去看源码  不影响核心功能就不实现了
  //   if (options.optimize !== false) {
  //     optimize(ast, options);
  //   }

  // 3.通过ast 重新生成代码
  // 我们最后生成的代码需要和render函数一样
  // 类似_c('div',{id:"app"},_c('div',undefined,_v("hello"+_s(name)),_c('span',undefined,_v("world"))))
  // _c代表创建元素 _v代表创建文本 _s代表文Json.stringify--把对象解析成文本
  let code = generate(ast);
  //   使用with语法改变作用域为this  之后调用render函数可以使用call改变this 方便code里面的变量取值
  let renderFn = new Function(`with(this){return ${code}}`);
  return renderFn;
}

```

## [#](http://kumanxuan1.f3322.net:8360/static/interview/vue/#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E9%92%A9%E5%AD%90%E6%98%AF%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0%E7%9A%84)生命周期钩子是如何实现的

Vue 的生命周期钩子核心实现是利用发布订阅模式先把用户传入的的生命周期钩子订阅好（内部采用数组的方式存储）然后在创建组件实例的过程中会一次执行对应的钩子方法（发布）

## [#](http://kumanxuan1.f3322.net:8360/static/interview/vue/#%E6%8E%8C%E6%8F%A1-vue-router%E5%A6%82%E4%BD%95%E5%93%8D%E5%BA%94%E8%B7%AF%E7%94%B1%E5%8F%82%E6%95%B0%E7%9A%84%E5%8F%98%E5%8C%96)（掌握）vue-router如何响应路由参数的变化

**什么是路由参数的变化**

当使用路由参数时，例如从 `/user/foo` 导航到 `/user/bar`，原来的组件实例会被复用。因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。不过，这也意味着组件的生命周期钩子不会再被调用。

**监测路由参数变化的方法**

**方法一watch监听：**

```
watch: { // watch的第一种写法
    $route (to, from) {
        console.log(to)
        console.log(from)
    }
},
// =========================
watch: { // watch的第二种写法
    $route: {
        handler (to, from){
            console.log(to)
            console.log(from)
        },
        // 深度观察监听
        deep: true
    }
},
// =========================
watch: { // watch的第三种写法
    '$route':'getPath'
},
methods: {
    getPath(to, from){
	    console.log(this.$route.path);
    }
},

```

**方法二：导航守卫**

```
beforeRouteEnter (to, from, next) {
    next()
},

```

## [#](http://kumanxuan1.f3322.net:8360/static/interview/vue/#%E6%8E%8C%E6%8F%A1-vue%E4%B8%ADdata%E4%B8%AD%E5%8F%98%E9%87%8F%E7%9A%84%E6%95%B0%E6%8D%AE%E5%80%BC%E5%8F%91%E7%94%9F%E6%94%B9%E5%8F%98-%E7%95%8C%E9%9D%A2%E6%B2%A1%E6%9C%89%E8%B7%9F%E7%9D%80%E6%9B%B4%E6%96%B0-%E6%98%AF%E4%BB%80%E4%B9%88%E5%8E%9F%E5%9B%A0-vue%E6%95%B0%E6%8D%AE%E5%8F%8C%E5%90%91%E7%BB%91%E5%AE%9A%E5%A4%B1%E6%95%88)（掌握）Vue中data中变量的数据值发生改变，界面没有跟着更新，是什么原因（Vue数据双向绑定失效）

1.如果data里面定义了对象，对象里面的键值没有，getter/setter函数没法监听到属性值的数据变化，会导致此现象的发生。

解决方法：

```
Vue.set(obj, key, value);
// or
this.$set(obj, key, value);

```

## [#](http://kumanxuan1.f3322.net:8360/static/interview/vue/#%E6%8E%8C%E6%8F%A1-%E5%A4%9A%E5%B1%82%E7%88%B6%E5%AD%90%E7%BB%84%E4%BB%B6%E9%80%9A%E8%AE%AF)（掌握）多层父子组件通讯

有时候需要通讯的组件不是直接的父子组件，而是祖父和孙子，嵌套的层级比较多的情况下，需要传递的事件和属性比较多，会导致代码混乱，这个时候就需要用到Vue提供的更高阶方法：provide/inject

## [#](http://kumanxuan1.f3322.net:8360/static/interview/vue/#%E6%8E%8C%E6%8F%A1-%E7%88%B6%E5%AD%90%E7%BB%84%E4%BB%B6%E9%80%9A%E8%AE%AF%E6%96%B9%E5%BC%8F%E6%9C%89%E5%93%AA%E4%BA%9B)（掌握）父子组件通讯方式有哪些？

- 父组件 --> 子组件 ： 自定义属性 props
- 子组件 --> 父组件 ： 自定义事件 $emit
- EventBus
- Vuex
- v-model

**v-model的方式：**

我们都在表单中使用过 v-model 来绑定数据，其实组件之间也是可以用 v-model 进行双向绑定的

v-model 的本质就是绑定一个属性和事件

```
// 父组件
<aa class="abc" v-model="test" ></aa> 

// aa子组件实现一：
<template>
  <div>
    <ul>
      <li>{{'里面的值：'+ msg}}</li>
      <button @click="fn2">里面改变外面</button>
    </ul>
  </div>
</template>

<script>
  export default {
    model: {    // 使用model
      prop: 'msg', //prop属性将msg作为该组件被使用时（此处为aa组件被父组件调用）v-model能取到的值，
      event: 'cc' // event中的cc就是父组件上的自定义事件，用来更新父组件上的test值
    },
    props: {
      msg: ''
    },
    methods: {
      fn2 () {
        this.$emit('cc', this.msg+2)
      }
    }
  }
</script>

// aa子组件实现方法二：
<template>
 <div>
    <ul>
      <li>{{'里面的值：'+ value}}</li> // value会被赋值为v-model绑定的test的值。
      <button @click="fn2">里面改变外面</button>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      value: { // 必须要使用value
　　　　　default: '',
　　　　},
    },

    methods: {
      fn2 () {
        this.$emit('input', this.value+2) // 这儿必须用input 发送数据，发送的数据会被父级v-model=“test”接受到，再被value=test传回来。
      }
    }
  }

```

## [#](http://kumanxuan1.f3322.net:8360/static/interview/vue/#%E6%8E%8C%E6%8F%A1-%E7%AE%80%E8%BF%B0vue%E7%9A%84%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F)（掌握）简述Vue的生命周期

常用的有8个（生命周期不仅仅是8个），都是成对出现。分别是： beforeCreate阶段、created阶段； beforeMount阶段、mounted阶段； beforeUpdate阶段、updated阶段； beforeDestroy阶段、destroyed阶段； 分别为：创建前/后，载入前/后，更新前/后，销毁前/后。

## [#](http://kumanxuan1.f3322.net:8360/static/interview/vue/#%E6%8E%8C%E6%8F%A1-%E7%AC%AC%E4%B8%80%E6%AC%A1%E9%A1%B5%E9%9D%A2%E5%8A%A0%E8%BD%BD%E4%BC%9A%E8%A7%A6%E5%8F%91%E5%93%AA%E5%87%A0%E4%B8%AA%E9%92%A9%E5%AD%90)（掌握）第一次页面加载会触发哪几个钩子？

beforeCreate, created, beforeMount, mounted

## [#](http://kumanxuan1.f3322.net:8360/static/interview/vue/#%E6%8E%8C%E6%8F%A1-vue%E5%AE%9E%E7%8E%B0%E6%95%B0%E6%8D%AE%E5%8F%8C%E5%90%91%E7%BB%91%E5%AE%9A%E7%9A%84%E5%8E%9F%E7%90%86)（掌握）Vue实现数据双向绑定的原理

vue实现数据双向绑定主要是：采**用数据劫持结合发布者-订阅者模式**的方式，通过**Object.defineProperty（）**来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应监听回调。当把一个普通 Javascript 对象传给 Vue 实例来作为它的 data 选项时，Vue 将遍历它的属性，用 Object.defineProperty 将它们转为 getter/setter。用户看不到 getter/setter，但是在内部它们让 Vue 追踪依赖，在属性被访问和修改时通知变化。

vue的数据双向绑定 将MVVM作为数据绑定的入口，整合Observer，Compile和Watcher三者，通过Observer来监听自己的model的数据变化，通过Compile来解析编译模板指令（vue中是用来解析 {{}}），最终利用watcher搭起observer和Compile之间的通信桥梁，达到数据变化 —>视图更新；视图交互变化（input）—>数据model变更双向绑定效果。

## [#](http://kumanxuan1.f3322.net:8360/static/interview/vue/#%E6%8E%8C%E6%8F%A1-%E7%AE%80%E5%8D%95%E5%AE%9E%E7%8E%B0%E5%8F%8C%E5%90%91%E6%95%B0%E6%8D%AE%E7%BB%91%E5%AE%9A)（掌握）简单实现双向数据绑定

```
<body>
    <div id="app">
        <input type="text" id="txt">
        <p id="show"></p>
    </div>
</body>
<script type="text/javascript">
    var obj = {}
    Object.defineProperty(obj, 'txt', {
        get: function () {
            return obj
        },
        set: function (newValue) {
            document.getElementById('txt').value = newValue
            document.getElementById('show').innerHTML = newValue
        }
    })
    document.getElementById('txt').addEventListener('keyup', function (e) {
        obj.txt = e.target.value
    })
</script>

```

## [#](http://kumanxuan1.f3322.net:8360/static/interview/vue/#%E6%8E%8C%E6%8F%A1-vuex%E5%88%B7%E6%96%B0%E9%A1%B5%E9%9D%A2%E6%95%B0%E6%8D%AE%E4%B8%A2%E5%A4%B1%E6%80%8E%E4%B9%88%E8%A7%A3%E5%86%B3)（掌握）Vuex刷新页面数据丢失怎么解决？

**办法一：**将vuex中的数据直接保存到浏览器缓存中（sessionStorage、localStorage、cookie）

**办法二：**在页面刷新的时候再次请求远程数据，使之动态更新vuex数据

**办法三：**在父页面向后台请求远程数据，并且在页面刷新前将vuex的数据先保存至sessionStorage（以防请求数据量过大页面加载时拿不到返回的数据）

## [#](http://kumanxuan1.f3322.net:8360/static/interview/vue/#%E6%8E%8C%E6%8F%A1-%E7%AE%80%E5%8D%95%E8%AE%B2%E8%BF%B0vuex)（掌握）简单讲述vuex

vuex是专门为vue.js提供的一种状态管理模式，它采用的是集中式储存和管理所有组件的状态和数据，方便使用。

![img](http://kumanxuan1.f3322.net:8360/static/interview/02.png)

Vex有5种属性，分别是 state、getter、mutation、action、module：

**1、state**

Vuex 使用单一状态树,即每个应用将仅仅包含一个store 实例，但单一状态树和模块化并不冲突。存放的数据状态，不可以直接修改里面的数据。

**2、getters**

类似vue的计算属性，主要用来过滤一些数据。

**3、mutations**

mutations定义的方法动态修改Vuex 的 store 中的状态或数据。

**4、actions**

actions可以理解为通过将mutations里面处里数据的方法变成可异步的处理数据的方法，简单的说就是异步操作数据。view 层通过 store.dispath 来分发 action。

```
const store = new Vuex.Store({ //store实例
  state: {
    count: 0
  },
  mutations: {                
    increment (state) {
      state.count++
    }
  },
  actions: { 
    increment (context) {
      context.commit('increment')
    }
  }
})

```

**5、modules**

项目特别复杂的时候，可以让每一个模块拥有自己的state、mutation、action、getters,使得结构非常清晰，方便管理。

```
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}
            
const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
 }

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

```

## [#](http://kumanxuan1.f3322.net:8360/static/interview/vue/#%E6%8E%8C%E6%8F%A1-vue%E5%A6%82%E4%BD%95%E8%87%AA%E5%AE%9A%E4%B9%89%E4%B8%80%E4%B8%AA%E8%BF%87%E6%BB%A4%E5%99%A8)（掌握）Vue如何自定义一个过滤器

**1、局部过滤器**

Html：

```
<div id="app">
     <input type="text" v-model="msg" />
     {{msg| 过滤器名称 }}
</div>

```

JS：

```
var vm=new Vue({
    el:"#app",
    data:{
        msg:''
    },
    filters: {
      过滤器名称: function (value) {
        if (!value) return ''
        ...
        return value
      }
    }
})

```

**2、全局过滤器**

```
Vue.filter('过滤器名称', function (value) {
  if (!value) return ''
  ...
  return value
})

```

## [#](http://kumanxuan1.f3322.net:8360/static/interview/vue/#%E6%8E%8C%E6%8F%A1-%E5%AF%B9keep-alive-%E7%9A%84%E4%BA%86%E8%A7%A3)（掌握）对keep-alive 的了解？

`keep-alive` 包裹动态组件时，会缓存不活动的组件实例,主要用于保留组件状态或避免重新渲染。

使用方法：

```
<keep-alive>
  <component>
    <!-- 该组件将被缓存！ -->
  </component>
</keep-alive>

```

## [#](http://kumanxuan1.f3322.net:8360/static/interview/vue/#%E6%8E%8C%E6%8F%A1-vue-%E7%BB%84%E4%BB%B6-data-%E4%B8%BA%E4%BB%80%E4%B9%88%E5%BF%85%E9%A1%BB%E6%98%AF%E5%87%BD%E6%95%B0)（掌握）Vue 组件 data 为什么必须是函数

data是一个函数的话，这样每复用一次组件，就会返回一份新的`data`，类似于给每个组件实例创建一个私有的数据空间，让各个组件实例维护各自的数据。而单纯的写成对象形式，就使得所有组件实例共用了一份`data`，就会造成一个变了全都会变的结果。

## [#](http://kumanxuan1.f3322.net:8360/static/interview/vue/#%E6%8E%8C%E6%8F%A1-vue-%E4%B8%AD%E6%80%8E%E4%B9%88%E8%87%AA%E5%AE%9A%E4%B9%89%E6%8C%87%E4%BB%A4)（掌握）Vue 中怎么自定义指令

**1、全局注册**

```
// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})

```

**2、局部注册**

```
directives: {
  focus: {
    // 指令的定义
    inserted: function (el) {
      el.focus()
    }
  }
}


```

## [#](http://kumanxuan1.f3322.net:8360/static/interview/vue/#%E6%8E%8C%E6%8F%A1-nexttick-%E6%98%AF%E5%81%9A%E4%BB%80%E4%B9%88%E7%9A%84)（掌握）nextTick 是做什么的

`$nextTick` 是在下次 `DOM` 更新循环结束之后执行延迟回调，在修改数据之后使用 `$nextTick`，则可以在回调中获取更新后的DOM。

## [#](http://kumanxuan1.f3322.net:8360/static/interview/vue/#%E6%8E%8C%E6%8F%A1-route-%E5%92%8C-router-%E7%9A%84%E5%8C%BA%E5%88%AB)（掌握）`$route` 和 `$router` 的区别

`$router` 为 `VueRouter` 实例，想要导航到不同 `URL`，则使用 `$router.push` 方法

`$route` 为当前 `router` 跳转对象里面可以获取 `name` 、 `path` 、 `query` 、 `params` 等

## [#](http://kumanxuan1.f3322.net:8360/static/interview/vue/#%E6%8E%8C%E6%8F%A1-vue-cli%E7%94%9F%E6%88%90%E7%9A%84%E9%A1%B9%E7%9B%AE%E6%96%87%E4%BB%B6%E5%A4%B9assets%E5%92%8Cpublic-static-%E7%9A%84%E5%8C%BA%E5%88%AB)（掌握）vue-cli生成的项目文件夹assets和public(static) 的区别

vue-cli2生成的项目目录是static

vue-cli3以上生成的项目目录是public

- 相同点：

assets和public(static) 都是存放静态资源的文件。项目所需要的静态文件、图片、样式文件都可以放在这两个文件夹下

- 不同点：

在assets中存放的静态资源，在项目打包时会将这些静态资源与代码、index.html文件一起一同进行打包压缩，上传到服务器

在public(static)中存放的静态资源，不会被打包压缩格式化等流程，而是直接进入打包好的目录，直接上传到服务器

## [#](http://kumanxuan1.f3322.net:8360/static/interview/vue/#%E6%8E%8C%E6%8F%A1-dom%E6%B8%B2%E6%9F%93%E5%9C%A8%E5%93%AA%E4%B8%AA%E5%91%A8%E6%9C%9F%E4%B8%AD%E5%B0%B1%E5%B7%B2%E7%BB%8F%E5%AE%8C%E6%88%90)（掌握）DOM渲染在哪个周期中就已经完成

DOM 渲染在 mounted 中就已经完成了。

## [#](http://kumanxuan1.f3322.net:8360/static/interview/vue/#%E6%8E%8C%E6%8F%A1-virtual-dom-%E8%99%9A%E6%8B%9Fdom-%E6%98%AF%E4%BB%80%E4%B9%88)（掌握）Virtual DOM（虚拟DOM）是什么？

Virtual DOM 其实就是一棵以 JavaScript 对象( VNode 节点)作为基础的树，用对象属性来描述节点，实际上它只是一层对真实 DOM 的抽象。最终可以通过一系列操作使这棵树映射到真实的DOM上

下面就是一个真实DOM映射到**虚拟DOM**的例子：

```
<ul id='list'>
	<li class='item'>Item 1</li>
  <li class='item'>Item 2</li>
  <li class='item'>Item 3</li>
</ul>

```

虚拟DOM:

```
    var element = {
        tagName: 'ul', // 节点标签名
        props: { // DOM的属性，用一个对象存储键值对
            id: 'list'
        },
        children: [ // 该节点的子节点
          {tagName: 'li', props: {class: 'item'}, children: ["Item 1"]},
          {tagName: 'li', props: {class: 'item'}, children: ["Item 2"]},
          {tagName: 'li', props: {class: 'item'}, children: ["Item 3"]},
        ]
    }

```

## [#](http://kumanxuan1.f3322.net:8360/static/interview/vue/#%E6%8E%8C%E6%8F%A1-%E4%B8%BA%E4%BD%95%E9%9C%80%E8%A6%81virtual-dom)（掌握）为何需要Virtual DOM？

**具备跨平台的优势** 由于 Virtual DOM 是以 JavaScript 对象为基础而不依赖真实平台环境，所以使它具有了跨平台的能力，比如说浏览器平台、Weex、Node 等。

**操作原生DOM慢，js运行效率高。**我们可以将DOM对比操作放在JS层，提高效率。 因为DOM操作的执行速度远不如Javascript的运算速度快，因此，把大量的DOM操作搬运到Javascript中，运用patching算法来计算出真正需要更新的节点，最大限度地减少DOM操作，从而显著提高性能。

**Virtual DOM 本质上就是在 JS 和 DOM 之间做了一个缓存。**可以类比 CPU 和硬盘，既然硬盘这么慢，我们就在它们之间加个缓存：既然 DOM 这么慢，我们就在它们 JS 和 DOM 之间加个缓存。CPU（JS）只操作内存（Virtual DOM），最后的时候再把变更写入硬盘（DOM）

**提升渲染性能** Virtual DOM的优势不在于单次的操作，而是在大量、频繁的数据更新下，能够对视图进行合理、高效的更新。

## [#](http://kumanxuan1.f3322.net:8360/static/interview/vue/#%E6%8E%8C%E6%8F%A1-virtual-dom%E7%9A%84diff%E7%AE%97%E6%B3%95)（掌握）Virtual DOM的diff算法

Virtual DOM因为是纯粹的JS对象，所以操作它会很高效，但是Virtual DOM的变更最终会转换成DOM操作，为了实现高效的DOM操作，一套高效的**虚拟DOM** **diff算法**显得很有必要。

**diff算法**包括一下几个步骤:

- 用 JavaScript 对象结构表示 DOM 树的结构；然后用这个树构建一个真正的 DOM 树，插到文

档当中

- 当状态变更的时候，重新构造一棵新的对象树。然后用新的树和旧的树进行比较(diff)，记录两棵树差异
- 把2所记录的差异应用到步骤1所构建的真正的DOM树上(patch)，视图就更新了

**diff算法**是通过**同层的树节点**进行比较而非对树进行逐层搜索遍历的方式，所以时间复杂度只有O(n)，是一种相当高效的算法。

![img](http://kumanxuan1.f3322.net:8360/static/interview/vdom1.jpeg)

## [#](http://kumanxuan1.f3322.net:8360/static/interview/vue/#%E6%8E%8C%E6%8F%A1-%E5%A6%82%E4%BD%95%E8%AE%A9css%E5%8F%AA%E5%9C%A8%E5%BD%93%E5%89%8D%E7%BB%84%E4%BB%B6%E4%B8%AD%E8%B5%B7%E4%BD%9C%E7%94%A8)（掌握）如何让CSS只在当前组件中起作用?

将当前组件的`<style>` 修改为 `<style scoped>`

## [#](http://kumanxuan1.f3322.net:8360/static/interview/vue/#%E6%8E%8C%E6%8F%A1-%E4%BF%AE%E6%94%B9%E7%AC%AC%E4%B8%89%E6%96%B9%E5%BA%93%E7%9A%84%E6%A0%B7%E5%BC%8F)（掌握） 修改第三方库的样式

`/deep/` `>>>`

## [#](http://kumanxuan1.f3322.net:8360/static/interview/vue/#%E6%8E%8C%E6%8F%A1-%E9%82%A3%E4%BD%A0%E8%83%BD%E8%AE%B2%E4%B8%80%E8%AE%B2mvvm%E5%90%97)（掌握）那你能讲一讲MVVM吗？

MVVM是`Model-View-ViewModel`缩写，也就是把`MVC`中的`Controller`演变成`ViewModel`。Model层代表数据模型，View代表UI组件，ViewModel是View和Model层的桥梁，数据会绑定到viewModel层并自动将数据渲染到页面中，视图变化的时候会通知viewModel层更新数据。

## [#](http://kumanxuan1.f3322.net:8360/static/interview/vue/#%E6%8E%8C%E6%8F%A1-%E5%8D%95%E5%90%91%E6%95%B0%E6%8D%AE%E6%B5%81%E5%92%8C%E5%8F%8C%E5%90%91%E6%95%B0%E6%8D%AE%E6%B5%81)（掌握）单向数据流和双向数据流

单向数据流（Unidirectional data flow）方式使用一个上传数据流和一个下传数据流进行单向数据通信，两个数据流之间相互独立。单向数据流指只能从一个方向来修改状态。vuex（组件data -> action -> state->组件data）

与单向数据流对对应的是双向数据流（也叫双向绑定）。在双向数据流中，Model（可以理解为状态的集合） 中可以修改自己或其他Model的状态， 用户的操作（如在输入框中输入内容）也可以修改状态。这使改变一个状态有可能会触发一连串的状态的变化，最后很难预测最终的状态是什么样的。使得代码变得很难调试。

## [#](http://kumanxuan1.f3322.net:8360/static/interview/vue/#%E6%8E%8C%E6%8F%A1-%E8%AF%B4%E4%B8%80%E4%B8%8Bmvc%E7%9A%84%E7%90%86%E8%A7%A3)（掌握）说一下MVC的理解？

```
mvc是模型(model)－视图(view)－控制器(controller)`的缩写，一种软件设计典范使用MVC的目的是将M和V的实现代码分离，从而使同一个程序可以使用不同的表现形式。`MVC对应Html，CSS，js。

```

## [#](http://kumanxuan1.f3322.net:8360/static/interview/vue/#%E6%8E%8C%E6%8F%A1-%E9%82%A3%E4%BD%A0%E7%9F%A5%E9%81%93vue3-x%E5%93%8D%E5%BA%94%E5%BC%8F%E6%95%B0%E6%8D%AE%E5%8E%9F%E7%90%86%E5%90%97)（掌握）那你知道Vue3.x响应式数据原理吗？

Vue3.x改用`Proxy`替代Object.defineProperty。因为Proxy可以直接监听对象和数组的变化，并且有多达13种拦截方法。并且作为新标准将受到浏览器厂商重点持续的性能优化

**Proxy只会代理对象的第一层，那么Vue3又是怎样处理这个问题的呢？（拓展）**

判断当前Reflect.get的返回值是否为Object，如果是则再通过`reactive`方法做代理， 这样就实现了深度观测。

**监测数组的时候可能触发多次get/set，那么如何防止触发多次呢？（拓展）**

我们可以判断key是否为当前被代理对象target自身属性，也可以判断旧值与新值是否相等，只有满足以上两个条件之一时，才有可能执行trigger。

## [#](http://kumanxuan1.f3322.net:8360/static/interview/vue/#%E6%8E%8C%E6%8F%A1-%E5%86%8D%E8%AF%B4%E4%B8%80%E4%B8%8Bvue2-x%E4%B8%AD%E5%A6%82%E4%BD%95%E7%9B%91%E6%B5%8B%E6%95%B0%E7%BB%84%E5%8F%98%E5%8C%96)（掌握）再说一下vue2.x中如何监测数组变化

使用了函数劫持的方式，重写了数组的方法，Vue将data中的数组进行了原型链重写（push,pop,shift,unshift,splice...），指向了自己定义的数组原型方法。这样当调用数组api时，可以通知依赖更新。如果数组中包含着引用类型，会对数组中的引用类型再次递归遍历进行监控。这样就实现了监测数组变化。

## [#](http://kumanxuan1.f3322.net:8360/static/interview/vue/#%E6%8E%8C%E6%8F%A1-computed%E5%92%8Cwatch)**（掌握）Computed和Watch**

`Computed`本质是一个具备缓存的watcher，依赖的属性发生变化就会更新视图。 适用于计算比较消耗性能的计算场景。当表达式过于复杂时，在模板中放入过多逻辑会让模板难以维护，可以将复杂的逻辑放入计算属性中处理。

`Watch`没有缓存性，更多的是观察的作用，可以监听某些数据执行回调。当我们需要深度监听对象中的属性时，可以打开`deep：true`选项，这样便会对对象中的每一项进行监听。这样会带来性能问题，优化的话可以使用`字符串形式`监听。

## [#](http://kumanxuan1.f3322.net:8360/static/interview/vue/#%E6%8E%8C%E6%8F%A1-%E5%86%8D%E8%AF%B4%E4%B8%80%E4%B8%8B%E8%99%9A%E6%8B%9Fdom%E4%BB%A5%E5%8F%8Akey%E5%B1%9E%E6%80%A7%E7%9A%84%E4%BD%9C%E7%94%A8)（掌握）再说一下虚拟Dom以及key属性的作用

由于在浏览器中操作DOM是很昂贵的。频繁的操作DOM，会产生一定的性能问题。这就是虚拟Dom的`产生原因`。

Vue2的Virtual DOM借鉴了开源库`snabbdom`的实现。

`Virtual DOM本质就是用一个原生的JS对象去描述一个DOM节点。是对真实DOM的一层抽象。`(也就是源码中的VNode类，它定义在src/core/vdom/vnode.js中。)

VirtualDOM映射到真实DOM要经历VNode的create、diff、patch等阶段。

**「key的作用是尽可能的复用 DOM 元素。」**

新旧 children 中的节点只有顺序是不同的时候，最佳的操作应该是通过移动元素的位置来达到更新的目的。

需要在新旧 children 的节点中保存映射关系，以便能够在旧 children 的节点中找到可复用的节点。key也就是children中节点的唯一标识。

## [#](http://kumanxuan1.f3322.net:8360/static/interview/vue/#%E6%8E%8C%E6%8F%A1-vue%E4%B8%AD%E7%BB%84%E4%BB%B6%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E8%B0%83%E7%94%A8%E9%A1%BA%E5%BA%8F%E8%AF%B4%E4%B8%80%E4%B8%8B)（掌握）Vue中组件生命周期调用顺序说一下

组件的调用顺序都是`先父后子`,渲染完成的顺序是`先子后父`。

组件的销毁操作是`先父后子`，销毁完成的顺序是`先子后父`。

**加载渲染过程**

```
父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount- >子mounted->父mounted


```

**子组件更新过程**

```
父beforeUpdate->子beforeUpdate->子updated->父updated


```

**父组件更新过程**

```
父 beforeUpdate -> 父 updated


```

**销毁过程**

```
父beforeDestroy->子beforeDestroy->子destroyed->父destroyed


```

## [#](http://kumanxuan1.f3322.net:8360/static/interview/vue/#%E6%8E%8C%E6%8F%A1-%E7%BB%84%E4%BB%B6%E8%AE%BE%E8%AE%A1%E5%BA%94%E9%81%B5%E5%BE%AA%E4%BB%80%E4%B9%88%E5%8E%9F%E5%88%99)（掌握）组件设计应遵循什么原则

**就近管理**

- 单文件开发
- 依赖的静态资源放在统计目录
- 相关联组件也放在同级目录

**高复用性**

- 页面级别的复用（基础组件）
- 项目级别的复用-私有组件库（业务组件）
- 公司级别的复用-开源组件库（element-ui）

**分层设计**

- 分层架构分为四个层：展示层(presentation layer)，业务层(business layer)，持久层(persistence layer)和数据库层(database layer)。

**灵活扩展**

- 组件要充分的考虑扩展性，除了提供丰富的props还要提供slot插槽来完成用户的定制化需求。或者提供可利用render函数动态渲染的功能。

## [#](http://kumanxuan1.f3322.net:8360/static/interview/vue/#%E4%BA%86%E8%A7%A3-ssr%E4%BA%86%E8%A7%A3%E5%90%97)（了解）SSR了解吗？

SSR也就是服务端渲染，`也就是将Vue在客户端把标签渲染成HTML的工作放在服务端完成，然后再把html直接返回给客户端`。

SSR有着更好的SEO、并且首屏加载速度更快等优点。不过它也有一些缺点，比如我们的开发条件会受到限制，服务器端渲染只支持`beforeCreate`和`created`两个钩子，当我们需要一些外部扩展库时需要特殊处理，服务端渲染应用程序也需要处于Node.js的运行环境。还有就是服务器会有更大的负载需求。

## [#](http://kumanxuan1.f3322.net:8360/static/interview/vue/#%E4%BA%86%E8%A7%A3-%E5%9C%A8vuejs%E4%B8%AD%E5%AE%9E%E7%8E%B0%E9%98%B2%E6%AD%A2%E6%A8%A1%E6%9D%BF%E6%B8%B2%E6%9F%93%E6%97%B6%E9%97%AA%E7%83%81%E7%9A%84%E6%96%B9%E6%B3%95)（了解）在vuejs中实现防止模板渲染时闪烁的方法

```
[v-cloak] {
display: none;
} 
<div v-cloak>
{{ message }}
</div> 

```

## [#](http://kumanxuan1.f3322.net:8360/static/interview/vue/#%E4%BA%86%E8%A7%A3-%E4%BD%A0%E5%AF%B9vue-js%E7%9A%84template%E7%BC%96%E8%AF%91%E7%9A%84%E7%90%86%E8%A7%A3)（了解）你对Vue.js的template编译的理解？

简而言之，就是先转化成AST树，再得到的render函数返回VNode（Vue的虚拟DOM节点）。

**详情步骤：**

首先，通过compile编译器把template编译成AST语法树（abstract syntax tree 抽象语法树 即 源代码的抽象语法结构的树状表现形式），compile是createCompiler的返回值，createCompiler是用以创建编译器的。另外compile还负责合并option。

然后，AST会经过generate（将AST语法树转化成render funtion字符串的过程）得到render函数，render的返回值是VNode，VNode是Vue的虚拟DOM节点，里面有（标签名、子节点、文本等等）

## [#](http://kumanxuan1.f3322.net:8360/static/interview/vue/#%E4%BA%86%E8%A7%A3-%E8%B0%88%E8%B0%88vue-extend%E5%92%8Cvue-component)（了解）谈谈Vue.extend和Vue.component

`Vue.extend`返回的是一个**扩展实例构造器**，也就是预设了部分选项的Vue实例构造器。其主要用来服务于`Vue.component`。

```
Vue.component()`会注册一个全局的组件，其会自动判断第二个传进来的是Vue继续对象（`Vue.extend`）还是普通对象(`{...}`)，如果传进来的是普能对象的话会自动调用`Vue.extend

```

## [#](http://kumanxuan1.f3322.net:8360/static/interview/vue/#%E4%BA%86%E8%A7%A3-%E4%BB%80%E4%B9%88%E6%98%AFvue%E7%9A%84%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7)（了解）什么是vue的计算属性？

在模板中放入太多的逻辑会让模板过重且难以维护，在需要对数据进行复杂处理，且可能多次使用的情况下，尽量采取计算属性的方式。好处：

① 使得数据处理结构清晰；

② 依赖于数据，数据更新，处理结果自动更新；

③ 计算属性内部this指向vm实例；

④ 在template调用时，直接写计算属性名即可；

⑤ 常用的是getter方法，获取数据，也可以使用set方法改变数据；

⑥ 相较于methods，不管依赖的数据变不变，methods都会重新计算，但是依赖数据不变的时候computed从缓存中获取，不会重新计算。

## vue2/vue3的区别

1. **Vue 3 的 Template 支持多个根标签，Vue 2 不支持**

2. **Vue 3 有 createApp()，而 Vue 2 的是 new Vue()** createApp(组件)，new Vue({template, render})

3. **context.emit**

   新增context.emit，与this.$emit（vue3中只能在methods里使用）作用相同

4. **Vue3中的属性绑定**

   > 默认所有属性都绑定到根元素 使用`inheritAttrs: false可以取消默认绑定` 使用attrs或者context.attrs获取所有属性 使用v-bind="$attrs"批量绑定属性 使用 const {size, level, ...rest} = context.attrs 将属性分开

   **使用场景** 在vue2中我们在父组件绑定click事件，子组件必须内部触发click，而**vue3中在父组件绑定子组件的根元素上也会跟着绑定**

## [#](http://kumanxuan1.f3322.net:8360/static/interview/vue3/#vue3%E4%B8%BA%E4%BB%80%E4%B9%88%E8%A6%81%E4%BD%BF%E7%94%A8%E7%BB%84%E5%90%88%E5%BC%8Fapi)vue3为什么要使用组合式API

通过组合式 API 解决了两个问题。

1. 我们让组件拥有了更加良好的代码组织结构
2. 我们让相同的代码逻辑在不同的组件中进行了完整的复用

## [#](http://kumanxuan1.f3322.net:8360/static/interview/vue3/#vue3%E8%B7%A8%E7%BB%84%E4%BB%B6%E4%BC%A0%E5%80%BC)vue3跨组件传值

props + emit

vuex

provide 和 inject 的注入方法

## [#](http://kumanxuan1.f3322.net:8360/static/interview/vue3/#vue%E7%BB%84%E5%90%88%E5%BC%8Fapi%E6%9C%89%E5%93%AA%E4%BA%9B)vue组合式API有哪些

ref() reactive() watch() 生命周期() computed watch()

## [#](http://kumanxuan1.f3322.net:8360/static/interview/vue3/#watcheffect%E7%94%A8%E6%9D%A5%E4%BB%A3%E6%9B%BF%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E9%87%8C%E7%9A%84onmounted%E5%92%8Conupdated)**watchEffect用来代替生命周期里的onMounted和onUpdated**

初始化页面的时候watchEffect里的代码会执行，当watchEffect里的数据有更新的时候同样会执行

```
const count = ref(0)

watchEffect(() => console.log(count.value))
// -> logs 0

setTimeout(() => {
  count.value++
  // -> logs 1
}, 100)

```

**注意watchEffect第一次运行是在组件挂载之前，如果需要访问DOM需要将我们的watchEffect放在onMounted里**

```
onMounted(() => {
  watchEffect(() => console.log(count.value))
})

```

## [#](http://kumanxuan1.f3322.net:8360/static/interview/vue3/#vite%E5%92%8Cwebpack%E7%9A%84%E5%8C%BA%E5%88%AB)vite和webpack的区别:

vite是按需加载,他的优势在开发环境,启动是不打包,即不需要分析模块依赖,也不需要编译,启动速度就快,动态编译模块缩短了编译的时间

webpack是全部加载,在启动开发服务器时会先打包再启动开发服务器

## [#](http://kumanxuan1.f3322.net:8360/static/interview/vue3/#vite%E5%88%9B%E5%BB%BAvue%E9%A1%B9%E7%9B%AE%E5%92%8Cvue-cli%E5%88%9B%E5%BB%BA%E9%A1%B9%E7%9B%AE%E7%9A%84%E5%8C%BA%E5%88%AB)vite创建vue项目和vue-cli创建项目的区别:

vite是web开发构建工具

vue-cli是官方的vue.js项目脚手架