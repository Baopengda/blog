---
title: 个人博客维护经验积累
date: 2022-06-01
tags:
 - 项目积累
categories:
 - 项目
---

<!-- vscode-markdown-toc -->
* 1. [认证 SSL 证书 Nginx 重编译出现模块缺失](#SSLNginx)
* 2. [Nginx 配置 SSL 证书并设置 HTTP 重定向到 HTTPS](#NginxSSLHTTPHTTPS)
* 3. [为服务器静态资源配置 CDN](#CDN)
* 4. [前后端联合实现访问统计](#)

<!-- vscode-markdown-toc-config
	numbering=true
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->


##  1. <a name='SSLNginx'></a>认证 SSL 证书 Nginx 重编译出现模块缺失

配置完 nginx 的 SSL 证书出现错误： the "ssl" parameter requires ngx_http_ssl_module

解决方法：

官网下载同版本 nginx 源码，然后 tar xf 放置在 /root 中

```xml
给编译好的nginx，添加http_ssl_module模块及配置ssl证书
1.切换到源码包：
 
# cd /root/nginx-1.12.0
 
2.进行编译：
 
# ./configure --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_ssl_module
 
3.配置完成后，运行命令：
 
# make
 
make命令执行后，不要进行make install，否则会覆盖安装。
 
4.备份原有已安装好的nginx：
 
# cp /usr/local/nginx/sbin/nginx /usr/local/nginx/sbin/nginx.bak
 
5.停止nginx状态：
 
# /usr/local/nginx/sbin/nginx -s stop
 
6.将编译好的nginx覆盖掉原有的nginx：
 
# cd /root/nginx-1.10.1/
 
# cp ./objs/nginx /usr/local/nginx/sbin/
 
7.提示是否覆盖，输入yes即可。
 
8.然后启动nginx：
 
# /usr/local/nginx/sbin/nginx
 
9.进入nginx/sbin目录下，通过命令查看模块是否已经加入成功：
 
# cd /usr/local/nginx/sbin/
 
# ./nginx -V
 
10.有以下提示，证明已经编译成功：
 
nginx version: nginx/1.12.0
built by gcc 4.8.5 20150623 (Red Hat 4.8.5-39) (GCC)
built with OpenSSL 1.0.2k-fips 26 Jan 2017
TLS SNI support enabled
configure arguments: --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_ssl_module
```

##  2. <a name='NginxSSLHTTPHTTPS'></a>Nginx 配置 SSL 证书并设置 HTTP 重定向到 HTTPS

在 Nginx 的 conf 文件中，在 http 代码块中，加入两个 server 代码块

```xml
server {
    listen 80;
    server_name yourdomain; #需要将yourdomain替换成证书绑定的域名。
    rewrite ^(.*)$ https://$host$1; #将所有HTTP请求通过rewrite指令重定向到HTTPS。
    location / {
        index index.html index.htm;
    }
}

#以下属性中，以ssl开头的属性表示与证书配置有关。
server {
    listen 443 ssl;
    #配置HTTPS的默认访问端口为443。
    #如果未在此处配置HTTPS的默认访问端口，可能会造成Nginx无法启动。
    #如果您使用Nginx 1.15.0及以上版本，请使用listen 443 ssl代替listen 443和ssl on。
    server_name yourdomain; #需要将yourdomain替换成证书绑定的域名。
    root html;
    index index.html index.htm;
    ssl_certificate cert/cert-file-name.pem;  #需要将cert-file-name.pem替换成已上传的证书文件的名称。
    ssl_certificate_key cert/cert-file-name.key; #需要将cert-file-name.key替换成已上传的证书私钥文件的名称。
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    #表示使用的加密套件的类型。
    ssl_protocols TLSv1.1 TLSv1.2 TLSv1.3; #表示使用的TLS协议的类型。
    ssl_prefer_server_ciphers on;
    location / {
        root html;  #Web网站程序存放目录。
        index index.html index.htm;
    }
}
```

##  3. <a name='CDN'></a>为服务器静态资源配置 CDN

[参考](https://www.bilibili.com/video/BV1Dt41137VD?from=search&seid=14127734098783589772&spm_id_from=333.337.0.0)

设置好四个方面：

- 对象存储
- CDN 配置并配置 HTTP 头解决跨域
- DNS 解析
- 项目配置自动去二级域名申请静态资源
- 图片图床

效果：

原本 1.5 s 加载出来的500k 图片，现在控制在 100ms 以内


对于项目配置，可以在 config.js 中配置如下：

```js
const path = require('path')

module.exports = {

  configureWebpack: () => {
    const NODE_ENV = process.env.NODE_ENV
    //判断是否是生产环境
    if(NODE_ENV === 'production'){
      return {
        output: {
          publicPath: 'https://cdn.feiyeorz.cn/'
        },
        resolve: {
          //配置路径别名
          alias: {
            'public': path.resolve(__dirname, './public') 
          }
        }
      }
    }else{
      return {
        resolve: {
          //配置路径别名
          alias: {
            'public': path.resolve(__dirname, './public') 
          }
        }
      }
    }
},
```

##  4. <a name=''></a>前后端联合实现访问统计

