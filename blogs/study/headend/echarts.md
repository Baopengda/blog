---
title: Echarts 定时请求后台刷新数据
date: 2021-11-15
tags:
 - Vue
categories:
 - 技术栈
---

## 在 mounted 中定时获取数据

```js
mounted() {
    //axios 定时1秒获取曲线xy数据
    if (this.timer) {
      clearInterval(this.timer);
    } else {
      this.timer = setInterval(() => {
        this.getFaultSignalInfoList();
      }, 1000);
    }
}
```

## 在 destroyed 中定义销毁定时器

否则当页面切换时，也会保持向后端请求

```js
//销毁动态更新的定时器
  destroyed() {
    clearInterval(this.timer);
  }
```