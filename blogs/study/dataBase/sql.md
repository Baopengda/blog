---
title: 数据库操作
date: 2020-10-15
tags:
 - 数据库
categories:
 - 技术栈
---

带有time的排序去重
~~~sql
    select state_param_name, carriage1_param_value, 
    carriage2_param_value, carriage3_param_value, 
    carriage4_param_value, carriage5_param_value, 
    carriage6_param_value from
    (
    SELECT *,ROW_NUMBER()over(partition by param_id order by time desc) as disorder 
    	FROM public.train_state_info
    	where train_id = 1 and time > now() - interval '15 hours'
    ) as T
    	
    where T.disorder = 1
~~~
解决分组去重排序问题

ROW_NUMBER() OVER()函数用法详解 （分组排序 例子多）


解决！
~~~sql
    ***按时间条件+参数id查询
    select state_param_name, carriage1_param_value, 
    carriage2_param_value, carriage3_param_value, 
    carriage4_param_value, carriage5_param_value, 
    carriage6_param_value from
    (
    SELECT *,ROW_NUMBER()over(partition by param_id order by time desc) as disorder 
    	FROM public.train_state_info
    	where train_id = '2' and time > now() - interval '15 hours' and param_id between 200 and 299
    ) as T
    	
    where T.disorder = 1
~~~
解析：括号中的row_number函数作用是新建一个disorder列,该列为分组排序后的序号1231234之类,但over括号需要在查询完满足where结果之后执行新建列,所以,需要将带有disorder的表格再次命名,再从新表格中select想要的结果

截取time时分秒
~~~sql
    SELECT to_char(time,'hh24:mi:ss'), train_id, is_fault_sended, fault_description, fix_remind, solution
    	from
    	(
    		SELECT *,ROW_NUMBER()over(order by time desc) as disorder 
    		FROM public.fault_info
    	) as T
~~~
建立索引

如果有行需要查询操作需建立索引
~~~sql
    CREATE INDEX idx_table_name_date  ON table  (signal_id, signal_name)
~~~

改变列数据类型

(原表train_basic_info  中 列current_speed 已存在数据且为varchar格式, 现改为int8且不影响原数据)
~~~sql
    alter table train_basic_info alter COLUMN current_speed type int4 using current_speed::int4;
~~~