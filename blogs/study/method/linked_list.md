---
title: 一招鲜吃遍反转链表
date: 2022-06-13
tags:
 - 算法
categories:
 - 算法
---

## 反转整条单链表

[反转链表](https://leetcode.cn/problems/reverse-linked-list/)

定义一个节点 cur 记录当前位置，一个 end 记录返回节点，流程是先将 end 比 cur 慢一步，每次先将 end 赋给 cur.next，然后将 cur 赋给 end。 

```java
class Solution {
    public ListNode reverseList(ListNode head) {
        //定义 cur 节点，用做不断后移
        //定义 end 节点，用做后移到末端，并作头结点返回
        ListNode cur = head;
        ListNode end = null;

        while (cur != null) {
            ListNode tmp = cur.next;
            cur.next = end;
            end = cur;
            cur = tmp;
        }
        return end;
    }
}
```

## 反转单链表某段节点

[92. 反转链表 II](https://leetcode.cn/problems/reverse-linked-list-ii/)

```java
class Solution {
    public ListNode reverseBetween(ListNode head, int left, int right) {
        //类似于反转 k 个部分，缺少了还原 pre和end位置与 while大循环
        //定义哑节点，用于返回整个链表
        //定义 pre 节点，记录前驱节点位置
        //定义 end 节点，记录末端
        ListNode dummy = new ListNode(-1, head);
        ListNode pre = dummy;
        ListNode end = dummy;

//**************位移位移位移位移*******************************
        //先走到头部，使 pre 位移到 left 的前驱
        for (int i = 0; i < left - 1; i++) {
            pre = pre.next;
            end = end.next;
        }

        //再让节点 end 位移到 right 位置
        for (int i = 0; i < right - left + 1; i++) {
            end = end.next;
        }
//***********************************************************
        //记录
        ListNode start = pre.next;
        ListNode next = end.next;
        //断链
        end.next = null;
        //反转
        reverse(start);
        //指向
        pre.next = end;
        start.next = next;

        return dummy.next;
    }

    /*反转单链表*/
    public ListNode reverse(ListNode head) {
        ListNode cur = head;
        ListNode end = null;

        while (cur != null) {
            ListNode tmp = cur.next;
            cur.next = end;
            end = cur;
            cur = tmp;
        }
        return end;
    }
}
```

## k 个一组反转多个

[25. K 个一组翻转链表](https://leetcode.cn/problems/reverse-nodes-in-k-group/)

```java
class Solution {
    public ListNode reverseKGroup(ListNode head, int k) {
        //定义哑节点，用于返回整个链表
        //定义 pre 节点，记录前驱节点位置
        //定义 end 节点，记录末端
        ListNode dummy = new ListNode(-1, head);
        ListNode pre = dummy;
        ListNode end = dummy;

        //一直将 end 遍历到尾部
        while (end != null) {
//**************位移位移位移位移*******************************
            //让节点 end 位移到 right 位置
            //如果当前是最后一段，还要判断不能出界
            for (int i = 0; i < k && end != null; i++) {
                end = end.next;
            }

            if (end == null) {
                break;
            }
//***********************************************************
            //记录
            ListNode start = pre.next;
            ListNode next = end.next;
            //断链
            end.next = null;
            //反转
            reverse(start);
            //指向
            pre.next = end;
            start.next = next;
            //还原
            pre = start;
            end = start;

        }

        return dummy.next;
    }


    /*反转单链表*/
    public ListNode reverse(ListNode head) {
        //定义 cur 节点，用做不断后移
        //定义 end 节点，用做后移到末端，并作头结点返回
        ListNode cur = head;
        ListNode end = null;

        while (cur != null) {
            ListNode tmp = cur.next;
            cur.next = end;
            end = cur;
            cur = tmp;
        }
        return end;
    }
}
```



