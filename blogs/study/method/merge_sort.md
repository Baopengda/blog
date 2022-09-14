---
title: 算法精选：深刻理解归并排序
date: 2022-05-09
tags:
 - 算法
categories:
 - 算法
---
<!-- TOC -->

- [归并排序](#%E5%BD%92%E5%B9%B6%E6%8E%92%E5%BA%8F)
    - [归并排序变式__模板](#%E5%BD%92%E5%B9%B6%E6%8E%92%E5%BA%8F%E5%8F%98%E5%BC%8F__%E6%A8%A1%E6%9D%BF)
        - [例题](#%E4%BE%8B%E9%A2%98)
            - [1 剑指 Offer 51. 数组中的逆序对 重点：记住两个贡献](#1-%E5%89%91%E6%8C%87-offer-51-%E6%95%B0%E7%BB%84%E4%B8%AD%E7%9A%84%E9%80%86%E5%BA%8F%E5%AF%B9-%E9%87%8D%E7%82%B9%E8%AE%B0%E4%BD%8F%E4%B8%A4%E4%B8%AA%E8%B4%A1%E7%8C%AE)
            - [2 315. 计算右侧小于当前元素的个数  重点：索引数组, 附带给索引数组排顺序](#2-315-%E8%AE%A1%E7%AE%97%E5%8F%B3%E4%BE%A7%E5%B0%8F%E4%BA%8E%E5%BD%93%E5%89%8D%E5%85%83%E7%B4%A0%E7%9A%84%E4%B8%AA%E6%95%B0--%E9%87%8D%E7%82%B9%E7%B4%A2%E5%BC%95%E6%95%B0%E7%BB%84-%E9%99%84%E5%B8%A6%E7%BB%99%E7%B4%A2%E5%BC%95%E6%95%B0%E7%BB%84%E6%8E%92%E9%A1%BA%E5%BA%8F)
            - [3 493. 翻转对 重点：合并前统计](#3-493-%E7%BF%BB%E8%BD%AC%E5%AF%B9-%E9%87%8D%E7%82%B9%E5%90%88%E5%B9%B6%E5%89%8D%E7%BB%9F%E8%AE%A1)
            - [4 327. 区间和的个数 重点：给前缀和排顺序，过程中计算区间和](#4-327-%E5%8C%BA%E9%97%B4%E5%92%8C%E7%9A%84%E4%B8%AA%E6%95%B0-%E9%87%8D%E7%82%B9%E7%BB%99%E5%89%8D%E7%BC%80%E5%92%8C%E6%8E%92%E9%A1%BA%E5%BA%8F%E8%BF%87%E7%A8%8B%E4%B8%AD%E8%AE%A1%E7%AE%97%E5%8C%BA%E9%97%B4%E5%92%8C)

<!-- /TOC -->

# 归并排序

归并排序的本质可以说是 [二叉树后序遍历]，也可以说是 [统计逆序对]

采用分治思想，额外维护一个数组，依次将排序完的数添加入数组
具体过程，先把n个数，依次二分递归，到有n/2个数组，每个数组长度为2

分别对每个数组进行排序，然后两两合并

具体合并流程，设置两指针，依次比两数组头部添加，有一个数组遍历完毕，另一个数组剩余全部元素添加其后

完成合并之后的临时数组，依次加入到原数组中

注意一个问题: 创建的临时数组 tmp ，可以刚开始一次性创建，也可以在每次合并时创建小数组

~~~java
public class Solution {

    public int[] sortArray(int[] nums) {
        //归并算法排序
        mergeSort(nums, 0, nums.length - 1);
        return nums;
    }

    //
    public void mergeSort(int[] nums, int left, int right) {
        //      2,3,1,8,6    -> [1,2,3,6,8]
        //       /     \     ->    ^
        //     2,3,1   8,6   -> [1,2,3], [6,8]  
        //      /  \               ^
        //     /    \              |
        //    2,3    1       ->  [2,3]

        //当最小数组长度为2，递归终止，开始执行比较程序
        //如 [2,3,1,8,6] -> [2,3] 再次递归时则返回
        if (left >= right) {
            return;
        }
        int mid = (right - left) / 2 + left;
        //左拆分
        mergeSort(nums, left, mid);
        //右拆分
        mergeSort(nums, mid + 1, right);
        //合并
        merge(nums, left, mid, right);
    }

    public void merge(int[] nums, int left, int mid, int right) {
        int[] tmp = new int[right - left + 1];
        //[2,3]
        int i = left;
        int j = mid + 1;
        int index = 0;
        //小数组排序，两数组合并都能实现
        while (i <= mid && j <= right) {
            if (nums[i] <= nums[j]) {
                tmp[index++] = nums[i++];
            } else {
                tmp[index++] = nums[j++];
            }
        }
        //任意一个数组到头，则另一个数组剩余元素全添加至尾
        while (i <= mid) {
            tmp[index++] = nums[i++];
        }
        while (j <= right) {
            tmp[index++] = nums[j++];
        }
        //依次加入原数组中
        for (int k = 0; k <= right - left; k++) {
            nums[left + k] = tmp[k];
        }
    }
}
~~~

## 归并排序变式__模板

[23. 合并K个升序链表](https://leetcode.cn/problems/merge-k-sorted-lists/)

```java
class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        //递归，两两合并，一分为二
        
        if (lists.length == 0){
            return null;
        }

        return merge(lists, 0, lists.length - 1);
    }


    //分治（二分有mid） 再合并
    public ListNode merge(ListNode[] lists, int left, int right) {

        //递归终止条件

        //一直递归到一个链表,返回该链表
        if (left >= right){
            return lists[left];
        }


        //定义中间点
        int mid = (right - left) / 2 + left;
        ListNode listA = merge(lists, left, mid);
        ListNode listB = merge(lists, mid + 1, right);

        return mergeTwoItem(listA , listB);
    }

    //将两链表合一
    public ListNode mergeTwoItem(ListNode listA, ListNode listB) {

        ListNode pre = new ListNode(-1);

        ListNode head = pre, headA = listA, headB = listB;

        while (headA != null && headB != null) {

            if (headA.val < headB.val) {

                pre.next = headA;

                headA = headA.next;

            } else {

                pre.next = headB;

                headB = headB.next;

            }

            pre = pre.next;

        }

        if (headA != null) {

            pre.next = headA;
        }
        if (headB != null) {

            pre.next = headB;
        }

        return head.next;
    }


}
```

>重点

掌握好归并排序中的 [群体贡献] 与 [个人贡献] 的用法，计算 [逆序对] 用

### 例题

#### (1) [剑指 Offer 51. 数组中的逆序对](https://leetcode-cn.com/problems/shu-zu-zhong-de-ni-xu-dui-lcof/) (重点：记住两个贡献)

#### (2) [315. 计算右侧小于当前元素的个数](https://leetcode-cn.com/problems/count-of-smaller-numbers-after-self/)  (重点：索引数组, 附带给索引数组排顺序)
#### (3) [493. 翻转对](https://leetcode.cn/problems/reverse-pairs/) (重点：合并前统计)

#### (4) [327. 区间和的个数](https://leetcode.cn/problems/count-of-range-sum/) (重点：给前缀和排顺序，过程中计算区间和)