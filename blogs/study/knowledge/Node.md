---
title: Nodejs 面经篇
date: 2022-05-20
tags:
 - Nodejs
categories:
 - 面经
---
## （掌握）Http和Https的区别？

http协议和https协议的区别：传输信息安全性不同、连接方式不同、端口不同、证书申请方式不同

**一、传输信息安全性不同**

1、http协议：是超文本传输协议，信息是明文传输。如果攻击者截取了Web浏览器和网站服务器之间的传输报文，就可以直接读懂其中的信息。

2、https协议：是具有安全性的ssl加密传输协议，为浏览器和服务器之间的通信加密，确保数据传输的安全。

**二、连接方式不同**

1、http协议：http的连接很简单，是无状态的。

2、https协议：是由SSL＋HTTP协议构建的可进行加密传输、身份认证的网络协议。 **三、端口不同**

1、http协议：使用的端口是80。

2、https协议：使用的端口是443．

**四、证书申请方式不同**

1、http协议：免费申请。

2、https协议：需要到ca申请证书，一般免费证书很少，需要交费。

## [#](http://kumanxuan1.f3322.net:8360/static/interview/nodejs/#%E6%8E%8C%E6%8F%A1-http%E4%B8%8Etcp%E7%9A%84%E5%85%B3%E7%B3%BB-%E4%BB%8B%E7%BB%8D%E4%B8%80%E4%B8%8Btcp%E7%9A%84%E4%B8%89%E6%AC%A1%E6%8F%A1%E6%89%8B-%E8%83%BD%E5%90%A6%E4%B8%BA%E4%B8%A4%E6%AC%A1%E6%8F%A1%E6%89%8B-%E4%B8%BA%E4%BB%80%E4%B9%88-%E5%9B%9B%E6%AC%A1%E6%8C%A5%E6%89%8B)（掌握）HTTP与TCP的关系，介绍一下TCP的三次握手，能否为两次握手，为什么？四次挥手

HTTP是基于TCP协议的，所以每次都是客户端发送请求，服务器应答，但是TCP还可以给其他应用层提供服务，即可能A、B在建立链接之后，谁都可能先开始通信。

要知道TCP是**全双工**的，即客户端在给服务器端发送信息的同时，服务器端也可以给客户端发送信息。而半双工的意思是A可以给B发，B也可以给A发，但是A在给B发的时候，B不能给A发，即不同时，为半双工。 单工为只能A给B发，B不能给A发； 或者是只能B给A发，不能A给B发。

**TCP三次握手：**

第一次握手：客户端发送一个TCP的SYN（同步，代表开始会话请求）标志位置1的包指明客户打算连接的服务器的端口，以及初始序号X,保存在包头的序列号(Sequence Number)字段里

第二次握手 ：服务器发回确认包(ACK)应答。即SYN标志位和ACK标志位均为1同时，将确认序号(Acknowledgement Number)设置为客户的I S N加1以.即X+1。

第三次握手：客户端再次发送确认包(ACK) SYN标志位为0,ACK标志位为1.并且把服务器发来ACK的序号字段+1,放在确定字段中发送给对方.并且在数据段放写ISN的+1

如果两次，那么服务器无法确定服务器的信息**客户端**是否能收到，所以如果服务器先发送数据，可能后面的客户端都收不到，会出现问题 。

**TCP四次挥手：**

第一次挥手：首先客户端想要释放连接，向服务器发送一段报文（FIN：结束会话）；

第二次挥手：服务器接收到客户端发送过来的报文，确定了客户端要释放连接；随后服务器进入CLOSE-WAIT阶段（半关闭状态）并返回一段报文给客户端（ASK：应答）；

第三次挥手：服务器自从发送了ASK（应答）后，经过CLOSE-WAIT阶段（在这个阶段把没有发送完的数据先完成发送），做好了释放服务器端到客户端方向上的连接，再次向客户端发送报文（FIN：结束会话）

第四次挥手：客户端接收到服务器端发送的释放连接的报文，确定服务器做好释放连接的准备，最后客户端再次向服务器发送一段报文（ASK：应答）

