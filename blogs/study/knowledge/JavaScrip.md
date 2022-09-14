---
title: JavaScrip 面经篇
date: 2022-05-20
tags:
 - 面经
categories:
 - 面经
---

## （掌握）什么是“use strict”,好处和坏处

use ‘strict’： "严格模式"是一种在JavaScript代码运行时自动实行更严格解析和错误处理的方法。

优点：

1. 消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为;
2. 消除代码运行的一些不安全之处，保证代码运行的安全；
3. 提高编译器效率，增加运行速度；
4. 为未来新版本的Javascript做好铺垫。

缺点：

现在网站的 JS 都会进行压缩，一些文件用了严格模式，而另一些没有。这时这些本来是严格模式的文件，被 merge 后，这个字符串("use strict")就到了文件的中间，不仅没有指示严格模式，反而在压缩后浪费了字节。

## [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E6%8E%8C%E6%8F%A1-console-log-0-1-0-2)（掌握）console.log(0.1 + 0.2)

0.1+0.2的结果不是0.3，而是0.3000000000000000004，JS中两个数字相加时是以二进制形式进行的，当十进制小数的二进制表示的有限数字超过52位时，在JS里是不能精确储存的，这个时候就存在舍入误差。

## [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E6%8E%8C%E6%8F%A1-%E6%95%B0%E7%BB%84pop-push-unshift-shift-%E7%9A%84%E5%8C%BA%E5%88%AB)（掌握）数组pop(), push(), unshift(), shift()的区别

- `push()`方法可以在数组的末属添加一个或多个元素
- `shift()`方法把数组中的第一个元素删除
- `unshift()`方法可以在数组的前端添加一个或多个元素
- `pop()`方法把数组中的最后一个元素删除

## [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E6%8E%8C%E6%8F%A1-%E5%92%8C)（掌握）==和===

1. ==：只是比较值
2. ===：既要比较数据类型还要比较值

## [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E6%8E%8C%E6%8F%A1-%E4%BA%8B%E4%BB%B6%E5%86%92%E6%B3%A1%E5%92%8C%E4%BA%8B%E4%BB%B6%E6%8D%95%E8%8E%B7%E5%88%B0%E5%BA%95%E6%9C%89%E4%BD%95%E5%8C%BA%E5%88%AB)（掌握）事件冒泡和事件捕获到底有何区别？

1. 事件冒泡：从下至上。当给父子元素的同一事件绑定方法的时候，触发子元素身上的事件，执行完毕之后，也会触发父级元素相同的事件。

**注意： addEventListener中有三个属性，第三个属性是布尔值。false为事件冒泡，true为事件捕获**

1. 事件捕获：从上至下到指定元素。当触发子元素身上的事件时，先触发父元素，然后在传递给子元素

## [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E6%8E%8C%E6%8F%A1-js%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B)（掌握）JS数据类型

在ES5的时候，我们认知的数据类型确实是 6种：**Number、String、Boolean、undefined、object、Null。**

ES6 中新增了一种 **Symbol** 。这种类型的对象永不相等，即始创建的时候传入相同的值，可以解决属性名冲突的问题，做为标记。

## [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E6%8E%8C%E6%8F%A1-%E4%BB%80%E4%B9%88%E6%98%AFtypescript)（掌握）什么是typescript

> - 1.它是JavaScript的一个超集，而且本质上向这个语言添加了可选的静态类型和基于类的面向对象编程。
> - 2.`TypeScript`扩展了JavaScript的语法，所以任何现有的JavaScript程序可以不加改变的在TypeScript下工作。`TypeScript`是为大型应用之开发而设计，而编译时它产生 JavaScript 以确保兼容性。

## [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E6%8E%8C%E6%8F%A1-%E4%BB%80%E4%B9%88%E6%98%AF%E6%A8%A1%E5%9D%97%E5%8C%96%E7%BC%96%E7%A8%8B)（掌握）什么是模块化编程？

每个模块内部，`module`变量代表当前模块。

这个变量是一个对象，它的`exports`属性（即`module.exports`）是对外的接口。加载某个模块，其实是加载该模块的`module.exports`属性。

## [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E6%8E%8C%E6%8F%A1-%E7%AE%80%E8%BF%B0javascript%E5%8E%9F%E5%9E%8B%E3%80%81%E5%8E%9F%E5%9E%8B%E9%93%BE-%E6%9C%89%E4%BB%80%E4%B9%88%E7%89%B9%E7%82%B9)（掌握）简述javascript原型、原型链？有什么特点

原型：每一个构造函数都有一个prototype属性指向一个对象，这个对象就是构造函数实例的原型

原型链：每一个实例都有一个__proto__属性执行原型对象，来获取原型对象上的属性和方法,原型对象也有一个__proto

属性指向另外一个原型对象,以此类推,直到原型链的最终端null为止，这个串成链的过程就是原型链

特点：实现继承 一个对象可以拿到另一个对象上的属性和方法

构造函数都有一个prototype属性指向原型对象

原型对象都有一个consttuctor属性指向构造函数

构造函数new实例化实例对象

实例对象上有__proto属性指向原型

## [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E6%8E%8C%E6%8F%A1-%E8%A7%A3%E9%87%8Ajavascript%E4%B8%AD%E7%9A%84%E4%BD%9C%E7%94%A8%E5%9F%9F%E5%92%8C%E5%8F%98%E9%87%8F%E5%A3%B0%E6%98%8E%E6%8F%90%E5%8D%87)（掌握）解释javascript中的作用域和变量声明提升

作用域是指程序源代码中定义变量的区域。作用域规定了如何查找变量，也就是确定当前执行代码对变量的访问权限。

变量声明提升：

```
foo;  // undefined
var foo = function () {
    console.log('foo1');
}
 
foo();  // foo1，foo赋值

```

可以想象成：所有的声明（变量和函数）都会被“移动”到各自作用域的最顶端。

## [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E6%8E%8C%E6%8F%A1-%E8%B0%88%E8%B0%88this%E5%AF%B9%E8%B1%A1%E7%9A%84%E7%90%86%E8%A7%A3-call-%E5%92%8Capply-%E7%9A%84%E5%8C%BA%E5%88%AB)（掌握）谈谈this对象的理解，call()和apply()的区别

call和apply的区别在于传入参数的不同； 第一个参数都是，指定函数体内this的指向；

第二个参数开始不同，apply是传入带下标的集合，数组或者类数组，apply把它传给函数作为参数，call从第二个开始传入的参数是不固定的，都会传给函数作为参数。

call比apply的性能要好，平常可以多用call。call传入参数的格式正是内部所需要的格式。

## [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E6%8E%8C%E6%8F%A1-js-%E7%9A%84typeof%E8%BF%94%E5%9B%9E%E6%9C%89%E5%93%AA%E4%BA%9B%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B)（掌握）js 的typeof返回有哪些数据类型？

```
string，number，Boolean，undefined，object，function, symbol(es6)

```

## [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E6%8E%8C%E6%8F%A1-%E4%BB%80%E4%B9%88%E6%98%AF%E9%97%AD%E5%8C%85-%E4%B8%BA%E4%BB%80%E4%B9%88%E8%A6%81%E7%94%A8%E5%AE%83)（掌握）什么是闭包？为什么要用它？

**1）什么是闭包**

函数执行后返回结果是一个内部函数，并被外部变量所引用，如果内部函数持有被执行函数作用域的变量，即形成了闭包。

可以在内部函数访问到外部函数作用域。使用闭包，一可以读取函数中的变量，二可以将函数中的变量存储在内存中，保护变量不被污染。而正因闭包会把函数中的变量值存储在内存中，会对内存有消耗，所以不能滥用闭包，否则会影响网页性能，造成内存泄漏。当不需要使用闭包时，要及时释放内存，可将内层函数对象的变量赋值为null。

**2）闭包原理 **

函数执行分成两个阶段(预编译阶段和执行阶段)。

- 在预编译阶段，如果发现内部函数使用了外部函数的变量，则会在内存中创建一个“闭包”对象并保存对应变量值，如果已存在“闭包”，则只需要增加对应属性值即可。
- 执行完后，函数执行上下文会被销毁，函数对“闭包”对象的引用也会被销毁，但其内部函数还持用该“闭包”的引用，所以内部函数可以继续使用“外部函数”中的变量

