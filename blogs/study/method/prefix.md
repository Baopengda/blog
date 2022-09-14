---
title: 算法精选：深刻理解前缀和
date: 2022-04-21
tags:
 - 算法
categories:
 - 算法
---
<!-- TOC -->

- [一维前缀和](#%E4%B8%80%E7%BB%B4%E5%89%8D%E7%BC%80%E5%92%8C)
    - [模板](#%E6%A8%A1%E6%9D%BF)
    - [例题：303.区域与检索](#%E4%BE%8B%E9%A2%98303%E5%8C%BA%E5%9F%9F%E4%B8%8E%E6%A3%80%E7%B4%A2)
        - [题目表述](#%E9%A2%98%E7%9B%AE%E8%A1%A8%E8%BF%B0)
        - [题解](#%E9%A2%98%E8%A7%A3)
- [二维前缀和](#%E4%BA%8C%E7%BB%B4%E5%89%8D%E7%BC%80%E5%92%8C)
    - [模板](#%E6%A8%A1%E6%9D%BF)
    - [例题：304.二维区域和检索](#%E4%BE%8B%E9%A2%98304%E4%BA%8C%E7%BB%B4%E5%8C%BA%E5%9F%9F%E5%92%8C%E6%A3%80%E7%B4%A2)
        - [题目表述](#%E9%A2%98%E7%9B%AE%E8%A1%A8%E8%BF%B0)
        - [题解](#%E9%A2%98%E8%A7%A3)
- [前缀和 + 哈希表之[存储两数和 + 次数]](#%E5%89%8D%E7%BC%80%E5%92%8C--%E5%93%88%E5%B8%8C%E8%A1%A8%E4%B9%8B%E5%AD%98%E5%82%A8%E4%B8%A4%E6%95%B0%E5%92%8C--%E6%AC%A1%E6%95%B0)
    - [模板](#%E6%A8%A1%E6%9D%BF)
    - [子数组和统计](#%E5%AD%90%E6%95%B0%E7%BB%84%E5%92%8C%E7%BB%9F%E8%AE%A1)
        - [例题：560.和为 k 的子数组](#%E4%BE%8B%E9%A2%98560%E5%92%8C%E4%B8%BA-k-%E7%9A%84%E5%AD%90%E6%95%B0%E7%BB%84)
            - [题目表述](#%E9%A2%98%E7%9B%AE%E8%A1%A8%E8%BF%B0)
            - [题解](#%E9%A2%98%E8%A7%A3)
    - [奇数统计](#%E5%A5%87%E6%95%B0%E7%BB%9F%E8%AE%A1)
        - [例题：1248.统计「优美子数组」](#%E4%BE%8B%E9%A2%981248%E7%BB%9F%E8%AE%A1%E4%BC%98%E7%BE%8E%E5%AD%90%E6%95%B0%E7%BB%84)
            - [题目表述](#%E9%A2%98%E7%9B%AE%E8%A1%A8%E8%BF%B0)
            - [题解](#%E9%A2%98%E8%A7%A3)
- [前缀和 + 哈希表之[存储余数 + 次数]](#%E5%89%8D%E7%BC%80%E5%92%8C--%E5%93%88%E5%B8%8C%E8%A1%A8%E4%B9%8B%E5%AD%98%E5%82%A8%E4%BD%99%E6%95%B0--%E6%AC%A1%E6%95%B0)
        - [例题：974.和可被 K 整除的子数组](#%E4%BE%8B%E9%A2%98974%E5%92%8C%E5%8F%AF%E8%A2%AB-k-%E6%95%B4%E9%99%A4%E7%9A%84%E5%AD%90%E6%95%B0%E7%BB%84)
            - [题目表述](#%E9%A2%98%E7%9B%AE%E8%A1%A8%E8%BF%B0)
            - [题解](#%E9%A2%98%E8%A7%A3)
- [前缀和 + 哈希表之[存储两数和 + 下标]](#%E5%89%8D%E7%BC%80%E5%92%8C--%E5%93%88%E5%B8%8C%E8%A1%A8%E4%B9%8B%E5%AD%98%E5%82%A8%E4%B8%A4%E6%95%B0%E5%92%8C--%E4%B8%8B%E6%A0%87)
        - [例题：525.连续数组](#%E4%BE%8B%E9%A2%98525%E8%BF%9E%E7%BB%AD%E6%95%B0%E7%BB%84)
            - [题目表述](#%E9%A2%98%E7%9B%AE%E8%A1%A8%E8%BF%B0)
            - [题解](#%E9%A2%98%E8%A7%A3)
- [前缀和 + 哈希表之[存储余数 + 下标]](#%E5%89%8D%E7%BC%80%E5%92%8C--%E5%93%88%E5%B8%8C%E8%A1%A8%E4%B9%8B%E5%AD%98%E5%82%A8%E4%BD%99%E6%95%B0--%E4%B8%8B%E6%A0%87)
        - [例题：523.连续的子数组和](#%E4%BE%8B%E9%A2%98523%E8%BF%9E%E7%BB%AD%E7%9A%84%E5%AD%90%E6%95%B0%E7%BB%84%E5%92%8C)
            - [题目表述](#%E9%A2%98%E7%9B%AE%E8%A1%A8%E8%BF%B0)
            - [题解](#%E9%A2%98%E8%A7%A3)
- [前缀和 + 双端队列](#%E5%89%8D%E7%BC%80%E5%92%8C--%E5%8F%8C%E7%AB%AF%E9%98%9F%E5%88%97)
        - [例题：862.和至少为 K 的最短子数组](#%E4%BE%8B%E9%A2%98862%E5%92%8C%E8%87%B3%E5%B0%91%E4%B8%BA-k-%E7%9A%84%E6%9C%80%E7%9F%AD%E5%AD%90%E6%95%B0%E7%BB%84)
            - [题目表述](#%E9%A2%98%E7%9B%AE%E8%A1%A8%E8%BF%B0)
            - [题解](#%E9%A2%98%E8%A7%A3)
- [前缀和 + 二分](#%E5%89%8D%E7%BC%80%E5%92%8C--%E4%BA%8C%E5%88%86)
        - [例题：528.按权重随机选择](#%E4%BE%8B%E9%A2%98528%E6%8C%89%E6%9D%83%E9%87%8D%E9%9A%8F%E6%9C%BA%E9%80%89%E6%8B%A9)
            - [题目表述](#%E9%A2%98%E7%9B%AE%E8%A1%A8%E8%BF%B0)
            - [题解](#%E9%A2%98%E8%A7%A3)
- [重要总结](#%E9%87%8D%E8%A6%81%E6%80%BB%E7%BB%93)
    - [关于传统前缀和双层循环 On^2](#%E5%85%B3%E4%BA%8E%E4%BC%A0%E7%BB%9F%E5%89%8D%E7%BC%80%E5%92%8C%E5%8F%8C%E5%B1%82%E5%BE%AA%E7%8E%AF-on%5E2)
    - [理解前缀和 + 哈希表[存储求和问题]](#%E7%90%86%E8%A7%A3%E5%89%8D%E7%BC%80%E5%92%8C--%E5%93%88%E5%B8%8C%E8%A1%A8%E5%AD%98%E5%82%A8%E6%B1%82%E5%92%8C%E9%97%AE%E9%A2%98)
    - [理解前缀和 + 哈希表[存储求余问题]](#%E7%90%86%E8%A7%A3%E5%89%8D%E7%BC%80%E5%92%8C--%E5%93%88%E5%B8%8C%E8%A1%A8%E5%AD%98%E5%82%A8%E6%B1%82%E4%BD%99%E9%97%AE%E9%A2%98)
    - [理解前缀和 + 哈希表[存储下标问题]](#%E7%90%86%E8%A7%A3%E5%89%8D%E7%BC%80%E5%92%8C--%E5%93%88%E5%B8%8C%E8%A1%A8%E5%AD%98%E5%82%A8%E4%B8%8B%E6%A0%87%E9%97%AE%E9%A2%98)
    - [理解前缀和 + 哈希表[哈希表的初始数值问题]](#%E7%90%86%E8%A7%A3%E5%89%8D%E7%BC%80%E5%92%8C--%E5%93%88%E5%B8%8C%E8%A1%A8%E5%93%88%E5%B8%8C%E8%A1%A8%E7%9A%84%E5%88%9D%E5%A7%8B%E6%95%B0%E5%80%BC%E9%97%AE%E9%A2%98)

<!-- /TOC -->

# 一维前缀和

## 模板

```java
// 预处理前缀和数组
{    
    sum = new int[n + 1];
    for (int i = 1; i <= n; i++) sum[i] = sum[i - 1] + nums[i - 1];
}

// 计算 [i, j] 结果
{
    i++; j++;
    ans = sum[j] - sum[i - 1];
}
```

## 例题：303.区域与检索

### 题目表述

```java
给定一个整数数组  nums，处理以下类型的多个查询:

计算索引 left 和 right （包含 left 和 right）之间的 nums 元素的 和 ，其中 left <= right
实现 NumArray 类：

NumArray(int[] nums) 使用数组 nums 初始化对象
int sumRange(int i, int j) 返回数组 nums 中索引 left 和 right 之间的元素的 总和，
包含 left 和 right 两点（也就是 nums[left] + nums[left + 1] + ... + nums[right] )

示例：

输入：
["NumArray", "sumRange", "sumRange", "sumRange"]
[[[-2, 0, 3, -5, 2, -1]], [0, 2], [2, 5], [0, 5]]
输出：
[null, 1, -1, -3]

解释：
NumArray numArray = new NumArray([-2, 0, 3, -5, 2, -1]);
numArray.sumRange(0, 2); // return 1 ((-2) + 0 + 3)
numArray.sumRange(2, 5); // return -1 (3 + (-5) + 2 + (-1)) 
numArray.sumRange(0, 5); // return -3 ((-2) + 0 + 3 + (-5) + 2 + (-1))
```

### 题解

```java
class NumArray {
    //前缀和模板题
    //建立一个数组，存放以 i 结尾的和
    int[] sum;
    public NumArray(int[] nums) {
        int n = nums.length;
        //为避免 i-1 的边界冲突，下标从1开始，i表示nums 数组中的第几个数
        sum = new int[n + 1];
        //计算前缀和
        for (int i = 1; i <= n; i++) {
            sum[i] = sum[i - 1] + nums[i-1];
        }
    }

    public int sumRange(int left, int right) {
        left++;
        right++;
        return sum[right] - sum[left - 1];
    }
}
```

# 二维前缀和

## 模板

1. 先求出以各点为右下角，以[0,0]为左上角的和数组 sum[]

<img src="https://pic.leetcode-cn.com/1614650837-SAIiWg-1.png" />

2. 再用数组 sum 去求指定范围的矩阵区间和 [x1,y1,x2,y2]

<img src="https://pic.leetcode-cn.com/1614650906-cznQhe-image.png" />

3. 模板代码如下

```java
// 预处理前缀和数组
{
    sum = new int[n + 1][m + 1];
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            // 当前格子(和) = 上方的格子(和) + 左边的格子(和) - 左上角的格子(和) + 当前格子(值)【和是指对应的前缀和，值是指原数组中的值】
            sum[i][j] = sum[i - 1][j] + sum[i][j - 1] - sum[i - 1][j - 1] + matrix[i - 1][j - 1];
        }
    }
}

// 首先我们要令左上角为 (x1, y1) 右下角为 (x2, y2)
// 计算 (x1, y1, x2, y2) 的结果
{
    // 前缀和是从 1 开始，原数组是从 0 开始，上来先将原数组坐标全部 +1，转换为前缀和坐标
    x1++; y1++; x2++; y2++;
    // 记作 22 - 12 - 21 + 11，然后 不减，减第一位，减第二位，减两位
    // 也可以记作 22 - 12(x - 1) - 21(y - 1) + 11(x y 都 - 1)
    ans = sum[x2][y2] - sum[x1 - 1][y2] - sum[x2][y1 - 1] + sum[x1 - 1][y1 - 1];
}
```

## 例题：304.二维区域和检索

### 题目表述

```java
给定一个二维矩阵 matrix，以下类型的多个请求：

计算其子矩形范围内元素的总和，该子矩阵的 左上角 为 (row1, col1) ，右下角 为 (row2, col2)。

实现 NumMatrix 类：
NumMatrix(int[][] matrix) 给定整数矩阵 matrix 进行初始化
int sumRegion(int row1, int col1, int row2, int col2) 返回 左上角 (row1, col1) 、右下角 (row2, col2) 所描述的子
矩阵的元素 总和 。

示例：

输入: 
["NumMatrix","sumRegion","sumRegion","sumRegion"]
[[[[3,0,1,4,2],[5,6,3,2,1],[1,2,0,1,5],[4,1,0,1,7],[1,0,3,0,5]]],[2,1,4,3],[1,1,2,2],[1,2,2,4]]
输出: 
[null, 8, 11, 12]

解释:
NumMatrix numMatrix = new NumMatrix([[3,0,1,4,2],[5,6,3,2,1],[1,2,0,1,5],[4,1,0,1,7],[1,0,3,0,5]]);
numMatrix.sumRegion(2, 1, 4, 3); // return 8 (红色矩形框的元素总和)
numMatrix.sumRegion(1, 1, 2, 2); // return 11 (绿色矩形框的元素总和)
numMatrix.sumRegion(1, 2, 2, 4); // return 12 (蓝色矩形框的元素总和)
```

<img src = "https://pic.leetcode-cn.com/1626332422-wUpUHT-image.png" />

### 题解

```java
class NumMatrix {
    int[][] sum;
    public NumMatrix(int[][] matrix) {
        int n = matrix.length, m = n == 0 ? 0 : matrix[0].length;
        // 与「一维前缀和」一样，前缀和数组下标从 1 开始，因此设定矩阵形状为 [n + 1][m + 1]（模板部分）
        sum = new int[n + 1][m + 1];
        // 预处理除前缀和数组（模板部分）
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                sum[i][j] = sum[i - 1][j] + sum[i][j - 1] - sum[i - 1][j - 1] + matrix[i - 1][j - 1];
            }
        }
    }

    public int sumRegion(int x1, int y1, int x2, int y2) {
        // 求某一段区域和 [i, j] 的模板是 sum[x2][y2] - sum[x1 - 1][y2] - sum[x2][y1 - 1] + sum[x1 - 1][y1 - 1];（模板部分）
        // 但由于我们源数组下标从 0 开始，因此要在模板的基础上进行 + 1
        x1++; y1++; x2++; y2++;
        return sum[x2][y2] - sum[x1 - 1][y2] - sum[x2][y1 - 1] + sum[x1 - 1][y1 - 1];
    }
}
```

# 前缀和 + 哈希表之[存储两数和 + 次数]

## 模板

类似两数之和的用法，当需要 求 a - b == c,可以将用哈希表存储值，然后判断 a - c == b

```java
class Solution {
    public int[] twoSum(int[] nums, int target) {

        HashMap<Integer,Integer> map  = new HashMap<>();
        //一次遍历
        for (int i = 0; i < nums.length; ++i) {
            //存在时，我们用数组得值为 key，索引为 value
            if (map.containsKey(target - nums[i])){              
               return new int[]{i,map.get(target-nums[i])};
            }
            //存入值
            map.put(nums[i],i);
        }
        //返回
        return new int[]{};
    }
}
```

## 子数组和统计

### 例题：560.和为 k 的子数组

#### 题目表述

```java
给你一个整数数组 nums 和一个整数 k ，请你统计并返回 该数组中和为 k 的连续子数组的个数。

示例：
输入：nums = [1,1,1], k = 2
输出：2
```
#### 题解

```java
//方法一：暴力法，时间 On^2
class Solution {
    public int subarraySum(int[] nums, int k) {
        //前缀和+暴力解决
        //双层for 循环依次选定的是两个端点，就是经典一维前缀和求连续数组 [i,j]之间的sum方法

        int n = nums.length;
        int[] preSum = new int[n + 1];
        int cnt = 0;

        //
        for (int i = 1; i <= n; i++) {
            preSum[i] = preSum[i - 1] + nums[i - 1];
        }
        //两次循环，判断第 i 个前缀和是否等于 k，再判断是否大于k，如果大于k，尝试减去之前的前缀和
        for (int i = 1; i <= n; i++) {
            for (int j = 0; j < i; j++) {
                if (preSum[i] - preSum[j] == k) {
                    cnt++;
                }
            }
        }
        return cnt;
    }
}

//方法二：前缀和 + 哈希表存储，一次遍历时间 On
class Solution {
    public int subarraySum(int[] nums, int k) {
        //为优化 on2 复杂度的暴力法前缀和，采用哈希存储，一次遍历达到目的
        //注意观察，暴力法前缀和要找的是[i,j]区间和==k，采用的是sum[i] - sum[j] ==k 的双遍历
        //类似两数之和题目中，转变成查找哈希表中有无 sum[i] - k 即可解决问题
        //同时，因为负数的存在，可能有多个连续子数组满足，所以需要把哈希存储的前缀和出现次数记录

        //map存储的是 前缀和 + 次数
        Map<Integer, Integer> map = new HashMap<>();
        //
        int sum = 0;
        int cnt = 0;
        //把前缀和为 0 也计入，因为要包括后续前缀和自身的情况
        map.put(0, 1);

        for (int i = 0; i < nums.length; i++) {
            sum += nums[i];

            if (map.containsKey(sum - k)) {
                cnt += map.get(sum - k);
            }

            map.put(sum, map.getOrDefault(sum, 0) + 1);
        }
        return cnt;
    }
}
```

## 奇数统计

注意：当哈希要存的数小于题目给的数组长度，我们便可以用数组代替哈希存储，分别用数组的下标和值代替哈希表的键值即可。

### 例题：1248.统计「优美子数组」

#### 题目表述

```java
给你一个整数数组 nums 和一个整数 k。如果某个连续子数组中恰好有 k 个奇数数字，我们就认为这个子数组是「优美子数组」。

请返回这个数组中 「优美子数组」 的数目。

示例:

输入：nums = [1,1,2,1,1], k = 3
输出：2
解释：包含 3 个奇数的子数组是 [1,1,2,1] 和 [1,2,1,1] 。
```

#### 题解

```java
//方法一：暴力法，最初的前缀和，时间 On^2
class Solution {
    public int numberOfSubarrays(int[] nums, int k) {
        //前缀和暴力法：前缀和不一定局限于数组元素的和，还可以是奇数个数的和！！！
        //
        int n = nums.length;
        int[] sum = new int[n + 1];
        for (int i = 1; i <= n; i++) {
            sum[i] = sum[i - 1];

            if ((nums[i - 1] & 1) == 1) {
                sum[i]++;
            }
        }

        int cnt = 0;
        //寻找 sum[j] - sum[i] == k的个数
        for (int i = 1; i <= n; i++) {
            for (int j = 0; j < i; j++) {
                if (sum[i] - sum[j] == k) {
                    cnt++;
                }
            }
        }

        return cnt;
    }
}

//方法二：前缀和 + 哈希，速度不够快，时间 On
class Solution {
    public int numberOfSubarrays(int[] nums, int k) {
        //前缀和哈希法：前缀和不一定局限于数组元素的和，还可以是奇数个数的和！！！
        //找的是 sum[i] - sum[j] == k 即奇数个数为 k 的区间
        //用哈希存储的是 <奇数个数，次数>

        Map<Integer, Integer> map = new HashMap<>();
        int sum = 0;
        int cnt = 0;

        map.put(0, 1);

        for (int i = 0; i < nums.length; i++) {
            sum += nums[i] & 1;

            if (map.containsKey(sum - k)) {
                cnt += map.get(sum - k);
            }

            map.put(sum, map.getOrDefault(sum, 0) + 1);
        }
        return cnt;
    }
}

//方法三：前缀和 + 数组模拟哈希表，时间 On
class Solution {
    public int numberOfSubarrays(int[] nums, int k) {
        //前缀和哈希改良转数组法：前缀和不一定局限于数组元素的和，还可以是奇数个数的和！！！
        //找的是 sum[i] - sum[j] == k 即奇数个数为 k 的区间
        //用哈希存储的是 <奇数个数，次数>
        int[] mp = new int[nums.length + 1];
        int sum = 0;
        int cnt = 0;

        mp[0] = 1;

        for (int i = 0; i < nums.length; i++) {
            sum += nums[i] & 1;

            //对于奇数个数大于 k 的元素，使结果加上对应的次数，每次加的次数可能为0
            if (sum - k >= 0) {
                cnt += mp[sum - k];
            }

            mp[sum]++;
        }
        return cnt;
    }
}
```

# 前缀和 + 哈希表之[存储余数 + 次数]

### 例题：974.和可被 K 整除的子数组

#### 题目表述

```java
给定一个整数数组 nums 和一个整数 k ，返回其中元素之和可被 k 整除的（连续、非空） 子数组 的数目。

子数组 是数组的 连续 部分。

示例：

输入：nums = [4,5,0,-2,-3,1], k = 5
输出：7
解释：
有 7 个子数组满足其元素之和可被 k = 5 整除：
[4, 5, 0, -2, -3, 1], [5], [5, 0], [5, 0, -2, -3], [0], [0, -2, -3], [-2, -3]
```

#### 题解

```java
import java.util.HashMap;
import java.util.Map;

class Solution {
    public int subarraysDivByK(int[] nums, int k) {
        //元素和可被数整除，有式子 (sum[i] - sum[j]) % 5 == 0 同余定理得 sum[i] % 5 == sum[j] % 5
        //可用哈希表，一次遍历将，哈希表存储(sum%k, 次数)

        //关于前缀和为 负数，取余的情况：要把负数和正数归为一类，原因：
        //拿K = 4为例，求出某个前缀和为 -1，-1 % K 应该为 3，但有的编程语言 -1 % K = -1
        //这个 -1，要加上 K，转成正 3。为什么 preSum 值为 -1 和 3 需要归为同一类？因为：
        //-1 和 3 分别模 4 的结果看似不相等，但前缀和之差：3-(-1) 等于 4。4 % K = 0，即所形成的子数组满足元素和被 4 整除。所以前缀和 -1 和 3 其实是等价的。

        int cnt = 0;
        int sum = 0;
        Map<Integer, Integer> map = new HashMap<>();
        map.put(0, 1);

        for (int i = 0; i < nums.length; i++) {
            sum += nums[i];

            //防止前缀和负数取余，统统转换
            int key = (sum % k + k) % k;

            if (map.containsKey(key)) {
                //此处可以看出if 和put 的顺序考究，先加上之前统计的，然后再put本次的
                cnt += map.get(key);
            }
            map.put(key, map.getOrDefault(key, 0) + 1);
        }
        return cnt;
    }
}
```


# 前缀和 + 哈希表之[存储两数和 + 下标]

### 例题：525.连续数组

#### 题目表述

```java
给定一个二进制数组 nums , 找到含有相同数量的 0 和 1 的最长连续子数组，并返回该子数组的长度。

示例：

输入: nums = [0,1]
输出: 2
说明: [0, 1] 是具有相同数量 0 和 1 的最长连续子数组。
```

#### 题解

```java
class Solution {

    private static final int K = 0;

    public int findMaxLength(int[] nums) {
        //该问题可通过预处理转为求解：数组中只有元素 -1,1, 求和 为 k= 0 的最长连续子数组
        //具体来讲，用 sum 表示前缀和，遇到 0 元素，则sum 减去1，遇到 1 则加 1
        //而问题就转换到如何确定最长上，想想哈希表应该存储什么内容：答：sum 与 下标

        int n = nums.length;
        Map<Integer, Integer> map = new HashMap<>();
        map.put(0, -1); //存储上和为0的情况，以便有减路标 0的情况

        int max = 0;

        int sum = 0;
        for (int i = 0; i < n; i++) {
            //预处理，遇0则加上-1
            sum += nums[i] == 0 ? -1 : 1;
            if (map.containsKey(sum - K)) {

                //关于记录的长度没有+1的问题，比如 a....b，sum的值在加上 a之后和加上b之后相等
                //相当于之间的元素是一个互相抵消的过程导致sum 又回来了，
                //而造成这种“无效相加”的之间的元素长度则为 a后移一个的元素一直到b，不包括a，
                //所以不能 b的下标 - a的下标 +1
                int len = i - map.get(sum - K);

                max = Math.max(max,len);
                //解释下面代码用 else 的原因
                //因为求最长，所以如果已经存储了比较靠前的下标，我们就不覆盖了
                //举例： [0,1,0,1] 注意遇到0则sum -1，下面展示每次遍历 i 对应的map，但不一定存储上了
                //   key    value
                //   0      -1      第一处0
                //  -1       0
                //   0       1      sum 又回到0，说明从上一次为0开始到这，之间的数组满足条件，但为了让
                //                  之后更大下标的地方减去上一次0，所以此处下标不会被计入
                //  -1       2
                //   0       3      到了最大下标，上一次相同key 还在-1下标处，此时可以获得最大 max 了
            } else {
                map.put(sum, i);
            }

        }
        return max;
    }
}
```

# 前缀和 + 哈希表之[存储余数 + 下标]

### 例题：523.连续的子数组和

#### 题目表述

```java
给你一个整数数组 nums 和一个整数 k ，编写一个函数来判断该数组是否含有同时满足下述条件的连续子数组：

子数组大小 至少为 2 ，且
子数组元素总和为 k 的倍数。
如果存在，返回 true ；否则，返回 false 。

如果存在一个整数 n ，令整数 x 符合 x = n * k ，则称 x 是 k 的一个倍数。0 始终视为 k 的一个倍数。

示例：

输入：nums = [23,2,4,6,7], k = 6
输出：true
解释：[2,4] 是一个大小为 2 的子数组，并且和为 6 。
```

#### 题解

```java
class Solution {
    public boolean checkSubarraySum(int[] nums, int k) {
        //前缀和 + 哈希表
        //连续子数组满足 ( sum[i] - sum[j] ) % k == 0 并且 i-j >= 2
        //由同余定理，并且元素均大于0，得 sum[i]% k = sum[j] %k
        //哈希表存储 sum[i] % k 和下标，用下标判断长度
        int n = nums.length;
        int sum = 0;
        Map<Integer, Integer> map = new HashMap<>();
        map.put(0, -1);

        for (int i = 0; i < n; i++) {
            sum += nums[i];

            int key = sum % k;

            //这一块不懂的查看 525 连续数组的题解
            if (map.containsKey(key)) {
                if (i - map.get(key) >= 2) return true;
            } else {
                map.put(key, i);
            }
        }
        return false;
    }
}
```

# 前缀和 + 双端队列

### 例题：862.和至少为 K 的最短子数组

#### 题目表述

```java
给你一个整数数组 nums 和一个整数 k ，找出 nums 中和至少为 k 的 最短非空子数组 ，并返回该子数组的长度。如果不存在这样的 子数组 ，返回 -1 。

子数组 是数组中 连续 的一部分。

示例：

输入：nums = [2,-1,2], k = 3
输出：3
```

#### 题解

```java
class Solution {
    //前缀和 + 单调栈
    //思路:先求出前缀和，然后依次将 下标入双端队列 尾 [0,1,2,3,4] 首
    //每次比较 当前的下标减去 队首的下标 是否大于等于k，如果符合，移除队首继续比较
    //这样依次逼近求最短的长度
    //要注意的点：如果当前 i 的sum 小于 i-1的sum，需要移除i-1,因为 i 更靠后且 sum[i]更小

    public int shortestSubarray(int[] A, int K) {
        long[] arr = new long[A.length + 1];

        for (int i = 1; i < A.length + 1; i++) {
            arr[i] = arr[i - 1] + A[i - 1];
        }

        //得到前缀和数组
        int res = Integer.MAX_VALUE;
        // for(int i=0;i<=A.length-1;i++){  //暴力破解 N^2 超时
        //     for(int j = i+1;j<=A.length;j++){
        //         if(arr[j]-arr[i]>=K){
        //             res = Math.min(j-i,res);
        //         }
        //     }
        // }
        Deque<Integer> queue = new ArrayDeque<>();
        for (int i = 0; i < arr.length; i++) {
            while (!queue.isEmpty() && arr[i] <= arr[queue.getLast()]) queue.removeLast();
            while (!queue.isEmpty() && arr[i] - arr[queue.peek()] >= K) res = Math.min(res, i - queue.poll());
            queue.add(i);
        }
        return res == Integer.MAX_VALUE ? -1 : res;
    }
}
```

# 前缀和 + 二分

### 例题：528.按权重随机选择

#### 题目表述

```java
给你一个 下标从 0 开始 的正整数数组 w ，其中 w[i] 代表第 i 个下标的权重。

请你实现一个函数 pickIndex ，它可以 随机地 从范围 [0, w.length - 1] 内（含 0 和 w.length - 1）选出并返回一个下标。选取下标 i 的 概率 为 w[i] / sum(w) 。

例如，对于 w = [1, 3]，挑选下标 0 的概率为 1 / (1 + 3) = 0.25 （即，25%），而选取下标 1 的概率为 3 / (1 + 3) = 0.75（即，75%）。

示例：

输入：
["Solution","pickIndex","pickIndex","pickIndex","pickIndex","pickIndex"]
[[[1,3]],[],[],[],[],[]]
输出：
[null,1,1,1,1,0]
解释：
Solution solution = new Solution([1, 3]);
solution.pickIndex(); // 返回 1，返回下标 1，返回该下标概率为 3/4 。
solution.pickIndex(); // 返回 1
solution.pickIndex(); // 返回 1
solution.pickIndex(); // 返回 1
solution.pickIndex(); // 返回 0，返回下标 0，返回该下标概率为 1/4 。

由于这是一个随机问题，允许多个答案，因此下列输出都可以被认为是正确的:
[null,1,1,1,1,0]
[null,1,1,1,1,1]
[null,1,1,1,0,0]
[null,1,1,1,0,1]
[null,1,0,1,0,0]
......
诸若此类。
```

#### 题解

```java
import java.util.Random;

class Solution {
    //按权重随机选择，符合负载均衡的思想之随机权重
    //思路，如 [1,3,2] 按前缀和有 [1,4,6] 那么当随机产生的x 在区间x<=1, x<=4分别对应1，3
    //只需要通过for 循环去找，x 落在哪个区间
    //进一步使用二分优化！！！！！

    int[] sum;

    public Solution(int[] w) {
        sum = new int[w.length + 1];
        for (int i = 1; i <= w.length; i++) {
            sum[i] = sum[i - 1] + w[i - 1];
        }
    }

    public int pickIndex() {
        //生成随机数 [1,sum]
        int n = sum.length;
        int rand = (int) (Math.random() * sum[n - 1]) + 1;

        //二分法优化,寻找 rand
        int left = 1;
        int right = n - 1;
        while (left < right) {
            int mid = (right - left) / 2 + left;
            //由二分确定边界
            if (rand <= sum[mid]) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }

//        //for 循环找rand在哪个区间，记录
//        for (int i = 1; i < n; i++) {
//            //一旦遍历到
//            if (rand <= sum[i]) {
//                System.out.println(sum[i]);
//                //下标从0开始
//                return i - 1;
//            }
//        }
        return right - 1;
    }
}
```

# 重要总结

主要理解如何从连续数组 [前缀和双循环]演变成[前缀和 + 哈希] 的:

例如数组与目标值为 [9,1,2,4,5]  k = 6

## 关于传统前缀和双层循环 On^2

传统前缀和 找的是 sum[i] - sum[j] = k，即连续子数组满足 k 的所有结果。先整理出前缀和数组 sum[]，然后双层 for 循环去遍历：以 i 结尾的前缀和减去以 j 结尾的前缀和是否符合 k，便可以得到下标 [j+1, i] 之间的和是否满足 k，如 `sum[i] = (9+1+2+4) - (9+1) = sum[j+1]` 便可以将一段连续数组举出。

## 理解前缀和 + 哈希表[存储求和问题]

转变哈希表的方法类似 `两数之和`，将求两和的差转变为求 sum[i] - k = sum[j],由于 sum[j] < sum[i] (之间差了 k)，所以在一次遍历时便可求出 结果。 具体方法是，在 哈希表中存储每个 i 的连续数组和 sum 和 出现次数。

关于疑惑：为什么一遍对不断增长的 sum 的遍历，就能将符合条件的分块的子数组遍历出来？

针对过程来解惑：还是 [9,1,2,4,5]  k = 6，sum在一次遍历时逐渐 从 9，10，12，16，21 变化，我们可以看到，当 sum = 16时满足条件 sum - k = 10，而 10 在之前出现过，就可以记录下来。仔细分析而言，当 sum = 16，此时对应的是元素 4，对应我们的目标数组 [2,4] 的结尾，让此时的 sum 减 k 意味着，去寻找是否存在一个路标，由这个路标和当前位置为界，使得夹在其中间的数满足要求，只要上一个路标存在，我们便可以确定，存在一连续子数组满足要求，此处要好好理解！

## 理解前缀和 + 哈希表[存储求余问题]

同理，针对求余的问题，举例 [23,2,4,6,6] k = 7 

欲求 (sum[i] - sum[j]) % k = 0, 该怎么理解只需要判断 哈希中的 key 是否满足 sum % k = 0 即可？

首先， 由同余定理可知，需要判断 sum[i] % k = sum[j] % k 即可，就是说先把 sum[j] % k 存入，下次再有满足等式的 i 出现，便可以使结果加1。但是过程如何？

就拿 [23,2,4,6,6] k = 7 来讲，sum 变化为 23，23+2， 23+2+4，23+2+4+6，23+2+4+6+6, 可以观察，4+6+6是符合要求的，我们在 (23 + 2)% k 时将余数 4 存入了哈希，下次在 末尾的时候，由于 4+6+6 整除 k 无余数，所以能同样达到 sum % k = 4 使得结果加1，具体而言，在元素 4 之前，我们设下一个路标，再接下来遍历完满足条件的连续子数组时，由能再次时结果回到刚刚那个路标处，使得这种方法是可行的，好好理解体会这种做法！

## 理解前缀和 + 哈希表[存储下标问题]

举例： [-1,1,-1,1] k = 1，哈希表存储 sum 和下标，下面展示每次遍历 i 对应的map

key    value
 0      -1      第一处0
-1       0
 0       1      sum 又回到0，说明从上一次为0开始到这，之间的数组满足条件，但为了让
                之后更大下标的地方减去上一次0，所以此处下标不会被计入
-1       2
 0       3      到了最大下标，上一次相同key 还在-1下标处，此时可以获得最大 max 了

事实上，由 sum[i] - sum[j] = k, 随着哈希表的存储，此 j 不一定就是 0那个位置，因为同样的，第一次存储了key 为 -1，下次再遇到 sum 为 -1 时，便可断定，当前位置到上一个路标，之间数组之和同样满足条件，所以只要是 key 相同的两个位置，之间元素组成的连续数组都满足要求。

同时，关于计算当前位置到上一个路标之间的数组长度问题，有以下解释：比如 a....b，sum的值在加上 a之后和加上b之后相等，当于之间的元素是一个互相抵消的过程导致sum 又回来了，而造成这种“无效相加”的之间的元素长度则为 a后移一个的元素一直到b不包括a，所以不能 b的下标 - a的下标 +1

## 理解前缀和 + 哈希表[哈希表的初始数值问题]

- 如果哈希表的 value 存储的是 key 出现的次数，那么初始化为 `map.put(0,1)`

- 如果哈希表的 value 存储的是元素的下标，那么初始化为 `map.put(0,-1)`