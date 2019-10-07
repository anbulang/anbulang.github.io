---
layout: post
title: union-find算法
category: Algorithm
tags: 内存 union-find
image:
  feature: abstract-5.jpg
  credit: dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
comments: true
date: 2014-10-02
---

## 内存
一个对象的内存量是所有的实例变量使用的内存与对象本身的开销（一般是16字节，包括一个指向对象的类的引用、垃圾收集信息以及同步信息）相加。另外，一般内存中的使用都会被填充为8字节（64位计算机中的机器字）的倍数。


- **链表**  嵌套的非静态内部类需要额外的8字节（用于一个指向外部类的引用）。一个Node对象需要40字节（16字节对象开销，两个引用16字节，8个字节的额外开销）。一个含有N个Integer整数的基于链表的栈需要使用(32+64N)字节。
- **数组** Java 中数组为对象。一个原始数据类型的数组一般需要24字节的头信息（16字节的对象开销，4字节用于保存长度及4个填充字节）。对象数组需要加上所有引用的开销（8字节 * N）。
- **String** 每个String对象总共使用40个字节（16个字节表示对象，三个int实例变量各需4字节，加上数组引用的8字节和4个填充字节）。
<!-- more -->

## 动态连通性
> 动态连通性：判断一对新对象是否是相连的

Union-find算法API
![union-find API](http://algs4.cs.princeton.edu/15uf/images/uf-api.png)

**抽象类UF**
```java
/**
 * 动态连通性问题


 * @ author Chaucer
 *
 */
public abstract class UF {
    // 连通分量的个数
    protected int count;
    // 以触点为索引的数组表示所有的分量
    protected int[] id;
    
    /**
     * 初始化：以整数标识（0到N-1）初始化N个触点，即N个连通分量
     * @ param N 触点个数
     */
    protected UF(int N) {
        count = N;
        id = new int[N];
        for (int i = 0; i < N; i++) {
            id[i] = i;
        }
    }
    
    /**
     * 连通分量的个数
     * @ return 连通分量的个数
     */
    public int count() { return count; }
    
    /**
     * 判断两个触点是否存在同一个分量中
     * @ param p 触点
     * @ param q 触点
     * @ return  是否连通
     */
    public boolean isConnected(int p, int q) {
        return find(p) == find(q); 
    }
    
    /**
     * 查找触点n所在的分量标识
     * @ param n 触点
     * @ return 连通分量标识
     */
    public abstract int find(int n);
    
    /**
     * 在触点间建立连接
     * @ param p 触点
     * @ param q 触点
     */
    public abstract void union(int p, int q);
    
}
```
## Quick-find
![enter image description here](http://algs4.cs.princeton.edu/15uf/images/quick-find-overview.png)
```java

public class UFQuickFind extends UF {
    
    public UFQuickFind(int N) {
        super(N);
    }

    @ Override
    public int find(int n) {
        return id[n];
    }

    @ Override
    public void union(int p, int q) {
        if (isConnected(p, q)) return;
        int pId = find(p);
        int qId = find(q);
        for (int i = 0; i < id.length; i++) {
            if (find(i) == pId) id[i] = qId; 
        }
        count--;
    }
    
    public static void main(String[] args) {
        int N = StdIn.readInt();
        UF uf = new UFQuickFind(N);
        while (!StdIn.isEmpty()) {
            int p = StdIn.readInt();
            int q = StdIn.readInt();
            if (uf.isConnected(p, q)) continue;
            uf.union(p, q);
            StdOut.println(p + "——" + q);
        }
        StdOut.println(uf.count() + " components");
    }

}
```
> 在quick-find算法中，每次find()调用只需访问数组一次，而归并两个分量的union()操作访问数组的次数在$N+3$到$2N+1$之间。
## Quick-union
![enter image description here](http://algs4.cs.princeton.edu/15uf/images/quick-union-overview.png)
```java
/**
 * 每个触点所对应的id[]元素都是另一个触点或它自己——链接
 * @ author Chaucer
 *
 */
public class UFQuickUnion extends UF {
    
    public UFQuickUnion(int N) {
        super(N);
    }

    /**
     * 查找根触点
     */
    @ Override
    public int find(int n) {
        while (n != id[n]) n = id[n];
        return n;
    }

    /**
     * 分别找到p、q的根触点，将p的根触点链接到q
     */
    @ Override
    public void union(int p, int q) {
        int pRoot = find(p);
        int qRoot = find(q);
        if (pRoot == qRoot) return;
        
        id[pRoot] = qRoot;
        count--;
    }
    
    public static void main(String[] args) {
        int N = StdIn.readInt();
        UF uf = new UFQuickUnion(N);
        while (!StdIn.isEmpty()) {
            int p = StdIn.readInt();
            int q = StdIn.readInt();
            if (uf.isConnected(p, q)) continue;
            uf.union(p, q);
            StdOut.println(p + "——" + q);
        }
        StdOut.println(uf.count() + " components");
    }

}
```
union示例：
<a href="http://imgbox.com/rOBCb13H" target="_blank"><img src="http://3.t.imgbox.com/rOBCb13H.jpg" alt="image host"/></a>

> 一棵树的大小是他的节点的数量。树中的一个节点的深度是他到根节点的路径上的链接数。数的高度是他的所有节点中的最大深度。

> Quick-union算法运行时间在最坏情况下是平方级别的。

## 加权Quick-union
![enter image description here](http://algs4.cs.princeton.edu/15uf/images/weighted-quick-union-overview.png)
```java

public class UFWeightedQuickUnion extends UF {

    private int[] size; // 由触点索引的各个根节点所对应的分量的大小，即节点数
    
    public UFWeightedQuickUnion(int N) {
        super(N);
        size = new int[N];
        for (int i = 0; i < N; i++) size[i] = 1;
    }
    
    @ Override
    public int find(int n) {
        while(id[n] != n) {
            id[n] = id[id[n]]; // 压缩路径
            n = id[n];
        }
        return n;
    }

    @ Override
    public void union(int p, int q) {
        int pRoot = find(p);
        int qRoot = find(q);
        if (pRoot == qRoot) return;
        
        if (size[pRoot] > size[qRoot]) {
            id[qRoot] = pRoot;
            size[pRoot] += size[qRoot];
        } else {
            id[pRoot] = qRoot;
            size[qRoot] += size[pRoot];
        }
        count--;
    }
    
    public static void main(String[] args) {
        int N = StdIn.readInt();
        UF uf = new UFWeightedQuickUnion(N);
        while (!StdIn.isEmpty()) {
            int p = StdIn.readInt();
            int q = StdIn.readInt();
            if (uf.isConnected(p, q)) continue;
            uf.union(p, q);
            StdOut.println(p + "——" + q);
        }
        StdOut.println(uf.count() + " components");
    }

}
```
> 对于N个触点，加权Quick-union算法构造的森林中的任意节点的深度最多为 $lgN$ 。
> 在最坏的情况下find(),connected()和union()的成本的增长数量级为 $logN$ 。
