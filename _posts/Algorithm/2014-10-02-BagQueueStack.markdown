---
layout: page
title: 背包、队列和栈
category: Algorithm
tags: 栈 背包 队列
image:
  feature: abstract-4.jpg
  credit: dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
comments: true
modified: 2014-10-02
---

## 栈
### 栈（可变数组）

{% highlight java %}
import java.util.Arrays;
import java.util.Iterator;

/**
 * 用可变数组来构建Stack
 * @ author Chaucer
 *
 * @ param <T>
 */
public class ResizingArrayStack<T> implements Iterable<T> {
    // 记录Stack的大小
    private int N = 0;
    // 栈元素，记录Stack数据的数组
    @ SuppressWarnings("unchecked")
    private T[] data = (T[]) new Object[1]; // 不能new一个泛型数组， new T[1] --> compile error
    
    public boolean isEmpty() { return N == 0; }
    
    public int size() { return N; }
    
    public void push(T t) {
        if (N == data.length)
            data = Arrays.copyOf(data, data.length*2);
        data[N++] = t;
    }
    
    public T pop() {
        T t = data[--N];
        data[N] = null; // 避免对象游离
        if (N > 0 && N == data.length/4)
            data = Arrays.copyOf(data, data.length/2);
        return t;
    }
    
    @ Override
    public Iterator<T> iterator() {
        return new ReverseArrayIterator();
    }
    
    /**
     * 内部类，支持先进后出的迭代器
     * @ author Chaucer
     *
     */
    private class ReverseArrayIterator implements Iterator<T> {

        int rev = N;
        
        @ Override
        public boolean hasNext() {
            return rev > 0;
        }

        @ Override
        public T next() {
            return data[--rev];
        }

        @ Override
        public void remove() {
            throw new UnsupportedOperationException();
        }
        
    }

}
{% endhighlight %}
### 栈（链表）
向链表表头添加元素，从链表表头删除元素。
{% highlight java %}
import java.util.ArrayList;
import java.util.Iterator;
import java.util.NoSuchElementException;

public class Stack<T> implements Iterable<T>{
    // 链表头指针
    private Node head;
    // 记录元素数
    private int N;
    // 链表节点
    private class Node {
        T data;
        Node next;
    }
    
    public boolean isEmpty() { return head == null; }
    
    public int size() { return N; }
    
    public void push(T t) {
        Node oldHead = head;
        head = new Node();
        head.data = t;
        head.next = oldHead;
        N++;
    }
    
    public T peek() {
        if (isEmpty()) throw new NoSuchElementException("Stack underflow");
        return head.data;
    }
    
    public T pop() {
        if (isEmpty()) throw new NoSuchElementException("Stack underflow");
        T data = head.data;
        head = head.next;
        N--;
        return data;
    }

    @ Override
    public Iterator<T> iterator() {
        return new StackIterator();
    }
    
    private class StackIterator implements Iterator<T> {
        
        // 记录头指针，用于遍历
        private Node current = head;
        
        @ Override
        public boolean hasNext() {
            return current != null;
        }
        
        @ Override
        public T next() {
            if (!hasNext()) throw new NoSuchElementException();
            T data = current.data;
            current = current.next;
            return data;
        }
        
        @ Override
        public void remove() {
            throw new UnsupportedOperationException();
        }
        
    }
    
    //测试用例
    public static void main(String[] args) {
        Stack<String> s = new Stack<>();
        while (!StdIn.isEmpty()) {
            String item = StdIn.readString();
            if (!item.equals("-"))
                s.push(item);
            else if (!s.isEmpty()) StdOut.print(s.pop() + " ");
        }
        StdOut.println("(" + s.size() + " left on stack)");
    }

}
{% endhighlight %}
## 队列
向链表尾添加元素，从链表表头删除元素
{% highlight java %}
import java.util.Iterator;

public class Queue<T> implements Iterable<T>{

    // 队首指针
    private Node first;
    // 队尾指针
    private Node last;
    // 元素个数
    private int N;
    // 结点嵌套类
    private class Node {
        T data;
        Node next;
    }
    
    public boolean isEmpty() { return first == null; }
    
    public int size() { return N; }
    
    public void enqueue(T t) {
        // 往链表尾部添加新的结点
        Node oldLast = last;
        last = new Node();
        last.data = t;
        last.next = null;
        // 当第一个结点加入时首尾引用指向同一个对象
        if (isEmpty()) first = last;
        else oldLast.next = last;
        N++;
    }
    
    public T dequeue() {
        T data = first.data;
        first = first.next;
        // 当最后一个结点出列后，首尾引用都指向null
        if (isEmpty()) last = null;
        N--;
        return data;
    }
    
    @ Override
    public Iterator<T> iterator() {
        return new LinkedIterator();
    }
    
    private class LinkedIterator implements Iterator<T> {
        
        private Node current = first;
        
        @ Override
        public boolean hasNext() {
            return current != null;
        }
        
        @ Override
        public T next() {
            T data = current.data;
            current = current.next;
            return data;
        }
        
        @ Override
        public void remove() {
            throw new UnsupportedOperationException();
        }
    }
}
{% endhighlight %}
## 背包
{% highlight java %}
import java.util.Iterator;

public class Bag<T> implements Iterable<T>{
    // 链表头指针
    private Node head;
    // 记录元素数
    private int N;
    // 链表节点
    private class Node {
        T data;
        Node next;
    }
    
    public boolean isEmpty() { return head == null; }
    
    public int size() { return N; }
    
    public void add(T t) {
        Node oldHead = head;
        head = new Node();
        head.data = t;
        head.next = oldHead;
        N++;
    }
    
    @ Override
    public Iterator<T> iterator() {
        return new ListIterator();
    }
    
    private class ListIterator implements Iterator<T> {
        
        // 记录头指针，用于遍历
        private Node current = head;
        
        @ Override
        public boolean hasNext() {
            return current != null;
        }
        
        @ Override
        public T next() {
            T data = current.data;
            current = current.next;
            return data;
        }
        
        @ Override
        public void remove() {
            throw new UnsupportedOperationException();
        }
        
    }

}
{% endhighlight %}
