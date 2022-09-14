---
title: 数据结构 面经篇
date: 2022-05-27
tags:
 - 数据结构
categories:
 - 面经
---

<!-- vscode-markdown-toc -->
* 1. [ArrayList 与 LinkedList 有什么区别？](#ArrayListLinkedList)
* 2. [HashMap 与 CurrentHashMap 比较？](#HashMapCurrentHashMap)

<!-- vscode-markdown-toc-config
	numbering=true
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->

##  1. <a name='ArrayListLinkedList'></a>ArrayList 与 LinkedList 有什么区别？

ArrayList 重要的点：底层数组默认容量、扩容、拷贝、查询与增删

简要回答

- ArrayList 是基于数组实现的，LinkedList 基于双向链表实现；
- 与 LinkedList 相比， ArrayList 查找、访问速度较快，但增加、删除速度慢；
- 线程不安全；

> ArrayList 源码分析

ArrayList 继承了 AbstractList 类，在存储基本变量类型时，如 int、long 只能存储其包装类，是因为 ArrayList 的主要底层实现是数组 Object[] elementData；

elementData 使用 transient 修饰，表示该对象不可序列化，但是 ArrayList 类实现了 Serializable 接口，是因为 elementData 申请的空间始终大于使用的，直接序列化会导致空余的空间也序列化导致传输空数据，所以内部私有方法有 writeObject 和 readObject 来完成序列化和反序列化操作。

**ArrayList 的构造函数**

- 无参构造直接赋值空对象数组 `Object[] ob = {};`
- 有参构造会创建参数大小的对象数组  `this.elementData = new Object[initialCapacity];`

`注意`：只要在真正通过 add() 添加数据时，才会分配默认容量 = 10

**ArrayList 扩容机制**

当 add() 新增一个元素发现数组容量已满，则：

- 扩容：按原容量的 1.5 倍扩容：`int newCapacity = oldCapacity + (oldCapacity >> 1);`
- 拷贝：将原数组拷贝到一个新的扩容后的数组中，然后赋值给原数组（地址） `elementData = Arrays.copyOf(elementData, newCapacity);`

**ArrayList 的增删机制**

增加元素操作：

首先，数组的拷贝涉及到多个位置数据的移动，对于大数据量的情况下，效率低

- 在末尾增加元素 add()：先进行长度校验，如果容量不足则进行扩容，在扩容过程中会有数组拷贝。
- 在指定位置增加 add(index, element)：校验与扩容之后，将插入位置后的全部数据都右移一位，再赋值当前位置。

删除元素操作：

- 将删除元素位置后面的所有数据拷贝前移；
- 将末尾减一处赋值为空让 GC 回收：`elementData[--size] = null;`

**ArrayList 的初始化问题**

问：ArrayList(int initialCapacity) 是否会初始化数组大小;

答：虽然规定了容量，并且将数组对象赋给了 elementData，但是其大小并未得到初始化，如以下代码会输出长度为 0，并且报错超过数组界限

```java
    public static void main(String[] args) {
        List<Integer> list = new ArrayList<>(10);
        System.out.println(list.size());
        list.set(3,4);
    }
```

进行此工作的唯一方法是在使用构造函数后，根据需要使用add（）多次。

**ArrayList 适合做队列吗**

队列一般是FIFO（先入先出）的，如果用ArrayList做队列，就需要在数组尾部追加数据，数组头部删除数组，反过来也可以。

但是无论如何总会有一个操作会涉及到数组的数据搬迁，这个是比较耗费性能的。

结论：ArrayList不适合做队列。

不过数组是可以做队列的，可以采用环形数组，用两个指针（偏移量）记录数组的读位置和写位置，当超过长度就折回数组开头。

**ArrayList的遍历和LinkedList遍历性能比较如何？**

论遍历ArrayList要比LinkedList快得多，ArrayList遍历最大的优势在于内存的连续性，CPU的内部缓存结构会缓存连续的内存片段，可以大幅降低读取内存的性能开销。

**ArrayList 和 Vector 的对比**

- Vector 是线程安全的，内部方法被多个 sync 修饰，效率低
- Vector 扩容时默认扩容 2 倍，ArrayList 扩容 1.5倍

Vector 的子类 stack 也被弃用

> LinkedList 源码分析

**LinkedList 继承实现关系**

继承了 AbstractSequentialList，实现了 List、Deque、Cloneable、Serialzable，可复制可序列化。
```java
    extends AbstractSequentialList<E>
    implements List<E>, Deque<E>, Cloneable, java.io.Serializable
```

**LinkedList 的增加与删除**

核心思路都是，先定位后操作：即先通过前后半段遍历（具体位置靠近前还是后半段）找到对应位置，在通过改变其前后指针指向的节点进行增加和删除。由此可见增删位置越靠近中间，LinkedList 效率越低。

**LinkedList 的遍历**

- for 循环遍历：每次调用 get(i) 导致每次for 都会遍历一次链表找位置 i；
- 迭代器遍历：只调用一次遍历，之后就是判断有无下一个元素进行 next()，性能高；

for 循环遍历链表效率低于 ArrayList 遍历；迭代器遍历效率与 ArrayList 遍历差不多。

##  2. <a name='HashMapCurrentHashMap'></a>HashMap 与 CurrentHashMap 比较？

HashMap 重要知识点：结构、链表扩展、容量、扩容、插入顺序

> 深入理解 HashMap

**HashMap 结构**

由数组和链表组成，包括一个定长数组构成的散列槽，和每个槽对应的可扩容的链表。

- 数组：`Node<K,V>[] table;` 即节点数组，数组内保存着一个个节点
- 链表：由数组中的一个个节点往下延伸形成，借助于自定义的 Node 的 next 指向下一个 Node

由于根据 Hash 函数会散列到不同的槽位，并且会造成哈希冲突，所以到一个 Hash 值上会形成链表。在 JDK1.8 中，当链表的长度大于 8 的时候，链表就会转换为红黑树，利用红黑树快速增删查改的特性，从而优化提高 HashMap 的效率。同时，当链表的长度再次少于 6 的时候，红黑树又会转化为链表，因为红黑树需要维护平衡，在链表的个数比较少的时候，对 HashMap 提高的效率并不明显。

**链表扩展的阈值 8 和 6 的特殊性？**

根据泊松分布，在负载因子默认为0.75的时候，单个hash槽内元素个数为8的概率小于百万分之一，所以 8 以内的冲突量在绝大多数情况下已经够用，至于7，是为了作为缓冲，可以有效防止链表和树频繁转换。

**HashMap 的扩容机制**

建议自定义 HashMap 的初始容量，因为在不自定义使用容量的情况下每次使用到 【容量 * 负载因子】 大小时都会哈希扩容然后 ReHash 导致效率低下， HashMap 的默认容量是 16。

- Capacity：HashMap当前长度。
- LoadFactor：负载因子，默认值0.75f。

当通过哈希映射存储的长度达到 容量 * 负载因子时（比如容量 100，当 put 时长度为 76，需要扩容）

- 扩容：创建一个新的Entry空数组，长度是原数组的2倍。

- ReHash：遍历原Entry数组，把所有的Entry重新Hash到新数组：index = HashCode（Key） & （Length - 1），其中的 key.hashcode()的 hashcode 是用来确定散列地址的（由原生的物理地址与表中位置计算得到的地址），如果两个对象的 equals 判断相同，则要求其 hashcode 也相同，如果对象的 equals 方法被重写，则要求也要重写 hashcode 方法，保证相同对象的散列位置相同。

关于自定义 HashMap 容量，为防止扩容，公式为 赋初值 =（所需长度 / 负载因子） + 1；同时，在初始化时会自动将其变为大于初值的第一个数。如所需长度为 10，赋初值为 14，初始化执行时会通过 resize() 得到容量为 16；resize() 的具体实现就是将初值变为二进制的全是 1 然后 + 1；如初值为 10 = 1110 变为 1111 然后加 1 = 16。

**为什么 resize() 初始化和扩容要变为2的次幂？**

一方面默认容量 16 的表示在源码中是：1 << 4，位运算提高效率。同时 16 作为大小而言是作为一个经验值默认的。

另一方面保证散列均匀分布，散列函数有：index = HashCode(key) & (HashMap.length - 1)，其中哈希码是较唯一的，而如果 length-1 不为 1111（2的n次幂-1），可能为 1001，1010等，会导致散列冲突概率提高，大大降低 HashMap 的使用性能。而保证 2 的次幂，只要输入的HashCode本身分布均匀，Hash算法的结果就是均匀的。

**冲突时链表的插入顺序**

在 java8 之前，采用的是头插法，即每次冲突后将该值加入对应槽位的链表头部，这样使用迭代器比较好查找后来的数值，也是因为最初作者认为后来的数值被查询的概率更大。但在java8之后，采用尾插法。

放弃头插法的原因是因为在并发时会导致循环链表的出现，在扩容时会执行 resize() 方法，在 resize() 方法执行时会执行 tranfer() 遍历链表依次 ReHash 的操作，当线程1时间片耗尽、线程2扩容完毕，线程1醒来继续执行遍历操作的时候，遍历为环状循环，出现死循环的情况。[视频解释](https://www.bilibili.com/video/BV1n541177Ea?spm_id_from=333.337.search-card.all.click)

**为什么重写equals方法的时候需要重写hashCode方法**

在java中，所有的对象都是继承于Object类。Ojbect类中有两个方法equals、hashCode，这两个方法都是用来比较两个对象是否相等的。在未重写equals方法我们是继承了object的equals方法，那里的 equals是比较两个对象的内存地址，显然我们new了2个对象内存地址肯定不一样。

如果对equals方法进行了重写，建议一定要对hashCode方法重写，以保证相同的对象返回相同的hash值，不同的对象返回不同的hash值。

**为什么 HashMap 线程不安全**

- 在jdk1.7中，在多线程环境下，扩容时会造成环形链或数据丢失。
- 在jdk1.8中，在多线程环境下，会发生数据覆盖的情况。

在 HashMap 的 putVal 方法中，在散列计算完插入数据时需要先 get 判断该位置有无数据再插入，如果两线程同时进行判断该位置可以插入，并且线程 1时间片耗尽进入休眠状态，待线程 2插入后线程 1不再判断该位置是否为空而是直接插入，就导致了数据覆盖。

> 深入理解 CurrentHashMap

**HashMap在多线程环境下存在线程安全问题，一般都是怎么处理这种情况的？**

- 使用Collections.synchronizedMap(Map)创建线程安全的map集合：在使用该类时，需要传入 Map 对象和互斥锁。创建出synchronizedMap之后，再操作map的时候，就会对方法上锁，源码中规定了所有方法都用 sync 上锁。
- Hashtable
- ConcurrentHashMap

**HashMap 与 Hashtable 的区别**

- 线程安全：Hashtable 内部方法比较暴力的用 sync 修饰，导致并发度低，而 HashMap 非线程安全；

- 存储null 值：因为key值会进行哈希计算，如果为null的话，无法调用该方法，还是会抛出空指针异常。所以 Hashtable 不能存储 null 值，会报空指针异常；但 HashMap 对null 值情况做了特殊处理，会把 null值对象存储到散列 key 为 0 的槽位；

- 继承的父类不同：Hashtable 继承了 Dictionary类，而 HashMap 继承的是 AbstractMap 类。Dictionary 是 JDK 1.0 添加的，官方表示该类已经过时；

- 初始化容量不同：HashMap 的初始容量为：16，Hashtable 初始容量为：11，两者的负载因子默认都是：0.75。

- 扩容机制不同：当现有容量大于总容量 * 负载因子时，HashMap 扩容规则为当前容量翻倍，Hashtable 扩容规则为当前容量翻倍 + 1。

- 迭代器不同：HashMap 中的 Iterator 迭代器是 fail-fast 的，而 Hashtable 的 Enumerator 不是 fail-fast 的。快速失败（fail-fast）机制是在用迭代器遍历一个集合对象时（如 HashMap），如果遍历过程中对集合对象的内容进行了修改（增加、删除、修改），则会抛出Concurrent Modification Exception。

**快速失败机制和安全失败机制**

- 快速失败机制是 java.util 包下的集合类采用的机制，在遍历过程中使用一个 modCount 变量。集合在被遍历期间如果内容发生变化，就会改变modCount的值。每当迭代器使用hashNext()/next()遍历下一个元素之前，都会检测modCount变量是否为expectedmodCount值，是的话就返回遍历；否则抛出异常，终止遍历。

Tip：这里异常的抛出条件是检测到 modCount！=expectedmodCount 这个条件。如果集合发生变化时修改modCount值刚好又设置为了expectedmodCount值，则异常不会抛出。因此，不能依赖于这个异常是否抛出而进行并发操作的编程，这个异常只建议用于检测并发修改的bug。

- 安全失败（fail—safe）大家也可以了解下，java.util.concurrent包下的容器都是安全失败，可以在多线程下并发使用，并发修改。

**ConcurrentHashMap 结构**

同样是由数组 + 链表的机制，但是对每个 Node 节点的 value 与 next 均采用 volatile 修饰。volatile 在并发中的特性如下：

- 保证了不同线程对这个变量进行操作时的可见性，即一个线程修改了某个变量的值，这新值对其他线程来说是立即可见的。（实现可见性）
- 通过 CPU 内存屏障禁止编译器指令性重排来保证并发操作的有序性
- volatile 只能保证对单次读/写的原子性。i++ 这种操作不能保证原子性。

**CurrentHashMap 并发度高的原因（jdk 1.7）**

- ConcurrentHashMap 的 Segment 数组的 Segment 继承了 ReentrantLock 锁，每当一个线程占用锁访问一个 Segment 时，不会影响到其他的 Segment，就是说如果容量大小是16他的并发度就是16，可以同时允许16个线程操作16个Segment而且还是线程安全的；
- put 命令：不会像 Hashtable 一样直接线程同步，而是先散列定位到对应的 Segment 上，再执行 put 操作，在执行 put 操作时，多个线程竞争锁，没拿到锁的线程会获得自旋锁原地自旋等待锁的释放；
- get 命令：由于 Node 中的 value 属性是用 volatile 关键词修饰的，保证了内存可见性，所以每次获取时都是最新值，ConcurrentHashMap 的 get 方法是非常高效的，因为整个过程都不需要加锁，直接并发读取即可；

**谈谈 CAS 和自旋**

CAS 是乐观锁的一种实现机制，是一种轻量级锁。乐观锁是一种比较宽松的加锁机制。CAS 的具体机制即比较并交换，即读取数据并在将要将该数据写回时再次读取数据，如果数据未改变则写回，如果次数数据和刚刚读取的不一致则再次读取尝试写回。CAS 是一种乐观机制，认为并发操作并不是总会发生。

CAS 操作包含三个操作数 -- 内存位置、预期数值和新值。CAS 的实现逻辑是将内存位置处的数值与预期数值想比较，若相等，则将内存位置处的值替换为新值。若不相等，则不做任何操作。

CAS 是一条 CPU 的原子指令（cmpxchg指令），可以直接操作内存，不会造成所谓的数据不一致问题；

CAS 不能判断 ABA 问题，即一个数据被其他线程改到 B 又改回来了，此时线程无法判断是否有其他线程的并发修改了数值，但是这种情况还是要有所记录的，所以需要采用方法记录：采用 【版本号】 或者 【时间戳】在修改时做更新，这样再查询时便可以解决 ABA 问题无法判断。

**ConcurrentHashMap 的 put 和 get 步骤（jdk 1.8）**

在 java 8 中，抛弃了分段锁，而采取了 CAS + sync 机制：

put 过程

- 根据 key 计算出 hashcode
- 判断是否需要进行初始化
- 通过 key 定位出的 Node，如果为空表示当前位置可以写入数据，利用 CAS 尝试写入，失败则自旋保证成功
- 如果当前位置的 hashcode == MOVED == -1,则需要进行扩容
- 如果都不满足，则利用 synchronized 锁写入数据
- 如果数量大于 TREEIFY_THRESHOLD 则要转换为红黑树

get 过程

- 根据计算出来的 hashcode 寻址，如果就在桶上那么直接返回值
- 如果是红黑树那就按照树的方式获取值
- 就不满足那就按照链表的方式遍历获取值

**synchronized性能很低，为啥jdk1.8升级之后反而多了synchronized？**

JDK1.6通过引入锁升级(偏向锁->轻量级锁->重量级锁)机制来高效实现synchronized。这三种锁的状态是通过对象监视器在对象头中的字段来表明的。

- 偏向锁：它会偏向于第一个访问锁的线程。如果在接下来的运行过程中，该锁没有被其他的线程访问，则持有偏向锁的线程将永远不需要触发同步。如果在运行过程中，遇到了其他线程抢占锁，则持有偏向锁的线程会被挂起，JVM会尝试消除它身上的偏向锁，将锁恢复到标准的轻量级锁。(偏向锁只能在单线程下起作用)。
- 轻量级锁：轻量级锁是通过CAS来避免进入开销较大的互斥操作，而偏向锁是在无竞争场景下完全消除同步，连CAS也不执行(CAS本身仍旧是一种操作系统同步原语，始终要在JVM与OS之间来回，有一定的开销)；
- 重量级锁：重量级锁（heavy weight lock），是使用操作系统互斥量（mutex）来实现的传统锁。 当所有对锁的优化都失效时，将退回到重量级锁。它与轻量级锁不同竞争的线程不再通过自旋来竞争线程， 而是直接进入堵塞状态，此时不消耗CPU，然后等拥有锁的线程释放锁后，唤醒堵塞的线程， 然后线程再次竞争锁。但是注意，当锁膨胀（inflate）为重量锁时，就不能再退回到轻量级锁；

