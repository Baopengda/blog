---
title: 算法之快速幂(完结)
date: 2022-03-21
tags:
 - 算法
categories:
 - 算法
---
<!-- TOC -->

- [快速幂](#%E5%BF%AB%E9%80%9F%E5%B9%82)
    - [模板](#%E6%A8%A1%E6%9D%BF)
    - [例题1：剑指 Offer 16. 数值的整数次方](#%E4%BE%8B%E9%A2%981%E5%89%91%E6%8C%87-offer-16-%E6%95%B0%E5%80%BC%E7%9A%84%E6%95%B4%E6%95%B0%E6%AC%A1%E6%96%B9)
        - [题目表述](#%E9%A2%98%E7%9B%AE%E8%A1%A8%E8%BF%B0)
        - [题解](#%E9%A2%98%E8%A7%A3)
    - [例题2：剑指 Offer 14- II. 剪绳子 II](#%E4%BE%8B%E9%A2%982%E5%89%91%E6%8C%87-offer-14--ii-%E5%89%AA%E7%BB%B3%E5%AD%90-ii)
        - [题目表述](#%E9%A2%98%E7%9B%AE%E8%A1%A8%E8%BF%B0)
        - [题解：](#%E9%A2%98%E8%A7%A3)
- [快速幂之 [矩阵快速幂]](#%E5%BF%AB%E9%80%9F%E5%B9%82%E4%B9%8B-%E7%9F%A9%E9%98%B5%E5%BF%AB%E9%80%9F%E5%B9%82)
    - [例题：509.斐波那契数](#%E4%BE%8B%E9%A2%98509%E6%96%90%E6%B3%A2%E9%82%A3%E5%A5%91%E6%95%B0)
        - [题目表述](#%E9%A2%98%E7%9B%AE%E8%A1%A8%E8%BF%B0)
        - [题解](#%E9%A2%98%E8%A7%A3)

<!-- /TOC -->


# 快速幂

## 模板

`快速幂算法原理:`

如需求数据 a 的幂次，此处 a 可以为数也可以为矩阵，常规做法需要对a进行不断的乘积即 a * a * a * ... 此处的时间复杂度将为 O(n) 

以求 3^10 的结果为例：

[优化步骤1：]

易知：

~~~java
3^10=3*3*3*3*3*3*3*3*3*3

    =9^5 = 9^4*9

    =81^2*9

    =6561*9
~~~

基于以上原理，我们在计算一个数的多次幂时，可以先判断其幂次的奇偶性，然后：

- 如果幂次为偶直接 base(底数) 作平方，power(幂次) 除以2

- 如果幂次为奇则底数平方，幂次整除于2然后再多乘一次底数

[优化步骤2：]

对于以上涉及到 [判断奇偶性] 和 [除以2] 这样的操作。使用系统的位运算比普通运算的效率是高的，因此可以进一步优化：

- 把 `power % 2 == 1` 变为 `(power & 1) == 1`  

- 把 ` power = power / 2` 变为 `power = power >> 1`

由上面理论，给出快速幂模版求 底数为base，幂次为pow的代码如下：

```java
//快速幂模版
    //递归的进行x的n次方计算
    public int culc(int base, int power) {
        int res = 1;

        while (power > 0) {
            //两种情况会进入if语句：
            //1.幂次若为奇数，提前多乘一次x
            //2.当幂次除到1，把x赋值给res
            if ((power & 1) == 1) {
                res *= base;
            }
            //幂次除以2
            power = power >> 1;
            //底数平方
            base = base * base;
        }
        return res;
    }
```

## 例题1：剑指 Offer 16. 数值的整数次方

### 题目表述

```java
实现 pow(x, n) ，即计算 x 的 n 次幂函数（即，xn）。不得使用库函数，同时不需要考虑大数问题。
```

### 题解

```java
class Solution {
    public double myPow(double x, int n) {
        //将正数n和负数n都给转换为正数n
        //注意：Java 代码中 int32 变量n∈[−2147483648,2147483647]
        //因此当 n = -2147483648 时执行 n = -n 会因越界而赋值出错
        //我们此处一开始就把 n 用 long 存储
        long b = n;

        if (n < 0) {
            b = -b;
            x = 1 / x;
        }
        return culc(x, b);
    }

    //快速幂模版
    //递归的进行x的n次方计算
    public double culc(double base, long power) {

        double res = 1.0;

        while (power > 0) {
            //两种情况会进入if语句：
            //1.幂次若为奇数，提前多乘一次x
            //2.当幂次除到1，把x赋值给res
            if ((power & 1) == 1) {
                res *= base;
            }

            //幂次除以2
            power = power >> 1;

            //底数平方
            base = base * base;
        }

        return res;
    }
}
```

## 例题2：剑指 Offer 14- II. 剪绳子 II

### 题目表述

```java
给你一根长度为 n 的绳子，请把绳子剪成整数长度的 m 段（m、n都是整数，n>1并且m>1），每段绳子的长度记为 k[0],k[1]...k[m - 1] 。请问 k[0]*k[1]*...*k[m - 1] 可能的最大乘积是多少？例如，当绳子的长度是8时，我们把它剪成长度分别为2、3、3的三段，此时得到的最大乘积是18。

答案需要取模 1e9+7（1000000007），如计算初始结果为：1000000008，请返回 1。
```

### 题解：

思路：

1.根据理论推导，绳子每段最好为3，

2.所以对于一个长度 n ，对 n 除以 3 取整可以得到需要的幂次 pow

3.对 n 取余可以得到最后一段的长度 last

4.要得到 结果 res，需要 3的 pow次方再乘以 last 即可，如 n 为 14，需要 `3 * 3 * 3 * 3 * 2`

5.特别的，需要最后对 last 进行讨论，若 last 为 1 ，需要拆分上一个3，变成`2 * 2`

```java
class Solution {
    private static final int NUM_MOD = 1000000007;

    public int cuttingRope(int n) {
        //特例讨论
        if (n <= 3) {
            return n - 1;
        }
        //创建变量：底数，幂次，最后一段长度,结果变量
        //因为 int最大值小于 1e9+7的平方 ，在下面计算中，定义为int类型的res和base有超出的风险
        //但 long最大值大于 1e9+7的平方，所以定义为 long 安全
        long base = 3;
        int pow = n / 3;
        int last = n % 3;
        long res = 1;

        //单独讨论最后一段,最后一段可能为 0，1，2
        if (last == 2) return (int) (myPow(res, base, pow) * 2 % NUM_MOD);
        //针对last ==1的情况，一个思考，可不可以先乘完 pow次再 /3*4 这样的操作？
        //答案是不能，因为情况可能是，在乘第pow次3后导致超出然后取模，再除以3便不能还原未乘最后一次3的时候的结果了
        //举例：设定超 10 取模，绳子长10，如果3*3*3 %10=7，7/3*4%10这样算，是得不到 3*3*4%10结果的
        if (last == 1) return (int) (myPow(res, base, pow - 1) * 4 % NUM_MOD);
        return (int) myPow(res,base,pow);
    }

    //开始快速幂，底数为 base 指数为 pow
    //注意每次涉及乘积需要取模 1e9+7
    public long myPow(long res, long base, int pow) {
        while (pow > 0) {
            //指数为奇数和1的情况
            if ((pow & 1) == 1) {
                res = res * base % NUM_MOD;
            }
            pow = pow >> 1;
            base = base * base % NUM_MOD;
        }
        return res;
    }
}
```

# 快速幂之 [矩阵快速幂]


## 例题：509.斐波那契数

### 题目表述

```java
斐波那契数 （通常用 F(n) 表示）形成的序列称为 斐波那契数列 。该数列由 0 和 1 开始，后面的每一项数字都是前面两项数字的和。也就是：

F(0) = 0，F(1) = 1
F(n) = F(n - 1) + F(n - 2)，其中 n > 1

给定 n ，请计算 F(n) 。
```

### 题解

根据递推关系，我们可以得到：对于如下矩阵运算，有  c = a^n * b，其中：   

    a = [[1,1], [1,0]], 

    b = [F(1), F(0)],

    c = [F(n+1), F(n)]

题解代码：

```java
class Solution {
    public int fib(int n) {
        //矩阵快速幂

        if (n < 2) {
            return n;
        }

        //定义乘积底数
        int[][] base = {{1, 1}, {1, 0}};

        //定义幂次
        int power = n - 1;

        int[][] ans = calc(base, power);

        //按照公式，返回的是两行一列矩阵的第一个数
        return ans[0][0];
    }

    //定义函数,求底数为 base 幂次为 power 的结果
    public int[][] calc(int[][] base, int power) {

        //定义变量，存储计算结果，此次定义为单位阵
        int[][] res = {{1, 0}, {0, 1}};

        //可以一直对幂次进行整除
        while (power > 0) {

            //1.若为奇数，需多乘一次 base
            //2.若power除到1，乘积后得到res
            //此处使用位运算在于效率高
            if ((power & 1) == 1) {

                res = mul(res, base);

            }

            //不管幂次是奇还是偶，整除的结果是一样的如 5/2 和 4/2
            //此处使用位运算在于效率高
            power = power >> 1;

            base = mul(base, base);
        }

        return res;
    }

    //定义函数,求二维矩阵：两矩阵 a, b 的乘积
    public int[][] mul(int[][] a, int[][] b) {

        int[][] c = new int[2][2];

        for (int i = 0; i < 2; i++) {

            for (int j = 0; j < 2; j++) {

                //矩阵乘积对应关系，自己举例演算一遍便可找到规律
                c[i][j] = a[i][0] * b[0][j] + a[i][1] * b[1][j];

            }
        }

        return c;
    }
}
```