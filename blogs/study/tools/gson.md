---
title: Gson 整合与使用
date: 2021-05-11
tags:
 - Gson
categories:
 - 工具栈
---

# Gson 简介

Google Gson是一个简单的基于Java的库，用于将Java对象序列化为JSON，反之亦然。 它是由Google开发的一个开源库。

# SpringBoot 整合 Gson

导入依赖即可使用 

```xml
<dependency>
    <groupId>com.google.code.gson</groupId>
    <artifactId>gson</artifactId>
    <version>2.8.6</version>
</dependency>
```

# 使用场景

## 一、将 JavaBean (对象) 序列号为 Json，与反序列化

序列化

```java
@Autowire
Gson json

Person person = new Person;

// 调用Gson的String toJson(Object)方法将Bean转换为json字符串
String pJson = gson.toJson(person);
```

反序列化

```java
@Autowire
Gson json

// 调用Gson的 <T> t fromJson(String, Class)方法，将Json串转换为对象
Person person = gson.fromJson(pJson, Person.class);
```

## 二、将 List (列表) 序列化为 Json，与反序列化

序列化

```java
@Autowire
Gson json

// 先准备一个List集合
List<Person> list = new ArrayList<Person>();

// 调用Gson的toJson方法
String listJson = gson.toJson(list);
```

反序列化

```java
@Autowire
Gson json

// 调用Gson的 T fromJson(String, Type)将List集合的json串反序列化为List对象
List<Person> plist = gson.fromJson(listJson, new TypeToken<List<Person>>(){}.getType());
```

## 三、将 Map (哈希) 序列化为 Json，与反序列化

序列化

```java
@Autowire
Gson json

// 先准备一个 Map
Map<String, Person> map = new HashMap<>();

// 调用Gson的toJson方法
String mapJson = gson.toJson(map);
```

反序列化

```java
@Autowire
Gson json

Map<String, Person> jsonMap = gson.fromJson(mapJson, new TypeToken<Map<String, Person>>() {}.getType());
```

