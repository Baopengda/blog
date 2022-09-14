---
title: 前端通过Ajax请求接口数据
date: 2020-10-15
tags:
 - Vue
categories:
 - 技术栈
---

1. 在Vue的API文件中写接口，使用get/post请求。

~~~js
import request from '@/utils/request'

/** 查询基本列车1数据 **/
export function subwayBasicInfo1() {
    return request({
      url: '/subway/infoMonitorol/subwayBasicInfo/1',
      method: 'get',
    })
  }
~~~

2. 在需要的业务代码中引入数据。

~~~js
<script>
import { subwayBasicInfo1 } from "@/api/subway/subwayBasicInfo";
    
**data中定义**    
export default {
  data() {
    return {
     trainBasicInfo: undefined 
    }
  }
    
**created执行方法**    
  created() {
    this.getSubwayBasicInfo();
  },
   
      
 **定义取得数据的方法**     
  methods: {
    getSubwayBasicInfo() {
      subwayBasicInfo1().then((response) => {
        this.trainBasicInfo.updateTime = response.data;
      }).catch(() => {
      })
    },
  },
}
~~~


