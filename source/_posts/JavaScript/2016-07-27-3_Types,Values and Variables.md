---
title: Types,Values and Variables
date: 2016-07-27 00:57:49
categories: JavaScript
tags: 
- JavaScript
- Type, Values & Variables
---

# 字符串的使用

``` javascript
var s = "hello, world";
s.substring(1,4);	//"ell",第2-4个字符；与Java的substring(int beginIndex, int endIndex)方法相同。
s.slice(1,4);		//"ell",同上
s.silece(-3); 		//"rld",最后三个字符
s.replace("h", "H"); //替换
s.toUpperCase();	//大写
```
在JavaScript中字符串是固定不变的，类似replace()和toUpperCase()的方法都返回新字符串，原字符串本身并没有发生改变。
<!-- more -->

# 模式匹配
```javascript
var text = 'testing: 1, 2, 3';
var pattern = //d+/g;
pattern.test(text);		//true,匹配成功
text.search(pattern);	//9
text.match(pattern); 	//["1","2","3"]
text.replace(pattern, "#");
text.split(/D+/);		//["","1","2","3"]
```
# 包装对象
字符串既然不是对象，为啥会有属性呢？
>只要引用了字符串的属性，JavaScript就会将字符串的值通过new String(s)的方式转换为对象，这个对象继承了字符串的方法，被用来处理属性的引用。一旦属性应用结束，这个新创建的对象就会被销毁（不一定创建销毁对象，然而整个过程看起来是这样）。

```javascript
var s = "test";
s.len = 4;
var t = s.len; //undefine
```
>在读取字符串、数字或布尔值的属性值（或方法）时，表现的像对象一样。但如果你试图给它赋值，则会忽略这个操作；修改只是发生在临时对象身上，而这个临时对象并未继续保留下来。事实上字符串、数字和布尔值的属性都是只读的，并且不能给它们定义新的属性，因此它们是有别于对象的。

# 类型转换
![类型转换](/images/javascript/2016-07-28_225314.jpg "JavaScript类型转换")

# 转换和相等性
```javascript
null == undefined;	//true
"0" == 0;			//true, 字符串0转换为数字0
0 == false;			//true, 布尔值转换成数字
"0" == false;		//true
```

# 显示类型转换
显示类型转换最简单的方法就是使用Boolean(),Number(),String()或Object()函数（注意都没有new），当不用过new运算符调用这些函数时，他们会作为类型转换函数。

类型转换的惯用法：
```javascript
x + "" 	//等价于String(x), “+”运算符连接字符串
+x		//等价于 Number(x), 一元"+"运算符
!!x     //等价于Boolean(x), 一元运算符"!",注意是双！,单!等价于转为布尔值并取反
```
Number类定义的toString()等方法
```javascript
var n = 17;
binary_string = n.toString(2);	//"10001"
octal_string = "0" + n.toString(8);	//"021"
hex_string = "0x" + n.tostring(16); //"0x11"
```
```javascript
var n = 123456.78;
n.toFixed(0);		//"123456"
n.toFixed(2); 		//"123456.79"
n.toExponential(3); //"1.235e+5"
n.toPrecision(3);	//"1.235e+5"
n.toPrecision(10);	//"123456.7890"
```

parseInt()和parseFloat()函数不从属于任何类的方法，前者只解析整数，后者可解析整数和浮点数。parseInt()可接受第二个可选参数，这个参数指定数字转换的基数，合法的取值范围为2~36.
```javascript
parseInt("ff", 16); //255
```

# 对象转换为原始值
1.  对象到字符串的转换
>	(1)  对象有toString()方法，返回一个原始值，转换为字符串；
>	(2)  否则，调用valueOf()方法，返回一个原始值，转换为字符串；
>	(3)  否则，抛出类型错误异常。
2.  对象到数字的转换
>	(1)  对象有valueOf()方法，返回一个原始值，转换为数字；
>	(2)  否则，调用toString()方法，返回一个原始值，转换为数字；
>	(3)  否则，抛出类型错误异常。

如果对象和一个原始值比较，则转换会遵照对象到原始值的转换方式进行。
对于所有非日期对象来说，对象到原始值的转换基本上是对象到数字的转换（首先调用valueOf()），日期对象则使用对象到字符串的转换模式（"+","==","!=",其他运算符与其他对象基本相同）。
```javascript
var now = new Date();
typeof(now + 1);		//string:"+"将日期转换为字符串
typeof(now - 1);		//number:"-"将日期转换为数字
now == now.toString(); 	//true:字符串转换
now > (now - 1);		//true:将日期转为数字
```
# 声明提前和作用域链
[click me!](https://segmentfault.com/a/1190000003935661)