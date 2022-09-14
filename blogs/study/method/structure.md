---
title: 手撕算法之常用数据结构(哈希,链表,红黑树)(未完待续)
date: 2022-03-31
tags:
 - 数据结构
categories:
 - 算法
---

<!-- TOC -->

- [手写HashSet_705设计哈希集合](#%E6%89%8B%E5%86%99hashset_705%E8%AE%BE%E8%AE%A1%E5%93%88%E5%B8%8C%E9%9B%86%E5%90%88)
- [手写HashMap_706设计哈希映射](#%E6%89%8B%E5%86%99hashmap_706%E8%AE%BE%E8%AE%A1%E5%93%88%E5%B8%8C%E6%98%A0%E5%B0%84)
- [手写LRU缓存](#%E6%89%8B%E5%86%99lru%E7%BC%93%E5%AD%98)

<!-- /TOC -->

## 手写HashSet_705设计哈希集合

```java
import java.util.Iterator;
import java.util.LinkedList;

class MyHashSet {
    //链地址法：
    //思路：用一个链表数组，将输入的数放在数组的对应位置的链表处，当位置冲突，放入该位置处的链表尾部

    //设定 Hash防止散列冲突的方法，采取质数求余的方法赋定位置： hash(x) = x % base
    private static final int BASE = 769;

    private static final int SIZE = 1000;

    LinkedList[] list;

    public MyHashSet() {

        list = new LinkedList[SIZE];

        //初始化，每个位置给定一个链表对象
        for (int i = 0; i < SIZE; i++) {

            list[i] = new LinkedList();
        }
    }

    //添加数的思路是，计算哈希值判断放在数组哪个位置，遍历看重复，有重复直接返回，无重复加至链尾
    //此处遍历链表用迭代器 Iterator
    public void add(int key) {

        int num = hash(key);

        Iterator<Integer> it = list[num].iterator();
        //遍历该链表判断重复
        //记住该利用迭代器遍历链表的方法
        while (it.hasNext()) {
            int item = it.next();
            if (item == key) {
                return;
            }
        }
        list[num].addLast(key);
    }

    //移除的思路，哈希到指定位置，判断是否有，删除。没有则返回
    public void remove(int key) {

        int num = hash(key);

        Iterator<Integer> it = list[num].iterator();

        while (it.hasNext()) {
            //
            int item = it.next();
            if (item == key) {
                //标准的利用迭代器删除元素，因为迭代器已经迭代到该元素了，直接删除
                it.remove();
                return;
            }
        }
    }

    //遍历查询是否有
    public boolean contains(int key) {
        int num = hash(key);

        Iterator<Integer> it = list[num].iterator();

        while (it.hasNext()) {
            int item = it.next();
            if (item == key) {
                return true;
            }
        }
        return false;
    }

    private int hash(int key) {
        return key % BASE;
    }
}
```

## 手写HashMap_706设计哈希映射

```java
import java.util.Iterator;
import java.util.LinkedList;

class MyHashMap {
    //链地址法，类比手写HashSet，只不过在链表中存的是对象

    private static final int MOD = 769;
    private static final int SIZE = 1000;

    LinkedList[] list;

    //建一个对象，存储key和value
    private class Pair {
        private int key;
        private int value;

        public Pair(int key, int value) {
            this.key = key;
            this.value = value;
        }

        public int getKey() {
            return key;
        }

        public int getValue() {
            return value;
        }

        public void setKey(int key) {
            this.key = key;
        }

        public void setValue(int value) {
            this.value = value;
        }
    }

    //初始化
    public MyHashMap() {

        list = new LinkedList[SIZE];

        for (int i = 0; i < SIZE; i++) {
            list[i] = new LinkedList<Pair>();
        }
    }

    //
    public void put(int key, int value) {

        int num = hash(key);

        Iterator<Pair> it = list[num].iterator();

        while (it.hasNext()) {

            Pair pair = it.next();

            if (pair.getKey() == key) {
                pair.setValue(value);
                return;
            }
        }
        list[num].addLast(new Pair(key, value));
    }

    //
    public int get(int key) {
        int num = hash(key);

        Iterator<Pair> it = list[num].iterator();

        while (it.hasNext()) {

            Pair pair = it.next();

            if (pair.getKey() == key) {
                return pair.value;
            }
        }
        return -1;
    }

    public void remove(int key) {
        int num = hash(key);

        Iterator<Pair> it = list[num].iterator();

        while (it.hasNext()) {

            Pair pair = it.next();

            if (pair.getKey() == key) {
                it.remove();
                return;
            }
        }
    }

    public int hash(int key) {
        return key % MOD;
    }
}
```

## 手写LRU缓存

```java
//LRU 缓存存储，思路是哈希存储key和节点，双向链表表示新旧序列
//首先确认，缓存是暂时的，如果容量超了，会把最旧的数据推出
//无论是get还是put方法都算使用，最近使用过的节点，算新的会推到头结点处

// get方法：
//1. 查询哈希，不存在返回-1，
//2. 存在的话，删除该节点removeHead，在头部添加该节点addToHead

// put方法：
//1. 查询哈希，不存在的话：
// (1)创建节点并赋值，添加进哈希
// (2)移到头部，增加size
// (3)若size大于容量，删除尾节点removeTail，删除哈希中该节点，size减少
//2. 若哈希是存在的，将该节点的val改变，该节点移动到头moveToHead

import java.util.HashMap;
import java.util.Map;

public class LRUCache {
    //1.构建哈希
    private Map<Integer, DoubleLinkedNode> cache = new HashMap<>();

    //几个全局变量:链表大小，容量
    private int size;
    private int capacity;

    //双向链表中，构造两个节点，伪头结点和伪尾节点，方便插入删除其他节点
    private DoubleLinkedNode fakeHead;
    private DoubleLinkedNode fakeTail;


    //2.构建双向链表模型
    class DoubleLinkedNode {

        //键值对
        int key;
        int value;

        //前后节点
        DoubleLinkedNode prev;
        DoubleLinkedNode next;

        //无参和有参构造
        public DoubleLinkedNode() {
        }

        public DoubleLinkedNode(int k, int v) {
            this.key = k;
            this.value = v;
        }
    }

    //构造函数
    public LRUCache(int capacity) {

        this.size = 0;
        this.capacity = capacity;

        fakeHead = new DoubleLinkedNode();
        fakeTail = new DoubleLinkedNode();

        fakeHead.next = fakeTail;
        fakeTail.prev = fakeHead;
    }

    //get方法
    public int get(int key) {

        //1.查询哈希
        DoubleLinkedNode node = cache.get(key);
        //为空返回-1
        if (node == null) {
            return -1;
        }

        //2.哈希查询到，将该节点移动到头部
        moveToHead(node);

        return node.value;
    }

    //put方法
    public void put(int key, int value) {
        //1.哈希查询，若不存在节点，则添加
        DoubleLinkedNode node = cache.get(key);

        if (node == null) {
            //创建节点，添加链表，添加哈希，增加size
            DoubleLinkedNode newNode = new DoubleLinkedNode(key, value);
            //新节点加入哈希
            cache.put(key, newNode);
            //新节点加入头部
            addToHead(newNode);

            ++size;

            //容量超出，在链表和哈希中删除尾节点
            if (size > capacity) {

//                cache.remove(fakeTail.prev.key);
//
//                removeNode(fakeTail.prev);
                DoubleLinkedNode tail = removeTail();
                
                cache.remove(tail.key);
                

                --size;
            }//若哈希中存在该节点，覆盖链表中的值，并更新该节点作为最近使用
        } else {

            node.value = value;

            moveToHead(node);
        }
    }

    //辅助方法区：
    //1.将节点移动到头部
    private void moveToHead(DoubleLinkedNode node) {
        //删除节点
        removeNode(node);
        //头部添加该节点
        addToHead(node);
    }

    //2.删除节点
    private void removeNode(DoubleLinkedNode node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    //3.头部添加节点
    private void addToHead(DoubleLinkedNode node) {
        node.prev = fakeHead;
        node.next = fakeHead.next;
        fakeHead.next.prev = node;
        fakeHead.next = node;
    }
    //4.删除尾节点，并返回被删除的节点
    private DoubleLinkedNode removeTail(){

        DoubleLinkedNode tail = fakeTail.prev;

        removeNode(tail);

        return tail;
    }
}
```