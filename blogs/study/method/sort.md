---
title: 手撕算法之三大排序(快排,归并,堆,插入)(未完待续)
date: 2022-02-16
tags:
 - 算法
categories:
 - 算法
---
<!-- TOC -->

- [插入排序](#%E6%8F%92%E5%85%A5%E6%8E%92%E5%BA%8F)
- [快速排序](#%E5%BF%AB%E9%80%9F%E6%8E%92%E5%BA%8F)
    - [带插入排序的快速排序](#%E5%B8%A6%E6%8F%92%E5%85%A5%E6%8E%92%E5%BA%8F%E7%9A%84%E5%BF%AB%E9%80%9F%E6%8E%92%E5%BA%8F)
    - [快排思想的快速选择-求前k小](#%E5%BF%AB%E6%8E%92%E6%80%9D%E6%83%B3%E7%9A%84%E5%BF%AB%E9%80%9F%E9%80%89%E6%8B%A9-%E6%B1%82%E5%89%8Dk%E5%B0%8F)
    - [三向切分的快速排序待更新](#%E4%B8%89%E5%90%91%E5%88%87%E5%88%86%E7%9A%84%E5%BF%AB%E9%80%9F%E6%8E%92%E5%BA%8F%E5%BE%85%E6%9B%B4%E6%96%B0)
- [堆排序](#%E5%A0%86%E6%8E%92%E5%BA%8F)
    - [大顶堆排序升序](#%E5%A4%A7%E9%A1%B6%E5%A0%86%E6%8E%92%E5%BA%8F%E5%8D%87%E5%BA%8F)
    - [伪堆排序：使用优先队列](#%E4%BC%AA%E5%A0%86%E6%8E%92%E5%BA%8F%E4%BD%BF%E7%94%A8%E4%BC%98%E5%85%88%E9%98%9F%E5%88%97)
    - [大根堆自建堆排序-前k大](#%E5%A4%A7%E6%A0%B9%E5%A0%86%E8%87%AA%E5%BB%BA%E5%A0%86%E6%8E%92%E5%BA%8F-%E5%89%8Dk%E5%A4%A7)
    - [小顶堆自建堆排序-前k大](#%E5%B0%8F%E9%A1%B6%E5%A0%86%E8%87%AA%E5%BB%BA%E5%A0%86%E6%8E%92%E5%BA%8F-%E5%89%8Dk%E5%A4%A7)

<!-- /TOC -->

# 插入排序

`执行用时:1455 ms ，在所有Java提交中击败了10.64%的用户`

`内存消耗:49.9 MB ，在所有Java提交中击败了59.28%的用户`


<img src="/insert.gif" />

理解：假设一个数组，在其内部，数已经按照升序排列，此时有一个新的数a要加入数组，那么数组内大于a的数字需不断地向后腾出位置，直到a找到自己的位置，就可以将a插入该位置，此时原数组仍保持升序排列。

同理，插入排序就是将已排序部分当成一个小数组，未排序部分将一个一个插入到小数组当中，循环插入，直至排序完成。

~~~java
class Solution {
    public int[] sortArray(int[] nums) {
        //插入排序：

        int n = nums.length;

        for (int i = 1; i < n; i++) {

            //使用临时变量存储此时的待排元素
            int temp = nums[i];

            int j = i;

            //当前面有序数组中的数大于待排元素，先将这些数依次后移，给待排元素预留位置
            while (j > 0 && nums[j - 1] > temp) {

                nums[j] = nums[j - 1];

                j--;

            }

            //待排元素放到前面有序数组的正确位置
            nums[j] = temp;

        }
        return nums;
    }

}
~~~

**时间复杂度：** 最差情况双层循环达到n方，但对于 [基本有序的数组] while循环基本不执行，插入排序达到O（n）的效果，同时，对于 [短小数组] 而言，因为每个元素距离其最终所排的位置不远，插排的速度还是很可观的，所以插排常用于在小区间执行任务。

**空间复杂度：** O（1）

# 快速排序

`执行用时:13 ms ，在所有Java提交中击败了 66.42%的用户`

`内存消耗:50.6 MB，在所有Java提交中击败了37.49%的用户`


思路三步走,枢轴，排序和递归：一是找到枢轴，二是通过交换来排序，三是以枢轴为分界点一分为二递归数组。

值得一提：在每一趟通过交换来排序，均是先将主元放到右边界位置，然后依次开始找小值放左边，最后将主元和第一个大值交换。

代码步骤：3个函数：递归(randomizeQuicksort)，排序(交换swap)和枢轴(randomizePartition)

```java
//手撕快排开始
class Solution {
    public int[] sortArray(int[] nums) {

        randomizeQuicksort(nums, 0, nums.length - 1);

        return nums;
    }

    //递归函数，每次找到分割点，将数组一分为二递归
    public void randomizeQuicksort(int[] nums, int left, int right) {

        //递归条件，一直递归到左右指针重合
        if (left < right) {

            //进行一趟排序并返回分割点(即枢轴位置)
            int partition = randomizePartition(nums, left, right);

            //递归每一趟下来分割得到的两数组
            randomizeQuicksort(nums, left, partition - 1);
            randomizeQuicksort(nums, partition + 1, right);

        }
    }

    //1.随机化选择枢轴
    //2.以选择的枢轴为基准，小值放左，最后将枢轴放中间，此时大值默认均在枢轴右边
    //3.返回当前枢轴位置，作为递归函数的分割点
    public int randomizePartition(int[] nums, int left, int right) {

        //随机化选出枢轴位置
        int pos = new Random().nextInt(right - left) + left;

        //将枢轴放于右边界
        swap(nums, pos, right);

        int pivot = nums[right];

        int patition = left;

        //规定left和right边界，真正的指针移动仅仅是partition
        for (int i = left; i < right; i++) {
            if (nums[i] <= pivot) {
                swap(nums, i, patition);
                ++patition;
            }
        }

        //将第一个比枢轴大的值放于最右端，枢轴放中间
        swap(nums, patition, right);

        //返回分割点
        return patition;
    }

     //无脑将两元素交换的函数
    public void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }

}
```

**时间复杂度：** 为期望 O(nlogn)。

**空间复杂度：** O(h)，其中 h 为快速排序递归调用的
层数。我们需要额外的 O(h) 的递归调用的栈空间。

由于划分的结果不同导致了快速排序递归调用的层数
也会不同，最坏情况下需 O(n) 的空间，即每次都选到最大最小值一个个排出，最优情况下
每次都平衡，即一直二分到排序完成，此时整个递归树高度为 logn，空间复杂度为 O(logn)。

## 带插入排序的快速排序

面对小区间数组采用插入排序，提升明显

`执行用时: 9 ms, 在所有Java提交中击败了88.62%的用户`

`内存消耗:49.9 MB, 在所有Java提交中击败了56.71%的用户`

~~~java
//三步走,枢轴，排序和递归：一是找到枢轴，二是通过交换来排序，三是以枢轴为分界点一分为二递归数组
//值得一提：在每一趟通过交换来排序，均是先将主元放到右边界位置，然后依次开始找小值放左边，最后将主元和第一个大值交换
//代码步骤：3个函数：递归(randomizeQuicksort)，排序(交换swap)和枢轴(randomizePartition)

//手撕快排开始
class Solution {

    //设定插入排序的阈值
    public static final int THRESHOLD = 7;

    public int[] sortArray(int[] nums) {

        randomizeQuicksort(nums, 0, nums.length - 1);

        return nums;
    }

    //递归函数，每次找到分割点，将数组一分为二递归
    public void randomizeQuicksort(int[] nums, int left, int right) {

        //小区间数组则使用插入排序
        if (right - left <= THRESHOLD){
            insertSort(nums, left, right);

            return;
        }

        //否则快排
        //递归条件，一直递归到左右指针重合
        if (left < right) {

            //进行一趟排序并返回分割点(即枢轴位置)
            int partition = randomizePartition(nums, left, right);

            //递归每一趟下来分割得到的两数组
            randomizeQuicksort(nums, left, partition - 1);
            randomizeQuicksort(nums, partition + 1, right);

        }
    }

    //无脑将两元素交换的函数
    public void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }

    //1.随机化选择枢轴
    //2.以选择的枢轴为基准，小值放左，最后将枢轴放中间，此时大值默认均在枢轴右边
    //3.返回当前枢轴位置，作为递归函数的分割点
    public int randomizePartition(int[] nums, int left, int right) {

        //随机化选出枢轴位置
        int pos = new Random().nextInt(right - left) + left;

        //将枢轴放于右边界
        swap(nums, pos, right);

        int pivot = nums[right];

        int patition = left;

        //规定left和right边界，真正的指针移动仅仅是partition
        for (int i = left; i < right; i++) {
            if (nums[i] <= pivot) {
                swap(nums, i, patition);
                ++patition;
            }
        }

        //将第一个比枢轴大的值放于最右端，枢轴放中间
        swap(nums, patition, right);

        //返回分割点
        return patition;
    }


    public void insertSort(int[] nums, int left, int right){

        for (int i = left + 1; i <= right; i++) {

            //使用临时变量存储此时的待排元素
            int temp = nums[i];

            int j = i;

            //当前面有序数组中的数大于待排元素，先将这些数依次后移，给待排元素预留位置
            while (j > 0 && nums[j - 1] > temp) {

                nums[j] = nums[j - 1];

                j--;

            }

            //待排元素放到前面有序数组的正确位置
            nums[j] = temp;

        }

    }

}
~~~

## 快排思想的快速选择-求前k小

```java
class Solution {
    public int[] getLeastNumbers(int[] arr, int k) {

        quickSort(arr, 0, arr.length - 1, k);

        return Arrays.copyOfRange(arr, 0, k);
    }

    //
    public void quickSort(int[] nums, int left, int right, int k) {

        if (left >= right) {
            return;
        }

        int partition = randomizePartition(nums, left, right);

        if (partition == k) {
            return;
        } else if (partition > k) {
            quickSort(nums, left, partition - 1, k);
        } else {
            quickSort(nums, partition + 1, right, k);
        }

    }

    //
    public int randomizePartition(int[] nums, int left, int right) {

        int position = new Random().nextInt(right - left) + left;

        swap(nums, position, right);

        int pivot = nums[right];

        int partition = left;

        for (int i = left; i < right; i++) {

            if (nums[i] < pivot) {

                swap(nums, partition, i);

                ++partition;
            }
        }

        swap(nums, partition, right);

        return partition;
    }

    //
    public void swap(int[] nums, int i, int j) {
        int tmp = nums[i];

        nums[i] = nums[j];

        nums[j] = tmp;
    }

}

```

## 三向切分的快速排序(待更新)

快速排序在实际应用中会面对大量具有重复元素的数组。例如加入一个子数组全部为重复元素，则对于此数组排序就可以停止，但快排算法依然将其切分为更小的数组。这种情况下快排的性能尚可，但存在着巨大的改进潜力。（从O(nlgn)提升到O(n)）

一个简单的想法就是将数组分为三部分：小于当前切分元素的部分，等于当前切分元素的部分，大于当前切分元素的部分。

对应问题 [荷兰国旗问题] - E.W.Dijlstra

# 堆排序


## 大顶堆排序升序

解释，以数组 [4,6,8,5,9] 为例，建立起二叉树为:

```java
            4
          /   \
        6       8
       /  \
      5    9
```

1. 定义一个主函数用于初建堆和遍历建堆；

2. 额外的方法用于针对每一个父节点建堆：
- 第一步，寻找最后一个有子节点的父节点，该 root 所在位置是 (len - 2) / 2，并依次往前遍历父节点；
- 第二步，将参数传入排序方法，排序当前父节点与所属的俩子节点。可以由 root 位置得到其两个子节点 root*2+1 和 root*2+2，比较并交换;
- 第三步，如果有交换，还需要把替换下来的root进行与子节点比较并下沉；

代码如下：

```java
public class Solution {
    //大顶堆升序
    public int[] sortArray(int[] nums) {
        int heapSize = nums.length;

        //初始化堆
        buildHeap(nums, heapSize);

        //遍历堆
        for (int i = 0; i < nums.length; i++) {
            swap(nums, 0, heapSize - 1);
            heapSize--;
            heapSort(nums, 0, heapSize);
        }
        return nums;
    }

    /*用来遍历父节点*/
    public void buildHeap(int[] nums, int heapSize) {
        for (int i = (heapSize - 2) / 2; i >= 0; i--) {
            heapSort(nums, i, heapSize);
        }
    }

    /*用来对父节点和子节点排序*/
    public void heapSort(int[] nums, int root, int heapSize) {
        int left = root * 2 + 1;
        int right = root * 2 + 2;
        //
        int largest = root;

        if (left < heapSize && nums[left] > nums[largest]) {
            largest = left;
        }

        if (right < heapSize && nums[right] > nums[largest]) {
            largest = right;
        }

        if (largest != root) {
            swap(nums, largest, root);

            //largest 还是刚刚的值并未改变
            heapSort(nums, largest, heapSize);
        }
    }

    /*交换数组两元素*/
    public void swap(int[] nums, int i, int j) {
        int tmp = nums[i];
        nums[i] = nums[j];
        nums[j] = tmp;
    }
}
```

## 伪堆排序：使用优先队列

>求数组前k小：大顶堆

```java
class Solution {
    public int[] getLeastNumbers(int[] arr, int k) {
        //优先队列，堆api
        int[] res = new int[k];

        if (k == 0) {
            return res;
        }

        //默认小顶堆
        PriorityQueue<Integer> heap = new PriorityQueue<>(new Comparator<Integer>() {
            @Override
            public int compare(Integer o1, Integer o2) {
                return o2 - o1;
            }
        });

        //放入k个数，在堆中形成大顶堆
        for (int i = 0; i < k; i++) {
            heap.offer(arr[i]);
        }

        //比较后序元素大小，比堆顶小则加入
        for (int i = k; i < arr.length; i++) {
            if (arr[i] < heap.peek()) {
                heap.poll();
                heap.offer(arr[i]);
            }
        }

        //将堆中元素复制返回
        for (int i = 0; i < k; i++) {
            res[i] = heap.poll();
        }

        return res;
    }
}
```
## 大根堆自建堆排序-前k大

```java
class Solution {
    public int findKthLargest(int[] nums, int k) {
        //堆排序原理是用数组模拟二叉树的！实际操作的还是数组！
        //大顶堆排序出前k大，依次删除k-1个元素，此时堆顶处即为第k大！
        //堆排三部函数： 初建堆、堆排序、元素交换

        int heapSize = nums.length;

        //初建堆
        buidMaxHeap(nums, heapSize);

        //此时堆中选出了最大值为 nums[0]，总共选出k-1个最大值，再返回余下大顶堆的nums[0]即可
        for (int i = nums.length - 1; i >= nums.length - k + 1; i--) {

            swap(nums, 0, heapSize - 1);

            heapSize--;

            heapSort(nums,0,heapSize);

        }

        return nums[0];
    }

    //初建堆
    public void buidMaxHeap(int[] nums, int heapSize) {
        //初建堆需要从最后一个父节点开始，选出最大到堆顶
        //遍历从最后一个父节点到根节点
        for (int i = (heapSize - 2) / 2; i >= 0; i--) {
            heapSort(nums, i,heapSize);
        }
    }

    //堆排序
    public void heapSort(int[] nums, int root, int heapSize) {
        //以一个根、左、右的树为操作单位，对比出大值放到根上

        //标记一个大值，一开始等于根节点
        int lagest = root;

        int left = root * 2 + 1;
        int right = root * 2 + 2;

        //对于位置处于root处的树，其左孩子位置为 root*2 +1，右孩子为 root*2+2
        if (left < heapSize && nums[left] > nums[lagest]) {
            lagest = left;
        }

        //右孩子同理
        if (right < heapSize && nums[right] > nums[lagest]) {
            lagest = right;
        }

        //如果最大值的指针不是父节点，则交换父节点和当前最大值指针指向的子节点
        if (lagest != root) {

            swap(nums, root, lagest);

            //由于左右孩子值出现变化，需要分别对左右孩子作为根节点的树再次堆排
            heapSort(nums, lagest,heapSize);
        }


    }

    //交换元素
    public void swap(int[] nums, int i, int j) {
        int tmp = nums[i];
        nums[i] = nums[j];
        nums[j] = tmp;
    }
}
```

## 小顶堆自建堆排序-前k大

```java
class Solution {
    public int findKthLargest(int[] nums, int k) {
        //小顶堆，容量为k，依次判断其他元素，比堆顶大的入堆

        int heapSize = k;
        //初建堆
        buidMaxHeap(nums, heapSize);

        for (int i = k; i < nums.length; i++) {
            //比堆顶大的入堆，即交换堆顶元素和该元素
            if (nums[i] > nums[0]) {

                swap(nums, i, 0);

                heapSort(nums, 0, heapSize);
            }
        }
        return nums[0];
    }

    //初建堆
    public void buidMaxHeap(int[] nums, int heapSize) {
        //初建堆需要从最后一个父节点开始，选出最大到堆顶
        //遍历从最后一个父节点到根节点
        for (int i = (heapSize - 2) / 2; i >= 0; i--) {
            heapSort(nums, i, heapSize);
        }
    }

    //堆排序
    public void heapSort(int[] nums, int root, int heapSize) {
        //以一个根、左、右的树为操作单位，对比出大值放到根上

        //标记一个大值，一开始等于根节点
        int lagest = root;

        int left = root * 2 + 1;
        int right = root * 2 + 2;

        //对于位置处于root处的树，其左孩子位置为 root*2 +1，右孩子为 root*2+2
        if (left < heapSize && nums[left] < nums[lagest]) {
            lagest = left;
        }

        //右孩子同理
        if (right < heapSize && nums[right] < nums[lagest]) {
            lagest = right;
        }

        //如果最大值的指针不是父节点，则交换父节点和当前最大值指针指向的子节点
        if (lagest != root) {

            swap(nums, root, lagest);

            //由于左右孩子值出现变化，需要分别对左右孩子作为根节点的树再次堆排
            heapSort(nums, lagest, heapSize);
        }
    }

    //交换元素
    public void swap(int[] nums, int i, int j) {
        int tmp = nums[i];
        nums[i] = nums[j];
        nums[j] = tmp;
    }
}
```
