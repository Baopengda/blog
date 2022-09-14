---
title: JUC 多线程与线程池分析(理论篇)
date: 2022-04-6
tags:
 - Java多线程
categories:
 - 精选
 - 源码
---

<!-- TOC -->

- [Runnable接口](#runnable%E6%8E%A5%E5%8F%A3)
- [Callable接口](#callable%E6%8E%A5%E5%8F%A3)
- [Future接口](#future%E6%8E%A5%E5%8F%A3)
- [Java中的Executor框架](#java%E4%B8%AD%E7%9A%84executor%E6%A1%86%E6%9E%B6)
- [Executor接口](#executor%E6%8E%A5%E5%8F%A3)
- [ExecutorService接口](#executorservice%E6%8E%A5%E5%8F%A3)
- [线程池实现流程](#%E7%BA%BF%E7%A8%8B%E6%B1%A0%E5%AE%9E%E7%8E%B0%E6%B5%81%E7%A8%8B)
    - [向线程池提交任务的两种方式](#%E5%90%91%E7%BA%BF%E7%A8%8B%E6%B1%A0%E6%8F%90%E4%BA%A4%E4%BB%BB%E5%8A%A1%E7%9A%84%E4%B8%A4%E7%A7%8D%E6%96%B9%E5%BC%8F)
    - [线程池的关闭](#%E7%BA%BF%E7%A8%8B%E6%B1%A0%E7%9A%84%E5%85%B3%E9%97%AD)
    - [线程池本身的状态](#%E7%BA%BF%E7%A8%8B%E6%B1%A0%E6%9C%AC%E8%BA%AB%E7%9A%84%E7%8A%B6%E6%80%81)
- [如何设置线程池大小](#%E5%A6%82%E4%BD%95%E8%AE%BE%E7%BD%AE%E7%BA%BF%E7%A8%8B%E6%B1%A0%E5%A4%A7%E5%B0%8F)
- [线程池使用举例](#%E7%BA%BF%E7%A8%8B%E6%B1%A0%E4%BD%BF%E7%94%A8%E4%B8%BE%E4%BE%8B)

<!-- /TOC -->

<img src="/executor.jpg" />

# Runnable接口

*Thread是Runnable接口的实现类*

```java
//实现Runnable接口的类将被Thread执行，表示一个基本的任务
public interface Runnable {
    public abstract void run();
}
```

# Callable接口

Runnable接口和Callable接口的实现类，都可以被ThreadPoolExecutor和ScheduledThreadPoolExecutor执行，

他们之间的区别是Runnable不会返回结果，而Callable可以返回结果。

```java
// Callable同样是任务，与Runnable接口的区别在于它接收泛型，同时它执行任务后带有返回内容
  public interface Callable<V> {
      // 相对于run方法的带有返回值的call方法
      V call() throws Exception;
}
```

# Future接口

Future就是对于具体的Runnable或者Callable任务的执行结果进行取消、查询是否完成、获取结果。

必要时可以通过get方法获取执行结果，该方法会阻塞直到任务返回结果

也就是说Future提供了三种功能：

　　1）判断任务是否完成；

　　2）能够中断任务；

　　3）能够获取任务执行结果。

```java
// Future代表异步任务的执行结果
  public interface Future<V> {
  
      /**
       * 尝试取消一个任务，如果这个任务不能被取消（通常是因为已经执行完了），返回false，否则返回true。
       */
      boolean cancel(boolean mayInterruptIfRunning);
  
      /**
      * 返回代表的任务是否在完成之前被取消了
      */
     boolean isCancelled();
 
     /**
      * 如果任务已经完成，返回true
      */
    boolean isDone();
 
     /**
      * 获取异步任务的执行结果（如果任务没执行完将等待）
      */
    V get() throws InterruptedException, ExecutionException;
 
     /**
      * 获取异步任务的执行结果（有最常等待时间的限制）
      *
      *  timeout表示等待的时间，unit是它时间单位
      */
     V get(long timeout, TimeUnit unit)
         throws InterruptedException, ExecutionException, TimeoutException;
 }
```

# Java中的Executor框架

<img src="/juc.jpg" />

# Executor接口

Executor接口是Executor框架中最基础的部分，定义了一个用于执行Runnable的execute方法，它没有实现类只有另一个重要的子接口ExecutorService。

```java
public interface Executor {
    void execute(Runnable command);
}
```

# ExecutorService接口

ExecutorService接口继承自Executor接口，定义了终止、提交、执行任务、跟踪任务、返回结果等方法。

```java
//继承自Executor
public interface ExecutorService extends Executor {

    //关闭执行器，执行完之前提交的任务，不再接收新任务
    void shutdown();

    //立即停止，暂停所有等待处理的任务并返回这些任务列表
    List<Runnable> shutdownNow();

    //判断所有任务是否已经完成
    boolean isShutdown();

    //判断关闭后所有任务是否已经完成
    boolean isTerminated();

    boolean awaitTermination(long timeout, TimeUnit unit)
        throws InterruptedException;

    <T> Future<T> submit(Callable<T> task);

    <T> Future<T> submit(Runnable task, T result);

    Future<?> submit(Runnable task);

    <T> List<Future<T>> invokeAll(Collection<? extends Callable<T>> tasks)
        throws InterruptedException;

    <T> List<Future<T>> invokeAll(Collection<? extends Callable<T>> tasks,
                                  long timeout, TimeUnit unit)
        throws InterruptedException;

    <T> T invokeAny(Collection<? extends Callable<T>> tasks)
        throws InterruptedException, ExecutionException;

    <T> T invokeAny(Collection<? extends Callable<T>> tasks,
                    long timeout, TimeUnit unit)
        throws InterruptedException, ExecutionException, TimeoutException;
}
```

# 线程池实现流程

```java
public ThreadPoolExecutor(int corePoolSize,  
    int maximumPoolSize,  
    long keepAliveTime,  
    TimeUnit unit,  
    BlockingQueue<Runnable> workQueue,  
    ThreadFactory threadFactory,  
    RejectedExecutionHandler handler)   
```

corePoolSize： 核心线程数，线程池维护线程的最少数量

maximumPoolSize：线程池维护线程的最大数量

keepAliveTime： 线程池维护线程所允许的空闲时间

unit： 线程池维护线程所允许的空闲时间的单位

workQueue： 线程池所使用的缓冲队列

handler： 线程池对拒绝任务的处理策略

过程分析：
1. 当前创建的线程数小于 [核心线程数] 时，有任务就创建线程，优先创建到核心线程数目；
2. 当创建的线程等于 [核心线程数]，有任务优先放在 [任务缓冲队列] 中；
3. 当 workQueue 满，创建新线程直到数目达到 [最大线程数]；
4. 若还有任务到来，此时 [线程数最大] 且 [任务队列已满]，采用拒绝策略 

<img src="/thread.jpg" />

线程池优先要创建出基本线程池大小（corePoolSize）的线程数量，

没有达到这个数量时，每次提交新任务都会直接创建一个新线程，

当达到了基本线程数量后，又有新任务到达，优先放入等待队列，

如果队列满了，才去创建新的线程（不能超过线程池的最大数maxmumPoolSize）

## 向线程池提交任务的两种方式

**1.通过execute()方法**

这种方式提交 没有返回值，也就不能判断任务是否被线程池执行成功。

```java
ExecutorService threadpool= Executors.newFixedThreadPool(10);  
threadpool.execute(new Runnable(){...});
```

**2.通过submit()方法**

使用submit 方法来提交任务，它会返回一个Future对象，通过future的get方法来获取返回值，

get方法会阻塞住直到任务完成，而使用get(long timeout, TimeUnit unit)方法则会阻塞一段时间后立即返回，这时有可能任务没有执行完。

```java
Future<?> future = threadpool.submit(new Runnable(){...});  
    try {  
            Object res = future.get();//获取任务执行结果  
        } catch (InterruptedException e) {  
            // 处理中断异常  
            e.printStackTrace();  
        } catch (ExecutionException e) {  
            // 处理无法执行任务异常  
            e.printStackTrace();  
        }finally{  
            // 关闭线程池  
            executor.shutdown();  
        }  
```

## 线程池的关闭

• shutdown()：

不会立即终止线程池，而是再也不会接受新的任务，要等所有任务缓存队列中的任务都执行完后才终止

• shutdownNow()：

立即终止线程池，再也不会接受新的任务，并尝试打断正在执行的任务，并且清空任务缓存队列，返回尚未执行的任务

## 线程池本身的状态

```java
volatile int runState;   
static final int RUNNING = 0;   //运行状态
static final int SHUTDOWN = 1;   //关闭状态
static final int STOP = 2;       //停止
static final int TERMINATED = 3; //终止，终结
```

1，当创建线程池后，初始时，线程池处于RUNNING状态;

2，如果调用了shutdown()方法，则线程池处于SHUTDOWN状态;

3，如果调用了shutdownNow()方法，则线程池处于STOP状态;

4，当线程池处于SHUTDOWN或STOP状态，并且所有工作线程已经销毁，任务缓存队列已经清空或执行结束后，线程池被设置为TERMINATED状态。

# 如何设置线程池大小

- CPU 密集型任务(N+1)： 这种任务消耗的主要是 CPU 资源，可以将线程数设置为 N（CPU 核心数）+1，比 CPU 核心数多出来的一个线程是为 了防止线程偶发的缺页中断，或者其它原因导致的任务暂停而带来的影响。 一旦任务暂停，CPU 就会处于空闲状态，而在这种情况下多出来的一个线程就可以充分利用 CPU 的空闲时间。

- I/O 密集型任务(2N)： 这种任务应用起来，系统会用大部分的时间来处理 I/O 交互，而线程在处理 I/O 的时间段内不会占用 CPU 来处理，这时就可以将 CPU 交出给其它线程使用。因此在 I/O 密集型任务的应用中，我们可以多配置一些线程，具体的计算方法是 2N。

如何判断 CPU 密集型任务还是 IO 密集型任务？

CPU 密集型简单理解就是利用 CPU 计算能力的任务比如在内存中对大量数据进行排序。

但凡涉及到 网络读取，文件读取这类都是 IO 密集型，这类任务的特点是 CPU 计算耗费时间相比于等待 IO 操作完成的时间来说很少，大部分时间都花在了等待 IO 操作完成上。

# 线程池使用举例

```java
//使用的是自定义线程池并采用 execute() 提交任务
    public static void main(String[] args) {
        ExecutorService threadPoolExecutor = new ThreadPoolExecutor(5,10,1000, TimeUnit.MILLISECONDS,
                new LinkedBlockingDeque<>(512),new ThreadPoolExecutor.DiscardOldestPolicy());

        threadPoolExecutor.execute(new Runnable() {
            @Override
            public void run() {
                int n = 0;

                while (n <= 10000){
                    n++;
                }

                threadPoolExecutor.shutdown();

                System.out.println(n);
            }
        });
    }
```

```java
//使用的是自定义线程池并采用 submit() 提交任务，使用 Future 接收结果
public static void main(String[] args) {
        ExecutorService threadPoolExecutor = new ThreadPoolExecutor(5, 10, 1000, TimeUnit.MILLISECONDS,
                new LinkedBlockingDeque<>(512), new ThreadPoolExecutor.DiscardOldestPolicy());

        Future<Integer> future = threadPoolExecutor.submit(new Callable() {
            @Override
            public Object call() throws Exception {
                int n = 0;

                while (n <= 10000) {
                    n++;
                }

                threadPoolExecutor.shutdown();

                return n;
            }
        });

        try {
            Object s = future.get();
            System.out.println(s);
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }
    }
```