利用了函数作用域链的特性，一个函数内部定义的函数会将包含外部函数的活动对象添加到它的作用域链中，函数执行完毕，其执行作用域链销毁，但因内部函数的作用域链仍然在引用这个活动对象，所以其活动对象不会被销毁，直到内部函数被烧毁后才被销毁。

**3）优点**

1. 可以从内部函数访问外部函数的作用域中的变量，且访问到的变量长期驻扎在内存中，可供之后使用
2. 避免变量污染全局
3. 把变量存到独立的作用域，作为私有成员存在

**4）缺点 **

1. 对内存消耗有负面影响。因内部函数保存了对外部变量的引用，导致无法被垃圾回收，增大内存使用量，所以使用不当会导致内存泄漏
2. 对处理速度具有负面影响。闭包的层级决定了引用的外部变量在查找时经过的作用域链长度
3. 可能获取到意外的值(captured value)

**4）应用场景**

**应用场景一：** 典型应用是模块封装，在各模块规范（ES6）出现之前，都是用这样的方式防止变量污染全局。

```
var Yideng = (function () {
    // 这样声明为模块私有变量，外界无法直接访问
    var foo = 0;

    function Yideng() {}
    Yideng.prototype.bar = function bar() {
        return foo;
    };
    return Yideng;
}());

```

**应用场景二：** 在循环中创建闭包，防止取到意外的值。

如下代码，无论哪个元素触发事件，都会弹出 3。因为函数执行后引用的 i 是同一个，而 i 在循环结束后就是 3

```
for (var i = 0; i < 3; i++) {
    document.getElementById('id' + i).onfocus = function() {
      alert(i);
    };
}
//可用闭包解决
function makeCallback(num) {
  return function() {
    alert(num);
  };
}
for (var i = 0; i < 3; i++) {
    document.getElementById('id' + i).onfocus = makeCallback(i);
}

```

## [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E6%8E%8C%E6%8F%A1-%E7%AE%80%E8%BF%B0js%E7%BB%A7%E6%89%BF%E7%9A%84%E6%96%B9%E5%BC%8F)（掌握）简述js继承的方式

1. 混入式继承：把父类的所有方法都拷贝到子类上
2. 原型式继承：只继承父类原型上的属性和方法
3. 原型链继承：继承父类构造函数里边的属性和方法，也继承父类原型上的属性和方法 缺点--不能向父类传参数
4. 借用构造函数继承：可以父类传递参数 缺点--继承不了父类原型对象的方法
5. 组合继承：借用构造函数继承+原型链继承

## [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E6%8E%8C%E6%8F%A1-%E7%BB%99string%E6%B7%BB%E5%8A%A0%E4%B8%80%E4%B8%AAtrim-%E6%96%B9%E6%B3%95-%E5%8E%BB%E9%99%A4%E5%BC%80%E5%A4%B4%E5%92%8C%E7%BB%93%E5%B0%BE%E7%9A%84%E7%A9%BA%E6%A0%BC%E7%AC%A6%E5%8F%B7)（掌握）给String添加一个trim()方法，去除开头和结尾的空格符号

```
String.prototype.trim = function (str) {
  return str.replace(/(^\s*)|(\s*$)/g, '');
}

```

## [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E6%8E%8C%E6%8F%A1-%E6%B7%B1%E6%8B%B7%E8%B4%9D%E5%92%8C%E6%B5%85%E6%8B%B7%E8%B4%9D%E7%9A%84%E5%8C%BA%E5%88%AB)（掌握）深拷贝和浅拷贝的区别

`浅拷贝（shallowCopy）`只是增加了一个指针指向已存在的内存地址，

`深拷贝（deepCopy）`是增加了一个指针并且申请了一个新的内存，使这个增加的指针指向这个新的内存.

`浅复制`：仅仅是指向被复制的内存地址，如果原地址发生改变，那么浅复制出来的对象也会相应的改变。

`深复制`：在计算机中开辟一块**新的内存地址**用于存放复制的对象。

## [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E6%8E%8C%E6%8F%A1-%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0%E6%B7%B1%E6%8B%B7%E8%B4%9D)（掌握）如何实现深拷贝

常用：使用JSON.parse(JSON.stringify(obj))

原理是把一个对象序列化成为一个JSON字符串，将对象的内容转换成字符串的形式再保存在磁盘上，再用JSON.parse()反序列化将JSON字符串变成一个新的对象

缺点是: 会忽略undefined、symbol、funciton

实现：递归+判断类型

一个简单的代码

```
// 数字 字符串 function是不需要拷贝的
function deepClone(value) {  
    if (value == null) return value;  
    if (typeof value !== 'object') return value;
    if (value instanceof RegExp) return new RegExp(value);  
    if (value instanceof Date) return new Date(value);  
    // 我要判断 value 是对象还是数组 如果是对象 就产生对象 是数组就产生数组  
    let obj = new value.constructor;  
    for(let key in value){    
        obj[key] = deepClone(value[key]); // 看一看当前的值是不是一个对象  
    }  
    return obj;
}

```

## [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E6%8E%8C%E6%8F%A1-javascript-%E7%9A%84%E5%9E%83%E5%9C%BE%E5%9B%9E%E6%94%B6%E6%9C%BA%E5%88%B6%E8%AE%B2%E4%B8%80%E4%B8%8B)（掌握）javascript 的垃圾回收机制讲一下

定义：指一块被分配的内存既不能使用，又不能回收，直到浏览器进程结束。

JavaScript 在创建对象(对象、字符串等)时会为它们分配内存，不再使用对时会“自动”释放内存，这个过程称为垃圾收集。

内存生命周期中的每一个阶段:

分配内存 —  内存是由操作系统分配的，它允许您的程序使用它。在低级语言(例如 C 语言)中，这是一个开发人员需要自己处理的显式执行的操作。然而，在高级语言中，系统会自动为你分配内在。 使用内存 — 这是程序实际使用之前分配的内存，在代码中使用分配的变量时，就会发生读和写操作。 释放内存 — 释放所有不再使用的内存,使之成为自由内存,并可以被重利用。与分配内存操作一样,这一操作在低级语言中也是需要显式地执行。

四种常见的内存泄漏：全局变量，未清除的定时器，闭包，以及 dom 的引用

1. 全局变量 不用 var 声明的变量，相当于挂载到 window 对象上。如：b=1; 解决：使用严格模式
2. 被遗忘的定时器和回调函数
3. 闭包
4. 没有清理的 DOM 元素引用

## [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E6%8E%8C%E6%8F%A1-%E4%BB%8B%E7%BB%8D%E4%B8%8B-promise-%E7%9A%84%E7%89%B9%E6%80%A7%E3%80%81%E4%BC%98%E7%BC%BA%E7%82%B9)（掌握）介绍下 promise 的特性、优缺点

