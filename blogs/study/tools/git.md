---
title: Git的使用
date: 2021-09-02
tags:
 - Git
categories:
 - 工具栈
---

# git 项目文件颜色含义

绿色——已经加入控制暂未提交；

红色——未加入版本控制；

蓝色——加入，已提交，有改动；

白色——加入，已提交，无改动；

灰色——版本控制已忽略文件；

黄色——被git忽略，不跟踪。


# 将本地项目推到 Gitee 仓库中（方案一）

`前提是已经绑定 gitee 帐号并申请好公钥`

- 首先在 gitee 上建立好仓库

- 找到本地项目文件夹，打开 git bash 终端， 输入 `git init`

- 进入自动创建的 .git 文件夹，打开 config， 添加内容


```
[user]
       name = feiye
       email = 1318017063@qq.com
```

- 回到项目文件夹，打开 git bash 输入 git remote add origin `+gitee 仓库的 https 链接`

- 输入命令 `git pull origin master`

- 输入命令 `git add .`

- 输入命令 `git commit -m  "版本号备注"`

- 输入命令 `git push origin master`，此处如果提示无法合并，输入 `git push -f origin master` 强制推送

小结：此强制推送的方法，只能在刚开始 gitee 仓库没有文件时使用，因为会强行覆盖，所以平时基本不用。