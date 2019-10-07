---
title: Expressions and Operators
date: 2016-07-31 01:07:49
categories: JavaScript
tags: 
- JavaScript
- Expressions and Operators
---

# 数组的初始化表达式
`var sparseArray = [1,,,,,5];` 数组直接量中的列表逗号之间的元素可以省略，这是省略的空位会填充`undefined`;数组直接量的元素列表结尾处可以留下单个逗号，这是不会创建`undefinded`。

# 相等
`===`首先计算其操作数的值，然后比较这两个值，比较过程中没有任何类型转换：

* 如果两个值类型不相同，则他们不相等
* 如果两个值都是`null`或者`undefined`，则他们不相等
* 如果两个值都是true或false,则他们相等
* 如果其中一个值是`NaN`，或两个值都是`NaN`,则他们不相等。`NaN`和任何值都是不相等的。通过`x!==x`来判断`x`是否为`NaN`
* 如果两个值为数字且数值相等则他们相等
* 如果两个值为字符串，且所含的对应位上的16位数完全相等，则他们相等
* 如果两个引用值指向同一个对象、函数或数组，则他们相等。
<!-- more -->

# typeof
`typeof`是一个一元运算符，放在其单个操作书的前面，操作数可以是任意类型。`typeof`返回一个表示该类型的字符串。

# for/in
```javascript
// 赋值一个对象的属性到一个数组中
// ["x", "y", "z"]
var o = {x:1, y:2, z:3};
var a = [], i = 0;
for (a[i++] in o) /* empty */;
for (i in o) 
    console.log(o[i]);
```
`for/in`并不会遍历对象的所有属性，只有“可枚举”(enumerable)的属性才会遍历到。对象可以继承其他对象的属性，那些继承的自定义属性也可通过`for/in`枚举。

# return 
如果函数没有`return`语句，调用该函数的话会返回`undefined`；只有`return`而没有表达式的return语句，也返回`undefined`。

# finally
```javascript
var foo = function() {
    var i = 30;
    try {
        return i;
    }
    finally {
        return -1;
    }
};
console.log(foo()); //返回-1
```

# with
`with`用于临时扩展作用域链，语法如下：
```javascript
with (object)
statement
```
这条语句将object添加到作用域链的头部，然后执行statement，最后把作用域链恢复到原始状态。不推荐使用`with`，`use strict`中禁止使用。

# use strict
在严格模式中，调用的函数(非对象中的方法)中的`this`值为`undefined`。可利用这一特性判断浏览器是否支持严格模式。
```javascript
var hasStrictMode = (function() {"use strict"; return this === undefined}());
```
