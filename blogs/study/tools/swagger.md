---
title: 接口测试工具——[Swagger]的使用
date: 2022-04-19
tags:
 - Swagger
categories:
 - 工具栈
---

第三方测试工具： postman

swagger 官网：https://swagger.io/

# swagger 快速入门使用

## 在 SpringBoot 中导入 swagger 的 maven 依赖

`SpringFox Swagger UI`

```xml
<!-- https://mvnrepository.com/artifact/io.springfox/springfox-swagger-ui -->
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-swagger-ui</artifactId>
    <version>2.9.2</version>
</dependency>
```

`SpringFox Swagger2`

```xml
<!-- https://mvnrepository.com/artifact/io.springfox/springfox-swagger2 -->
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-swagger2</artifactId>
    <version>2.9.2</version>
</dependency>
```

## 编写配置类

```java
/**
 * Swagger2的接口配置
 *
 */
@Configuration
@EnableSwagger2
public class SwaggerConfigTest
{
    /** 系统基础配置 */
//    @Autowired
//    private SubwayConfig subwayConfig;

    /**
     * 创建API
     */
    @Bean
    public Docket createRestApi()
    {
        return new Docket(DocumentationType.SWAGGER_2)
//                .pathMapping("/prod-api")
                // 用来创建该API的基本信息，展示在文档的页面中（自定义展示的信息）
                .apiInfo(apiInfo())
                // 设置哪些接口暴露给Swagger展示
                .select()
                // 扫描所有有注解的api，用这种方式更灵活
                .apis(RequestHandlerSelectors.withMethodAnnotation(ApiOperation.class))
                // 扫描所有 .apis(RequestHandlerSelectors.any())
                .paths(PathSelectors.any())
                .build();
    }

    /**
     * 添加摘要信息
     */
    private ApiInfo apiInfo()
    {
        // 用ApiInfoBuilder进行定制
        return new ApiInfoBuilder()
                // 设置标题
                .title("Subway 接口文档")
                // 描述
                .description("描述：Subway 对外接口文档")
                // 作者信息
                .contact(new Contact("Subway By SoLoTmac", null, null))
                // 版本
                .version("版本号:V1.0")
                .build();
    }
}
```

## 启动 SpringBoot

