---
title: 算法之广度优先遍历(BFS)深度优先遍历(DFS)(未完待续)
date: 2022-03-28
tags:
 - 算法
categories:
 - 算法
---
<!-- TOC -->

- [图像渲染](#%E5%9B%BE%E5%83%8F%E6%B8%B2%E6%9F%93)
- [岛屿数量](#%E5%B2%9B%E5%B1%BF%E6%95%B0%E9%87%8F)
- [岛屿的最大面积](#%E5%B2%9B%E5%B1%BF%E7%9A%84%E6%9C%80%E5%A4%A7%E9%9D%A2%E7%A7%AF)
- [零一矩阵](#%E9%9B%B6%E4%B8%80%E7%9F%A9%E9%98%B5)
- [腐烂的橘子](#%E8%85%90%E7%83%82%E7%9A%84%E6%A9%98%E5%AD%90)
- [机器人的运动范围](#%E6%9C%BA%E5%99%A8%E4%BA%BA%E7%9A%84%E8%BF%90%E5%8A%A8%E8%8C%83%E5%9B%B4)
- [螺旋矩阵II](#%E8%9E%BA%E6%97%8B%E7%9F%A9%E9%98%B5ii)

<!-- /TOC -->

## 图像渲染

方法一：广度优先遍历

```java
class Solution {
    public int[][] floodFill(int[][] image, int sr, int sc, int newColor) {
        //题解1：广度优先搜索;
        //先将坐标image[sr][sc]染色作为第一层,然后对其上下左右染色作为第二层;
        //再将第二层的分别的上下左右染色,作为第三层,以此类推;

        //定义移动上下左右四种情况
        int[] dx = new int[]{1, 0, 0, -1};
        int[] dy = new int[]{0, 1, -1, 0};

        //矩阵行列边界
        int m = image.length;
        int n = image[0].length;

        //判断初始颜色相同时返回原图,因为在本次染色前,原图已经符合"油漆桶"标准
        int currColor = image[sr][sc];
        if (currColor == newColor) {
            return image;
        }

        //建立队列存储每一次要染色的方格x,y坐标
        Queue<int[]> queue = new LinkedList<>();
        //先将起始点染色
        queue.offer(new int[]{sr, sc});
        image[sr][sc] = newColor;

        //开始广度优先搜索
        //外层循环改变起始坐标,内层循环改变朝4个方向移动
        //外层循环判断条件,当队列为空,则涂色完成
        while (!queue.isEmpty()) {

            //分解坐标
            int cell[] = queue.poll();
            int x = cell[0];
            int y = cell[1];

            //坐标移动判断条件是x,y坐标移动均在矩阵内,且移动的下一个方格颜色与当前(染色前)方格相同;
            for (int i = 0; i < 4; i++) {
                //每一次改变起始坐标
                int mx = x + dx[i];
                int my = y + dy[i];

                if (mx >= 0 && mx < m && my >= 0 && my < n && image[mx][my] == currColor) {
                    image[mx][my] = newColor;
                    queue.offer(new int[]{mx, my});
                }
            }
        }

        return image;
    }
}
```


方法二：深度优先遍历

```java
class Solution {

    //定义移动方向，右，下，左，上
    public static int[] dx = {1, 0, -1, 0};
    public static int[] dy = {0, 1, 0, -1};

    public int[][] floodFill(int[][] image, int sr, int sc, int newColor) {
        //深度优先遍历DFS
        //用递归的方法一直向一个方向走,走到边界或者颜色不一致时返回

        int currColor = image[sr][sc];

        dfs(image, sr, sc, newColor, currColor);

        return image;
    }


    public void dfs(int[][] image, int x, int y, int newColor, int currColor) {

        if (x >= image.length || x < 0 || y >= image[0].length || y < 0 || image[x][y] != currColor || image[x][y]==newColor) {
            return;
        }

        image[x][y] = newColor;

        //向四个方向移动
        for (int i = 0; i < 4; i++) {
            int mx = x + dx[i];
            int my = y + dy[i];
            dfs(image,mx,my,newColor,currColor);
        }
    }
}
```

## 岛屿数量

方法一：广度优先遍历

```java
class Solution {

    //定义移动上下左右四种情况
    int[] dx = new int[]{1, 0, -1, 0};
    int[] dy = new int[]{0, 1, 0, -1};

    //创建队列
    Queue<int[]> queue = new LinkedList<>();

    public int numIslands(char[][] grid) {
        //广度优先搜索BFS
        //先将一个坐标作为起点标记染色作为第一层,向四周搜索移动并标记作为第二层;
        //再从第二层继续移动并标记,作为第三层,以此类推;

        int m = grid.length;
        int n = grid[0].length;

        int num_islands = 0;

        //遍历到每个方格
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == '1') {
                    ++num_islands;
                    //以遍历到的'1'方格作为坐标起点推入队列并标记
                    queue.offer(new int[]{i, j});
                    grid[i][j] = '2';
                    bfs(grid, m, n);
                }
            }
        }
        return num_islands;
    }


    public void bfs(char[][] grid, int m, int n) {
        //以某一坐标起点开始,直至遍历完此起点所连接的所有方格
        while (!queue.isEmpty()) {

            int[] cell = queue.poll();
            int x = cell[0];
            int y = cell[1];

            //以起点开始,进行四个方向的移动
            for (int i = 0; i < 4; i++) {
                int mx = x + dx[i];
                int my = y + dy[i];
                if (mx >= 0 && my >= 0 && mx < m && my < n && grid[mx][my] == '1') {
                    grid[mx][my] = '2';
                    queue.offer(new int[]{mx, my});
                }
            }
        }
    }
}
```

方法二：深度优先遍历

```java
class Solution {
    public int numIslands(char[][] grid) {
        //题解1：深度优先遍历DFS
        //首先对整块地图每个方格逐一遍历,直到遍历到陆地,计数加一,并开始寻找与该方格一体的部分
        //关键是,在递归中对已经走过的陆地方格需要标记,否则会导致死循环

        if (grid.length == 0 || grid == null) {
            return 0;
        }

        int m = grid.length;
        int n = grid[0].length;

        int grid_num = 0;

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == '1') {
                    ++grid_num;
                    dfs(grid, i, j);
                }
            }
        }

        return grid_num;
    }


    public void dfs(char[][] grid, int x, int y) {

        if (x >= grid.length || x < 0 || y >= grid[0].length || y < 0 || grid[x][y] != '1') {
            return;
        }

        grid[x][y] = '2';

        dfs(grid, x + 1, y);
        dfs(grid, x, y + 1);
        dfs(grid, x - 1, y);
        dfs(grid, x, y - 1);
    }
}
```

## 岛屿的最大面积

方法一：深度优先遍历

```java
class Solution {
    public int maxAreaOfIsland(int[][] grid) {
        //深度优先搜索DFS
        int m = grid.length;
        int n = grid[0].length;

        //创建面积变量
        int maxArea = 0;

        //遍历每个岛屿方格
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 1) {
                    maxArea = Math.max(maxArea, dfs(grid, i, j));
                }
            }
        }
        return maxArea;
    }

    //从一个坐标起点开始,遍历整片岛屿并计算面积
    public int dfs(int[][] grid, int x, int y) {
        if (x >= grid.length || y >= grid[0].length || x < 0 || y < 0 || grid[x][y] != 1) {
            return 0;
        }

        //每次面积计数加1
        int sum = 1;

        //标记,避免递归重复
        grid[x][y] = 2;

        //向四个方向发散移动
        sum += dfs(grid, x + 1, y);
        sum += dfs(grid, x, y + 1);
        sum += dfs(grid, x - 1, y);
        sum += dfs(grid, x, y - 1);

        return sum;
    }
}
```

## 零一矩阵

方法一：广度优先遍历

~~~java
import java.util.LinkedList;
import java.util.Queue;

class Solution {
    public int[][] updateMatrix(int[][] mat) {
        //@feiye  题解：BFS方法
        //思路：
        //1.方格0仍是方格0,在新建数组中可以直接赋值
        //2.从方格0出发,对未被遍历过的方格计算,
        //3.0遍历完毕后,将被遍历且计算好的方格推入队列继续计算其他方格

        //定义位移
        int[] dx = {1, 0, -1, 0};
        int[] dy = {0, 1, 0, -1};

        int m = mat.length;
        int n = mat[0].length;

        //创建新的返回矩阵
        int[][] ans = new int[m][n];

        //创建数组表示标记遍历过的位置
        boolean[][] seen = new boolean[m][n];

        //创建队列进行广度搜索
        Queue<int[]> queue = new LinkedList<>();

        //将所有的0放入答案矩阵
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (mat[i][j] == 0) {
                    queue.add(new int[]{i, j});
                    ans[i][j] = 0;
                    seen[i][j] = true;
                }
            }
        }

        //BFS
        while (!queue.isEmpty()) {

            int[] cell = queue.poll();

            int x = cell[0], y = cell[1];

            //开始位移
            for (int i = 0; i < 4; i++) {

                int mx = x + dx[i];
                int my = y + dy[i];

                if (mx >= 0 && mx < m && my >= 0 && my < n && seen[mx][my] != true) {
                    //距离加1
                    ans[mx][my] = ans[x][y] + 1;
                    seen[mx][my] = true;
                    //将遍历到的方格加入队列,以此为基础可以遍历其他
                    queue.add(new int[]{mx,my});
                }
            }
        }
        return ans;
    }
}
~~~

方法二：动态规划


先简单直观解释为什么只需讨论左上,右下两种情况,

```java
        ?  ?  ?  ?  ?  ?  ?  ?  ?
        ?  ?  ?  ?  ?  0  ?  ?  ?
        ?  ?  ?  ?  ?  ?  ?  ?  ?
        ?  ?  ?  ?  1  X  ?  ?  ?
        ?  ?  ?  ?  ?  ?  ?  ?  ?
        ?  ?  ?  ?  ?  ?  ?  ?  ?
        ?  ?  ?  ?  ?  ?  ?  ?  ?
```

如图所示,真实情况下,距离中间1(坐标为i,j)最近的0在右上角,

根据转移方程我们可知,要求的f(i,j)等于它右,下两个方格的最优值+1,

而其中它右边方格即x位置又是我们在左上情况讨论的,只需上移两格,所以f(i,j) = 1 + f(i , j+1)解决,
总结来看,在考虑往左往上情况时,我们求得了x处的最短距离,

在考虑往右往下情况时,我们便能通过x来获得上图1位置的最短距离。

```java
class Solution {
    public int[][] updateMatrix(int[][] mat) {
        //题解2： 动态规划DP
        //本题DP的转移方程：f(i,j) = 1 + min(f(i−1,j),f(i,j−1),f(i+1,j),f(i,j+1))  (若本身为0则距离为0)

        int m = mat.length;
        int n = mat[0].length;

        //创建dp数组
        //首先,给所有为0的方格赋0,给其他方格赋一个较大值
        int[][] dp = new int[m][n];

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (mat[i][j] == 0) {
                    dp[i][j] = 0;
                } else {
                    dp[i][j] = Integer.MAX_VALUE / 2;
                }
            }
        }

        //先处理(i,j)点只往上往左移动的情况
        //两种位置的最优值与本身比较(因为本身可能为0)
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                //在上边界时
                if (i == 0 && j > 0) {
                    dp[i][j] = Math.min(dp[i][j], 1 + dp[i][j - 1]);
                }
                //在左边界时
                if (i > 0 && j == 0) {
                    dp[i][j] = Math.min(dp[i][j], 1 + dp[i - 1][j]);
                }
                //往左往上
                if (i > 0 && j > 0) {
                    dp[i][j] = Math.min(dp[i][j], 1 + Math.min(dp[i][j - 1], dp[i - 1][j]));
                }
            }
        }

        //往右往下的情况
        for (int i = m - 1; i >= 0; i--) {
            for (int j = n - 1; j >= 0; j--) {
                //在下边界时
                if (i == m - 1 && j < n - 1) {
                    dp[i][j] = Math.min(dp[i][j], 1 + dp[i][j + 1]);
                }
                //在右边界时
                if (i < m - 1 && j == n - 1) {
                    dp[i][j] = Math.min(dp[i][j], 1 + dp[i + 1][j]);
                }
                //往右往下
                if (i < m - 1 && j < n - 1) {
                    dp[i][j] = Math.min(dp[i][j], 1 + Math.min(dp[i][j + 1], dp[i + 1][j]));
                }
            }
        }
        return dp;
    }
}
```

## 腐烂的橘子

方法一：广度优先遍历

```java
import java.util.LinkedList;
import java.util.Queue;

class Solution {
    public int orangesRotting(int[][] grid) {
        //通俗易懂简洁版Java题解：BFS,不需要额外数组,直接在原数组基础上计数

        //思路：
        //1.刚开始将所有烂橘子位置压入队列,并统计新鲜橘子数量;
        //2.bfs从烂橘子位置开始遍历,让所有新鲜橘子摆烂,并且把本次摆烂的橘子压入队列;
        //3.由上一层摆烂的橘子继续向其四周扩散,以此层层迭代;
        //4.随着摆烂蔓延,新鲜橘子越来越少,最后判断时间;

        //定义4个方向的位移
        int[] dx = new int[]{1, 0, 0, -1};
        int[] dy = new int[]{0, 1, -1, 0};

        //创建时间变量来计时
        int time = 0;

        //新鲜橘子计数,用于最后判断没被感染的橘子
        int cnt = 0;

        //先将烂橘子压入队列
        int m = grid.length;
        int n = grid[0].length;

        Queue<int[]> queue = new LinkedList<>();

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                //烂橘子加入队列
                if (grid[i][j] == 2) {
                    queue.add(new int[]{i, j});
                } else if (grid[i][j] == 1) {
                    ++cnt;
                }
            }
        }
        
        //如果新鲜橘子为0,返回0
        if (cnt == 0){
            return 0;
        }

        //摆烂时刻！
        while (!queue.isEmpty()) {
            //每次从当前的所有烂橘子向其四周开始腐烂一次
            int size = queue.size();

            for (int i = 0; i < size; i++) {
                int[] cell = queue.poll();

                int x = cell[0], y = cell[1];

                for (int j = 0; j < 4; j++) {
                    int mx = x + dx[j];
                    int my = y + dy[j];

                    if (mx >= 0 && my >= 0 && mx < m && my < n && grid[mx][my] == 1) {
                        //新鲜橘子摆烂
                        grid[mx][my] = 2;
                        //将本次队列腐烂的所有橘子压入队列
                        queue.add(new int[]{mx, my});
                        //新鲜橘子减少
                        --cnt;
                    }
                }
            }
            //BFS的每一层作为一次时间增加
            ++time;
        }

        //因为队列中最后一层橘子遍历后时间会加1,但没有橘子被继续感染,此处多了一次1
        return cnt == 0 ? time - 1 : -1;
    }
}
```

## 机器人的运动范围

```java
class Solution {

    public static int[] dx = {1, 0};
    public static int[] dy = {0, 1};
    public static int cnt;
    public static boolean[][] seen;
    
    public int movingCount(int m, int n, int k) {
        //深度优先遍历 DFS

        seen = new boolean[m][n];

        cnt = 0;

        dfs(seen, m, n, k, 0, 0);

        return cnt;
    }

    public void dfs(boolean[][] seen, int m, int n, int k, int x, int y) {

        if (x >= m || x < 0 || y >= n || y < 0 || seen[x][y] || getSum(x) + getSum(y) > k) {

            return;

        }

        cnt++;
        seen[x][y] = true;

        for (int i = 0; i < 2; i++) {
            int mx = x + dx[i];
            int my = y + dy[i];

            dfs(seen, m, n, k, mx, my);
        }

    }

    //定义求数位和
    public int getSum(int x) {

        int res = 0;

        while (x != 0) {
            res += x % 10;
            x /= 10;
        }

        return res;
    }
}
```

## 螺旋矩阵II

思路：深度优先遍历一套模版，类似推荐：图像渲染，岛屿类，腐烂橘子

1.从左上角开始移动，方向依次向右、向下、向左、向上、向右

2.转向的条件是撞到墙：定义墙是: 到达某边界 和 到达某遍历过的格子

3.撞墙时，我们需要改变行走方向

```java
class Solution {
    //定义移动方向，右，下，左，上
    public static int[] dx = {1, 0, -1, 0};
    public static int[] dy = {0, 1, 0, -1};
    //定义行走方向
    int direction = 0;
    //定义返回结果
    public static int[][] res;

    public int[][] generateMatrix(int n) {

        res = new int[n][n];

        dfs(n, 0, 0, 1);

        return res;
    }
    //深度优先搜索：递归
    public void dfs(int n, int x, int y, int num) {

        //判断条件：超出边界，或者遇到已经赋值过的方格
        if (x < 0 || x >= n || y < 0 || y >= n || res[y][x] != 0) {
            //撞到墙了，需要转向
            direction++;
            //如果已经转了一圈，需要从头开始如 dir = 4，需要再从 0 即向右移动
            direction %= 4;

            return;
        }

        //每次给该方格赋值
        res[y][x] = num;

        //向四个方向移动
        for (int i = 0; i < 4; i++) {

            //位移
            int mx = x + dx[direction];
            int my = y + dy[direction];

            //递归下一个方格
            dfs(n, mx, my, num + 1);
        }
    }
}
```