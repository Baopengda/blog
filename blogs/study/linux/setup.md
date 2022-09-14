---
title: linux 环境搭建汇总
date: 2021-04-12
tags:
 - linux
categories:
 - 技术栈
---

<!-- TOC -->

- [Apache 服务](#apache-服务)
- [MySQL 数据库](#mysql-数据库)
- [PHP](#php)
- [Java](#java)
- [Kafka](#kafka)
- [Docker](#docker)
  - [安装](#安装)
  - [配置加速服务](#配置加速服务)
  - [docker 安装 mysql](#docker-安装-mysql)
    - [修改配置文件](#修改配置文件)
    - [检查容器内配置文件](#检查容器内配置文件)
  - [docker 安装 Redis](#docker-安装-redis)
    - [下载最新镜像](#下载最新镜像)
    - [创建实例并启动](#创建实例并启动)
  - [docker 安装 timescaleDB](#docker-安装-timescaledb)

<!-- /TOC -->

# Apache 服务

```bash
#安装Apache服务及其扩展包

yum -y install httpd httpd-manual mod_ssl mod_perl mod_auth_mysql

#启动Apache服务

systemctl start httpd.service

#Apache默认监听80端口，所以只需在浏览器访问ECS分配的IP地址http://<ECS公网IP>
```

# MySQL 数据库

```bash
#下载并安装MySQL,要一次性粘贴!!

wget http://dev.mysql.com/get/mysql57-community-release-el7-10.noarch.rpm &&
yum -y install mysql57-community-release-el7-10.noarch.rpm &&
yum -y install mysql-community-server

#启动MySQL数据库

systemctl start mysqld.service

#查看MySQL初始密码

grep "password" /var/log/mysqld.log

#登录数据库

mysql -uroot -p

#修改MySQL默认密码

set global validate_password_policy=0;  #修改密码安全策略为低（只校验密码长度，至少8位）。
ALTER USER 'root'@'localhost' IDENTIFIED BY '19970303';

#授予root用户远程管理权限

GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '19970303';

#输入exit退出数据库
```

# PHP

```bash
#安装PHP环境

yum -y install php php-mysql gd php-gd gd-devel php-xml php-common php-mbstring php-ldap php-pear php-xmlrpc php-imap

#创建PHP测试页面
echo "<?php phpinfo(); ?>" > /var/www/html/phpinfo.php

#重启Apache服务

systemctl restart httpd

#访问http://<ECS公网IP>/phpinfo.php
```

# Java

```bash
#(1)查看系统是否安装过java

yum list installed | grep java

#(2)如果有旧版本的java，可以用如下方法卸载java

yum -y remove java-1.8.0-openjdk*

#(3)查看yum包已有的包列表yum -y list java*

yum -y list java*

#(4)下载安装java1.8的所有软件包

yum install java-1.8.0-openjdk*

#(5)输入如下命令检查是否安装成功

java -version

#(6)环境变量的配置
# 使用yum安装的java的默认安装路径在 /usr/lib/jvm
# 如果想全体用户都可以使用java的话，需要修改/etc/profile文件，添加JAVA_HOME

vim /etc/profile

#在文件的结尾添加如下

#set java environment  

export JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.191.b12-0.el7_5.x86_64（这个文件名不一样）

export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar:$JAVA_HOME/jre/lib/rt.jar

export PATH=$PATH:$JAVA_HOME/bin

:wq

#使配置生效

source /etc/profile

#验证JAVA_HOME

echo $JAVA_HOME

#验证以下命令是否有响应

java

javac
```

# Kafka

```bash
############################################1111111.起步配置
#移到目录
cd usr/local

#解压
tar -zxvf kafka_2.13-3.1.0.tgz

#修改server.properties
vim usr/local/kafka_2.13-3.1.0/config/server.properties

#####修改内容：
broker.id=1
log.dirs=/data/kafka/logs-1
#######
############################################222222.启动kafka环境，即zookeeper和kafka
#通过与kafka打包在一起的便捷脚本来快速简单地创建一个单节点ZooKeeper实例

bin/zookeeper-server-start.sh   config/zookeeper.properties

#再开个终端，运行kafka

bin/kafka-server-start.sh config/server.properties

#运行kafka报错内存不足，原因kafka-server-start.sh默认设置最低1G内存启动
vim kafka-server-start.sh

#####修改内存
#将export KAFKA_HEAP_OPTS="-Xmx1G -Xms1G" 的 Xms1G改成  Xms500m
#####

################################################33333333.创建topic存储事件
#再新开一个终端，第3个了
#使用 kafka-topics.sh 创建单分区单副本的topic studykfk

bin/kafka-topics.sh --bootstrap-server localhost:9092 --create --topic studykfk --partitions 1 --replication-factor 1

#查看topic列表
bin/kafka-topics.sh --bootstrap-server localhost:9092 -list

#查看主题信息
bin/kafka-topics.sh --describe --topic studykfk --bootstrap-server localhost:9092

#新开一个终端4，创建生产者，输入消息
bin/kafka-console-producer.sh --topic studykfk --bootstrap-server localhost:9092

#新开个终端5，创建消费者接收消息
bin/kafka-console-consumer.sh --topic studykfk --from-beginning --bootstrap-server localhost:9092

################################################444444.关闭终端
Stop the `producer` and `consumer` clients with Ctrl-C, if you haven't done so already.
Stop the `Kafka broker` with Ctrl-C.
Lastly, stop the `ZooKeeper server` with Ctrl-C.
```

# Docker

见官方网站安装方式，因为阿里云仓库或者命令的更新，老旧的安装命令可能失效，以官网为准!

https://docs.docker.com/engine/install/centos/

## 安装

```bash
#卸载旧版本
 sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine

#安装所需工具包 Docker Engine-Community
sudo yum install -y yum-utils

#设置镜像仓库
sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo 
	
#######	222   社区版  ce   企业版 ee
sudo yum install docker-ce docker-ce-cli containerd.io

#启动docker
sudo systemct1 start docker

#使用docker  version和hello-world查看启动成功
docker version

docker run hello-world


#查看docker组件的运行状态
docker ps
docker images
docker search mysql
```

## 配置加速服务

使用阿里云容器镜像服务中的镜像加速器，设置阿里云加速

```bash
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://abb2x8q8.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```

## docker 安装 mysql

```bash
# 从官网找到要下载的 tag 版本号
# https://hub.docker.com/_/mysql?tab=tags

#拉取5.7版本
docker pull mysql:5.7

#查看mysql已经存在在docker镜像中
docker images

#创建实例并启动
#后台运行  -d
#端口映射  -p 3306：3306 将容器的3306端口映射到主机的3306端口
#数据卷挂载(目录)   -v  相当于快捷方式，从 linux 文件就可以观察容器内部文件的内容--外部：内部
#参数配置  -e
#容器名字  --name
#两个v,可以用于一个指定数据,一个指定配置文件
#注意，-v 主机目录:容器目录，此处的容器目录应填写主机中配置文件位置,主机目录写主机中的一个备份目录,可以是新建的新文件
docker run -p 3306:3306 --name mysql01 --privileged=true -v /data/docker/mysql/conf:/etc/mysql/conf.d -v /data/docker/mysql/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=19970303 -d mysql:5.7

#如果启动不了mysql镜像且报错端口被占用,查看端口并杀掉对应进程
netstat -tanlp
#此处杀掉的不是端口号而是对应的pid进程
kill 11227

#再次启动mysql 容器
dokcer start mysql01
```

### 修改配置文件

移动到linux 下，由容器挂载的目录中，data/docker/mysql/conf

```bash
vi my.cnf
```

写入下面配置

```bash
[client]
default-character-set=utf8

[mysql]
default-character-set=utf8

[mysqld]
init_connect='SET collation_connection = utf8_unicode_ci'
init_connect='SET NAMES utf8'
character-set-server=utf8
collation-server=utf8_unicode_ci
skip-character-set-client-handshake
skip-name-resolve
```

### 检查容器内配置文件

```bash
docker exec -it mysql /bin/bash

cat /etc/mysql/conf.d/my.cnf
```

## docker 安装 Redis

### 下载最新镜像

```bash
docker pull redis
```

### 创建实例并启动

1. 先创建挂载的文件

```bash
cd /data/docker

mkdir redis/conf

touch redis.cnf
```


2. 以完整参数启动 redis

```bash
#  -p 端口映射
#  -v 数据卷挂载
#  -d 后台运行并指定了以配置文件启动
#     设置好密码
docker run -p 6379:6379 --name redis -v /data/docker/redis/data:/data -v /data/docker/redis/conf/redis.cnf:/etc/redis/redis.conf -d redis redis-server /etc/redis/redis.conf --requirepass "19970303"
```

3. 检查

```bash
docker exec -it redis redis-cli

auth 19970303

>> set a b

>> get a
```

4. 配置文件使得 redis 可持久化

以 aof 模式持久化，否则 redis 在关机后再打开，数据会丢失

注意：最新版redis，已经默认 aof 了

```bash
vim redis.cnf
```
加上

```bash
appendonly yes
```

## docker 安装 timescaleDB

1. 拉取镜像

```bash
docker pull timescale/timescaledb
```

2. 创建外部挂载文件

```bash
mkdir -p /home/docker/timescaledb/data
```

3. 启动镜像(待做)

```bash
docker run \
-d \
-p 15432:5432 \
--name timescaledb \
-e POSTGRES_PASSWORD=19970303 \
-v /home/docker/timescaledb/data:/var/lib/postgresql/data \
timescale/timescaledb:latest-pg11 
```

[参考网址](https://blog.csdn.net/qq314499182/article/details/106714476?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522165495373416781683988818%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=165495373416781683988818&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~blog~sobaiduend~default-1-106714476-null-null.nonecase&utm_term=docker+%E5%AE%89%E8%A3%85timescaledb&spm=1018.2226.3001.4450)