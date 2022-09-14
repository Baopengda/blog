---
title: 算法之并查集(未完待续)
date: 2022-04-07
tags:
 - 算法
categories:
 - 算法
---

## 547.省份数量

并查集模版

```java
//并查集思路：并查集是一种数据结构，本质是个集合，在java中，可以用 哈希来做为这个集合
    //在这个集合中，有几种方法：添加、合并、查询根节点、压缩路径、判断是否连通
    class UnionFind {
        Map<Integer, Integer> father;

        //初始构造
        public UnionFind() {
            father = new HashMap<>();
        }

        //添加节点：当哈希表中无该节点，将该节点和其父值为空添加进去
        public void add(int x) {
            if (!father.containsKey(x)) father.put(x, null);
        }

        //合并节点，将两节点的父节点合并，顺序随意
        public void merge(int x, int y) {
            int rootX = find(x);
            int rootY = find(y);

            if (rootX != rootY) father.put(rootX, rootY);
        }

        //查找一个节点的父节点,并且实时压缩路径
        public int find(int x) {
            int root = x;

            //查找父节点
            while (father.get(root) != null) {
                root = father.get(root);
            }

            //压缩路径:由刚刚找到的root对比不断赋值的x判断到最终
            while (x != root) {
                //先存储中间的父节点
                int near_root = father.get(x);
                father.put(x, root);
                x = near_root;
            }

            return root;
        }

        //判断连通
        public boolean isConnected(int x, int y) {
            return find(x) == find(y);
        }
    }
```

并查集题解

```java
import java.util.HashMap;
import java.util.Map;

//并查集求连通分量
//并查集思路：并查集是一种数据结构，本质是个集合，在java中，可以用 哈希来做为这个集合
//在这个集合中，有几种方法：添加、合并、查询根节点、压缩路径、判断是否连通
class UnionFind {
    Map<Integer, Integer> father;

    //记录连通数量
    private int count;

    //初始构造
    public UnionFind() {
        father = new HashMap<>();
    }

    //添加节点：当哈希表中无该节点，将该节点和其父值为空添加进去
    public void add(int x) {
        if (!father.containsKey(x)) father.put(x, null);
        //每次加入一个节点，数量加一
        count++;
    }

    //合并节点，将两节点的父节点合并，顺序随意
    public void merge(int x, int y) {
        int rootX = find(x);
        int rootY = find(y);

        if (rootX != rootY) {
            father.put(rootX, rootY);
            //每次合并一次，数量减一
            count--;
        }
    }

    //查找一个节点的父节点,并且实时压缩路径
    public int find(int x) {
        int root = x;

        //查找父节点
        while (father.get(root) != null) {
            root = father.get(root);
        }

        //压缩路径:由刚刚找到的root对比不断赋值的x判断到最终
        while (x != root) {
            //先存储中间的父节点
            int near_root = father.get(x);
            father.put(x, root);
            x = near_root;
        }

        return root;
    }

    //判断连通
    public boolean isConnected(int x, int y) {
        return find(x) == find(y);
    }

    //返回连通量
    public int getCount() {
        return count;
    }

}

class Solution {

    public int findCircleNum(int[][] isConnected) {

        UnionFind unionFind = new UnionFind();

        //遍历一遍城市，将城市加入并查集中
        for (int i = 0; i < isConnected.length; i++) {

            unionFind.add(i);

            for (int j = 0; j < isConnected.length; j++) {
                if (isConnected[i][j] == 1) {
                    unionFind.merge(i, j);
                }
            }
        }
        return unionFind.getCount();
    }
}

```