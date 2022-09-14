---
title: linux指令汇总
date: 2021-03-29
tags:
 - linux
categories:
 - 技术栈
---
<!-- TOC -->

- [基础操作](#基础操作)
- [安装](#安装)
- [端口和内存](#端口和内存)
- [网络](#网络)
- [Docker](#docker)
- [Kafka](#kafka)

<!-- /TOC -->

## 基础操作

```bash
#移动切换目录
cd ./           #当前文件夹
cd ..           #上一文件夹
cd /            #根目录

#创建文件夹
mkdir kafka
mkdir -p kafka/kafka1/config   #递归创建

#复制文件
cp kafka/kafka1 kafka
cp -r kafka/kafka1 kafka       #递归复制目录

#删除文件
rm kafka
rm -f kafka        #强制删除
rm -rf kafka       #针对目录递归文件、强制删除

#查看和编辑
cat 
nl
vim   i -> esc -> shift :

#查看当前目录
pwd

#移动文件夹
mv

```

## 安装

```bash
#解压 tgz 文件
tar -zxvf  kafka-3.1.0-src.tgz
```

## 端口和内存

```bash
#运行程序
./nginx

#查看端口占用情况
netstat -ntlp

#显示某程序进程
ps -ef|grep nginx
ps aux|grep xxx.jar

#指定端口、指定日志文件启动 jar 包
nohup java -jar fxl.jar >out.txt 2>&1 &

#停止进程
kill -9 xxxx

#查看内存
free -m          #MB
free -h          #GB

#查看某进程内存使用情况
pidstat -p 6492 
pidstat -p 6492 -r 2       #每两秒刷新一次

#查看所有进程内存占用
top                        #再 shift + m (大写M)降序， 小写 c 查看程序文件位置， 小写 d 再设置刷新显示的时间

```

## 网络

```bash
#查看网络情况
ip addr
ifconfig

#检查网络端口是否公开windows
telnet 212.129.153.181 xxxx
```

## Docker

```bash
#下载某一服务
docker pull redis

#启停某一服务
systemctl start docker
systemctl stop docker

#启动容器
docker run -d --name redis -p 6379:6379 redis --requirepass "19970303"

#删除容器
docker ps -a
docker stop 【ID/NAMES】
docker rm 【ID/NAMES】

#删除镜像
docker images
docker rmi -f 【ID】

#查看docker组件的运行状态
docker images     #查看安装的镜像
docker ps         #查看正在运行的容器, 后加 -a 可查看历史容器状态
docker ps -a      #查看已经建立的容器，包括停止的和正在运行的


#启动容器
docker start mysql01(容器名)

#进入容器内部
docker exec -it mysql01 /bin/bash

```

## Kafka

```bash
#启动zookeeper服务
bin/zookeeper-server-start.sh   config/zookeeper.properties

#停止zookeeper服务，用ctrl+c或者
bin/zookeeper-server-stop.sh

#启动kafka服务
bin/kafka-server-start.sh config/server.properties

# 关闭 kafka服务
bin/kafka-server-stop.sh

#查看topic列表
bin/kafka-topics.sh --bootstrap-server localhost:9092 -list

#查看某个topic描述
bin/kafka-topics.sh --describe --topic subway --bootstrap-server localhost:9092

#创建一个topic的生产者
bin/kafka-console-producer.sh --topic studykfk --bootstrap-server localhost:9092

#创建一个topic的消费者
bin/kafka-console-consumer.sh --topic studykfk --from-beginning --bootstrap-server localhost:9092

#后台启动zookeeper和kafka
nohup bin/zookeeper-server-start.sh config/zookeeper.properties &
nohup bin/kafka-server-start.sh config/server.properties &
```