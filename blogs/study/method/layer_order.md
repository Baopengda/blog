---
title: 算法之层序遍历(未完待续)
date: 2022-04-08
tags:
 - 算法
categories:
 - 算法
---
<!-- TOC -->

- [模板](#%E6%A8%A1%E6%9D%BF)
- [面试题32 从上到下打印二叉树](#%E9%9D%A2%E8%AF%95%E9%A2%9832-%E4%BB%8E%E4%B8%8A%E5%88%B0%E4%B8%8B%E6%89%93%E5%8D%B0%E4%BA%8C%E5%8F%89%E6%A0%91)
- [二叉树的层序遍历](#%E4%BA%8C%E5%8F%89%E6%A0%91%E7%9A%84%E5%B1%82%E5%BA%8F%E9%81%8D%E5%8E%86)
- [填充每个节点的下一个右侧节点指针](#%E5%A1%AB%E5%85%85%E6%AF%8F%E4%B8%AA%E8%8A%82%E7%82%B9%E7%9A%84%E4%B8%8B%E4%B8%80%E4%B8%AA%E5%8F%B3%E4%BE%A7%E8%8A%82%E7%82%B9%E6%8C%87%E9%92%88)
- [填充每个节点的下一个右侧节点指针II](#%E5%A1%AB%E5%85%85%E6%AF%8F%E4%B8%AA%E8%8A%82%E7%82%B9%E7%9A%84%E4%B8%8B%E4%B8%80%E4%B8%AA%E5%8F%B3%E4%BE%A7%E8%8A%82%E7%82%B9%E6%8C%87%E9%92%88ii)

<!-- /TOC -->

# 模板

while 从上到下遍历，for 每层从左到右遍历

```java
// 输入一棵二叉树的根节点，层序遍历这棵二叉树
void levelTraverse(TreeNode root) {
    if (root == null) return;
    Queue<TreeNode> q = new LinkedList<>();
    q.offer(root);

    // 从上到下遍历二叉树的每一层
    while (!q.isEmpty()) {
        int sz = q.size();
        // 从左到右遍历每一层的每个节点
        for (int i = 0; i < sz; i++) {
            TreeNode cur = q.poll();
            // 将下一层节点放入队列
            if (cur.left != null) {
                q.offer(cur.left);
            }
            if (cur.right != null) {
                q.offer(cur.right);
            }
        }
    }
}
```

# 面试题32 从上到下打印二叉树

第一种，如本题，仅仅要求输出一个大数组如[3, 2, 5]，直接是创建一个输出数组，简单的层序遍历

```java
class Solution {
    public int[] levelOrder(TreeNode root) {
        //广度优先:输出整个二叉树数组

        if (root == null) {
            return new int[]{};
        }

        Queue<TreeNode> queue = new LinkedList<>();

        List<Integer> list = new LinkedList<>();

        queue.offer(root);

        while (!queue.isEmpty()) {

            root = queue.poll();

            list.add(root.val);


            if (root.left != null) {

                queue.offer(root.left);

            }
            if (root.right != null) {

                queue.offer(root.right);

            }

        }

        int[] ans = new int[list.size()];

        for (int i = 0; i < list.size(); i++) {
            ans[i] = list.get(i);
        }

        return ans;
    }
}
```

# 102 二叉树的层序遍历

第二种，要求结果数组存储每层数据，输出一个二维数组如[[3], [2,5]]

此时需要创建额外的数组，存储每一层数据，关键是在while循环中加入一个长度为队列size的for循环

```java
class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        //二叉树的层序遍历,利用队列
        //1.先将根节点推入队列
        //2.计算当前层的队列大小并进行遍历
        //3.若当前节点存在左右孩子,推入队列等待下一层的循环
        
        Queue<TreeNode> queue = new LinkedList<>();

        queue.offer(root);

        List<List<Integer>> res = new ArrayList<>();

        if (root == null){
            return res;
        }


        //队列为空则树遍历完毕
        while (!queue.isEmpty()) {

            int size = queue.size();

            //对每一层都单独存储数组
            List<Integer> arr = new ArrayList<>();

            //具体到每一层中的每一个节点
            for (int i = 0; i < size; i++) {
                TreeNode node = queue.poll();

                arr.add(node.val);

                //将下一层依次推入队列
                if (node.left != null) {
                    queue.offer(node.left);
                }
                if (node.right != null) {
                    queue.offer(node.right);
                }
            }
            //将每一层的数组加入二维数组中
            res.add(arr);
        }
        return res;
    }
}
```

# 116 填充每个节点的下一个右侧节点指针

```java
/*
// Definition for a Node.
class Node {
    public int val;
    public Node left;
    public Node right;
    public Node next;

    public Node() {}
    
    public Node(int _val) {
        val = _val;
    }

    public Node(int _val, Node _left, Node _right, Node _next) {
        val = _val;
        left = _left;
        right = _right;
        next = _next;
    }
};
*/
class Solution {
    public Node connect(Node root) {
        //题解1：层次遍历
        //思路：1.创建队列,存储本层所有节点
        //2.弹出节点,若节点下一兄弟节点存在(用此时队列大小判断),赋值next
        //3.将该弹出节点的左右孩子推入队列

        if (root == null) {
            return root;
        }

        // 初始化队列同时将第一层节点加入队列中，即根节点
        Queue<Node> queue = new LinkedList<Node>();
        queue.add(root);

        // 外层的 while 循环迭代的是层数
        while (!queue.isEmpty()) {

            // 记录当前队列大小
            int size = queue.size();

            // 遍历这一层的所有节点
            for (int i = 0; i < size; i++) {

                // 从队首取出元素
                Node node = queue.poll();

                // 连接
                if (i < size - 1) {
                    node.next = queue.peek();
                }

                // 拓展下一层节点
                if (node.left != null) {
                    queue.add(node.left);
                }
                if (node.right != null) {
                    queue.add(node.right);
                }
            }
        }

        // 返回根节点
        return root;
    }
}
```

```java
class Solution {
    public Node connect(Node root) {
        //题解2：不创建队列,利用next特性,在父层实现父层之间的连接和子层连接
        if (root == null) {
            return null;
        }
        Node leftMost = root;

        //当子层左孩子为空结束
        while(leftMost.left != null){

            //创建每子层层的头结点,用于遍历该层
            Node head = leftMost;

            while (head != null){

                //连接1：同父层之间,同父的左孩子指向右孩子
                head.left.next = head.right;

                //连接2：异父层之间,左父的右孩子指向右父的左孩子
                if (head.next != null){
                    head.right.next = head.next.left;
                }

                //指针后移
                head = head.next;
            }
            //去下一层的左子节点
            leftMost = leftMost.left;

        }
        return root;
    }
}
```

# 117 填充每个节点的下一个右侧节点指针II

```java
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

class Solution {
    public Node connect(Node root) {
        //不使用队列，直接利用 next 特性遍历父层时以此连接子层

        if (root == null) {
            return root;
        }

        //先将当前层赋值为root
        Node cur = root;

        //纵向遍历的循环
        while (cur != null) {

            //要解决的问题是，由于不是一个完美二叉树，可能会出现下一层左节点为空
            //定义一个前置哑节点，记录下一层,每次大循环之后赋值当前的 cur
            Node dummy = new Node(-1);

            //定义一个可移动的节点
            Node pre = dummy;

            //横向遍历的循环
            //需要遍历当前层的各节点,直到本层遍历完毕
            while (cur != null) {
                if (cur.left != null) {
                    pre.next = cur.left;
                    pre = pre.next;
                }
                //在pre移动的过程中，因为pre被赋值成 左节点了，再赋值pre的时候左节点的next便指向右
                if (cur.right != null) {
                    pre.next = cur.right;
                    pre = pre.next;
                }
                //从第二层开始，可以遍历本层
                cur = cur.next;
            }
            //赋值到下层存在的子节点
            cur = dummy.next;
        }

        return root;
    }
}
```