---
title: 利用Poi工具将Excel特定列内容存储到哈希表中
date: 2020-12-02
tags:
 - Poi
categories:
 - 工具栈
---
引入依赖

~~~xml
<!--POI工具类-->
<dependency>
<groupId>org.apache.poi</groupId>
<artifactId>poi</artifactId>
<version>4.0.1</version>
</dependency>
<!--支持xlsx读取-->
<dependency>
<groupId>org.apache.poi</groupId>
<artifactId>poi-ooxml</artifactId>
<version>4.0.1</version>
</dependency>
<dependency>
<groupId>org.apache.poi</groupId>
<artifactId>poi-ooxml-schemas</artifactId>
<version>4.0.1</version>
</dependency>
~~~

代码
~~~java
public void test1() throws Exception {
        /*读取特定列，加入到hashmap中*/
        Map<String, MetaData> frameIdMap = new HashMap();
        {

            Workbook workbook = new XSSFWorkbook("D:\\IDEA2018\\PutHashMap\\工作簿2.xlsx");
            Sheet sheet = workbook.getSheetAt(0);
            int lastRowNum = sheet.getLastRowNum();
//            System.out.println(lastRowNum);
            for (int i = 0; i <= lastRowNum; i++) {
                Row row = sheet.getRow(i);

                int value = i + 1;                        //MetaData的ID号
                Cell keys1 = row.getCell(3);            //得到的是4列comID单元格内容
                String key = keys1.getStringCellValue().toLowerCase().substring(2);  //处理:将得到的comID去除前两位且字母小写
                Cell keys2 = row.getCell(5);           //得到的是第6列Mode单元格内容
                keys2.setCellType(CellType.STRING);       //处理:将keys2转换为纯String类型
                int keys3 = Integer.parseInt(keys2.getStringCellValue());//处理:为适应MetaData，转换String为整形
                Cell keys4 = row.getCell(1);           //得到的是第2列PortClass内容
                String keys5 = keys4.getStringCellValue().toLowerCase();  //处理:将得到的PortClass类型字母变小写

//                System.out.println(key);
//                System.out.println(keys3);
//                System.out.println(keys5);

                frameIdMap.put("\"" + key + "\"", new MetaData(value,keys3,"\""+keys5+"\""));
            }
        }
    }
~~~