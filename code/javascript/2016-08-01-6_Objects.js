function inherit(p) {
    if (p == null) throw TypeError();   // p不能为null
    if (Object.create)
        return Object.create(p);        // Object.create()存在就直接创建
    var t = typeof p;                   // 否则，进一步检测
    if (t !== 'object' && t !== 'function') throw TypeError();
    function f () {};                   // 定义一个空构造函数
    f.prototype = p;                    // 使构造函数的属性设置为p
    return new f();
}

 function extend(o, p) {
    for (prop in p) {
        o[prop] = p[prop];
    }
    return o;
 }

 var o = inherit({x:1, u:8});
 o.z = 2;
 var p = inherit({x:3, y:4});
 p.z = 5;
 p.w = 6;
 extend(o, p);
 console.log(o);  // Object {z: 5, w: 6, x: 3, y: 4}

 for (var prop in o) 
 	if (o.hasOwnProperty(prop))
 		console.log(prop);	// z w x y 
 console.log(prop);  // u

/*局部作用域嵌套*/
 var scope = 'global scope';
 function checkscope() {
 	var scope = "local scope";
 	function nested() {
 		var scope = "nested scope";
 		return scope;
 	}
 	return nested();
 }
 checkscope(); //nested scope




'use strict'
 var x = 1;
 y = 2;
 this.z = 3;
 delete x;
 delete this.y;
 delete z;