---
title: 算法精选：深刻理解二叉树
date: 2022-05-02
tags:
 - 数据结构
categories:
 - 算法
---

<!-- TOC -->

- [二叉树题目两大解题思路](#%E4%BA%8C%E5%8F%89%E6%A0%91%E9%A2%98%E7%9B%AE%E4%B8%A4%E5%A4%A7%E8%A7%A3%E9%A2%98%E6%80%9D%E8%B7%AF)
- [二叉树遍历之 [后序遍历相关问题]](#%E4%BA%8C%E5%8F%89%E6%A0%91%E9%81%8D%E5%8E%86%E4%B9%8B-%E5%90%8E%E5%BA%8F%E9%81%8D%E5%8E%86%E7%9B%B8%E5%85%B3%E9%97%AE%E9%A2%98)
    - [例题: 543. 二叉树的直径](#%E4%BE%8B%E9%A2%98-543-%E4%BA%8C%E5%8F%89%E6%A0%91%E7%9A%84%E7%9B%B4%E5%BE%84)
- [二叉树遍历之 [遍历模拟] 和 [子问题分解]](#%E4%BA%8C%E5%8F%89%E6%A0%91%E9%81%8D%E5%8E%86%E4%B9%8B-%E9%81%8D%E5%8E%86%E6%A8%A1%E6%8B%9F-%E5%92%8C-%E5%AD%90%E9%97%AE%E9%A2%98%E5%88%86%E8%A7%A3)
    - [例题1：104. 二叉树的最大深度](#%E4%BE%8B%E9%A2%981104-%E4%BA%8C%E5%8F%89%E6%A0%91%E7%9A%84%E6%9C%80%E5%A4%A7%E6%B7%B1%E5%BA%A6)
    - [例题2：226. 翻转二叉树](#%E4%BE%8B%E9%A2%982226-%E7%BF%BB%E8%BD%AC%E4%BA%8C%E5%8F%89%E6%A0%91)
    - [例题3：116. 填充每个节点的下一个右侧节点指针](#%E4%BE%8B%E9%A2%983116-%E5%A1%AB%E5%85%85%E6%AF%8F%E4%B8%AA%E8%8A%82%E7%82%B9%E7%9A%84%E4%B8%8B%E4%B8%80%E4%B8%AA%E5%8F%B3%E4%BE%A7%E8%8A%82%E7%82%B9%E6%8C%87%E9%92%88)
    - [例题4：114. 二叉树展开为链表](#%E4%BE%8B%E9%A2%984114-%E4%BA%8C%E5%8F%89%E6%A0%91%E5%B1%95%E5%BC%80%E4%B8%BA%E9%93%BE%E8%A1%A8)
- [二叉树遍历之 [子问题分解构造二叉树]](#%E4%BA%8C%E5%8F%89%E6%A0%91%E9%81%8D%E5%8E%86%E4%B9%8B-%E5%AD%90%E9%97%AE%E9%A2%98%E5%88%86%E8%A7%A3%E6%9E%84%E9%80%A0%E4%BA%8C%E5%8F%89%E6%A0%91)
    - [模板](#%E6%A8%A1%E6%9D%BF)
    - [例题1：654. 最大二叉树](#%E4%BE%8B%E9%A2%981654-%E6%9C%80%E5%A4%A7%E4%BA%8C%E5%8F%89%E6%A0%91)
    - [例题2：105. 从前序与中序遍历序列构造二叉树](#%E4%BE%8B%E9%A2%982105-%E4%BB%8E%E5%89%8D%E5%BA%8F%E4%B8%8E%E4%B8%AD%E5%BA%8F%E9%81%8D%E5%8E%86%E5%BA%8F%E5%88%97%E6%9E%84%E9%80%A0%E4%BA%8C%E5%8F%89%E6%A0%91)
    - [例题3：889. 根据前序和后序遍历构造二叉树](#%E4%BE%8B%E9%A2%983889-%E6%A0%B9%E6%8D%AE%E5%89%8D%E5%BA%8F%E5%92%8C%E5%90%8E%E5%BA%8F%E9%81%8D%E5%8E%86%E6%9E%84%E9%80%A0%E4%BA%8C%E5%8F%89%E6%A0%91)
- [二叉树遍历之 [序列化]](#%E4%BA%8C%E5%8F%89%E6%A0%91%E9%81%8D%E5%8E%86%E4%B9%8B-%E5%BA%8F%E5%88%97%E5%8C%96)
    - [模板](#%E6%A8%A1%E6%9D%BF)
        - [通过 [一次遍历] 序列化模版](#%E9%80%9A%E8%BF%87-%E4%B8%80%E6%AC%A1%E9%81%8D%E5%8E%86-%E5%BA%8F%E5%88%97%E5%8C%96%E6%A8%A1%E7%89%88)
        - [通过 [分解子问题] 序列化模版](#%E9%80%9A%E8%BF%87-%E5%88%86%E8%A7%A3%E5%AD%90%E9%97%AE%E9%A2%98-%E5%BA%8F%E5%88%97%E5%8C%96%E6%A8%A1%E7%89%88)
- [二叉搜索树必知必会 [插入、查找、删除]](#%E4%BA%8C%E5%8F%89%E6%90%9C%E7%B4%A2%E6%A0%91%E5%BF%85%E7%9F%A5%E5%BF%85%E4%BC%9A-%E6%8F%92%E5%85%A5%E6%9F%A5%E6%89%BE%E5%88%A0%E9%99%A4)
    - [基础操作](#%E5%9F%BA%E7%A1%80%E6%93%8D%E4%BD%9C)
    - [构造](#%E6%9E%84%E9%80%A0)
- [二叉树 + 二叉搜索树公共祖先问题](#%E4%BA%8C%E5%8F%89%E6%A0%91--%E4%BA%8C%E5%8F%89%E6%90%9C%E7%B4%A2%E6%A0%91%E5%85%AC%E5%85%B1%E7%A5%96%E5%85%88%E9%97%AE%E9%A2%98)

<!-- /TOC -->

# 二叉树题目两大解题思路

1. 判断是否可以通过遍历一遍二叉树解题，利用辅助方法 dfs() 与 辅助变量求出答案；(有辅助函数)

    `注意：一次遍历，是调用 dfs 深度搜索，传参是 root 节点`

2. 判断是否可以用子树(子问题)推出整个问题的解；(无辅助函数)

    `注意：转化为子问题，是调用方法自身，传入的是两个子树`

# 二叉树遍历之 [后序遍历相关问题]

- 前序位置的代码只能从函数参数中获取父节点传递来的数据；

- 后序位置的代码不仅可以获取参数数据，还可以获取到子树通过函数返回值传递回来的数据；

- 遇到子树问题，首先想到给函数设置返回值，在后序遍历位置处操作；

## 例题: 543. 二叉树的直径

题目描述

```java
给定一棵二叉树，你需要计算它的直径长度。一棵二叉树的直径长度是任意两个结点路径长度中的最大值。这条路径可能穿过也可能不穿过根结点。

示例 :
给定二叉树

          1
         / \
        2   3
       / \     
      4   5    
返回 3, 它的长度是路径 [4,2,1,3] 或者 [5,2,1,3]。
```

题解

```java
class Solution {
    int maxLen = 0;

    public int diameterOfBinaryTree(TreeNode root) {
        //关键思路：整个树的最大直径等于 某一个节点的左右子树最大深度之和
        dfs(root);

        return maxLen;
    }

    public int dfs(TreeNode root) {
        if (root == null) {
            return 0;
        }

        int leftMax = dfs(root.left);
        int rightMax = dfs(root.right);
        //后序位置: 自下而上，每一次计算当前直径的 最大值
        //每次都保存 当前节点的最大直径————其左右子树最大深度之和
        maxLen = Math.max(maxLen, leftMax + rightMax);

        //后序遍历，返回当前节点的左右子树的最大深度
        return Math.max(leftMax, rightMax) + 1;
    }
}
```

# 二叉树遍历之 [遍历模拟] 和 [子问题分解]

充分理解在二叉树时的时间先后概念：

- 前序位置的代码在刚刚进入一个二叉树节点的时候执行；

- 后序位置的代码在将要离开一个二叉树节点的时候执行；

- 中序位置的代码在一个二叉树节点左子树都遍历完，即将开始遍历右子树的时候执行。

## 例题1：104. 二叉树的最大深度

题目表述

```java
给定一个二叉树，找出其最大深度。

二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

说明: 叶子节点是指没有子节点的节点。

示例：
给定二叉树 [3,9,20,null,null,15,7]，
    3
   / \
  9  20
    /  \
   15   7
返回它的最大深度 3 。
```


题解1：自上而下

```java
class Solution {
    int depth;
    int tmp;

    public int maxDepth(TreeNode root) {
        //自上而下：二叉树的最大深度
        //外部维护 一个深度变量，在每次遇到 null，即当前节点是叶子节点时，更新 深度值
        //同时，根据前序遍历顺序 左 根 右，在每次进入一个二叉树节点时，深度加1，在离开时，深度减一
        depth = 0;
        tmp = 0;

        dfs(root);
        return depth;
    }

    public void dfs(TreeNode root) {
        //
        if (root == null) {
            depth = Math.max(depth, tmp);
            return;
        }
        
        //进入前
        tmp++;
        dfs(root.left);
        dfs(root.right);
        //进入后
        tmp--;
    }
}
```

题解2：自下而上

```java
class Solution {

    int res;

    public int maxDepth(TreeNode root) {
        //自下而上，由子树的最大高度推出整个树
        //当遍历到子节点尽头，从 0 开始计算,每次向上返回深度值

        if (root == null) {
            return 0;
        }

        int leftMax = maxDepth(root.left);
        int rightMax = maxDepth(root.right);

        res = Math.max(leftMax, rightMax) + 1;

        return res;
    }
}
```
## 例题2：226. 翻转二叉树

题目表述

```java
给你一棵二叉树的根节点 root ，翻转这棵二叉树，并返回其根节点。
```

题解1：自上而下

```java
class Solution {
    public TreeNode invertTree(TreeNode root) {
        //翻转二叉树，先思考是否可以用一次遍历,通过修改每一个节点达到效果
        //思路：每次遍历到一个节点，交换该节点的两个子节点
        dfs(root);
        return root;
    }

    public void dfs(TreeNode root) {
        if (root == null) {
            return;
        }
        TreeNode tmp = root.left;
        root.left = root.right;
        root.right = tmp;
        dfs(root.left);
        dfs(root.right);
    }
}
```

题解2：自下而上

```java
class Solution {
    public TreeNode invertTree(TreeNode root) {
        //题解2：思考，是否可以通过分解成子问题解决
        //自底向上
        //想一想后序遍历思想中能提供的返回值
        if (root == null) {
            return null;
        }
        
        //分解成左右子树,得到的是当前节点的左右子树
        TreeNode leftNode = invertTree(root.left);
        TreeNode rightNode = invertTree(root.right);

        //对当前节点 交换左右子树
        root.left = rightNode;
        root.right = leftNode;

        return root;
    }
}
```

## 例题3：116. 填充每个节点的下一个右侧节点指针

题目表述

```java
给定一个 完美二叉树 ，其所有叶子节点都在同一层，每个父节点都有两个子节点。二叉树定义如下：

struct Node {
  int val;
  Node *left;
  Node *right;
  Node *next;
}
填充它的每个 next 指针，让这个指针指向其下一个右侧节点。如果找不到下一个右侧节点，则将 next 指针设置为 NULL。

初始状态下，所有 next 指针都被设置为 NULL。
```

题解1：自上而下一次遍历

值得注意的是，`传统的 traverse 函数是遍历二叉树的所有节点，但现在我们想遍历的其实是两个相邻节点之间的「空隙」`,

因此本题中，需要一次传入两个节点，才可以操作左节点的孩子与右节点孩子的连接。

`[题解 + 三叉树框架]`如下

注意只适用 完美二叉树:

```java
class Solution {
    public Node connect(Node root) {
        //题解1：自顶向下一次遍历，构造三叉树，需要一次传入两个节点进行操作
        //注意，因为本题是完美二叉树，不存在只存在一个孩子的情况
        if (root == null) {
            return root;
        }
        dfs(root.left, root.right);
        return root;
    }

    public void dfs(Node node1, Node node2) {
        if (node1 == null || node2 == null) {
            return;
        }

        //前序，进入节点前每次要做的
        node1.next = node2;

        // 连接相同父节点的两个子节点
        dfs(node1.left, node1.right);
        dfs(node2.left, node2.right);
        // 连接跨越父节点的两个子节点
        dfs(node1.right, node2.left);
    }
}
```

题解2：简单的层序遍历

简单且通用，适用于 [完美二叉树] 与 [不完美二叉树]

```java
import java.util.LinkedList;
import java.util.Queue;

class Solution {
    public Node connect(Node root) {
        if (root == null) {
            return root;
        }
        //层序遍历
        Queue<Node> queue = new LinkedList<>();
        queue.offer(root);

        //
        while (!queue.isEmpty()) {
            int size = queue.size();

            for (int i = 0; i < size; i++) {
                Node node = queue.poll();

                //当前队列还有下一个元素
                if (i < size - 1) {
                    node.next = queue.peek();
                }
                if (node.left != null) {
                    queue.offer(node.left);
                }
                if (node.left != null) {
                    queue.offer(node.right);
                }
            }
        }
        return root;
    }
}
```

## 例题4：114. 二叉树展开为链表

题目表述

```java
给你二叉树的根结点 root ，请你将它展开为一个单链表：

展开后的单链表应该同样使用 TreeNode ，其中 right 子指针指向链表中下一个结点，而左子指针始终为 null 。
展开后的单链表应该与二叉树 先序遍历 顺序相同。
```

题解1：自上而下一次遍历

思考：一次遍历能否解决问题？

1. 希望原地遍历原地解决，但是因为在遍历一个节点时，提前把当前节点的左子节点赋值给了当前节点的右子节点位置，

使得无法遍历当前节点的右子节点，所以原地遍历无法实现；

2. 可以通过不断创建节点，不断赋值的方式构造出来，通过一次遍历，但题目要求是原地展开，所以暂时弃置该题解思路；

题解2：转化为子问题

```java
class Solution {
    public void flatten(TreeNode root) {
        //分解为子问题
        if (root == null) {
            return;
        }
        //后序遍历，一直到叶子，拿到两个叶子节点
        flatten(root.left);
        flatten(root.right);
        //后序位置
        //此时，抵达最后，root 为父节点
        TreeNode preRight = root.right;

        root.right = root.left;
        root.left = null;

        //原左子树可能为空，使得现在的右子节点为空，需要分类讨论
        //此处不能用if 的原因：因为如果现在 1 节点的 左右分别是  2，3，4 和 5，6
        //此时 1 的 右节点变成了 2，3，4  需要在 4 后面接上 5，6 而不是在 2后面接上 5，6 否则 3，4就无了

        //需要拿一个中间变量记住
        TreeNode tmp = root;

        while (tmp.right != null) {
            //类似链表，继续找下一个一直到头 1，2，3，4 找到 4
            tmp = tmp.right;
        }

        //在 4 后面接上之前的 right
        tmp.right = preRight;
    }
}
```

# 二叉树遍历之 [子问题分解构造二叉树]

## 模板

```java
        //构造根节点，递归两树
        TreeNode root = new TreeNode(max);
        root.left = buildTree(nums, startL, endL);
        root.right = buildTree(nums, startR, endR);
```

理解转化为子问题时，是调用方法自身，分别传入两个子树

## 例题1：654. 最大二叉树

题目表述

```java
给定一个不重复的整数数组 nums 。 最大二叉树 可以用下面的算法从 nums 递归地构建:

创建一个根节点，其值为 nums 中的最大值。
递归地在最大值 左边 的 子数组前缀上 构建左子树。
递归地在最大值 右边 的 子数组后缀上 构建右子树。
返回 nums 构建的 最大二叉树。
```

题解

```java
class Solution {
    public TreeNode constructMaximumBinaryTree(int[] nums) {
        return buildTree(nums, 0, nums.length - 1);
    }

    //找到数组中最大值对应的索引，传入左右子树的分别索引
    public TreeNode buildTree(int[] nums, int left, int right) {
        //递归的判断条件
        //对于 1，3，2  root为 3, 分别递归 1和2，建立节点
        if (left > right) {
            return null;
        }

        //找出最大值对应的索引
        int max = Integer.MIN_VALUE;
        int index = -1;
        for (int i = left; i <= right; i++) {
            if (nums[i] > max) {
                max = nums[i];
                index = i;
            }
        }

        //分解为子问题，就要调用自身: 构造根节点，递归两树
        TreeNode root = new TreeNode(max);
        root.left = buildTree(nums, left, index - 1);
        root.right = buildTree(nums, index + 1, right);

        return root;
    }
}
```

## 例题2：105. 从前序与中序遍历序列构造二叉树

题目表述

```java
给定两个整数数组 preorder 和 inorder ，其中 preorder 是二叉树的先序遍历， inorder 是同一棵树的中序遍历，请构造二叉树并返回其根节点。
```

题解

```java
import java.util.HashMap;
import java.util.Map;

class Solution {

    Map<Integer, Integer> map;

    public TreeNode buildTree(int[] preorder, int[] inorder) {
        //前序遍历与中序遍历 [构造二叉树]
        //思路：用中序遍历找 root 的位置，找 左子树 和 右子树 的起始位置
        //用中序遍历得到左右子树长度，确定在前序数组中的起始位置

        //因为无重复元素，提前存储中序遍历的数值和下标，方便查找
        map = new HashMap<>();
        for (int i = 0; i < inorder.length; i++) {
            map.put(inorder[i], i);
        }
        return build(preorder, inorder, 0, preorder.length - 1, 0, inorder.length - 1);

    }

    public TreeNode build(int[] preorder, int[] inorder, int preStart, int preEnd, int inStart, int inEnd) {
        //终止条件：
        if (preStart > preEnd) {
            return null;
        }

        //找前序遍历根节点在中序遍历中对应的位置
        int rootVal = preorder[preStart];
        int index = map.get(rootVal);

        //根据中序遍历求左子树长度
        int leftLen = index - inStart;

        //构造根节点
        TreeNode root = new TreeNode(rootVal);
        //一直递归到底，构造左右子树
        root.left = build(preorder, inorder, preStart + 1, preStart + leftLen, inStart, index - 1);
        root.right = build(preorder, inorder, preStart + leftLen + 1, preEnd, index + 1, inEnd);

        return root;
    }
}
```

## 例题3：889. 根据前序和后序遍历构造二叉树

题目表述

```java
给定两个整数数组，preorder 和 postorder ，其中 preorder 是一个具有 无重复 值的二叉树的前序遍历，postorder 是同一棵树的后序遍历，重构并返回二叉树。

如果存在多个答案，您可以返回其中任何一个。

示例：
输入：preorder = [1,2,4,5,3,6,7], postorder = [4,5,2,6,7,3,1]
输出：[1,2,3,4,5,6,7]
```

题解

```java
import java.util.HashMap;
import java.util.Map;

class Solution {

    Map<Integer, Integer> map;

    public TreeNode constructFromPrePost(int[] preorder, int[] postorder) {
        //与 前中 或者 后中 序列确定二叉树不同，前后 序列所确定的二叉树不唯一，取决于以哪个序列为一个标准
        //本题解统一以 前序 为标准，由前序的 根 确定后序的位置，对于一个根节点的左子树而言，在前序中确定好左子树的位置，进而推得其在后序位置

        //首先存储好 后序遍历的位置，方便直接查询
        map = new HashMap<>();

        for (int i = 0; i < postorder.length; i++) {
            map.put(postorder[i], i);
        }

        return build(preorder, postorder, 0, preorder.length - 1, 0, postorder.length - 1);
    }

    public TreeNode build(int[] preorder, int[] postorder, int preStart, int preEnd, int postStart, int postEnd) {
        //
        if (preStart > preEnd) {
            return null;
        }

        //唯一的不同，每次找当前根节点的下一个数作为左子树的根节点，但是当 start + 1 > end 就不行了，需要单独讨论此情况
        if (preStart == preEnd) {
            return new TreeNode(preorder[preStart]);
        }

        //每一次都以前序为标准
        int rootVal = preorder[preStart];
        //找左子树的起始位置，由前序变量的左子树根节点来找，得到左子树根节点在后序中的位置，然后后序前面为左子树，右边为右
        int index = map.get(preorder[preStart + 1]);
        //左子树元素 包括 左子树根节点和其他左子树节点
        int leftLen = index - postStart + 1;
        //构造节点，递归到底再开始建立其左右子树: 严格注意，左子树，右子树，根节点的范围!
        TreeNode root = new TreeNode(rootVal);
        root.left = build(preorder, postorder, preStart + 1, preStart + leftLen, postStart, index);
        root.right = build(preorder, postorder, preStart + leftLen + 1, preEnd, index + 1, postEnd - 1);

        return root;
    }
}
```

# 二叉树遍历之 [序列化]

## 模板

序列化时，用字符串 String 承接 序列化内容，将 null 节点用 "#" 表示， 节点之间用 "," 隔开。

### 通过 [一次遍历] 序列化模版

例题见 [297. 二叉树的序列化与反序列化](https://leetcode-cn.com/problems/serialize-and-deserialize-binary-tree/)

```java
    private static final String NULL = "#";
    private static final String SEG = ",";

    StringBuilder sb = new StringBuilder();
    
    //序列化的辅助函数
    public void build(TreeNode root, StringBuilder sb) {
        //一次遍历，自上而下
        if (root == null) {
            sb.append(NULL).append(SEG);
            //当前节点为空，就不递归下一节点了
        } else {
            sb.append(root.val).append(SEG);
            build(root.left, sb);
            build(root.right, sb);
        }
    }
```

### 通过 [分解子问题] 序列化模版

例题见 [652. 寻找重复的子树](https://leetcode-cn.com/problems/find-duplicate-subtrees/)

```java
    //后序自底而上，依次得到的都是子树
    public String dfs(TreeNode root) {
        //当为 null ，设为 "#"
        if (root == null) {
            return "#";
        }

        //序列化分解到子树
        String left = dfs(root.left);
        String right = dfs(root.right);

        String subTree = left + "," + right + "," + root.val;
        
        return subTree;
    }
```

# 二叉搜索树必知必会 [插入、查找、删除]

## 基础操作

二叉搜索树最特别的性质即左小右大，利用中序遍历出的结果满足升序。

明确二叉搜索树的【前驱节点】和【后继节点】概念：

题目1：[701.二叉搜索树中的插入操作](https://leetcode.cn/problems/insert-into-a-binary-search-tree/)

题目2：[700.二叉搜索树中的搜索](https://leetcode.cn/problems/search-in-a-binary-search-tree/)

题目3：[450. 删除二叉搜索树中的节点](https://leetcode.cn/problems/delete-node-in-a-bst/)

## 构造

结合排列组合，子问题分解

题目1：[96. 不同的二叉搜索树](https://leetcode.cn/problems/unique-binary-search-trees/)

题目2：[95. 不同的二叉搜索树 II](https://leetcode.cn/problems/unique-binary-search-trees-ii/)

# 二叉树 + 二叉搜索树公共祖先问题

题目1：[236. 二叉树的最近公共祖先](https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/)

题目1说明：用子问题分解 + 后序可以完成本题，但是注意的是，此种方法适用于本题条件两节点和公共祖先必定存在的情况，因为在递归的过程中，若发现了两节点任意一个就直接返回，如果不存在两节点则该方法失效。