![img](http://kumanxuan1.f3322.net:8360/static/interview/tcp1.jpeg)

## [#](http://kumanxuan1.f3322.net:8360/static/interview/nodejs/#%E6%8E%8C%E6%8F%A1-http-method)（掌握）HTTP method

1. 一台服务器要与`HTTP1.1`兼容，只要为资源实现`GET`和`HEAD`方法即可。
2. `GET`是最常用的方法，通常`用于请求服务器`发送某个资源。
3. `HEAD` 与 `GET` 类似，但服务器在响应中值返回首部，不返回实体的主体部分。
4. `PUT` 让服务器用请求的主体部分来创建一个由所请求的 `URL` 命名的新文档，或者，如果那个 `URL` 已经存在的话，就用干这个主体替代它。
5. `POST` 起初是用来向服务器输入数据的。实际上，通常会用它来支持HTML的表单。表单中填好的数据通常会被送给服务器，然后由服务器将其发送到要去的地方。
6. `TRACE` 会在目的服务器端发起一个`环回诊断`，最后一站的服务器会弹回一个`TRACE`响应并在响应主体中携带它收到的`原始请求报文`。`TRACE` 方法主要用于诊断，用于验证请求`是否如愿穿过了请求/响应链`。
7. `OPTIONS` 方法请求 `web` 服务器告知其支持的各种功能。可以查询服务器支持哪些方法或者对某些特殊资源支持哪些方法。
8. `DELETE` 请求服务器删除请求 `URL` 指定的资源。

## [#](http://kumanxuan1.f3322.net:8360/static/interview/nodejs/#%E6%8E%8C%E6%8F%A1-http%E7%8A%B6%E6%80%81%E7%A0%81%E5%8F%8A%E5%85%B6%E5%90%AB%E4%B9%89)（掌握）HTTP状态码及其含义

> **举例状态码类型**:

| 状态码  | 类别                     | 原因短语                                     |
| ---- | ---------------------- | ---------------------------------------- |
| 1XX  | Information（信息性状态码）    | 接收的请求正在处理                                |
| 2XX  | Success（成功状态码）         | 请求正常处理完毕                                 |
| 3XX  | Redirection（重定向状态码）    | 需要进行附加的操作以完成请求                           |
| 4XX  | Client Error（客户端错误状态码） | 服务器无法处理请求                                |
| 5XX  | Server Error（服务端错误状态码） | 服务器处理请求出错                                |
| 204  |                        | 服务器成功处理，但未返回内容。                          |
| 304  | Not Modified 未修改。      | 所请求的资源未修改，服务器返回此状态码时，不会返回任何资源。客户端通常会缓存访问过的资源，通过提供一个头信息指出客户端希望只返回在指定日期之后修改的资源 |
| 400  | Bad Request            | 客户端请求的语法错误，服务器无法理解                       |
| 403  | Forbidden              | 服务器理解请求客户端的请求，但是拒绝执行此请求                  |
| 404  | Not Found              | 服务器无法根据客户端的请求找到资源（网页）。通过此代码，网站设计人员可设置"您所请求的资源无法找到"的个性页面 |

## [#](http://kumanxuan1.f3322.net:8360/static/interview/nodejs/#%E6%8E%8C%E6%8F%A1-%E4%B8%BA%E4%BB%80%E4%B9%88javascript%E6%98%AF%E5%8D%95%E7%BA%BF%E7%A8%8B)（掌握）为什么JavaScript是单线程？

- 防止DOM渲染冲突的问题；
- Html5中的Web Worker可以实现多线程

## [#](http://kumanxuan1.f3322.net:8360/static/interview/nodejs/#%E6%8E%8C%E6%8F%A1-%E5%90%8C%E6%AD%A5%E5%92%8C%E5%BC%82%E6%AD%A5%E4%BB%BB%E5%8A%A1)（掌握）同步和异步任务

- 同步任务指的是，在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；
- 异步任务指的是，不进入主线程、而进入"任务队列"（task queue）的任务，只有"任务队列"通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。

## [#](http://kumanxuan1.f3322.net:8360/static/interview/nodejs/#%E6%8E%8C%E6%8F%A1-%E4%BB%80%E4%B9%88%E6%98%AF%E4%BA%8B%E4%BB%B6%E5%BE%AA%E7%8E%AF-eventloop)（掌握）什么是事件循环（EventLoop）？

**node中的 Event Loop**

Node 中的 Event Loop 和浏览器中的是完全不相同的东西。Node.js采用V8作为js的解析引擎，而I/O处理方面使用了自己设计的libuv，libuv是一个基于事件驱动的跨平台抽象层，封装了不同操作系统一些底层特性，对外提供统一的API，事件循环机制也是它里面的实现

[![img](https://raw.githubusercontent.com/XQY279/blog/master/image/bg2014100803.png)(opens new window)](https://raw.githubusercontent.com/XQY279/blog/master/image/bg2014100803.png)

根据上图node的运行机制如下

1. V8引擎解析JavaScript脚本。
2. 解析后的代码，调用Node API。
3. libuv库负责Node API的执行。它将不同的任务分配给不同的线程，形成一个Event Loop（事件循环），以异步的方式将任务的执行结果返回给V8引擎。
4. V8引擎再将结果返回给用户。

**六大阶段**

其中libuv引擎中的事件循环分为 6 个阶段，它们会按照顺序反复运行。每当进入某一个阶段的时候，都会从对应的回调队列中取出函数去执行。当队列为空或者执行的回调函数数量到达系统设定的阈值，就会进入下一阶段。

[![img](https://raw.githubusercontent.com/XQY279/blog/master/image/libuv.png)(opens new window)](https://raw.githubusercontent.com/XQY279/blog/master/image/libuv.png)

1. `timers` 阶段：这个阶段执行timer（setTimeout、setInterval）的回调，并且是由 poll 阶段控制的。
2. `I/O callbacks` 阶段：处理一些上一轮循环中的少数未执行的 I/O 回调
3. `idle, prepare` 阶段：仅node内部使用
4. `poll` 阶段：获取新的I/O事件, 适当的条件下node将阻塞在这里
5. `check` 阶段：执行 setImmediate() 的回调
6. `close callbacks` 阶段：执行 socket 的 close 事件回调

**poll阶段**

poll 是一个至关重要的阶段，这一阶段中，系统会做两件事情

1.回到 timer 阶段执行回调

2.执行 I/O 回调

并且在进入该阶段时如果没有设定了 timer 的话，会发生以下两件事情

- 如果 poll 队列不为空，会遍历回调队列并同步执行，直到队列为空或者达到系统限制
- 如果 poll 队列为空时，会有两件事发生
  - 如果有 setImmediate 回调需要执行，poll 阶段会停止并且进入到 check 阶段执行回调
  - 如果没有 setImmediate 回调需要执行，会等待回调被加入到队列中并立即执行回调，这里同样会有个超时时间设置防止一直等待下去

当然设定了 timer 的话且 poll 队列为空，则会判断是否有 timer 超时，如果有的话会回到 timer 阶段执行回调。

**Micro-Task 与 Macro-Task**

Node端事件循环中的异步队列也是这两种：macro（宏任务）队列和 micro（微任务）队列。

- 常见的 macro-task 比如：`setTimeout`、`setInterval`、 `setImmediate`、`script（整体代码`）、`I/O 操作等`。
- 常见的 micro-task 比如: `process.nextTick`、`new Promise().then(回调)`等。

**setTimeout 和 setImmediate**

二者非常相似，区别主要在于调用时机不同。

- setImmediate 设计在poll阶段完成时执行，即check阶段；
- setTimeout 设计在poll阶段为空闲时，且设定时间到达后执行，但它在timer阶段执行

```
setTimeout(function timeout () {
  console.log('timeout');
},0);
setImmediate(function immediate () {
  console.log('immediate');
});

```

1. 对于以上代码来说，setTimeout 可能执行在前，也可能执行在后。
2. 首先 setTimeout(fn, 0) === setTimeout(fn, 1)，这是由源码决定的 进入事件循环也是需要成本的，如果在准备时候花费了大于 1ms 的时间，那么在 timer 阶段就会直接执行 setTimeout 回调
3. 如果准备时间花费小于 1ms，那么就是 setImmediate 回调先执行了

**process.nextTick**

这个函数其实是独立于 Event Loop 之外的，它有一个自己的队列，当每个阶段完成后，如果存在 nextTick 队列，就会清空队列中的所有回调函数，并且优先于其他 microtask 执行

**4）Node与浏览器的 Event Loop 差异**

[![img](https://raw.githubusercontent.com/XQY279/blog/master/image/diff.png)(opens new window)](https://raw.githubusercontent.com/XQY279/blog/master/image/diff.png)

- Node端，microtask 在事件循环的各个阶段之间执行
- 浏览器端，microtask 在事件循环的 macrotask 执行完之后执行

## [#](http://kumanxuan1.f3322.net:8360/static/interview/nodejs/#%E6%8E%8C%E6%8F%A1-%E4%BB%80%E4%B9%88%E6%98%AF%E5%86%85%E5%AD%98%E6%B3%84%E6%BC%8F-%E4%BB%A5%E5%8F%8A%E5%B8%B8%E8%A7%81%E5%86%85%E5%AD%98%E6%B3%84%E6%BC%8F%E7%9A%84%E5%8E%9F%E5%9B%A0-%E5%92%8C%E6%8E%92%E6%9F%A5%E7%9A%84%E6%96%B9%E6%B3%95)（掌握）什么是内存泄漏，以及常见内存泄漏的原因，和排查的方法

**1、概念**

内存泄漏(Memory Leak)指由于疏忽或错误造成程序未能释放已经不再使用的内存的情况。如果内存泄漏的位置比较关键，那么随着处理的进行可能持有越来越多的无用内存，这些无用的内存变多会引起服务器响应速度变慢。

**2、原因**

严重的情况下导致内存达到某个极限(可能是进程的上限，如 v8 的上限;也可能是系统可提供的内存上限)会使得应用程序崩溃。常见内存泄漏的原因内存泄漏的几种情况:

- #### [#](http://kumanxuan1.f3322.net:8360/static/interview/nodejs/#%E5%85%A8%E5%B1%80%E5%8F%98%E9%87%8F)全局变量

全局变量直接挂在 root 对象上，不会被清除掉。

- #### [#](http://kumanxuan1.f3322.net:8360/static/interview/nodejs/#%E9%97%AD%E5%8C%85)闭包

闭包会引用到父级函数中的变量，如果闭包未释放，就会导致内存泄漏。

- #### [#](http://kumanxuan1.f3322.net:8360/static/interview/nodejs/#%E4%BA%8B%E4%BB%B6%E7%9B%91%E5%90%AC)事件监听

Node.js 的事件监听也可能出现的内存泄漏。例如对同一个事件重复监听，忘记移除(removeListener)，将造成内存泄漏。这种情况很容易在复用对象上添加事件时出现。

**3、排查方法**

- 想要定位内存泄漏，通常会有两种情况：
- 对于只要正常使用就可以重现的内存泄漏，这是很简单的情况只要在测试环境模拟就可以排查了。
- 对于偶然的内存泄漏，一般会与特殊的输入有关系。想稳定重现这种输入是很耗时的过程。如果不能通过代码的日志定位到这个特殊的输入，那么推荐去生产环境打印内存快照了。
- 需要注意的是，打印内存快照是很耗 CPU 的操作，可能会对线上业务造成影响。快照工具推荐使用 heapdump 用来保存内存快照，使用 devtool 来查看内存快照。
- 使用 heapdump 保存内存快照时，只会有 Node.js 环境中的对象，不会受到干扰(如果使用 node-inspector 的话，快照中会有前端的变量干扰)。

## [#](http://kumanxuan1.f3322.net:8360/static/interview/nodejs/#%E6%8E%8C%E6%8F%A1-%E7%AE%80%E8%BF%B0ajax%E5%8E%9F%E7%90%86%E5%92%8Cxmlhttprequest%E5%AF%B9%E8%B1%A1)（掌握）简述ajax原理和XmlHttpRequest对象

Ajax的原理简单来说通过XmlHttpRequest对象来向服务器发送异步请求，从服务器获得数据，然后用javascript来操作DOM而更新页面。这其中最关键的一步就是从服务器获得请求数据。要清楚这个过程和原理，我们必须对 XMLHttpRequest有所了解。

XMLHttpRequest是ajax的核心机制，它是在IE5中首先引入的，是一种支持异步请求的技术。简单的说，也就是javascript可以及时向服务器提出请求和处理响应，而不阻塞用户。达到无刷新的效果。

## [#](http://kumanxuan1.f3322.net:8360/static/interview/nodejs/#%E6%8E%8C%E6%8F%A1-%E7%AE%80%E8%BF%B0jwt-json-web-token-%E9%89%B4%E6%9D%83%E7%9A%84%E5%8E%9F%E7%90%86)（掌握）简述JWT（JSON Web Token）鉴权的原理

![img](http://kumanxuan1.f3322.net:8360/static/interview/jwt.jpg)

## [#](http://kumanxuan1.f3322.net:8360/static/interview/nodejs/#%E4%BA%86%E8%A7%A3-%E4%B8%80%E4%B8%AAtcp%E6%8E%A5%E8%BF%9E%E8%83%BD%E5%8F%91%E5%87%A0%E4%B8%AAhttp%E8%AF%B7%E6%B1%82)（了解）一个tcp接连能发几个http请求？

1. http 1.0 默认一次tcp连接进行一次http请求之后就会断开（由于资源浪费，有些服务器支持通过配置支持多次）
2. http 1.1 请求头配置：Connection:keep-alive = true，只要tcp连接不断开（默认2小时），一直可以进行http请求，但是一个tcp连接同一时间只支持一个http请求 Connection:keep-alive = false，只能发一次http请求
3. http 2.0：多路复用技术Multiplexing，一个tcp可以并发多个http请求（理论无上限，但是一般浏览器会有tcp并发数的限制）‘

## [#](http://kumanxuan1.f3322.net:8360/static/interview/nodejs/#%E4%BA%86%E8%A7%A3-nodejs%E4%B8%AD%E9%97%B4%E4%BB%B6%E5%8E%9F%E7%90%86)（了解）NodeJs中间件原理

中间件其实就是一个函数

```
function(req,res,next){ req:请求对象 res：响应对象 next：下一个中间件 }

```

简单描述

- 洋葱圈模型，就是说中间件执行就像洋葱一样，最早use的中间件，就放在最外层。处理顺序从左到右，左边接收一个request，右边输出返回response
- 一般的中间件都会执行两次，调用next之前为第一次，调用next时把控制传递给下游的下一个中间件。当下游不再有中间件或者没有执行next函数时，就将依次恢复上游中间件的行为，让上游中间件执行next之后的代码

![img](http://kumanxuan1.f3322.net:8360/static/interview/03.png)

(洋葱圈模型，了解一下)

## [#](http://kumanxuan1.f3322.net:8360/static/interview/nodejs/#%E4%BA%86%E8%A7%A3-nodejs%E7%9A%84%E4%B8%AD%E9%97%B4%E4%BB%B6)（了解）nodejs的中间件?

在NodeJS中，中间件主要是指封装所有Http请求细节处理的方法。一次Http请求通常包含很多工作，如记录日志、ip过滤、查询字符串、请求体解析、Cookie处理、权限验证、参数验证、异常处理等，但对于Web应用而言，并不希望接触到这么多细节性的处理，因此引入中间件来简化和隔离这些基础设施与业务逻辑之间的细节，让开发者能够关注在业务的开发上，以达到提升开发效率的目的。中间件的行为比较类似Java中过滤器的工作原理，就是在进入具体的业务处理之前，先让过滤器处理。

## [#](http://kumanxuan1.f3322.net:8360/static/interview/nodejs/#%E4%BA%86%E8%A7%A3-cookies%E6%9C%BA%E5%88%B6%E5%92%8Csession%E6%9C%BA%E5%88%B6%E7%9A%84%E5%8C%BA%E5%88%AB)（了解）cookies机制和session机制的区别

1、cookies数据保存在客户端。session数据保存在服务端

2、cookies可以减轻服务器压力，但是不安全，容易进行cookies欺骗

3、session安全一点，但是占用服务器资源。

## [#](http://kumanxuan1.f3322.net:8360/static/interview/nodejs/#%E4%BA%86%E8%A7%A3-%E4%BD%A0%E7%9F%A5%E9%81%93%E5%93%AA%E4%BA%9Bhttp%E5%A4%B4%E9%83%A8)（了解）你知道哪些http头部？

HTTP Request Header 请求头

> **Accept：**指定客户端能够接收的内容类型。
>
> **Accept-Charset：**浏览器可以接受的字符编码集。
>
> **Accept-Encoding：**指定浏览器可以支持的web服务器返回内容压缩编码类型。
>
> **Accept-Language：**浏览器可接受的语言。
>
> **Cache-Control：**指定请求和响应遵循的缓存机制。
>
> **Connection：**表示是否需要持久连接。（HTTP 1.1默认进行持久连接）
>
> **CookieHTTP：**请求发送时，会把保存在该请求域名下的所有cookie值一起发送给web服务器。
>
> **Content-Length：**请求的内容长度。
>
> **Content-Type：**请求的与实体对应的MIME信息。
>
> **Date：**请求发送的日期和时间。
>
> **From：**发出请求的用户的Email。
>
> **Host：**指定请求的服务器的域名和端口号。
>
> **Referer：**先前网页的地址，当前请求网页紧随其后,即来路。
>
> **User-Agent：**的内容包含发出请求的用户信息。