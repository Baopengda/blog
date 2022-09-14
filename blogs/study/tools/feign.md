---
title: 微服务之间通信实现——[Spring Cloud OpenFeign]的使用
date: 2022-04-15
tags:
 - Feign
categories:
 - 工具栈
---

`OpenFeign 的简单使用步骤：`

假设微服务 A 中的一个方法需要被 微服务 B 查询

1. 两个微服务在 pom 文件中引入 open-feign 的依赖

```java
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-openfeign</artifactId>
        </dependency>
```
2. 在微服务 B 中创建文件夹 feign，创建接口,在接口中声明要调用的接口已经调用的方法，如:

```java
@FeignClient("A服务名")
public interface CouponFeignService {
    @RequestMapping("/coupon/coupon/memberCoupon")
    public R memberCoupon();
}
```

3. 在启动文件中加入注解 @EnableFeignClients 开启远程调用,并注明 feign 文件的路径

```java
//注册到 Nacos
//开启 feign 远程调用
@EnableFeignClients(basePackages = "com.mall.service.member.feign")
@EnableDiscoveryClient
@SpringBootApplication
public class MallMemberApplication {
    public static void main(String[] args) {
        SpringApplication.run(MallMemberApplication.class, args);
    }
}
```


4. 在微服务 B 中写方法，调用 A 的方法


`注意，feign 还依赖于 Sprin Cloud 的 Nacos 做注册发现，需要提前引入 Nacos`