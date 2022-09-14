---
title: SQL指令汇总
date: 2022-05-21
tags:
 - 数据库
categories:
 - 技术栈
---
<!-- TOC -->

- [数据库操作](#数据库操作)
- [表操作](#表操作)
- [视图](#视图)

<!-- /TOC -->

# 数据库操作

```sql
-- 查询所有数据库
SHOW DATABASES;

-- 查询当前数据库
SELECT DATABASE();

-- 创建数据库
CREATE DATABASE [ IF NOT EXISTS ] 数据库名 [ DEFAULT CHARSET 字符集] [COLLATE 排序规则 ];

-- 删除数据库
DROP DATABASE [ IF EXISTS ] 数据库名;

-- 使用数据库
USE 数据库名;
```

# 表操作

```sql
-- 查询当前数据库所有表
SHOW TABLES;

-- 查询表结构
DESC 表名;

-- 查询指定表的建表语句
SHOW CREATE TABLE 表名;

-- 创建表
CREATE TABLE 表名(字段1 字段1类型 [COMMENT 字段1注释], ..., 字段n 字段n类型 [COMMENT 字段n注释])[ COMMENT 表注释 ];
```

# 视图

```sql
--创建视图
create or replace view xxx(视图名) as select id,name from xxx(表名) where id <= 10;

-- 查询视图
show create view xxx; -- 查询创建的 sql

select * from xxx(视图名); -- 查询视图

select * from xxx(视图名) where id < 3; -- 查询视图

-- 修改视图
alter view xxx(视图名) as select id,name from xxx(表名) where id <= 10;
```