- Promise基本特性

  1、Promise有三种状态：pending(进行中)、fulfilled(已成功)、rejected(已失败)

  2、Promise对象接受一个回调函数作为参数, 该回调函数接受两个参数，分别是成功时的回调resolve和失败时的回调reject；另外resolve的参数除了正常值以外， 还可能是一个Promise对象的实例；reject的参数通常是一个Error对象的实例。

  3、then方法返回一个新的Promise实例，并接收两个参数onResolved(fulfilled状态的回调)；onRejected(rejected状态的回调，该参数可选)

  4、catch方法返回一个新的Promise实例

  5、finally方法不管Promise状态如何都会执行，该方法的回调函数不接受任何参数

  6、Promise.all()方法将多个多个Promise实例，包装成一个新的Promise实例，该方法接受一个由Promise对象组成的数组作为参数(Promise.all()方法的参数可以不是数组，但必须具有Iterator接口，且返回的每个成员都是Promise实例)，注意参数中只要有一个实例触发catch方法，都会触发Promise.all()方法返回的新的实例的catch方法，如果参数中的某个实例本身调用了catch方法，将不会触发Promise.all()方法返回的新实例的catch方法

  7、Promise.race()方法的参数与Promise.all方法一样，参数中的实例只要有一个率先改变状态就会将该实例的状态传给Promise.race()方法，并将返回值作为Promise.race()方法产生的Promise实例的返回值

  8、Promise.resolve()将现有对象转为Promise对象，如果该方法的参数为一个Promise对象，Promise.resolve()将不做任何处理；如果参数thenable对象(即具有then方法)，Promise.resolve()将该对象转为Promise对象并立即执行then方法；如果参数是一个原始值，或者是一个不具有then方法的对象，则Promise.resolve方法返回一个新的Promise对象，状态为fulfilled，其参数将会作为then方法中onResolved回调函数的参数，如果Promise.resolve方法不带参数，会直接返回一个fulfilled状态的 Promise 对象。需要注意的是，立即resolve()的 Promise 对象，是在本轮“事件循环”（event loop）的结束时执行，而不是在下一轮“事件循环”的开始时。

  9、Promise.reject()同样返回一个新的Promise对象，状态为rejected，无论传入任何参数都将作为reject()的参数

  2）Promise优点

  ①统一异步 API

  - Promise 的一个重要优点是它将逐渐被用作浏览器的异步 API ，统一现在各种各样的 API ，以及不兼容的模式和手法。

  ②Promise 与事件对比

  - 和事件相比较， Promise 更适合处理一次性的结果。在结果计算出来之前或之后注册回调函数都是可以的，都可以拿到正确的值。 Promise 的这个优点很自然。但是，不能使用 Promise 处理多次触发的事件。链式处理是 Promise 的又一优点，但是事件却不能这样链式处理。

  ③Promise 与回调对比

  - 解决了回调地狱的问题，将异步操作以同步操作的流程表达出来。

  ④Promise 带来的额外好处是包含了更好的错误处理方式（包含了异常处理），并且写起来很轻松（因为可以重用一些同步的工具，比如 Array.prototype.map() ）。

  3）Promise缺点

  1、无法取消Promise，一旦新建它就会立即执行，无法中途取消。

  2、如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。

  3、当处于Pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

  4、Promise 真正执行回调的时候，定义 Promise 那部分实际上已经走完了，所以 Promise 的报错堆栈上下文不太友好。

## [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E6%8E%8C%E6%8F%A1-%E8%AF%B7%E4%BB%8B%E7%BB%8D%E4%B8%80%E4%B8%8Bxmlhttprequest%E5%AF%B9%E8%B1%A1)（掌握）请介绍一下XMLhttprequest对象

Ajax的核心是JavaScript对象XmlHttpRequest。该对象在Internet Explorer 5中首次引入，它是一种支持异步请求的技术。简而言之，XmlHttpRequest使您可以使用JavaScript向服务器提出请求并处理响应，而不阻塞用户。通过XMLHttpRequest对象，Web开发人员可以在页面加载以后进行页面的局部更新。

## [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E6%8E%8C%E6%8F%A1-%E8%AF%B7%E6%8F%8F%E8%BF%B0%E4%B8%80%E4%B8%8B-cookies-sessionstorage-%E5%92%8C-localstorage-%E7%9A%84%E5%8C%BA%E5%88%AB)（掌握）请描述一下 `cookies`，`sessionStorage` 和 `localStorage` 的区别？

1. cookie是浏览器自动携带在请求里发送给服务端去验证的

sessionStorage和localStorage不会自动携带

1. cookie体积相对sessionStorage localStorage小
2. 后端可以设置cookie之后,前端修改不了的;
3. cookie可以设置过期时间
4. cookie是用来做状态保持的，因为http请求时无状态的
5. cookie是用户第一次访问服务器服务器颁发给浏览器的,第二次请求就会携带
6. sessionStorage 存储在内存中 关闭浏览器数据会消失
7. localStorage 关闭浏览器数据不会消失 需要手动去清除

## [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E6%8E%8C%E6%8F%A1-%E6%B5%8F%E8%A7%88%E5%99%A8%E7%BC%93%E5%AD%98%E7%AD%96%E7%95%A5)（掌握）浏览器缓存策略

**1）浏览器缓存策略**

浏览器每次发起请求时，先在本地缓存中查找结果以及缓存标识，根据缓存标识来判断是否使用本地缓存。如果缓存有效，则使 用本地缓存；否则，则向服务器发起请求并携带缓存标识。根据是否需向服务器发起HTTP请求，将缓存过程划分为两个部分： 强制缓存和协商缓存，强缓优先于协商缓存。

- 强缓存，服务器通知浏览器一个缓存时间，在缓存时间内，下次请求，直接用缓存，不在时间内，执行比较缓存策略。
- 协商缓存，让客户端与服务器之间能实现缓存文件是否更新的验证、提升缓存的复用率，将缓存信息中的Etag和Last-Modified 通过请求发送给服务器，由服务器校验，返回304状态码时，浏览器直接使用缓存。

HTTP缓存都是从第二次请求开始的：

- 第一次请求资源时，服务器返回资源，并在response header中回传资源的缓存策略；
- 第二次请求时，浏览器判断这些请求参数，击中强缓存就直接200，否则就把请求参数加到request header头中传给服务器，看是否击中协商缓存，击中则返回304，否则服务器会返回新的资源。这是缓存运作的一个整体流程图：

