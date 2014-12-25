---
layout: page
title: State Pattern
categories: Java
tags: 状态模式
image:
  feature: abstract-5.jpg
  credit: dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
comments: true
modified: 2014-12-24
---

状态模式
========

模式定义
-----------
>**状态模式**允许对象在内部状态改变时改变它的行为，对象看起来好像修改了它的类。

* 在这个模式中，状态被封装称为独立的类，并将动作委托到代表当前状态的对象，行为会随着内部状态而改变。
* 从客户的角度来看，使用的对象能够完全改变它的行为，就像改变了它的类一样。然而，实际上是通过引用不同的状态对象来造成类改变的假象。

模式类图
-----------
<a href="http://imgbox.com/RmNrs4E0" target="_blank"><img src="http://i.imgbox.com/RmNrs4E0.png" alt="image host"/></a>

*状态模式与策略模式类似，但是他们的意图不同：*

* 以状态模式而言，我们将一群行为封装在状态对象中，Context的行为随时可委托到那些状态对象中的一个。随着时间的推移，当前状态在状态对象集合中游走改变，以反映出Context内部的状态。但是，Context的客户对于状态对象是透明的。
*  以策略模式而言，客户通常会指定Context中所要组合的策略对象是哪一个。它通常只有一个最适当的策略对象。
* 状态模式是不用再Context中放置许多条件判断的替代方案。
* 策略模式是除了继承之外一种弹性设计方案。

Q1: ConcreteState总是决定接下来的状态吗？
: 不是。Context也可以决定状态转换的流向。一般来讲，当状态转换是固定的时候，就适合放在Context中；然而，当转换更动态的时候，通常就放在状态类中。将状态转换放在状态类中的缺点是： 状态类之间产生了依赖。可以通过使用Context上的getter方法把依赖减小到最小，而不是显示硬编码具体状态类。

Q2：客户会直接和状态交互吗？
: 不会。状态只用在Context中来代表它的内部状态及行为，对客户是透明的。

Q3：如果我的程序中Context有许多实例，这些实例之间可以共享状态对象吗？
: 可以。唯一的前提是你的状态对象不能持有它们自己的内部状态，否则就不能共享。想要共享状态，你需要把每个状态都指定到静态的实例变量中。如果你的状态需要利用到Context中的方法或者实例变量，就必须给handle方法传入一个Context的引用。
