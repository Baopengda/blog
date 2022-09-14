---
title: 简单使用 OSS 对象存储解决文件云存储问题
date: 2022-05-08
tags:
 - OSS
categories:
 - 工具栈
---
# 使用文件存储服务器的原因

## 单体服务的文件存储

只需要在对应的服务器上预留存储文件的空间，该处空间负责在前端文件上传时存储，在下载请求时返回即可

## 分布式服务的文件存储

因为有网关或者代理服务器的路由功能，很有可能出现的问题是，上传文件和下载文件时被负载均衡在不同的服务器上，导致文件数据获取不到，解决分布式服务的文件存储问题，可以引入一层服务器，使得上传与下载时，路由到的任何一个服务器都转到该文件存储服务器上，由此可以解决问题。

# 对象存储的特点

对象存储服务（Object Storage Service，oss）是一种海量、安全、低成本、高可靠的云存储服务，适合存放任意类型的文件。容量和处理能力弹性扩展，多种存储类型供选择，全面优化存储成本。

# 文件存储的使用

## 方法一：普通上传方式

- 通过前端上传文件到网关
- 网关路由到对应服务
- 将流数据传输到 OSS

弊端：以应用服务器为媒介，面对大量用户存在瓶颈

### 使用阿里云 OSS 存储与下载文件 (不需使用此方法)

1. 安装依赖 

```java
<dependency>
    <groupId>com.aliyun.oss</groupId>
    <artifactId>aliyun-sdk-oss</artifactId>
    <version>3.10.2</version>
</dependency>
```

2. IDEA 中使用代码上传

需要注意指定 【阿里云秘钥】、【上传的文件位置】、【上传的 bucket 名称】、

```java
@Test
    public void testUpload() throws FileNotFoundException {

        // Endpoint以华东1（杭州）为例，其它Region请按实际情况填写。
        String endpoint = "oss-cn-beijing.aliyuncs.com";
        // 阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。
        String accessKeyId = "LTAI5tDqNrqBDPmrEELSFiua";
        String accessKeySecret = "65amW0Zl3Rvxi1qsdgBwLyIXGlDhJ2";

        // 填写Bucket名称，例如examplebucket。
        String bucketName = "mall-feiyeorz";
        // 填写Object完整路径，完整路径中不能包含Bucket名称，例如exampledir/exampleobject.txt。
        String objectName = "v2-2fb8a37aa0189101d1cfccdf579b3436_r.jpg";
        // 填写本地文件的完整路径，例如D:\\localpath\\examplefile.txt。
        // 如果未指定本地路径，则默认从示例程序所属项目对应本地路径中上传文件流。
        String filePath = "C:\\Users\\Feiye\\Pictures\\头像哇\\v2-2fb8a37aa0189101d1cfccdf579b3436_r.jpg";
        
        // 创建OSSClient实例。
        OSS ossClient = new OSSClientBuilder().build(endpoint, accessKeyId, accessKeySecret);

        try {
            InputStream inputStream = new FileInputStream(filePath);
            // 创建PutObject请求。
            ossClient.putObject(bucketName, objectName, inputStream);
        } catch (OSSException oe) {
            System.out.println("Caught an OSSException, which means your request made it to OSS, "
                    + "but was rejected with an error response for some reason.");
            System.out.println("Error Message:" + oe.getErrorMessage());
            System.out.println("Error Code:" + oe.getErrorCode());
            System.out.println("Request ID:" + oe.getRequestId());
            System.out.println("Host ID:" + oe.getHostId());
        } catch (ClientException ce) {
            System.out.println("Caught an ClientException, which means the client encountered "
                    + "a serious internal problem while trying to communicate with OSS, "
                    + "such as not being able to access the network.");
            System.out.println("Error Message:" + ce.getMessage());
        } finally {
            if (ossClient != null) {
                ossClient.shutdown();
                System.out.println("上传完成...");
            }
        }
    }
```

### 使用 Spring Cloud Alibaba 接入对象存储 OSS (使用此方法)

官方文档示例:

https://github.com/alibaba/aliyun-spring-boot/tree/master/aliyun-spring-boot-samples/aliyun-oss-spring-boot-sample

1. 先引入依赖
2. 
由于多个微服务都需要 OSS 存储功能，所以此处在 common 文件中的 pom 引入依赖 

```xml
<!--阿里云 OSS-->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alicloud-oss</artifactId>
        </dependency>
```

2. 在对应服务的 yml 中配置 OSS

```java
// application.properties
    alicloud:
      access-key: LTAI5tDqNrqBDPmrEELSFiua
      secret-key: 65amW0Zl3Rvxi1qsdgBwLyIXGlDhJ2
      oss:
        endpoint: oss-cn-beijing.aliyuncs.com
```

3. 在测试文件类前中写注解 @RunWith(SpringRunner.class)

```java
    @Autowired
    OSSClient ossClient;

    @Test
    public void testUpload() throws FileNotFoundException {
        // 填写Bucket名称，例如examplebucket。
        String bucketName = "mall-feiyeorz";
        // 填写Object完整路径，完整路径中不能包含Bucket名称，例如exampledir/exampleobject.txt。
        String objectName = "v2-2fb8a37aa0189101d1cfccdf579b3436_r.jpg";
        // 填写本地文件的完整路径，例如D:\\localpath\\examplefile.txt。
        // 如果未指定本地路径，则默认从示例程序所属项目对应本地路径中上传文件流。
        String filePath = "C:\\Users\\Feiye\\Pictures\\头像哇\\Snipaste_2022-03-04_09-21-17.jpg";

        try {
            InputStream inputStream = new FileInputStream(filePath);
            // 直接调用对象方法
            ossClient.putObject(bucketName, objectName, inputStream);
        } catch (OSSException oe) {
            System.out.println("Caught an OSSException, which means your request made it to OSS, "
                    + "but was rejected with an error response for some reason.");
            System.out.println("Error Message:" + oe.getErrorMessage());
            System.out.println("Error Code:" + oe.getErrorCode());
            System.out.println("Request ID:" + oe.getRequestId());
            System.out.println("Host ID:" + oe.getHostId());
        } catch (ClientException ce) {
            System.out.println("Caught an ClientException, which means the client encountered "
                    + "a serious internal problem while trying to communicate with OSS, "
                    + "such as not being able to access the network.");
            System.out.println("Error Message:" + ce.getMessage());
        } finally {
            if (ossClient != null) {
                ossClient.shutdown();
                System.out.println("上传完成...");
            }
        }
    }
```


## 方法二：服务端签名后直传

- 由用户浏览器先向应用服务器请求，得到令牌和签名
- 携带令牌和签名上传数据到 OSS

