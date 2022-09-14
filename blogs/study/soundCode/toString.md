---
title: Java源码分析-JAVA基础常用方法
date: 2022-03-12
tags:
 - Java基础
categories:
 - 源码
---

# stack的add和push方法

ps： add是向list尾部插入数据，push是向list头部插入数据

~~~java
 /**
     * Appends the specified element to the end of this list.
     *
     * <p>This method is equivalent to {@link #addLast}.
     *
     * @param e element to be appended to this list
     * @return {@code true} (as specified by {@link Collection#add})
     */
    public boolean add(E e) {
        linkLast(e);
        return true;
    }

/**
     * Pushes an element onto the stack represented by this list.  In other
     * words, inserts the element at the front of this list.
     *
     * <p>This method is equivalent to {@link #addFirst}.
     *
     * @param e the element to push
     * @since 1.6
     */
    public void push(E e) {
        addFirst(e);
    }

/**
     * Inserts the specified element at the beginning of this list.
     *
     * @param e the element to add
     */
    public void addFirst(E e) {
        linkFirst(e);
    }

/**
     * Links e as first element.
     */
    private void linkFirst(E e) {
        final Node<E> f = first;
        final Node<E> newNode = new Node<>(null, e, f);
        first = newNode;
        if (f == null)
            last = newNode;
        else
            f.prev = newNode;
        size++;
        modCount++;
    }
~~~


# Object类的toString方法

Object类具有一个toString()方法，你创建的每个类都会继承该方法。它返回对象的一个String表示，并且对于调试非常有帮助。然而对于默认的toString()方法往往不能满足需求，需要覆盖这个方法。

案例：

```java
public class Test
{
    public static void main(String[] args)
    {
        char[] someArray = { 'J', 'A', 'V', 'A' };
        System.out.println(someArray.toString());
    }
}
```

结果并非打印出java而是[C@6d6f6e28，看toString源码


[toString源码]
```java
public String toString() {
    return getClass().getName() + "@" + Integer.toHexString(hashCode());
}
```
原来，toString方法返回的是一个字符串，这其中包含：：类名+@+哈希值的16进制形式

返回对象的字符串形式的地址值。对我们来说没有任何意义；所以通常情况，我们都会重写该方法；

或者用：

1）  System.out.println(new String(someArray));

2）  System.out.println（String.valueOf(someArray));

String.valueOf()的源码是

```java
public static String valueOf(char data[]) {
    return new String(data);
}

public static String valueOf(int i) {
    return Integer.toString(i);
}

public static String valueOf(long l) {
     return Long.toString(l);
}
```

值得注意的是，Arrays.toString方法对toString()进行了重写，可以将整型数组输出为字符串，看源码

```java
public static String toString(int[] a) {
        if (a == null)
            return "null";
        int iMax = a.length - 1;
        if (iMax == -1)
            return "[]";

        StringBuilder b = new StringBuilder();
        b.append('[');
        for (int i = 0; ; i++) {
            b.append(a[i]);
            if (i == iMax)
                return b.append(']').toString();
            b.append(", ");
        }
    }
```

```java
int[] someArray = { 1,2,3,4};
        System.out.println(Arrays.toString(someArray) + '4');
```

输出为 "[1, 2, 3, 4]4"

由源码分析可知，转化的字符串由”[", "a[i]",", "以及']' 组成。


