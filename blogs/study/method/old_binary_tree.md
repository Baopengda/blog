---
title: 算法之二叉树(版本一)
date: 2022-03-20
tags:
 - 数据结构
categories:
 - 算法
---
<!-- TOC -->

- [对称的二叉树](#%E5%AF%B9%E7%A7%B0%E7%9A%84%E4%BA%8C%E5%8F%89%E6%A0%91)
- [二叉树的镜像](#%E4%BA%8C%E5%8F%89%E6%A0%91%E7%9A%84%E9%95%9C%E5%83%8F)
- [树的子结构](#%E6%A0%91%E7%9A%84%E5%AD%90%E7%BB%93%E6%9E%84)
- [平衡二叉树](#%E5%B9%B3%E8%A1%A1%E4%BA%8C%E5%8F%89%E6%A0%91)
- [二叉树的最小深度](#%E4%BA%8C%E5%8F%89%E6%A0%91%E7%9A%84%E6%9C%80%E5%B0%8F%E6%B7%B1%E5%BA%A6)
- [路径总和](#%E8%B7%AF%E5%BE%84%E6%80%BB%E5%92%8C)
- [路径总和 II](#%E8%B7%AF%E5%BE%84%E6%80%BB%E5%92%8C-ii)
- [二叉搜索树的最近公共祖先](#%E4%BA%8C%E5%8F%89%E6%90%9C%E7%B4%A2%E6%A0%91%E7%9A%84%E6%9C%80%E8%BF%91%E5%85%AC%E5%85%B1%E7%A5%96%E5%85%88)
- [二叉搜索树的最近公共祖先II](#%E4%BA%8C%E5%8F%89%E6%90%9C%E7%B4%A2%E6%A0%91%E7%9A%84%E6%9C%80%E8%BF%91%E5%85%AC%E5%85%B1%E7%A5%96%E5%85%88ii)
- [重建二叉树](#%E9%87%8D%E5%BB%BA%E4%BA%8C%E5%8F%89%E6%A0%91)
- [二叉搜索树的后序遍历序列](#%E4%BA%8C%E5%8F%89%E6%90%9C%E7%B4%A2%E6%A0%91%E7%9A%84%E5%90%8E%E5%BA%8F%E9%81%8D%E5%8E%86%E5%BA%8F%E5%88%97)

<!-- /TOC -->
# 1. 对称的二叉树

`目的:判断一颗二叉树是不是对称的，是否自镜像,如下`

 ~~~java
    1
   / \
  2   2
 / \ / \
3  4 4  3
 ~~~

*题解：*

`方法一： 递归解法。`

每次推入两个节点

分别比较两个节点的左右子节点是否符合镜像

镜像：a节点的左孩子和b节点的右孩子，a节点的右孩子和b节点的左孩子相同

 ```java
class Solution {
    public boolean isSymmetric(TreeNode root) {

        //看做根节点自相镜像
        return compare(root, root);

    }

    public boolean compare(TreeNode a, TreeNode b){

        //如果两者同时为null,说明比完,返回true
        if (a == null && b== null){
            return true;
        }

        //如果任一节点为空，或者值不相等，则非镜像
        if (a == null || b == null || a.val != b.val){
            return false;
        }

        //递归比较
        return compare(a.left, b.right) && compare(a.right, b.left);
    }
}
```

`方法二：层序遍历，利用队列迭代对比`

创建队列,把相同的两个节点同时推入再同时弹出
两树镜像的条件：1.两节点的值相等 2.两节点子树,左 = 右,互为镜像

 ```java
class Solution {
    public boolean isSymmetric(TreeNode root) {

        return check(root, root);
    }

    public boolean check(TreeNode p, TreeNode q) {
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(p);
        queue.offer(q);

        while (!queue.isEmpty()) {

            TreeNode l = queue.poll();
            TreeNode r = queue.poll();

            if (l == null && r == null) {
                continue;
            }
            if ((l == null || r == null) || (l.val != r.val)) {
                return false;
            }

            queue.offer(l.left);
            queue.offer(r.right);

            queue.offer(l.right);
            queue.offer(r.left);
        }

        return true;

    }
}
```

# 2. 二叉树的镜像

`请完成一个函数，输入一个二叉树，该函数输出它的镜像。例如：`

~~~java
例如输入：

     4
   /   \
  2     7
 / \   / \
1   3 6   9

镜像输出：

     4
   /   \
  7     2
 / \   / \
9   6 3   1
~~~

*题解：*

思路是：回溯，就是我们递归到叶子，递归到最后，还要做些事情

先递归到叶子节点，将叶子节点左右互换，再向上回溯，将节点左右换

~~~java
class Solution {
    public TreeNode mirrorTree(TreeNode root) {
        
        if (root == null){
            return null;
        }

        //临时存储
        TreeNode tmp = root.left;

        //对于递归而言，只需关注第i次root，将递归函数视为一个不变量！
        //对于本层递归，关注的是root的左节点被赋值成右节点，右节点被赋值刚刚变化前的左节点（用临时变量存储了）
        root.left = mirrorTree(root.right);
        root.right = mirrorTree(tmp);

        return root;
    }
}
~~~

# 3. 树的子结构

`输入两棵二叉树A和B，判断B是不是A的子结构。(约定空树不是任意一个树的子结构), B是A的子结构,即 A中有出现和B相同的结构和节点值。例如:`

~~~java

给定的树 A:

     3
    / \
   4   5
  / \
 1   2
给定的树 B：

   4 
  /
 1
返回 true，因为 B 与 A 的一个子树拥有相同的结构和节点值。
~~~

*题解：*

1.先遍历得到A与B相同的节点
2.以相同节点为起点开始比较两树结构是否相同

~~~java
class Solution {
    public boolean isSubStructure(TreeNode A, TreeNode B) {
    
        if (B == null) {
            return false;
        }

        return search(A, B);
    }

    public boolean search(TreeNode a, TreeNode b) {
        if (a == null){
            return false;
        }

        //此处的逻辑，如果a和b节点相等，再去判断以当前节点为根节点时a和b的结构是否相等
        //若此节点为根节点不对，则再次递归选择根节点去比较
        if(a.val == b.val && compare(a,b)){
            return true;
        }

        //想想能不能这样写？
//        if(a.val == b.val){
//            return compare(a, b);
//        }
        //若这样写，当前节点为根节点的树不相同，则返回了false，却忽略了下面根节点也相同的情况


        return search(a.left, b) || search(a.right, b);
    }
    
    //基于相同根节点的树结构比较
    public boolean compare(TreeNode a, TreeNode b) {
        
        //此处必须先判断b为空，再看a为空
        if (b == null){
            return true;
        }

        //因为b不为空，a为空了才说明树结构不一
        if (a == null){
            return false;
        }

        if (a.val != b.val){
            return false;
        }
        
        return compare(a.left, b.left) && compare(a.right,b.right);

    }

}
~~~

# 平衡二叉树

给定一个二叉树，判断它是否是高度平衡的二叉树。

一棵高度平衡二叉树定义为：

一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过 1 。

**方法一：**

*自顶而下*

涉及到重复计算，复杂度较高

```java
class Solution {
    public boolean isBalanced(TreeNode root) {
        //暴力法，依次至上而下递归，分别判断平衡情况

        if (root == null){
            return true;
        }

        //left表示root的左子树的最大深度
        int left = depth(root.left);

        //right表示root的右子树的最大深度
        int right = depth(root.right);

        //得判断每一个树都是平衡的
        if (!isBalanced(root.left) || !isBalanced(root.right)){
            return false;
        }

        //返回两树深度的绝对值
        return Math.abs(left - right) > 1 ? false : true;

    }

    //depth方法的功能：给定任意二叉树节点，求该树的最大深度
    public int depth(TreeNode root) {

        if (root == null) {
            return 0;
        }

        return Math.max(depth(root.left), depth(root.right)) + 1;
    }
}
```

**方法二：**

*自底向上*

```java
class Solution {
    public boolean isBalanced(TreeNode root) {

        //只要不存在不平衡的子树，则整个树平衡
        return depth(root) != -1;

    }
    //递归求解每个子二叉树的平衡性，一旦有不平衡的，递归向上返回-1，结束判断
    public int depth(TreeNode root) {

        if (root == null) {
            return 0;
        }


        int left = depth(root.left);
        int right = depth(root.right);

        //如果本层根节点的二叉树不平衡则返回-1，如果其子树不平衡一样
        if (Math.abs(left - right) > 1 || left == -1 || right == -1) {
            return -1;
        }

        return Math.max(left, right) + 1;
    }
}
```

# 二叉树的最小深度

```java
class Solution {
    public int minDepth(TreeNode root) {

        if (root == null) {
            return 0;
        }

        int left = minDepth(root.left);
        int right = minDepth(root.right);

        if (left == 0 || right == 0) {
            return Math.max(left, right) + 1;
        }

        return Math.min(left, right) + 1;

    }
}
```

# 路径总和

```java
class Solution {
    public boolean hasPathSum(TreeNode root, int targetSum) {
        //深度优先搜索,采用递归

        if (root == null) {
            return false;
        }

        //提前确定遍历的该节点是叶子节点
        if (root.left == null && root.right == null) {
            return targetSum - root.val == 0;
        }

        return hasPathSum(root.left, targetSum - root.val) || hasPathSum(root.right, targetSum - root.val);
    }
}
```

# 路径总和 II

# 二叉搜索树的最近公共祖先

给定一个二叉搜索树, 找到该树中两个指定节点的最近公共祖先。

```java
class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        //三种情况：
        //1.如果此时遍历到的节点，值大于 p和q，则缩小根节点，继续向左子树遍历
        //2.若根节点的值小于 p和q， 向右子树遍历
        //3.如果此时根节点的值处于中间，直接返回当前节点

        //三种特例：
        //1.当节点遍历到null，无公共节点，返回
        //2.当节点遍历到q，说明q为公共节点
        //3.遍历到p，返回p

        if (root == null) {
            return null;
        }

        if (root == p) {
            return p;
        }

        if (root == q) {
            return q;
        }

        if (root.val > p.val && root.val > q.val) {
            return lowestCommonAncestor(root.left, p, q);
        }

        if (root.val < p.val && root.val < q.val) {

            return lowestCommonAncestor(root.right, p, q);
        }

        return root;
    }
}
```

# 二叉搜索树的最近公共祖先II

给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。

```java
class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        //画图很好懂，此处给出简单思路：
        //1.深度开始遍历二叉树，记录left和right两个子树
        //2.若遇到p或者q，分别返回p或者q，若遇到null返回null
        //3.一个根节点的返回值应为两个子节点的值，若两个子节点均返回null，则根也为null
        if (root == null || root == p || root == q) {
            return root;
        }


        TreeNode left = lowestCommonAncestor(root.left, p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);

        if (left == null && right == null) {
            return null;
        }

        if (left == null) {
            return right;
        }
        if (right == null) {
            return left;
        }

        return root;
    }
}
```

# 重建二叉树

```java
import java.util.HashMap;
import java.util.Map;

class Solution {

    //
    Map<Integer, Integer> inorderMap;

    public TreeNode buildTree(int[] preorder, int[] inorder) {
        //思路：利用好中序遍历，找到根节点，判别出左子树和右子树的长度，再循环

        //前序和中序大小一样，只算一个
        int n = preorder.length;

        inorderMap = new HashMap<>();

        //利用哈希存储中序遍历的 值 和 位置
        for (int i = 0; i < n; i++) {
            inorderMap.put(inorder[i], i);
        }

        //首先把 前序 和 中序 的长度（即左右边界）传参
        return newTree(preorder, inorder, 0, n - 1, 0, n - 1);

    }

    //目的，建立起根节点，再找到左右子树的边界，然后继续递归
    public TreeNode newTree(int[] preorder, int[] inorder,
                            int pre_left, int pre_right, int in_left, int in_right) {
        //返回条件：一直递归到子树为1
        if (pre_left > pre_right) {
            return null;
        }

        //第一步：找到根节点
        //利用前序遍历 根 左 右 的性质，确定前序左边界即为根
        int pre_root = pre_left;

        //在中序遍历中对应找到根节点，利用哈希找
        int in_root = inorderMap.get(preorder[pre_root]);

        //第二步：找到左右边界
        //利用中序遍历 左 根 右 的性质，根左为左子树，根右为右子树
        //求出左右子树长度
        int treeLong_left = in_root - in_left;
//        int treeLong_right = in_right - in_root;

        //第三步：建立当前根节点
        TreeNode root = new TreeNode(preorder[pre_root]);

        //第四步：递归建立根节点的左右子树
        //左子树：
        root.left = newTree(preorder, inorder, pre_left + 1, pre_left + treeLong_left,
                in_left, in_root - 1);

        //右子树：
        root.right = newTree(preorder, inorder, pre_left + treeLong_left + 1, pre_right,
                in_root + 1, in_right);

        return root;
    }
}
```

# 二叉搜索树的后序遍历序列

输入一个整数数组，判断该数组是不是某二叉搜索树的后序遍历结果。如果是则返回 true，否则返回 false。假设输入的数组的任意两个数字都互不相同。

```java
class Solution {
    public boolean verifyPostorder(int[] postorder) {

        return recur(postorder, 0, postorder.length - 1);

    }

    boolean recur(int[] postorder, int start, int end) {

        if (start >= end) {
            return true;
        }
        //寻找左右子树的边界：寻找过程也是遍历验证的过程
        //左子树左边界为start，新建右边界变量
        //让left_end一开始等于-1的位置，针对左子树为空
        int left_end = start - 1;

        //遍历将左子树的右边界找出来
        while (postorder[left_end + 1] < postorder[end]) {
            ++left_end;
        }

        //右子树左边界是左子树右边界+1的位置，新建右边界变量
        //添加判断与语句，针对右子树为空

        int right_end = left_end;

        //遍历将右子树的起止点找出来
        while (right_end < end && postorder[right_end + 1] > postorder[end]) {
            ++right_end;
        }

        //如果右边界+1为end位置，说明该层递归的树符合条件，继续递归其左右子树
        return right_end + 1 == end && recur(postorder, start, left_end) && recur(postorder, left_end + 1, right_end);
    }
}
```