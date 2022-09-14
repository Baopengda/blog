---
title: 算法之回溯(未完待续)
date: 2022-03-28
tags:
 - 算法
categories:
 - 算法
---

<!-- TOC -->

- [经验总结](#%E7%BB%8F%E9%AA%8C%E6%80%BB%E7%BB%93)
    - [关于回溯的排列组合问题](#%E5%85%B3%E4%BA%8E%E5%9B%9E%E6%BA%AF%E7%9A%84%E6%8E%92%E5%88%97%E7%BB%84%E5%90%88%E9%97%AE%E9%A2%98)
- [全排列](#%E5%85%A8%E6%8E%92%E5%88%97)
    - [存在即跳过方法](#%E5%AD%98%E5%9C%A8%E5%8D%B3%E8%B7%B3%E8%BF%87%E6%96%B9%E6%B3%95)
    - [用观察数组判断](#%E7%94%A8%E8%A7%82%E5%AF%9F%E6%95%B0%E7%BB%84%E5%88%A4%E6%96%AD)
    - [全排列 II](#%E5%85%A8%E6%8E%92%E5%88%97-ii)
- [子集](#%E5%AD%90%E9%9B%86)
- [子集 II](#%E5%AD%90%E9%9B%86-ii)
- [组合](#%E7%BB%84%E5%90%88)
- [组合总和](#%E7%BB%84%E5%90%88%E6%80%BB%E5%92%8C)
- [组合总和 II](#%E7%BB%84%E5%90%88%E6%80%BB%E5%92%8C-ii)
- [字母大小写全排列](#%E5%AD%97%E6%AF%8D%E5%A4%A7%E5%B0%8F%E5%86%99%E5%85%A8%E6%8E%92%E5%88%97)
- [字符串的排列](#%E5%AD%97%E7%AC%A6%E4%B8%B2%E7%9A%84%E6%8E%92%E5%88%97)

<!-- /TOC -->

# 经验总结

## 关于回溯的排列组合问题

- 排列问题，讲究顺序（即 [2, 2, 3] 与 [2, 3, 2] 视为不同列表时），需要记录哪些数字已经使用过，此时用 used 数组；

- 组合问题，不讲究顺序（即 [2, 2, 3] 与 [2, 3, 2] 视为相同列表时），需要按照某种顺序搜索，此时使用 begin 变量。

`具体问题具体分析，但排列组合问题最常用的就这两个辅助的方式`

- 当需要去重时，即已经有了[1,2,2,5] 不想要不同位置的 [1,2,2,5]，此时加入观察数组，用以下代码去重

```java
i > 0 && candidates[i] == candidates[i - 1] && !seen[i - 1]
```

- 当需要去掉排列问题是，即已经有了 [2,2,3] 不想再回头选择出 [2,3,2], 此时利用 start，以当前 i为下一次开始

```java

```

# 全排列

## 存在即跳过方法

给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。

例：

~~~java
输入：nums = [1,2,3]
输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
~~~

```java
import java.util.ArrayList;
import java.util.List;

class Solution {
    public List<List<Integer>> permute(int[] nums) {
        //回溯
        List<List<Integer>> ans = new ArrayList<>();
        List<Integer> path = new ArrayList<>();

        dfs(nums, ans, path);

        return ans;
    }

    public void dfs(int[] nums, List<List<Integer>> ans, List<Integer> path) {
        //用作返回，path 长度等于 nums
        if (path.size() == nums.length) {

            ans.add(new ArrayList<>(path));

            return;
        }

        //用做遍历第一遍
        for (int i = 0; i < nums.length; i++) {
            //对于重复的数，直接跳过
            if (path.contains(nums[i])){
                continue;
            }

            path.add(nums[i]);

            dfs(nums, ans, path);

            path.remove(path.size() - 1);
        }
    }
}
```

## 用观察数组判断

```java
import java.util.ArrayList;
import java.util.List;

class Solution {

    boolean[] used;
    
    public List<List<Integer>> permute(int[] nums) {
        //回溯
        List<List<Integer>> ans = new ArrayList<>();
        List<Integer> path = new ArrayList<>();

        used = new boolean[nums.length];

        dfs(nums, ans, path);

        return ans;
    }

    public void dfs(int[] nums, List<List<Integer>> ans, List<Integer> path) {
        //用作返回，path 长度等于 nums
        if (path.size() == nums.length) {

            ans.add(new ArrayList<>(path));

            return;
        }

        //用做遍历第一遍
        for (int i = 0; i < nums.length; i++) {
            //对于重复的数，直接跳过
            if (used[i]){
                continue;
            }

            used[i] = true;
            path.add(nums[i]);

            dfs(nums, ans, path);

            path.remove(path.size() - 1);
            used[i] = false;
        }
    }
}
```

## 全排列 II

```java
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {
    //全排列 和 子集 II 的思路
    //引入观察数组实现全排列
    //排序 + 观察来去重
    //对  1(位置0)   1(位置1)  2  之后 1(位置1)   1(位置0)  2这种情况去重

    private static boolean[] seen;

    public List<List<Integer>> permuteUnique(int[] nums) {

        List<List<Integer>> ans = new ArrayList<>();
        List<Integer> path = new ArrayList<>();

        seen = new boolean[nums.length];

        Arrays.sort(nums);

        dfs(nums, ans, path);

        return ans;
    }

    public void dfs(int[] nums, List<List<Integer>> ans, List<Integer> path) {

        if (path.size() == nums.length) {
            ans.add(new ArrayList<>(path));
            return;
        }

        for (int i = 0; i < nums.length; i++) {
            //
            if (seen[i] || (i > 0 && nums[i] == nums[i - 1] && !seen[i - 1])) {
                continue;
            }

            path.add(nums[i]);

            seen[i] = true;

            dfs(nums, ans, path);

            path.remove(path.size() - 1);

            seen[i] = false;
        }
    }
}
```

# 子集

给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。

解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。

例：

```java
输入：nums = [1,2,3]
输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
```

```java
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

class Solution {
    public List<List<Integer>> subsets(int[] nums) {

        List<List<Integer>> ans = new ArrayList<>();
        List<Integer> path = new ArrayList<>();

        dfs(nums, ans, path, 0);

        return ans;
    }

    public void dfs(int[] nums, List<List<Integer>> ans, List<Integer> path, int start) {
        if (start > nums.length) { //终止条件可不加
            return;
        }

        ans.add(new ArrayList<>(path));

        for (int i = start; i < nums.length; i++) {

            path.add(nums[i]);

            //递归传递的 start 应该为 i+1，
            // 若为 start +1, 会出现撤回后 path 刚[1,3],本层 start 仍为 2导致下次[1,3,3]
            dfs(nums, ans, path, i + 1);

            path.remove(path.size() - 1);
        }
    }
}
```

# 子集 II

排序 + 用观察数组去重

```java
import java.util.*;

class Solution {

    private static boolean[] used;

    public List<List<Integer>> subsetsWithDup(int[] nums) {
        //回溯,子集问题：时间复杂度， 2^n状态，每个状态需要遍历 n 大小的数组，
        // 每个状态需要拷贝到 ans， 刚开始还有 排序， 所以 n*2^n + n + nlogn 最后保留 n*2^n
        //子集II的解法：当 当前 i 指向的数与前一个数相同且前一个数未使用，即产生了重复，判断这种情况即可
        List<List<Integer>> ans = new ArrayList<>();
        List<Integer> path = new ArrayList<>();

        used = new boolean[nums.length];

        //需要先排序，避免[4,4,4,1,4]这种有隔断的
        Arrays.sort(nums);

        dfs(nums, ans, path, 0);

        return ans;
    }

    public void dfs(int[] nums, List<List<Integer>> ans, List<Integer> path, int start) {
        //nums.length

        if (start > nums.length) {
            return;
        }

        ans.add(new ArrayList<>(path));

        for (int i = start; i < nums.length; i++) {

            //判断前后，和是否遍历
            if (i > 0 && nums[i] == nums[i - 1] && !used[i - 1]) {
                continue;
            }

            //加了 nums.length-1
            path.add(nums[i]);
            used[i] = true;
            dfs(nums, ans, path, i + 1);
            path.remove(path.size() - 1);
            used[i] = false;
        }
    }
}
```


# 组合

给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合。

你可以按 任何顺序 返回答案。

例：

```java
输入：n = 4, k = 2
输出：
[
  [2,4],
  [3,4],
  [2,3],
  [1,2],
  [1,3],
  [1,4],
]
```

*题解1，基本: 耗时 17ms*

```java
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

class Solution {
    public List<List<Integer>> combine(int n, int k) {
        List<List<Integer>> ans = new ArrayList<>();

        List<Integer> path = new ArrayList<>();

        dfs(n, k, path, ans, 1);

        return ans;
    }

    public void dfs(int n, int k, List<Integer> path, List<List<Integer>> ans, int start) {

        //当凑够一个数组，返回
        if (path.size() == k) {

            ans.add(new ArrayList<>(path));

            return;
        }

        for (int i = start; i < n + 1; i++) {

            path.add(i);

            dfs(n, k, path, ans, i + 1);

            path.remove(path.size() - 1);
        }
    }
}
```

*题解2，剪枝: 耗时 1ms*  待继续记忆

```java
class Solution {
    public List<List<Integer>> combine(int n, int k) {
        //组合思路：递归,在每一层递归里,往path中添加一个数
        //注意终止条件,返回值和每层逻辑

        List<List<Integer>> ans = new ArrayList<>();

        List<Integer> path = new ArrayList<>();

        dfs(n, k, 1, path, ans);

        return ans;

    }

    public void dfs(int n, int k, int start, List<Integer> path, List<List<Integer>> ans) {
        if (path.size() == k) {
            ans.add(new ArrayList<>(path));
            return;
        }

        //一共有三个循环,图解更容易理解,并且会在return或者当前函数执行完后返回上一层循环
        for (int i = start; i <= n - k + path.size() + 1; i++) {
            path.add(i);

            dfs(n, k, i + 1, path, ans);

            path.remove(path.size() - 1);
        }

    }
}
```

# 组合总和

```java
import javax.lang.model.type.ArrayType;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {

    private List<List<Integer>> ans = new ArrayList<>();
    private static List<Integer> path = new ArrayList<>();

    public List<List<Integer>> combinationSum(int[] candidates, int target) {
//        Arrays.sort(candidates);
        dfs(candidates, target, 0);
        return ans;
    }

    public void dfs(int[] candidates, int target, int start) {
        if (target == 0) {
            ans.add(new ArrayList<>(path));
            return;
        }

        //遍历以某个数开头 重复 n 次满足条件的情况
        //为了避免出现 2,2,3 和 2,3,2这种，需要在第二种组合下，选完 3，直接从3位置开始
        for (int i = start; i < candidates.length; i++) {
            if (candidates[i] > target) continue;

            path.add(candidates[i]);

            //此处传值start 为 i，即如果选择了当前位置，就一往直前
            dfs(candidates, target - candidates[i], i);

            path.remove(path.size() - 1);
        }
    }
}
```

# 组合总和 II

```java
import javax.lang.model.type.ArrayType;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {

    private List<List<Integer>> ans = new ArrayList<>();
    private List<Integer> path = new ArrayList<>();

    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        dfs(candidates, target, 0);
        return ans;
    }

    public void dfs(int[] candidates, int target, int start) {
        if (target == 0) {
            ans.add(new ArrayList<>(path));
            return;
        }

        //遍历以某个数开头 重复 n 次满足条件的情况
        //为了避免出现 2,2,3 和 2,3,2这种，需要在第二种组合下，选完 3，直接从3位置开始
        for (int i = start; i < candidates.length; i++) {
            if (candidates[i] > target) continue;

            path.add(candidates[i]);

            //此处传值start 为 i，即如果选择了当前位置，就一往直前
            dfs(candidates, target - candidates[i], i);

            path.remove(path.size() - 1);
        }
    }
}
```

# 字母大小写全排列

给定一个字符串 s ，通过将字符串 s 中的每个字母转变大小写，我们可以获得一个新的字符串。

返回 所有可能得到的字符串集合 。以 任意顺序 返回输出。

例：

```java
输入：s = "a1b2"
输出：["a1b2", "a1B2", "A1b2", "A1B2"]
```

```java
import java.util.ArrayList;
import java.util.List;

class Solution {
    public List<String> letterCasePermutation(String s) {

        List<String> ans = new ArrayList<>();

        //先把最初结果加入
        ans.add(s);

        dfs(ans, s.toCharArray(), 0);

        return ans;
    }

    public void dfs(List<String> ans, char[] chars, int start) {
        // 终止条件
        if (start >= chars.length) {
            return;
        }

        //小写字母和大写字母转换 A 0100 0001 a 1100 0001 第五位(0010 0000)异或即可转化
        for (int i = start; i < chars.length; i++) {

            //
            if (!Character.isDigit(chars[i])) {

                chars[i] ^= 32;

                //将该种字符组合加入结果
                ans.add(String.valueOf(chars));

                dfs(ans, chars, i + 1);

                //撤回
                chars[i] ^= 32;
            }
        }
    }
}
```

# 字符串的排列

输入一个字符串，打印出该字符串中字符的所有排列。

你可以以任意顺序返回这个字符串数组，但里面不能有重复元素。

例：

```java
输入：s = "abc"
输出：["abc","acb","bac","bca","cab","cba"]
```

```java
class Solution {
    //本题可能含重复元素，故跳过不能用是否含某元素，而用观察位置的数组

    boolean[] used;

    public String[] permutation(String s) {

        //用 set 去重
        Set<String> list = new HashSet<>();

        //因为顺序是变的，不能用字符数组，需要用扩容数组
        StringBuilder path = new StringBuilder();

        used = new boolean[s.length()];

        dfs(s, list, path);

        String[] ans = new String[list.size()];

        return list.toArray(new String[0]);
    }

    public void dfs(String s, Set<String> list, StringBuilder path) {
        //数组凑够即返回
        if (path.length() == s.length()) {

            list.add(new StringBuilder(path).toString());

            return;
        }

        for (int i = 0; i < s.length(); i++) {
            if (used[i]) {
                continue;
            }

            used[i] = true;
            path.append(s.charAt(i));

            dfs(s, list, path);

            path.deleteCharAt(path.length() - 1);
            used[i] = false;
        }
    }
}
```