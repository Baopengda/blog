---
title: 算法之滑动窗口(完结)
date: 2022-04-24
tags:
 - 算法
categories:
 - 算法
---

<!-- TOC -->

- [滑动窗口 + [双指针 + 变量计数]](#%E6%BB%91%E5%8A%A8%E7%AA%97%E5%8F%A3--%E5%8F%8C%E6%8C%87%E9%92%88--%E5%8F%98%E9%87%8F%E8%AE%A1%E6%95%B0)
    - [模板](#%E6%A8%A1%E6%9D%BF)
    - [例题：1004.最大连续1的个数 III](#%E4%BE%8B%E9%A2%981004%E6%9C%80%E5%A4%A7%E8%BF%9E%E7%BB%AD1%E7%9A%84%E4%B8%AA%E6%95%B0-iii)
        - [题目表述](#%E9%A2%98%E7%9B%AE%E8%A1%A8%E8%BF%B0)
        - [题解](#%E9%A2%98%E8%A7%A3)
- [滑动窗口 + 双哈希表 [窗口大小不固定]](#%E6%BB%91%E5%8A%A8%E7%AA%97%E5%8F%A3--%E5%8F%8C%E5%93%88%E5%B8%8C%E8%A1%A8-%E7%AA%97%E5%8F%A3%E5%A4%A7%E5%B0%8F%E4%B8%8D%E5%9B%BA%E5%AE%9A)
    - [模板](#%E6%A8%A1%E6%9D%BF)
    - [例题：76.最小覆盖子串](#%E4%BE%8B%E9%A2%9876%E6%9C%80%E5%B0%8F%E8%A6%86%E7%9B%96%E5%AD%90%E4%B8%B2)
        - [题目表述](#%E9%A2%98%E7%9B%AE%E8%A1%A8%E8%BF%B0)
        - [题解](#%E9%A2%98%E8%A7%A3)
- [滑动窗口 + 双哈希表 [窗口大小固定]](#%E6%BB%91%E5%8A%A8%E7%AA%97%E5%8F%A3--%E5%8F%8C%E5%93%88%E5%B8%8C%E8%A1%A8-%E7%AA%97%E5%8F%A3%E5%A4%A7%E5%B0%8F%E5%9B%BA%E5%AE%9A)
    - [模板](#%E6%A8%A1%E6%9D%BF)
    - [例题1：567.字符串的排列](#%E4%BE%8B%E9%A2%981567%E5%AD%97%E7%AC%A6%E4%B8%B2%E7%9A%84%E6%8E%92%E5%88%97)
        - [题目表述](#%E9%A2%98%E7%9B%AE%E8%A1%A8%E8%BF%B0)
        - [题解](#%E9%A2%98%E8%A7%A3)
    - [例题2：438.找到字符串中所有字母异位词](#%E4%BE%8B%E9%A2%982438%E6%89%BE%E5%88%B0%E5%AD%97%E7%AC%A6%E4%B8%B2%E4%B8%AD%E6%89%80%E6%9C%89%E5%AD%97%E6%AF%8D%E5%BC%82%E4%BD%8D%E8%AF%8D)
        - [题目表述](#%E9%A2%98%E7%9B%AE%E8%A1%A8%E8%BF%B0)
        - [题解](#%E9%A2%98%E8%A7%A3)
- [滑动窗口 + 单哈希表](#%E6%BB%91%E5%8A%A8%E7%AA%97%E5%8F%A3--%E5%8D%95%E5%93%88%E5%B8%8C%E8%A1%A8)
    - [例题：3.无重复字符的最长子串](#%E4%BE%8B%E9%A2%983%E6%97%A0%E9%87%8D%E5%A4%8D%E5%AD%97%E7%AC%A6%E7%9A%84%E6%9C%80%E9%95%BF%E5%AD%90%E4%B8%B2)
        - [题目表述](#%E9%A2%98%E7%9B%AE%E8%A1%A8%E8%BF%B0)
        - [题解](#%E9%A2%98%E8%A7%A3)

<!-- /TOC -->

滑动窗口指的是这样一类问题的求解方法，在数组上通过双指针同向移动而解决的一类问题。

# 滑动窗口 + [双指针 + 变量计数]

## 模板

```java
class Solution {
    public int slidingWindow(int[] nums, int k) {
        //数组/字符串长度
        int n = nums.length;
        //双指针，表示当前遍历的区间[left, right]，闭区间
        int left = 0, right = 0;
        //定义变量统计 子数组/子区间 是否有效
        int sum = 0;
        //定义变量动态保存最大 求和/计数
        int res = 0;

        //右指针遍历到数组尾
        while (right < n) {
            //增加当前右指针对应的数值
            sum += nums[right];
            //当在该区间内 sum 超出定义范围
            while (sum > k) {
                //先将左指针指向的数值减去
                sum -= nums[left];
                //左指针右移
                left++;
            }
            //到 while 结束时，我们找到了一个符合题意要求的 子数组/子串
            res = Math.max(res, right - left + 1);
            //移动右指针，去探索下一个区间
            right++;
        }
        return res;
    }
}
```

## 例题：1004.最大连续1的个数 III

### 题目表述

```java
给定一个二进制数组 nums 和一个整数 k，如果可以翻转最多 k 个 0 ，则返回 数组中连续 1 的最大个数。

示例：

输入：nums = [1,1,1,0,0,0,1,1,1,1,0], K = 2
输出：6
解释：[1,1,1,0,0,1,1,1,1,1,1]
粗体数字从 0 翻转到 1，最长的子数组长度为 6。
```

### 题解

```java
class Solution {
    public int longestOnes(int[] nums, int k) {
        //思路：将题目目的转为：求连续子数组，要求长度最大，0 最多为k
        //用滑动窗口，让 右指针 一直右移，记录0 的个数，记录长度，当0 大于k，则左指针右移
        int n = nums.length;
        int left = 0;
        int right = 0;

        int zeros = 0;
        int len = 0;
        //右指针到头位置
        while (right < n) {
            if (nums[right] == 0) {
                zeros++;
            }
            //当 0 个数超了，让left 一直右移到满足
            while (zeros > k) {
                if (nums[left] == 0) {
                    zeros--;
                }
                left++;
            }
            //记录符合条件的长度
            len = Math.max(len, right - left + 1);
            //右指针右移
            right++;
        }
        return len;
    }
}
```

# 滑动窗口 + 双哈希表 [窗口大小不固定]

## 模板

```java
class Solution {
    public String slidingWindow(String s, String t) {
        //创建两个哈希表，分别记录 [需要的] 和 [加入的]
        Map<Character, Integer> need = new HashMap<>();
        Map<Character, Integer> map = new HashMap<>();

        //创建 [双指针] 和 [有效数量]
        int left = 0, right = 0;
        int valid = 0;

        //外层循环，供右指针遍历
        while(right < s.length()){
            //创建临时 c 字符，是移入 窗口 内的字符
            char c = s.charAt(right);
            
            //进行窗口一系列逻辑更新
            ...

            //debug 的地方
            System.out.println(left + "_" + right);
            
            //判断左指针是否要右移即窗口收缩：有效数量足够满足条件
             /*  可能是规定的窗口大小超出了，可能是有效值数量达成了
             1.  while(valid == need.size())
             2.  while(right - left + 1 >= s1.length())      
             */           
            while(windows need shrink){
                // 创建 d 是要移除窗口的字符
                char d = s.charAt(left);
                left++;

                //进行窗口一系列逻辑更新
                ...
            }
            
            //右指针右移
            right++;
        }
    }
}
```

## 例题：76.最小覆盖子串

### 题目表述 

```java
给你一个字符串 s 、一个字符串 t 。返回 s 中涵盖 t 所有字符的最小子串。如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 "" 。

示例：

输入：s = "ADOBECODEBANC", t = "ABC"
输出："BANC"
```

### 题解

```java
import java.util.Map;
import java.util.HashMap;

class Solution {
    public String minWindow(String s, String t) {
        //滑动窗口思路：利用两个 哈希表 分别存储 t 需要的字符与 遍历 s 加入的字符
        //在右指针右移的过程中，判断并加入当前字符个数，记录长度，用一个变量记录加入的有效的字符长度
        //当加入的字符长度当满足条件则 左指针右移
        Map<Character, Integer> need = new HashMap<>();
        Map<Character, Integer> map = new HashMap<>();
        //刚开始填充好所需字符
        for (Character c : t.toCharArray()) {
            need.put(c, need.getOrDefault(c, 0) + 1);
        }
        int len = Integer.MAX_VALUE;
        //记录有效位数
        int valid = 0;
        int left = 0, right = 0;

        //定义一个变量，记录结果子串的 start 位置
        int start = 0;

        while (right < s.length()) {
            //加入字符
            char c = s.charAt(right);


            //当满足数量要求，则有效值加一
            //让map只存储有关变量
            //镜像代码1
            if (need.containsKey(c)) {
                map.put(c, map.getOrDefault(c, 0) + 1);
                //Integer 不能超过127
                if (map.get(c).equals(need.get(c))) {
                    valid++;
                }
            }

            //当有效值等于 所需字符串长度，记录长度，右移左指针
            while (valid == need.size()) {
                //记录符合要求 的 窗口长度
                if (right - left + 1 <= len) {
                    len = right - left + 1;
                    start = left;
                }
                
                char d = s.charAt(left);
                //左指针右移
                left++;
                //要右移左指针，判断删除的字符是否是需要的
                //镜像代码1
                if (need.containsKey(d)) {
                    //仅当当前数量相等
                    if (need.get(d).equals(map.get(d))) {
                        valid--;
                    }

                    map.put(d, map.get(d) - 1);
                }
            }
            //右指针右移
            right++;
        }
        return len == Integer.MAX_VALUE ? "" : s.substring(start, start + len);
    }
}
```

# 滑动窗口 + 双哈希表 [窗口大小固定]

## 模板

```java
class Solution {
    public String slidingWindow(String s, String t) {
        //创建两个哈希表，分别记录 [需要的] 和 [加入的]
        Map<Character, Integer> need = new HashMap<>();
        Map<Character, Integer> map = new HashMap<>();

        //创建 [双指针] 和 [有效数量]
        int left = 0, right = 0;
        int valid = 0;

        //外层循环，供右指针遍历
        while(right < s.length()){
            //创建临时 c 字符，是移入 窗口 内的字符
            char c = s.charAt(right);
            
            //进行窗口一系列逻辑更新
            ...

            //debug 的地方
            System.out.println(left + "_" + right);
            
            //判断左指针是否要右移即窗口收缩：有效数量足够满足条件
            //可能是规定的窗口大小超出了，可能是有效值数量达成了
            
            while(right - left + 1 >= s1.length()){
                // 创建 d 是要移除窗口的字符
                char d = s.charAt(left);
                left++;

                //进行窗口一系列逻辑更新
                ...
            }
            
            //右指针右移
            right++;
        }
    }
}
```

## 例题1：567.字符串的排列

### 题目表述 

```java
给你两个字符串 s1 和 s2 ，写一个函数来判断 s2 是否包含 s1 的排列。如果是，返回 true ；否则，返回 false 。

换句话说，s1 的排列之一是 s2 的 子串 。

示例：

输入：s1 = "ab" s2 = "eidbaooo"
输出：true
解释：s2 包含 s1 的排列之一 ("ba").
```

### 题解

```java
class Solution {
    public boolean checkInclusion(String s1, String s2) {
        //滑动窗口 + 两哈希，始终保证窗口长度，当长度超了，左指针准备右移

        Map<Character, Integer> need = new HashMap<>();
        Map<Character, Integer> map = new HashMap<>();

        //创建 [双指针] 和 [有效数量]
        int left = 0, right = 0;
        int valid = 0;

        //
        for(Character c : s1.toCharArray()){
            need.put(c, need.getOrDefault(c,0)+1);
        }
        //
        while(right < s2.length()){

            char c = s2.charAt(right);

            if(need.containsKey(c)){
                map.put(c,map.getOrDefault(c,0)+1);
                if(need.get(c).equals(map.get(c))){
                    valid++;
                }
            }

            //当凑齐了元素，还要判断长度
            while(right - left + 1 >= s1.length()){
                if(valid == need.size()){
                    return true;
                }
                char d = s2.charAt(left);
                if(need.containsKey(d)){
                    if(need.get(d).equals(map.get(d))){
                        valid--;
                    }
                    map.put(d,map.get(d)-1);
                }
                left++;
            }
            right++;
        }
        return false;
    }
}
```

## 例题2：438.找到字符串中所有字母异位词

### 题目表述 

```java
给定两个字符串 s 和 p，找到 s 中所有 p 的 异位词 的子串，返回这些子串的起始索引。不考虑答案输出的顺序。

异位词 指由相同字母重排列形成的字符串（包括相同的字符串）。

示例：

输入: s = "cbaebabacd", p = "abc"
输出: [0,6]
解释:
起始索引等于 0 的子串是 "cba", 它是 "abc" 的异位词。
起始索引等于 6 的子串是 "bac", 它是 "abc" 的异位词。
```

### 题解

```java
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {
    public List<Integer> findAnagrams(String s, String p) {
        //滑动窗口 + 两哈希模板直接秒杀
        Map<Character, Integer> need = new HashMap<>();
        Map<Character, Integer> map = new HashMap<>();

        int left = 0;
        int right = 0;
        int valid = 0;
        List<Integer> list = new ArrayList<>();

        //
        for (Character ch : p.toCharArray()
        ) {
            need.put(ch, need.getOrDefault(ch, 0) + 1);
        }
        //
        while (right < s.length()) {
            char c = s.charAt(right);
            //镜像代码1
            if (need.containsKey(c)) {
                map.put(c, map.getOrDefault(c, 0) + 1);
                if (need.get(c).equals(map.get(c))) {
                    valid++;
                }
            }

            while (right - left + 1 >= p.length()) {
                if (valid == need.size()) {
                    list.add(left);
                }

                char d = s.charAt(left);

                left++;

                //镜像代码2
                if (need.containsKey(d)) {
                    if (need.get(d).equals(map.get(d))) {
                        valid--;
                    }
                    map.put(d, map.getOrDefault(d, 0) - 1);
                }
            }
            right++;
        }
        return list;
    }
}
```

# 滑动窗口 + 单哈希表

## 例题：3.无重复字符的最长子串

### 题目表述

```java
给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。

示例：

输入: s = "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
```

### 题解

```java
class Solution {
    public int lengthOfLongestSubstring(String s) {
        //滑动窗口

        Map<Character, Integer> map = new HashMap<>();

        int left = 0;
        int right = 0;
        int len = 0;

        while (right < s.length()) {
            char c = s.charAt(right);
            map.put(c, map.getOrDefault(c, 0) + 1);
            //如果已经存在了至少一个，则开始右移左指针，一直到该要添加的 c 无
            while (map.get(c) > 1) {
                char d = s.charAt(left);
                map.put(d, map.getOrDefault(d, 0) - 1);
                left++;
            }
            //经过左指针的窗口调整，此时窗口内的字符符合要求，记录长度
            len = Math.max(len, right - left + 1);
            //继续调整成下一个窗口
            right++;
        }
        return len;
    }
}
```