[![img](https://camo.githubusercontent.com/df822872ee2a8aef44c665f8fffd13c4cc4eb637bd8706ce4899e8eb72d2a431/687474703a2f2f696d672d7374617469632e796964656e6778756574616e672e636f6d2f77786170702f69737375652d696d672f7169642d382e706e67)(opens new window)](https://camo.githubusercontent.com/df822872ee2a8aef44c665f8fffd13c4cc4eb637bd8706ce4899e8eb72d2a431/687474703a2f2f696d672d7374617469632e796964656e6778756574616e672e636f6d2f77786170702f69737375652d696d672f7169642d382e706e67)

**2）强缓存**

- 强缓存命中则直接读取浏览器本地的资源，在network中显示的是from memory或者from disk
- 控制强制缓存的字段有：Cache-Control（http1.1）和Expires（http1.0）
- Cache-control是一个相对时间，用以表达自上次请求正确的资源之后的多少秒的时间段内缓存有效。
- Expires是一个绝对时间。用以表达在这个时间点之前发起请求可以直接从浏览器中读取数据，而无需发起请求
- Cache-Control的优先级比Expires的优先级高。前者的出现是为了解决Expires在浏览器时间被手动更改导致缓存判断错误的问题。 如果同时存在则使用Cache-control。

**3）强缓存-expires**

- 该字段是服务器响应消息头字段，告诉浏览器在过期时间之前可以直接从浏览器缓存中存取数据。
- Expires 是 HTTP 1.0 的字段，表示缓存到期时间，是一个绝对的时间 (当前时间+缓存时间)。在响应消息头中，设置这个字段之后，就可以告诉浏览器，在未过期之前不需要再次请求。
- 由于是绝对时间，用户可能会将客户端本地的时间进行修改，而导致浏览器判断缓存失效，重新请求该资源。此外，即使不考虑修改，时差或者误差等因素也可能造成客户端与服务端的时间不一致，致使缓存失效。
- 优势特点
  - 1、HTTP 1.0 产物，可以在HTTP 1.0和1.1中使用，简单易用。
  - 2、以时刻标识失效时间。
- 劣势问题
  - 1、时间是由服务器发送的(UTC)，如果服务器时间和客户端时间存在不一致，可能会出现问题。
  - 2、存在版本问题，到期之前的修改客户端是不可知的。

**4）强缓存-cache-control**

- 已知Expires的缺点之后，在HTTP/1.1中，增加了一个字段Cache-control，该字段表示资源缓存的最大有效时间，在该时间内，客户端不需要向服务器发送请求。

- 这两者的区别就是前者是绝对时间，而后者是相对时间。下面列举一些 `Cache-control` 字段常用的值：(完整的列表可以查看MDN)

  - `max-age`：即最大有效时间。
  - `must-revalidate`：如果超过了 `max-age` 的时间，浏览器必须向服务器发送请求，验证资源是否还有效。
  - `no-cache`：不使用强缓存，需要与服务器验证缓存是否新鲜。
  - `no-store`: 真正意义上的“不要缓存”。所有内容都不走缓存，包括强制和对比。
  - `public`：所有的内容都可以被缓存 (包括客户端和代理服务器， 如 CDN)
  - `private`：所有的内容只有客户端才可以缓存，代理服务器不能缓存。默认值。

- **Cache-control 的优先级高于 Expires**，为了兼容 HTTP/1.0 和 HTTP/1.1，实际项目中两个字段都可以设置。

- 该字段可以在请求头或者响应头设置，可组合使用多种指令：

  - 可缓存性

    ：

    - public：浏览器和缓存服务器都可以缓存页面信息
    - private：default，代理服务器不可缓存，只能被单个用户缓存
    - no-cache：浏览器器和服务器都不应该缓存页面信息，但仍可缓存，只是在缓存前需要向服务器确认资源是否被更改。可配合private， 过期时间设置为过去时间。
    - only-if-cache：客户端只接受已缓存的响应

  - 到期

    - max-age=：缓存存储的最大周期，超过这个周期被认为过期。
    - s-maxage=：设置共享缓存，比如can。会覆盖max-age和expires。
    - max-stale[=]：客户端愿意接收一个已经过期的资源
    - min-fresh=：客户端希望在指定的时间内获取最新的响应
    - stale-while-revalidate=：客户端愿意接收陈旧的响应，并且在后台一部检查新的响应。时间代表客户端愿意接收陈旧响应 的时间长度。
    - stale-if-error=：如新的检测失败，客户端则愿意接收陈旧的响应，时间代表等待时间。

  - 重新验证和重新加载

    - must-revalidate：如页面过期，则去服务器进行获取。
    - proxy-revalidate：用于共享缓存。
    - immutable：响应正文不随时间改变。

  - 其他

    - no-store：绝对禁止缓存
    - no-transform：不得对资源进行转换和转变。例如，不得对图像格式进行转换。

- 优势特点

  - 1、HTTP 1.1 产物，以时间间隔标识失效时间，解决了Expires服务器和客户端相对时间的问题。
  - 2、比Expires多了很多选项设置。

- 劣势问题

  - 1、存在版本问题，到期之前的修改客户端是不可知的。

**5）协商缓存**

- 协商缓存的状态码由服务器决策返回200或者304
- 当浏览器的强缓存失效的时候或者请求头中设置了不走强缓存，并且在请求头中设置了If-Modified-Since 或者 If-None-Match 的时候，会将这两个属性值到服务端去验证是否命中协商缓存，如果命中了协商缓存，会返回 304 状态，加载浏览器缓存，并且响应头会设置 Last-Modified 或者 ETag 属性。
- 对比缓存在请求数上和没有缓存是一致的，但如果是 304 的话，返回的仅仅是一个状态码而已，并没有实际的文件内容，因此 在响应体体积上的节省是它的优化点。
- 协商缓存有 2 组字段(不是两个)，控制协商缓存的字段有：Last-Modified/If-Modified-since（http1.0）和Etag/If-None-match（http1.1）
- Last-Modified/If-Modified-since表示的是服务器的资源最后一次修改的时间；Etag/If-None-match表示的是服务器资源的唯一标 识，只要资源变化，Etag就会重新生成。
- Etag/If-None-match的优先级比Last-Modified/If-Modified-since高。

**6）协商缓存-协商缓存-Last-Modified/If-Modified-since**

- 1.服务器通过 `Last-Modified` 字段告知客户端，资源最后一次被修改的时间，例如 `Last-Modified: Mon, 10 Nov 2018 09:10:11 GMT`
- 2.浏览器将这个值和内容一起记录在缓存数据库中。
- 3.下一次请求相同资源时时，浏览器从自己的缓存中找出“不确定是否过期的”缓存。因此在请求头中将上次的 `Last-Modified` 的值写入到请求头的 `If-Modified-Since` 字段
- 4.服务器会将 `If-Modified-Since` 的值与 `Last-Modified` 字段进行对比。如果相等，则表示未修改，响应 304；反之，则表示修改了，响应 200 状态码，并返回数据。
- 优势特点
  - 1、不存在版本问题，每次请求都会去服务器进行校验。服务器对比最后修改时间如果相同则返回304，不同返回200以及资源内容。
- 劣势问题
  - 2、只要资源修改，无论内容是否发生实质性的变化，都会将该资源返回客户端。例如周期性重写，这种情况下该资源包含的数据实际上一样的。
  - 3、以时刻作为标识，无法识别一秒内进行多次修改的情况。 如果资源更新的速度是秒以下单位，那么该缓存是不能被使用的，因为它的时间单位最低是秒。
  - 4、某些服务器不能精确的得到文件的最后修改时间。
  - 5、如果文件是通过服务器动态生成的，那么该方法的更新时间永远是生成的时间，尽管文件可能没有变化，所以起不到缓存的作用。

**7）协商缓存-Etag/If-None-match**

- 为了解决上述问题，出现了一组新的字段 `Etag` 和 `If-None-Match`
- `Etag` 存储的是文件的特殊标识(一般都是 hash 生成的)，服务器存储着文件的 `Etag` 字段。之后的流程和 `Last-Modified` 一致，只是 `Last-Modified` 字段和它所表示的更新时间改变成了 `Etag` 字段和它所表示的文件 hash，把 `If-Modified-Since` 变成了 `If-None-Match`。服务器同样进行比较，命中返回 304, 不命中返回新资源和 200。
- 浏览器在发起请求时，服务器返回在Response header中返回请求资源的唯一标识。在下一次请求时，会将上一次返回的Etag值赋值给If-No-Matched并添加在Request Header中。服务器将浏览器传来的if-no-matched跟自己的本地的资源的ETag做对比，如果匹配，则返回304通知浏览器读取本地缓存，否则返回200和更新后的资源。
- **Etag 的优先级高于 Last-Modified**。
- 优势特点
  - 1、可以更加精确的判断资源是否被修改，可以识别一秒内多次修改的情况。
  - 2、不存在版本问题，每次请求都回去服务器进行校验。
- 劣势问题
  - 1、计算ETag值需要性能损耗。
  - 2、分布式服务器存储的情况下，计算ETag的算法如果不一样，会导致浏览器从一台服务器上获得页面内容后到另外一台服务器上进行验证时现ETag不匹配的情况。

## [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E6%8E%8C%E6%8F%A1-%E7%AE%80%E8%BF%B0%E5%90%8C%E6%BA%90%E7%AD%96%E7%95%A5%E4%B8%8E%E8%B7%A8%E5%9F%9F)（掌握）简述同源策略与跨域

同源策略是一种约定，它是浏览器最核心的也最基本的安全功能，如果缺少了同源策略，则浏览器的正常功能可能会受到影响。

当协议，主机，和端口号有一个不同时，就是跨域。

## [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E6%8E%8C%E6%8F%A1-%E8%B7%A8%E5%9F%9F%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88)（掌握）跨域解决方案

1、（后端）服务器配置CORS(跨域资源共享)

2） （后端）node.js或nginx,反向代理，把跨域改造成同域

3）（前端）将JSON升级成JSONP,在JSON的基础上，利用script 标签可以跨域的特性，加上头设置

## [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E6%8E%8C%E6%8F%A1-%E4%BB%8E%E6%B5%8F%E8%A7%88%E5%99%A8%E5%9C%B0%E5%9D%80%E6%A0%8F%E8%BE%93%E5%85%A5url%E5%88%B0%E6%98%BE%E7%A4%BA%E9%A1%B5%E9%9D%A2%E7%9A%84%E6%AD%A5%E9%AA%A4)（掌握）从浏览器地址栏输入URL到显示页面的步骤

```
1. 浏览器根据请求的URL交给DNS域名解析，找到真实IP，向服务器发起请求；
2. 服务器交给后台处理完成后返回数据，浏览器接收文件（html，js，css，图像等）;
3. 浏览器对加载到的资源（html，js，css等）进行语法解析，建立相应的内部数据结构（如HTML的DOM）;
4. 载入解析到的资源文件，渲染页面，完成。

```

## [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E6%8E%8C%E6%8F%A1-javascript-%E4%B8%AD%E7%9A%84%E4%BD%9C%E7%94%A8%E5%9F%9F-scope-%E6%98%AF%E6%8C%87%E4%BB%80%E4%B9%88)（掌握）JavaScript 中的作用域（scope）是指什么？

在 JavaScript 中，每个函数都有自己的作用域。作用域基本上是变量以及如何通过名称访问这些变量的规则的集合。只有函数中的代码才能访问函数作用域内的变量。

同一个作用域中的变量名必须是唯一的。一个作用域可以嵌套在另一个作用域内。如果一个作用域嵌套在另一个作用域内，最内部作用域内的代码可以访问另一个作用域的变量。

## [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E6%8E%8C%E6%8F%A1-%E8%A7%A3%E9%87%8A-javascript-%E4%B8%AD%E7%9A%84-null-%E5%92%8C-undefined)（掌握）解释 JavaScript 中的 null 和 undefined

```
null表示一个空的对象,什么也没有
undefined 表示声明为赋值 
undefined是从null派生出来的 
null == undefined //true 
null === undefined //false
typeof null // 'object'
typeof undefined // 'undefined'

```

## [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E6%8E%8C%E6%8F%A1-%E6%B5%8F%E8%A7%88%E5%99%A8%E7%9A%84%E4%BA%8B%E4%BB%B6%E5%BE%AA%E7%8E%AF)（掌握）浏览器的事件循环

**1）为什么会有Event Loop **

JavaScript的任务分为两种`同步`和`异步`，它们的处理方式也各自不同，**同步任务**是直接放在主线程上排队依次执行，**异步任务**会放在任务队列中，若有多个异步任务则需要在任务队列中排队等待，任务队列类似于缓冲区，任务下一步会被移到**调用栈**然后主线程执行调用栈的任务。

> **调用栈**：调用栈是一个栈结构，函数调用会形成一个栈帧，帧中包含了当前执行函数的参数和局部变量等上下文信息，函数执行完后，它的执行上下文会从栈中弹出。

JavaScript是`单线程`的，单线程是指 js引擎中解析和执行js代码的线程只有一个（主线程），每次只能做一件事情，然而`ajax`请求中，主线程在等待响应的过程中回去做其他事情，浏览器先在事件表注册ajax的回调函数，响应回来后回调函数被添加到任务队列中等待执行，不会造成线程阻塞，所以说js处理ajax请求的方式是异步的。

综上所述，检查调用栈是否为空以及讲某个任务添加到调用栈中的个过程就是event loop，这就是JavaScript实现异步的核心。

**2）浏览器中的 Event Loop**

**Micro-Task 与 Macro-Task**

浏览器端事件循环中的异步队列有两种：macro（宏任务）队列和 micro（微任务）队列。

常见的 macro-task：`setTimeout`、`setInterval`、`script（整体代码）`、`I/O 操作`、`UI 渲染`等。

常见的 micro-task: `new Promise().then(回调)`、`MutationObserve`等。

**requestAnimationFrame**

requestAnimationFrame也属于异步执行的方法，但该方法既不属于宏任务，也不属于微任务。按照MDN中的定义：

> `window.requestAnimationFrame()` 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行

requestAnimationFrame是GUI渲染之前执行，但在`Micro-Task`之后，不过requestAnimationFrame不一定会在当前帧必须执行，由浏览器根据当前的策略自行决定在哪一帧执行。

**event loop过程**

[![img](https://raw.githubusercontent.com/XQY279/blog/master/image/event-loop.jpg)(opens new window)](https://raw.githubusercontent.com/XQY279/blog/master/image/event-loop.jpg)

1. 检查macrotask队列是否为空，非空则到2，为空则到3
2. 执行macrotask中的一个任务
3. 继续检查microtask队列是否为空，若有则到4，否则到5
4. 取出microtask中的任务执行，执行完成返回到步骤3
5. 执行视图更新

> 当某个宏任务执行完后,会查看是否有微任务队列。如果有，先执行微任务队列中的所有任务，如果没有，会读取宏任务队列中排在最前的任务，执行宏任务的过程中，遇到微任务，依次加入微任务队列。栈空后，再次读取微任务队列里的任务，依次类推。

## [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E6%8E%8C%E6%8F%A1-%E8%A7%A3%E9%87%8A%E4%BA%8B%E4%BB%B6%E5%86%92%E6%B3%A1%E4%BB%A5%E5%8F%8A%E5%A6%82%E4%BD%95%E9%98%BB%E6%AD%A2%E5%AE%83)（掌握）解释事件冒泡以及如何阻止它？

事件冒泡是指嵌套最深的元素触发一个事件，然后这个事件顺着嵌套顺序在父元素上触发。

防止事件冒泡的一种方法是使用 event.cancelBubble 或 event.stopPropagation()（低于 IE 9）。

## [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E6%8E%8C%E6%8F%A1-%E4%BB%80%E4%B9%88%E6%98%AF%E9%98%B2%E6%8A%96%E5%92%8C%E8%8A%82%E6%B5%81-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB-%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0)（掌握）什么是防抖和节流？有什么区别？如何实现？

```
/** 防抖:
 * 应用场景：当用户进行了某个行为(例如点击)之后。不希望每次行为都会触发方法，而是行为做出后,一段时间内没有再次重复行为，
 * 才给用户响应
 * 实现原理 : 每次触发事件时设置一个延时调用方法，并且取消之前的延时调用方法。（每次触发事件时都取消之前的延时调用方法）
 *  @params fun 传入的防抖函数(callback) delay 等待时间
 *  */
const debounce = (fun, delay = 500) => {
    let timer = null //设定一个定时器
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fun.apply(this, args)
        }, delay)
    }
}
/** 节流
 *  应用场景:用户进行高频事件触发(滚动)，但在限制在n秒内只会执行一次。
 *  实现原理: 每次触发时间的时候，判断当前是否存在等待执行的延时函数
 * @params fun 传入的防抖函数(callback) delay 等待时间
 * */

const throttle = (fun, delay = 1000) => {
    let flag = true;
    return function (...args) {
        if (!flag) return;
        flag = false
        setTimeout(() => {
            fun.apply(this, args)
            flag = true
        }, delay)
    }
}

```

区别:节流不管事件触发多频繁保证在一定时间内一定会执行一次函数。防抖是只在最后一次事件触发后才会执行一次函数

## [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E6%8E%8C%E6%8F%A1-jsonp-%E7%9A%84%E5%8E%9F%E7%90%86%E6%98%AF%E4%BB%80%E4%B9%88)（掌握）JSONP 的原理是什么？

尽管浏览器有同源策略，但是 script 标签的 `src` 属性不会被同源策略所约束，可以获取任意服务器上的脚本并执行。`jsonp` 通过插入 `script` 标签的方式来实现跨域，参数只能通过 `url` 传入，仅能支持 `get` 请求。

- Step1: 创建 callback 方法
- Step2: 插入 script 标签
- Step3: 后台接受到请求，解析前端传过去的 callback 方法，返回该方法的调用，并且数据作为参数传入该方法
- Step4: 前端执行服务端返回的方法调用

## [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E6%8E%8C%E6%8F%A1-%E5%BC%82%E6%AD%A5%E5%8A%A0%E8%BD%BDjs%E7%9A%84%E6%96%B9%E5%BC%8F%E6%9C%89%E5%93%AA%E4%BA%9B)（掌握）异步加载JS的方式有哪些？

- defer，只支持`IE`
- `async`：
- 创建`script`，插入到`DOM`中，加载完毕后`callBack`
- `defer`并行加载`js`文件，会按照页面上`script`标签的顺序执行
- `async`并行加载`js`文件，下载完成立即执行，不会按照页面上`script`标签的顺序执行

## [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E6%8E%8C%E6%8F%A1-%E5%B8%B8%E8%A7%81web%E5%AE%89%E5%85%A8%E5%8F%8A%E9%98%B2%E6%8A%A4%E5%8E%9F%E7%90%86)（掌握）常见web安全及防护原理

- #### [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#_1-xss-%E8%B7%A8%E7%AB%99%E8%84%9A%E6%9C%AC%E6%94%BB%E5%87%BB)1）XSS：跨站脚本攻击

  就是攻击者想尽一切办法将可以执行的代码注入到网页中。

  ##### [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E5%AD%98%E5%82%A8%E5%9E%8B-server%E7%AB%AF)存储型（server端）：

  - 场景：见于带有用户保存数据的网站功能，如论坛发帖、商品评论、用户私信等。
  - 攻击步骤：
    - i）攻击者将恶意代码提交到目标网站的数据库中
    - ii）用户打开目标网站时，服务端将恶意代码从数据库中取出来，拼接在HTML中返回给浏览器
    - iii）用户浏览器在收到响应后解析执行，混在其中的恶意代码也同时被执行
    - iv）恶意代码窃取用户数据，并发送到指定攻击者的网站，或者冒充用户行为，调用目标网站的接口，执行恶意操作

  ##### [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E5%8F%8D%E5%B0%84%E5%9E%8B-server%E7%AB%AF)反射型（Server端）

  与存储型的区别在于，存储型的恶意代码存储在数据库中，反射型的恶意代码在URL上

  - 场景：通过 URL 传递参数的功能，如网站搜索、跳转等。
  - 攻击步骤：
    - i）攻击者构造出特殊的 URL，其中包含恶意代码。
    - ii）用户打开带有恶意代码的 URL 时，网站服务端将恶意代码从 URL 中取出，拼接在 HTML 中返回给浏览器。
    - iii）用户浏览器接收到响应后解析执行，混在其中的恶意代码也被执行。
    - iv）恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作。

  ##### [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#dom-%E5%9E%8B-%E6%B5%8F%E8%A7%88%E5%99%A8%E7%AB%AF)Dom 型(浏览器端）

  DOM 型 XSS 攻击中，取出和执行恶意代码由浏览器端完成，属于前端 JavaScript 自身的安全漏洞，而其他两种 XSS 都属于服务端的安全漏洞。

  - 场景：通过 URL 传递参数的功能，如网站搜索、跳转等。
  - 攻击步骤：
    - i）攻击者构造出特殊的 URL，其中包含恶意代码。
    - ii）用户打开带有恶意代码的 URL。
    - iii）用户浏览器接收到响应后解析执行，前端 JavaScript 取出 URL 中的恶意代码并执行。
    - iv）恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作。

  ##### [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E9%A2%84%E9%98%B2%E6%96%B9%E6%A1%88-%E9%98%B2%E6%AD%A2%E6%94%BB%E5%87%BB%E8%80%85%E6%8F%90%E4%BA%A4%E6%81%B6%E6%84%8F%E4%BB%A3%E7%A0%81-%E9%98%B2%E6%AD%A2%E6%B5%8F%E8%A7%88%E5%99%A8%E6%89%A7%E8%A1%8C%E6%81%B6%E6%84%8F%E4%BB%A3%E7%A0%81)预防方案：（防止攻击者提交恶意代码，防止浏览器执行恶意代码）

  - i）对数据进行严格的输出编码：如HTML元素的编码，JS编码，CSS编码，URL编码等等
    - 避免拼接 HTML；Vue/React 技术栈，避免使用 v-html / dangerouslySetInnerHTML
  - ii）CSP HTTP Header，即 Content-Security-Policy、X-XSS-Protection
    - 增加攻击难度，配置CSP(本质是建立白名单，由浏览器进行拦截)
    - `Content-Security-Policy: default-src 'self'`-所有内容均来自站点的同一个源（不包括其子域名）
    - `Content-Security-Policy: default-src 'self' *.trusted.com`-允许内容来自信任的域名及其子域名 (域名不必须与CSP设置所在的域名相同)
    - `Content-Security-Policy: default-src https://yideng.com`-该服务器仅允许通过HTTPS方式并仅从yideng.com域名来访问文档
  - iii）输入验证：比如一些常见的数字、URL、电话号码、邮箱地址等等做校验判断
  - iv）开启浏览器XSS防御：Http Only cookie，禁止 JavaScript 读取某些敏感 Cookie，攻击者完成 XSS 注入后也无法窃取此 Cookie。
  - v）验证码

  #### [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#_2-csrf-%E8%B7%A8%E7%AB%99%E8%AF%B7%E6%B1%82%E4%BC%AA%E9%80%A0)2）CSRF：跨站请求伪造

  攻击者诱导受害者进入第三方网站，在第三方网站中，向被攻击网站发送跨站请求。利用受害者在被攻击网站已经获取的注册凭证，绕过后台的用户验证，达到冒充用户对被攻击的网站执行某项操作的目的。

  ##### [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E6%94%BB%E5%87%BB%E6%B5%81%E7%A8%8B%E4%B8%BE%E4%BE%8B)攻击流程举例

  - i）受害者登录 a.com，并保留了登录凭证（Cookie）
  - ii）攻击者引诱受害者访问了b.com
  - iii）b.com 向 a.com 发送了一个请求：a.com/act=xx浏览器会默认携带a.com的Cookie
  - iv）a.com接收到请求后，对请求进行验证，并确认是受害者的凭证，误以为是受害者自己发送的请求
  - v）a.com以受害者的名义执行了act=xx
  - vi）攻击完成，攻击者在受害者不知情的情况下，冒充受害者，让a.com执行了自己定义的操作

  ##### [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E6%94%BB%E5%87%BB%E7%B1%BB%E5%9E%8B)攻击类型

  - i）GET型：如在页面的某个 img 中发起一个 get 请求
  - ii）POST型：通过自动提交表单到恶意网站
  - iii）链接型：需要诱导用户点击链接

  ##### [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E9%A2%84%E9%98%B2%E6%96%B9%E6%A1%88)预防方案：

  CSRF通常从第三方网站发起，被攻击的网站无法防止攻击发生，只能通过增强自己网站针对CSRF的防护能力来提升安全性。）

  - i）同源检测：通过Header中的Origin Header 、Referer Header 确定，但不同浏览器可能会有不一样的实现，不能完全保证
  - ii）CSRF Token 校验：将CSRF Token输出到页面中（通常保存在Session中），页面提交的请求携带这个Token，服务器验证Token是否 正确
  - iii）双重cookie验证：
    - 流程：
      - 步骤1：在用户访问网站页面时，向请求域名注入一个Cookie，内容为随机字符串（例如csrfcookie=v8g9e4ksfhw）
      - 步骤2：在前端向后端发起请求时，取出Cookie，并添加到URL的参数中（接上例POST https://www.a.com/comment?csrfcookie=v8g9e4ksfhw）
      - 步骤3：后端接口验证Cookie中的字段与URL参数中的字段是否一致，不一致则拒绝。
    - 优点：
      - 无需使用Session，适用面更广，易于实施。
      - Token储存于客户端中，不会给服务器带来压力。
      - 相对于Token，实施成本更低，可以在前后端统一拦截校验，而不需要一个个接口和页面添加。
    - 缺点： -Cookie中增加了额外的字段。 -如果有其他漏洞（例如XSS），攻击者可以注入Cookie，那么该防御方式失效。 -难以做到子域名的隔离。 -为了确保Cookie传输安全，采用这种防御方式的最好确保用整站HTTPS的方式，如果还没切HTTPS的使用这种方式也会有风险。
  - iv）Samesite Cookie属性：Google起草了一份草案来改进HTTP协议，那就是为Set-Cookie响应头新增Samesite属性，它用来标明这个 Cookie是个“同站 Cookie”，同站Cookie只能作为第一方Cookie，不能作为第三方Cookie，Samesite 有两个属性值，Strict 为任何情况下都不可以作为第三方 Cookie ，Lax 为可以作为第三方 Cookie , 但必须是Get请求

  #### [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#_3-iframe-%E5%AE%89%E5%85%A8)3）iframe 安全

  ##### [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E8%AF%B4%E6%98%8E)说明：

  - i）嵌入第三方 iframe 会有很多不可控的问题，同时当第三方 iframe 出现问题或是被劫持之后，也会诱发安全性问题
  - ii）点击劫持
    - 攻击者将目标网站通过 iframe 嵌套的方式嵌入自己的网页中，并将 iframe 设置为透明，诱导用户点击。
  - iii）禁止自己的 iframe 中的链接外部网站的JS

  ##### [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E9%A2%84%E9%98%B2%E6%96%B9%E6%A1%88-2)预防方案：

  - i）为 iframe 设置 sandbox 属性，通过它可以对iframe的行为进行各种限制，充分实现“最小权限“原则

  - ii）服务端设置 X-Frame-Options Header头，拒绝页面被嵌套，X-Frame-Options 是HTTP 响应头中用来告诉浏览器一个页面是否可以嵌入


    ​

  - iii）设置 CSP 即 Content-Security-Policy 请求头

  - iv）减少对 iframe 的使用

  #### [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#_4-%E9%94%99%E8%AF%AF%E7%9A%84%E5%86%85%E5%AE%B9%E6%8E%A8%E6%96%AD)4）错误的内容推断

  ##### [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E8%AF%B4%E6%98%8E-2)说明：

  文件上传类型校验失败后，导致恶意的JS文件上传后，浏览器 Content-Type Header 的默认解析为可执行的 JS 文件

  ##### [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E9%A2%84%E9%98%B2%E6%96%B9%E6%A1%88-3)预防方案：

  设置 X-Content-Type-Options 头

  #### [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#_5-%E7%AC%AC%E4%B8%89%E6%96%B9%E4%BE%9D%E8%B5%96%E5%8C%85)5）第三方依赖包

  减少对第三方依赖包的使用，如之前 npm 的包如：event-stream 被爆出恶意攻击数字货币；

  #### [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#_6-https)6）HTTPS

  ##### [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E6%8F%8F%E8%BF%B0)描述：

  黑客可以利用SSL Stripping这种攻击手段，强制让HTTPS降级回HTTP，从而继续进行中间人攻击。

  ##### [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E9%A2%84%E9%98%B2%E6%96%B9%E6%A1%88-4)预防方案：

  使用HSTS（HTTP Strict Transport Security），它通过下面这个HTTP Header以及一个预加载的清单，来告知浏览器和网站进行通信的时候强制性的使用HTTPS，而不是通过明文的HTTP进行通信。这里的“强制性”表现为浏览器无论在何种情况下都直接向务器端发起HTTPS请求，而不再像以往那样从HTTP跳转到HTTPS。另外，当遇到证书或者链接不安全的时候，则首先警告用户，并且不再 用户选择是否继续进行不安全的通信。

  #### [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#_7-%E6%9C%AC%E5%9C%B0%E5%AD%98%E5%82%A8%E6%95%B0%E6%8D%AE)7）本地存储数据

  避免重要的用户信息存在浏览器缓存中

  #### [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#_8-%E9%9D%99%E6%80%81%E8%B5%84%E6%BA%90%E5%AE%8C%E6%95%B4%E6%80%A7%E6%A0%A1%E9%AA%8C)8）静态资源完整性校验

  ##### [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E6%8F%8F%E8%BF%B0-2)描述

  使用 内容分发网络 (CDNs) 在多个站点之间共享脚本和样式表等文件可以提高站点性能并节省带宽。然而，使用CDN也存在风险，如果攻击者获得对 CDN 的控制权，则可以将任意恶意内容注入到 CDN 上的文件中 （或完全替换掉文件），因此可能潜在地攻击所有从该 CDN 获取文件的站点。

  ##### [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E9%A2%84%E9%98%B2%E6%96%B9%E6%A1%88-5)预防方案

  将使用 base64 编码过后的文件哈希值写入你所引用的 script 标签的 integrity 属性值中即可启用子资源完整性能。

  #### [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#_9-%E7%BD%91%E7%BB%9C%E5%8A%AB%E6%8C%81)9）网络劫持

  ##### [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E6%8F%8F%E8%BF%B0-3)描述：

  - DNS劫持（涉嫌违法）：修改运行商的 DNS 记录，重定向到其他网站。DNS 劫持是违法的行为，目前 DNS 劫持已被监管，现在很少见 DNS 劫持
  - HTTP劫持：前提有 HTTP 请求。因 HTTP 是明文传输，运营商便可借机修改 HTTP 响应内容（如加广告）。

  ##### [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E9%A2%84%E9%98%B2%E6%96%B9%E6%A1%88-6)预防方案

  全站 HTTPS

  #### [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#_10-%E4%B8%AD%E9%97%B4%E4%BA%BA%E6%94%BB%E5%87%BB)10）中间人攻击：

  中间人攻击（Man-in-the-middle attack, MITM），指攻击者与通讯的两端分别创建独立的联系，并交换其所收到的数据，使通讯的两端认为他们正在通过一个私密的连接与对方直接对话，但事实上整个会话都被攻击者窃听、篡改甚至完全控制。没有进行严格的证书校验是中间人攻击着手点。目前大多数加密协议都提供了一些特殊认证方法以阻止中间人攻击。如 SSL （安全套接字层）协议可以验证参与通讯的用户的证书是否有权威、受信任的数字证书认证机构颁发，并且能执行双向身份认证。攻击场景如用户在一个未加密的 WiFi下访问网站。在中间人攻击中，攻击者可以拦截通讯双方的通话并插入新的内容。

  ##### [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E5%9C%BA%E6%99%AF)场景

  - i）在一个未加密的Wi-Fi 无线接入点的接受范围内的中间人攻击者，可以将自己作为一个中间人插入这个网络
  - ii）Fiddler / Charles （花瓶）代理工具
  - iii）12306 之前的自己证书

  ##### [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E8%BF%87%E7%A8%8B)过程

  - i）客户端发送请求到服务端，请求被中间人截获
  - ii）服务器向客户端发送公钥
  - iii）中间人截获公钥，保留在自己手上。然后自己生成一个【伪造的】公钥，发给客户端
  - iv）客户端收到伪造的公钥后，生成加密hash值发给服务器
  - v）中间人获得加密hash值，用自己的私钥解密获得真秘钥,同时生成假的加密hash值，发给服务器
  - vi）服务器用私钥解密获得假密钥,然后加密数据传输给客户端

  ##### [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E4%BD%BF%E7%94%A8%E6%8A%93%E5%8C%85%E5%B7%A5%E5%85%B7fiddle%E6%9D%A5%E8%BF%9B%E8%A1%8C%E4%B8%BE%E4%BE%8B%E8%AF%B4%E6%98%8E)使用抓包工具fiddle来进行举例说明

  - 1. 首先通过一些途径在客户端安装证书
  - 1. 然后客户端发送连接请求，fiddle在中间截取请求，并返回自己伪造的证书
  - 1. 客户端已经安装了攻击者的根证书，所以验证通过
  - 1. 客户端就会正常和fiddle进行通信，把fiddle当作正确的服务器
  - 1. 同时fiddle会跟原有的服务器进行通信，获取数据以及加密的密钥，去解密密钥

  ##### [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E5%B8%B8%E8%A7%81%E6%94%BB%E5%87%BB%E6%96%B9%E5%BC%8F)常见攻击方式

  - 1. 嗅探：嗅探是一种用来捕获流进和流出的网络数据包的技术，就好像是监听电话一样。比如：抓包工具
  - 1. 数据包注入：在这种，攻击者会将恶意数据包注入到常规数据中的，因为这些恶意数据包是在正常的数据包里面的，用户和系统都很难发现这个内容。
  - 1. 会话劫持：当我们进行一个网站的登录的时候到退出登录这个时候，会产生一个会话，这个会话是攻击者用来攻击的首要目标，因为这个会话，包含了用户大量的数据和私密信息。
  - 1. SSL剥离：HTTPS是通过SSL/TLS进行加密过的，在SSL剥离攻击中，会使SSL/TLS连接断开，让受保护的HTTPS，变成不受 保护的HTTP（这对于网站非常致命）
  - 1. DNS欺骗，攻击者往往通过入侵到DNS服务器，或者篡改用户本地hosts文件，然后去劫持用户发送的请求，然后转发到攻击者想要转发到的服务器
  - 1. ARP欺骗，ARP(address resolution protocol)地址解析协议，攻击者利用APR的漏洞，用当前局域网之间的一台服务器，来冒充客户端想要请求的服务端，向客户端发送自己的MAC地址，客户端无从得到真正的主机的MAC地址，所以，他会把这个地址当作真正 的主机来进行通信，将MAC存入ARP缓存表。
  - 1. 代理服务器

  ##### [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E9%A2%84%E9%98%B2%E6%96%B9%E6%A1%88-7)预防方案：

  - i）用可信的第三方CA厂商
  - ii）不下载未知来源的证书，不要去下载一些不安全的文件
  - iii）确认你访问的URL是HTTPS的，确保网站使用了SSL，确保禁用一些不安全的SSL，只开启：TLS1.1，TLS1.2
  - iv）不要使用公用网络发送一些敏感的信息
  - v）不要去点击一些不安全的连接或者恶意链接或邮件信息

  #### [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#_11-sql-%E6%B3%A8%E5%85%A5)11）sql 注入

  ##### [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E6%8F%8F%E8%BF%B0-4)描述

  就是通过把SQL命令插入到Web表单递交或输入域名或页面请求的查询字符串，最终达到欺骗数据库服务器执行恶意的SQL命令,从而达到和服务器 进行直接的交互

  ##### [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E9%A2%84%E9%98%B2%E6%96%B9%E6%A1%88-8)预防方案：

  - i）后台进行输入验证，对敏感字符过滤。
  - ii）使用参数化查询，能避免拼接SQL，就不要拼接SQL语句。

  #### [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#_12-%E5%89%8D%E7%AB%AF%E6%95%B0%E6%8D%AE%E5%AE%89%E5%85%A8)12）前端数据安全：

  ##### [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E6%8F%8F%E8%BF%B0-5)描述

  反爬虫。如猫眼电影、天眼查等等，以数据内容为核心资产的企业

  ##### [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E9%A2%84%E9%98%B2%E6%96%B9%E6%A1%88-9)预防方案：

  - i）font-face拼接方式：猫眼电影、天眼查
  - ii）background 拼接：美团
  - iii）伪元素隐藏：汽车之家
  - iv）元素定位覆盖式：去哪儿
  - v）iframe 异步加载：网易云音乐

  #### [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#_13-%E5%85%B6%E4%BB%96%E5%BB%BA%E8%AE%AE)13）其他建议

  - i）定期请第三方机构做安全性测试，漏洞扫描
  - ii）使用第三方开源库做上线前的安全测试，可以考虑融合到CI中
  - iii）code review 保证代码质量
  - iv）默认项目中设置对应的 Header 请求头，如 X-XSS-Protection、 X-Content-Type-Options 、X-Frame-Options Header、Content-Security-Policy 等等
  - v）对第三方包和库做检测：NSP(Node Security Platform)，Snyk

## [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E6%8E%8C%E6%8F%A1-%E9%82%A3%E4%BA%9B%E6%93%8D%E4%BD%9C%E4%BC%9A%E9%80%A0%E6%88%90%E5%86%85%E5%AD%98%E6%B3%84%E6%BC%8F)（掌握）那些操作会造成内存泄漏？

- 内存泄漏指任何对象在您不再拥有或需要它之后仍然存在
- `setTimeout` 的第一个参数使用字符串而非函数的话，会引发内存泄漏
- 闭包、控制台日志、循环（在两个对象彼此引用且彼此保留时，就会产生一个循环）

## [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E6%8E%8C%E6%8F%A1-%E4%BA%8B%E4%BB%B6%E4%BC%A0%E6%92%AD%E7%9A%84%E4%B8%89%E4%B8%AA%E9%98%B6%E6%AE%B5%E6%98%AF%E4%BB%80%E4%B9%88)（掌握）事件传播的三个阶段是什么

捕获 > 目标 > 冒泡；在捕获阶段，事件通过父元素向下传递到目标元素。 然后它到达目标元素，冒泡开始。

## [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E6%8E%8C%E6%8F%A1-%E5%90%8C%E6%AD%A5%E5%92%8C%E5%BC%82%E6%AD%A5%E7%9A%84%E5%8C%BA%E5%88%AB)（掌握）同步和异步的区别?

- 同步：浏览器访问服务器请求，用户看得到页面刷新，重新发请求,等请求完，页面刷新，新内容出现，用户看到新内容,进行下一步操作
- 异步：浏览器访问服务器请求，用户正常操作，浏览器后端进行请求。等请求完，页面不刷新，新内容也会出现，用户看到新内容

## [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E6%8E%8C%E6%8F%A1-%E5%89%8D%E7%AB%AF%E5%A6%82%E4%BD%95%E5%8E%8B%E7%BC%A9%E5%9B%BE%E7%89%87)（掌握）前端如何压缩图片

首先介绍下压缩的大概流程

- 通过原生的input标签拿到要上传的图片文件
- 将图片文件转化成img元素标签
- 在canvas上压缩绘制该HTMLImageElement

**核心步骤：**

1. 拿到转化后的img元素后，先取出该元素的宽高度，这个宽高度就是实际图片文件的宽高度。
2. 然后定义一个最大限度的宽高度，如果超过这个限制宽高度，则进行等比例的缩放。
3. 计算好将要压缩的尺寸后，创建canvas实例，设置canvas的宽高度为压缩计算后的尺寸，并将img绘制到上面

```
// 创建画布
const canvas = document.createElement('canvas')
const context = canvas.getContext('2d')
 
// 设置宽高度为等同于要压缩图片的尺寸
 canvas.width = targetWidth
 canvas.height = targetHeight
 context.clearRect(0, 0, targetWidth, targetHeight)
 //将img绘制到画布上
 context.drawImage(img, 0, 0, targetWidth, targetHeight)

```

## [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E4%BA%86%E8%A7%A3-websocket%E5%92%8Chttp%E7%9A%84%E5%8C%BA%E5%88%AB)（了解）WebSocket和HTTP的区别

http协议是用在应用层的协议，他是基于tcp协议的，http协议建立链接也必须要有三次握手才能发送信息。

http链接分为短链接，长链接，短链接是每次请求都要三次握手才能发送自己的信息。即每一个request对应一个response。长链接是在一定的期限内保持链接。保持TCP连接不断开。客户端与服务器通信，必须要有客户端发起然后服务器返回结果。客户端是主动的，服务器是被动的。

WebSocket他是为了解决客户端发起多个http请求到服务器资源浏览器必须要经过长时间的轮训问题而生的，他实现了多路复用，他是全双工通信。在webSocket协议下客服端和浏览器可以同时发送信息。

建立了WenSocket之后服务器不必在浏览器发送request请求之后才能发送信息到浏览器。这时的服务器已有主动权想什么时候发就可以发送信息到服务器。

## [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E4%BA%86%E8%A7%A3-%E6%80%8E%E4%B9%88%E7%A6%81%E6%AD%A2js%E8%AE%BF%E9%97%AEcookie)（了解）怎么禁止js访问cookie？

设置HttpOnly

如果您在cookie中设置了HttpOnly属性，那么通过js脚本将无法读取到cookie信息，这样能有效的防止XSS攻击，

## [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E4%BA%86%E8%A7%A3-%E8%B0%88%E8%B0%88%E4%BD%A0%E5%AF%B9amd%E3%80%81cmd%E7%9A%84%E7%90%86%E8%A7%A3)（了解）谈谈你对AMD、CMD的理解

`AMD` 和 `CMD` 是二种模块定义规范。现在都使用模块化编程，`AMD，异步模块定义`；`CMD，通用模块定义`。AMD依赖前置，CMD依赖就近。CMD的 `API` 职责单一，没有全局`require`，AMD的一个`API`可以多用。

## [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E4%BA%86%E8%A7%A3-new%E6%93%8D%E4%BD%9C%E7%AC%A6%E5%88%B0%E5%BA%95%E5%B9%B2%E4%BA%86%E4%BB%80%E4%B9%88)（了解）new操作符到底干了什么？

```
function Person(name){ 
    //--------------------伪代码----------------------- 
    var obj = new Object(); //创建了空对象 
    this = obj //obj赋值给this 
    this.proto = Person.prototype //实例对象的原型就是构造函数的原型 
    this.name = name;//定义实例属性和方法 
    return this; //返回this 
}

```

## [#](http://kumanxuan1.f3322.net:8360/static/interview/js/#%E4%BA%86%E8%A7%A3-xml%E5%92%8Cjson%E7%9A%84%E5%8C%BA%E5%88%AB)（了解）xml和json的区别

面积：XML体积比JSON体积大

传输速度：JSON比XML执行速度快

结构清晰: JSON在结构上比XML清晰

交互：JSON数据和js有很好的交互性





