# JavaScript

## JS运行机制与原理

### ES6新增的内容

1. let const
2. 函数上的拓展：
   1. 箭头函数
   2. 剩余参数
   3. 默认参数
3. class 
4. module模块化
5. Proxy
6. Promise（aysnc/await）
7. 字符串上的拓展：模板字符串
8. 解构赋值
9. 新增数据类型：bigInt symbol Set Map WeakSet WeakMap
10. 新增运算符： `**` `??` 

### 面向对象特性

封装继承多态

封装:用类封装,将属性方法放到类中

继承:实例继承类的属性

多态:实例扩展类的属性,让相比于原来的类有了更多的状态

### Generator生成器Iterator迭代器

凡是实现了[Symbol.iterator]属性的都是迭代器对象,都可以使用for...of迭代

生成器函数是一种函数,用于异步编程,用于动态的控制函数的执行与暂停

该函数会返回一个迭代器,可以通过next()方法来让该函数正常执行

yield关键字可以认为是函数里面的分割符,每次next方法时,都会在分隔符上停止

一个生成器与迭代器实例

```js
let myIterable = {
  [Symbol.iterator]: function* () {
    yield 1;
    yield 2;
    yield 3;
  }
}
[...myIterable] // [1, 2, 3]
// 或者采用下面的简洁写法
let obj = {
  * [Symbol.iterator]() {
    yield 'hello';
    yield 'world';
  }
};
for (let x of obj) {
  console.log(x);
}
// "hello"
// "world"
```

### 介绍一下async与await,以及实现的原理

async:

async返回一个promise,

async返回的promise取决于函数的return或者执行函数中是否存在catch捕获

```js
async function asyncCall() {
      console.log('calling');
      const result = await Promise.reject('cuo');
      console.log(result);
    }

    let res = asyncCall();
    console.log(res)  // rejected,data为"cuo"的promise
```

await:

当一个 `Promise` 被传递给 `await` 操作符，`await` 将等待该 `Promise` 兑现，并在兑现后返回该 `Promise` 兑现的值。

```js
function resolveAfter2Seconds(x) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x);
    }, 2000);
  });
}

async function f1() {
  let x = await resolveAfter2Seconds(10);
  console.log(x); // 10
}

f1();
```

若表达式的值不是 `Promise`，`await` 会把该值转换为已兑现的 `Promise`，然后返回其结果。

```js
async function f3() {
  const y = await 20;
  console.log(y); // 20

  const obj = {};
  console.log((await obj) === obj); // true
}

f3();
```

如果 `Promise` 被拒绝，则抛出拒绝的原因。

```
async function f4() {
  try {
    const z = await Promise.reject(30);
  } catch (e) {
    console.error(e); // 30
  }
}

f4();
```

原理上,async\await就是对generator的实现,区别在于generator函数调用后返回的是一个迭代器对象,通过手动调用next方法来改变指针.而async是全自动的,调用后就会正常执行函数内容,不需要手动调用next函数.

### 为什么0.1+0.2 != 0.3

注意,这个结果为0.30000000xx4

主要问题是js进行进制转换过程中,转换二进制后是一个无限循环的小数,js会剪掉一定的位数来保留精度,这样两个数相加后依然不是一个小数,而是一个循环小数

解决方法:

toFixed可以返回一个指定位数的小数,返回的小数类型为字符串,需要parseFloat来转换

```js
console.log(parseFloat((0.1+0.2).toFixed(1))===0.3);
console.log((0.1+0.2).toFixed(1)) // 这样写也行;
```

### 说一下并发与并行的区别

并行,共同执行,cpu有多个核心,就可以同时进行多个任务,任务在进行过程中互不打扰

并发,一个人做多个任务,且在做这多个任务时反复横跳,切换执行


### 执行机制

拿到一段代码后,首先进行编译

1. 创建执行上下文,里面保存了声明的函数与变量
2. 执行上下文入栈,开始执行代码,
3. 如果遇到函数调用,就进入函数编译阶段.创建函数的执行上下文.然后入栈
4. 当函数遇到返回时,该函数就会从调用栈中弹出,并将函数的返回值返回给指定的变量

十分重要的例子:

```js
var myname = " 极客时间 "
function showName(){
 console.log(myname);
 if(0){
 var myname = " 极客邦 "
 }
 console.log(myname);
}
showName()
```

1. 编译阶段,创建执行上下文,里面保存myName 与 function showName()
2. 执行阶段,执行上下文里面的内容是:myName="极客时间" showName函数被调用
3. 编译showName函数,创建函数执行上下文入栈,里面保存了 **myName=undefined**(因为变量提升,if里面的变量出现在了函数执行上下文中)
4. 执行阶段,输出myName的值为undefined

### 介绍一下原型与原型链

js万物皆为对象,函数也是对象,对于一个构造函数来讲,它内置了一个prototype属性,该属性指向该构造函数的原型对象,该原型对象被成为显示原型.原型上的属性和方法可以被构造函数所创建出来的对象所继承.

构造函数的原型对象作为一个对象,它也有指向原型的prototype属性,该对象的原型对象被称为该对象的隐式原型.原型对象上也会有一个原型对象,经过这一层又一层的寻找,就形成了原型链.

js中每一个对象都会包含一个内置属性[[prototype]],这个属性指向一个对象,这个对象就是原型对象.当该对象调用某个方法或者属性时,如果对象本身没有,就会向它的原型对象上去寻找.原型对象上也会有一个原型对象,经过这一层又一层的寻找,就形成了原型链.

获取对象的原型有两种方法:`对象.__proto__`或使用`Object.getPrototypeOf`  隐式原型

同时,函数也有一个prototype属性,同上  显式原型

new操作符,首先创建一个新对象,将新对象的原型指向构造函数的原型对象

原型对象上有一个constructor属性,该属性指向构造函数

### 作用域与闭包

作用域就是保存了变量与函数的可访问的范围

ES5之前有 全局作用域与函数作用域

全局作用域:可以被任意代码访问其中的变量与函数

函数作用域:只能在函数内部进行访问,函数执行结束后,这一部分的作用域也会消失

函数的作用域与变量一样,只看其声明时所在的作用域,不看其运行时所在的作用域

```js
var a = 1;
var x = function () {
  console.log(a);
};
function f() {
  var a = 2;
  x();
}
f() // 1
// 之所以会这样,是因为声明的位置才决定了进执行上下文栈的位置
```

变量提升:是对**函数与变量**的**声明**进行提升,赋值不提升.**函数提升要高于变量提升**

![image-20221203155300788{}](https://cdn.jsdelivr.net/gh/CXGBro/image-repo/Picgo/image-20221203155300788.png)

function showName() 这种是声明,所以会变量提升

对于普通的变量提升,提升以后会赋予默认值undefined

#### 介绍一下var let const

1. let const 放到局部作用域中,var放到函数作用域中

2. let没有作用域提升 在ECMA规范中,声明了但访问不到 不会挂载到window上

3. const 不可改变 但如果是引用类型,改变的话其实就是改变引用到的那个变量


**块级作用域中的函数参数问题**

```javascript
let x = 1;

function f(y = x) {
  let x = 2;
  console.log(y);
}

f() // 1
```

上面代码中，函数`f`调用时，参数`y = x`形成一个单独的作用域。这个作用域里面，变量`x`本身没有定义，所以指向外层的全局变量`x`。函数调用时，函数体内部的局部变量`x`影响不到默认值变量`x`。

函数参数有默认值时,在声明初始化的过程中会形成一个作用域,**初始化结**束后作用域会消失


#### 一段代码的执行过程

```js
function foo(){
 var a = 1
 let b = 2
 {
 let b = 3
 var c = 4
 let d = 5
 console.log(a)
 console.log(b)
 }
 console.log(b) 
 console.log(c)
 console.log(d)
} 
foo()

```

1. 创建函数执行上下文入栈,栈里面包括变量环境与词法环境两部分,函数作用域的变量在变量环境中存放.块级作用域的变量在词法环境中存放

   <img src="https://cdn.jsdelivr.net/gh/CXGBro/image-repo/Picgo/image-20221204200534085.png" alt="image-20221204200534085" style="zoom: 25%;" />

2. 开始执行代码,赋值语句进行赋值,遇到新的函数被调用,将对应的执行上下文入栈.然后再次使用变量环境与词法环境来存储变量

3. 在使用变量时,会优先从词法环境中寻找是否存在对应的变量,然后再去找变量环境

   

#### 介绍一下闭包

所谓闭包,通俗的讲就是内部函数可以访问到外部函数的作用域,即使外部函数已经销毁

由于外层作用域的变量一直被引用，所以这些变量不会被垃圾回收机制回收。可以始终保持在内存中,这也是闭包的作用

内部函数总是可以访问其外部函数中声明的变量，当通过调用一个外部函数返回一个 内部函数后，即使该外部函数已经执行结束了，但是内部函数引用外部函数的变量依然保存 在内存中，我们就把这些变量的集合称为闭包

闭包可以延长变量的生命周期,但也会造成内存泄漏等问题

闭包的用途

1. 保存变量 2.访问变量

闭包的场景: 监听事件的回调函数等

```js
// 这就是一个闭包,即使
function outer() {
    var name = "Foolgry";
    
    function inner() {
        return name;
    }
}

```



#### 使用闭包解决问题

一下输出什么?

```js
for (var i = 1; i <= 5; i++) {
		setTimeout(function timer() {
		console.log(i)
	}, i * 1000)
}

//5个六,每个间隔1秒
```

解决方案

```
使用立即执行函数,把i作为参数传入进去
for (var i = 1; i <= 5; i++) {
  ; (function (i) {
    setTimeout(function () {
      console.log(i)
    }, i * 1000)
  })(i)
}

除此之外使用let
```

#### 闭包练习题

```js
var divElems = document.getElementsByTagName('div');
for (var i = 0; i < divElems.length; i++) {
  var elem = divElems[i];
  elem.onclick = function () {
    console.log(i);
  }
}

function fun(n,o) {
    console.log(o);
        return {
            fun:function(m) {     
                return fun(m,n);   // 这里面并不会出现无限递归的问题,因为对象里面只是属性,不是变量!!! fun找的是外层作用域的fun(n,o)这个函数!!!
            }
        };
}
var a = fun(0); a.fun(1); a.fun(2);  a.fun(3);  
var b = fun(0).fun(1).fun(2).fun(3);
var c = fun(0).fun(1);  c.fun(2);  c.fun(3);
```

```js
let a = 2
let f = a => b =>console.log((a+=b))

let res = f(1);
res(2);
res(1);
// 3 4
```



### this指向

函数的this总是指向最后一次调用改函数的对象

对于使用new方法的构造函数,构造函数的this指向new方法所创建的对象

### JS内存存储原理与垃圾回收机制

内存分为了栈空间与堆空间

栈空间存放了全局执行上下文与函数执行上下文,执行上下文中,基本数据类型直接通过键值对的方式存储.引用类型存储方式是它的值为内存地址,也就是说它存储了引用类型的引用,内存地址指向堆空间

![image-20221127145154279](https://cdn.jsdelivr.net/gh/CXGBro/image-repo/Picgo/image-20221127145154279.png)

为什么不能只有栈空间?

1. 当所有数据都放到栈空间时,栈的上下文切换变得很困难.比如从全局上下文转向函数上下文时,只要将指向全局上下文的指针移动到函数上下文就可以了.数据太大造成指针转移的效率大大降低

如何进行垃圾回收?

1. 对于栈空间,比如顶层的函数执行完毕,需要内存回收.直接将指针下移,就完成了栈空间的内存回收

那堆空间呢?

1. 将堆空间分为两部分,一部分为老生代,存放存放时间长的对象.一部分为新生代,空间很小,存放时间短的对象
2. 老生代使用主垃圾回收器,新生代使用副垃圾回收器
3. 

### js继承原理

继承指的是子类继承父类,并不是指的对象继承类.在原型对象上添加属性与方法的方式属于实例继承类

我们要讨论的继承不是这种继承,我们的讨论也可以认为是构造函数的继承

#### 原型链继承

思路:要想实现子类继承父类,子类的原型对象中得包括父类

两种方案:1.子类原型为父类的原型,`Student.prototype=Person.prototype`但这样会造成person的内容太多

2.子类原型为父类的实例对象`Student.prototype=person`

```js
function Person(name,age){
  this.name=name;
  this.age=age;
}

function Student(sno){
  this.sno=sno
}

Student.prototype= new Person();
```

但此时就有问题:

1.student对象不能看到自己的父类person对象里的属性,只能看到自己的属性

2.person对象里的属性是写死的,不能随着student的生成而更改

缺点:由于每一个子类实例的原型都是parent的实例,当更改parent的实例的引用类型时,会影响到每一个子类实例

```js
function Parent(){
	this.name = 'parent';
  this.child = [1,2,3];
}
function Child(){
	this.name = 'child';
}
Child.prototype = new Parent();
let c1 = new Child();
c1.name = 'aaa';
c1.child[0] = 2;
let c2 = new Child();
console.log(c2.child);
```

#### 借用构造函数继承

上面的问题是,student能获得person的属性,却没法自定义person的属性

于是在子类使用父类的构造函数让父类的属性与方法定义语句在子类中执行,子类就实现了自定义属性

```js
function Person(name, age) {
      this.name = name;
      this.age = age;
    }

function Student(name,age,sno) {
      // 此时this指向了student的实例对象
  Person.call(this,name,age);
  this.sno = sno;
}
```

缺点:1. 父类构造函数的属性写到了子类里,造成了代码的重复

2. 父类的原型上的属性并没有被继承

#### 组合借用继承

以上的两种方法被称为组合借用继承,

在子类调用父类构造函数以后(借用构造函数),要把子类的原型设置为父类的实例,或者父类的原型(原型链继承)

```js
function Person(name, age) {
      this.name = name;
      this.age = age;
    }

function Student(name,age,sno) {
      // 此时this指向了student的实例对象
  Person.call(this,name,age);
  this.sno = sno;
}

Student.prototype = new Person(); 

// 原型继承的另一种形式,将子的原型设置为父的原型,其实和设置为父的实例是一样的.
Children.prototype = Object.create(Parent.prototype);
Children.prototype.constructor  = Children;
```

它们有问题:

1. 借用构造函数时把父类的属性写在了子类里,造成了代码重复
2. 在很多情况下,这种继承方式调用了两次父类构造函数.一次在生成父类实例中,一次在借用父类的构造方法中

#### 原型式继承

有些类似原型链继承,原型链继承是让子类的原型指向父类的原型,但当子类向原型添加属性时,父类也会受影响.因此原型式继承的方案是找到一个中间量作为子类的原型,中间量是父类原型的副本

因此利用object.create方法,该方法返回一个拷贝后的对象

```js
function Student(){};
function Person(){};

let obj={};
Object.setPrototypeOf(obj,Person.prototype);
Student.prototype=obj;

// 化简以后为
let obj = Object.create(Person.prototype);
Student.prototype=obj;

// 实际开发过程中会进行封装
function inherit(Subtype,Supertype){
  let obj=Object.create(Supertype.prototype);
  Subtype.prototype=obj;
  return Subtype;
}
```

#### 寄生式继承

就是在原本原型式继承的基础上套了一层函数用来加工

#### 寄生组合式继承

将寄生式与组合式继承相结合,相当于是以上继承的全部集合

```js
// createObject(为了解决object.create的兼容性而存在)
function createObject(obj){
    let F = function(){};
    F.prototype=obj;
    return new F();
}
// 寄生函数
function inherit(Subtype,Supertype){
  Subtype.prototype=createObject(Supertype.prototype);
  return Subtype;
}
```

ES6版本

```js
function inherit(Subtype,Supertype){
    Subtype.prototype = Object.create(Supertype.prototype);
    return Subtype;
} // 寄生式继承

function Parent(){}
function Child(){
    Parent.call(this); // 组合继承
}

inherit(Child,Parent); // 寄生组合继承
let c1 = new Child();
let c2 = new Child();
```

#### class继承

### 函数柯里化

只传给函数一部分的参数,让它返回一个函数去处理剩余的参数

柯里化使得函数的功能更加单一,这样更方便我们写逻辑

封装一个函数,使得新产出的函数可以随意调用参数的数量

```js
function add(x,y,z){
  return x+y+z
}

function currying(fn){
  return function isEnough(...args){
    // 如果调用柯里化函数时传入的参数不满足调用整个函数时,进行参数合并后再调用
    if(args.length>=fn.length){
      return fn(...args)
    }else{
      return function(...args2){
        return isEnough(...args,...args2)
      }
    }
  }
}

const curriedAdd = currying(add)
console.log(curriedAdd(1,2,3));
console.log(curriedAdd(1)(2,3));
console.log(curriedAdd(1)); //如果参数不够执行戛然而止返回一个匿名函数
```

### 普通函数与箭头函数的区别

1. 更简介
2. 不绑定this
3. 不能作为构造函数
4. 箭头函数本身也没有绑定arguments,使用剩余参数实现

箭头函数不绑定this,它的this需要到上层的作用域的上下文对象中去寻找

或者也可以说箭头函数绑定的是上层作用域的上下文对象

箭头函数的底层实现原理是.bind(this),也就是返回一个改变this后的函数

### 事件循环机制

js是单线程的,在任务的执行过程中,如果是同步任务则会压入执行栈中.如果是异步任务则会进入任务队列.

#### 以下为浏览器中的情况

就是js引擎去处理代码时的顺序

1. 一般自上而下处理任务,把任务放到上下文调用栈中
2. 异步任务放到任务队列中
   1. 宏任务: ajax 计时器 UI rendering
   2. 微任务: promise的then回调 queueMicroTask()
   3. 在任何一个宏任务执行之前,都得确保微任务已经执行完毕
3. 待上下文调用栈中的所用任务执行完毕后,任务队列中的任务会入栈执行

请看实例

![image-20221216091347663](https://cdn.jsdelivr.net/gh/CXGBro/image-repo/Picgo/image-20221216091347663.png)

#### node中的情况完全不同

一次完整的事件循环Tick分成很多个阶段：

1. 定时器（Timers）：本阶段执行已经被 setTimeout() 和 setInterval() 的调度回调函数。
2. 待定回调（Pending Callback）：对某些系统操作（如TCP错误类型）执行回调，比如TCP连接时接收到ECONNREFUSED。
3. idle, prepare：仅系统内部使用。 
4. 轮询（Poll）：检索新的 I/O 事件；执行与 I/O 相关的回调； poll在英文中就是检查票数的意思
5. 检测（check）：setImmediate() 回调函数在这里执行。 
6. 关闭的回调函数：一些关闭的回调函数，如：socket.on('close', ...)。

Node中的事件循环不只是 微任务队列和 宏任务队列： 

1. 微任务队列：
   1.  ✓ next tick queue：process.nextTick；
   2.  ✓ other queue：Promise的then回调、queueMicrotask； 
2. 宏任务队列： 
   1. ✓ timer queue：setTimeout、setInterval； 
   2. ✓ poll queue：IO事件； 
   3. ✓ check queue：setImmediate； 
   4. ✓ close queue：close事件；

◼ 所以，在每一次事件循环的tick中，会按照如下顺序来执行代码： 

 next tick microtask queue；  other microtask queue；  timer queue；  poll queue；  check queue；  close queue；

### V8引擎(JS引擎架构)

V8引擎完成了将普通的代码转换为机器可以识别的字节码

编译器与解释器

![image-20221127012221691](https://cdn.jsdelivr.net/gh/CXGBro/image-repo/Picgo/image-20221127012221691.png)

包括

1. Parse模块
   1. 生成执行上下文
   2. 完成词法分析与语法分析,将代码转换成AST语法树

2. ignition模块
   1. 将AST转换成ByteCode（字节码）,并且一条一条的执行字节码,字节码可以理解为机器码的抽象
   1. 对于第一次执行的代码,ignition解释器直接将字节码转换为机器码运行.如果在这个期间遇到了可以重复利用的热点代码(hotspot),就交给turbofan来保存字节码转换后的机器码,下次再次解释该段代码时可以直接使用这里的机器码
   1. 之所以没有直接转换为机器码,是因为机器码的内存占用大小远远大于字节码,这样会造成内存占用量太大
3. turbofan模块
   1. 将字节码编译为CPU可以直接执行的机器码(在这段过程中,如果遇到了可以使用多次的代码,可以直接多次使用,实现重复利用)

经过字节码的中间过程,再加上热点代码的加持,效率比直接使用机器码差不多,内存占用减少不少

### 事件传播机制与事件代理

监听事件流的两种方式:事件冒泡与事件捕获

一下可以理解为事件传播机制:

- 从最外层元素向内传播,遇到绑定了捕获事件的元素会触发事件

- 找到事件触发元素,触发事件

- 从内向外传播,遇到元素绑定冒泡事件会触发冒泡事件

在使用addEventlistener时,对于第三个参数可以指定 是捕获阶段触发还是冒泡阶段触发

第三个参数可以指定为对象

```
once:true 实现只触发一次事件
passive: 消极的 
```

在事件源对象上,有几个方法,对事件传播有进一步的功效

```
preventDefault: 阻止事件的默认行为
stopPropagation: 禁止冒泡或捕获事件的进一步传播
stopImmediatePropagation: 除了阻止事件的进一步传播,还禁止调用该元素其它的事件监听
```

事件委托原理与实现

主要利用js中的事件监听机制--冒泡机制,将子元素的事件监听放到父元素上,子元素被点击后,事件将随着冒泡阶段传递到父元素上,通过event.target来获取子元素对象.

### 模块化

ES module模块化生命会出现变量提升的

```
import 'A.js'
```



## 数据类型

### 函数

```js
函数的length属性可以返回参数的个数
function f(a, b) {}
f.length // 2
```

#### 为什么函数是一等公民

在js中,把函数当作一种值,可以将这个值赋值给变量,对象属性等,和其它数据类型的地位一致.

```js
function add(a,b){
  return a+b;
}

console.log(add(1,2,3)) // 3 函数的参数如果有多传,并不会出错
```

### 判断数据类型的方法

1. typeof array/null object

   1. ```js
      在js中使用一个未声明的变量是会报3错的。未声明但已经赋值了就不会。
      v; ReferenceError: v is not defined
      但可以使用typeof
      一般在实践中这么使用
      if（typeof v === "undefined"){ xxx } // 利用它来进行条件判断
      ```

      

2. instanceof 

3. Object.prototype.toString 之所以使用原型上的方法,使用如 arr.toString()这样的方法不行,是因为数组\数字等方法将toString方法重写了.

### Object API

1. 创建数组

   1. ```js
      let obj = {};
      let obj = new Object(null/undefined/空); // 返回一个空对象
      
      let obj = new Object('string');  // 自动识别参数的类型并返回相应包装类
      // 上式的结果为object类型
      ```

2. 实例方法

   1. Object.prototype.toString

      ```
      返回一个描述对象的字符串
      特别的,当调用者为Number封装的对象时,返回指定进制数的字符串
      let res = new Number(1).toString()
      console.log(typeof res); // string
      ```

   2. Object.prototype.indexOf

   3. hasOwnProperty 返回对象中是否存在指定属性,继承而来的属性不算.

   4. isPrototypeOf

3. 类方法

   1. 属性描述符

      1. value 属性值 writable  可写 enumerable可枚举(在for in循环中可以访问到) configurable 是否可删除
      2. 使用属性描述符定义对象属性的示例,其中三大属性默认为false

      ```js
      var person = {};
      Object.defineProperty(person,'legs',{
      	value:2,
      	enumerable:true,
      	writable:true,
      	configurable:true
      })
      
      var person = {};
      Object.defineProperty(person, 'legs', {
          set:function(v) {
              return this.value = v;
          },
          get: function(v) {
              return this.value;
          },
          configurable: true,
          enumerable: true
      });
      // 使用get set时,value与writable就会失效
      ```

   2. Object.defineProperties(obj,props)

      1. 可以同时定义多个属性

         ```
         Object.defineProperties({},{
         	'fine':{
         		value:2,
         		enumerable:true
         	},
         	'ooo':{
         	 ...
         	}
         })
         ```

   3. ### Object.create(obj, descr) (ES5)

      该方法主要用于创建一个新对象，并为其**设置原型**，用（上述）属性描述符来定义对象的原型属性。

      ```js
      var parent = {hi: 'Hello'};
      var o = Object.create(parent, {
          prop: {
              value: 1
          }
      });
      o.hi; // 'Hello'
      // 获得它的原型
      Object.getPrototypeOf(parent) === Object.prototype; // true 说明parent的原型是Object.prototype
      Object.getPrototypeOf(o); // {hi: "Hello"} // 说明o的原型是{hi: "Hello"}
      o.hasOwnProperty('hi'); // false 说明hi是原型上的
      o.hasOwnProperty('prop'); // true 说明prop是原型上的自身上的属性。
      ```

      现在，我们甚至可以用它来创建一个完全空白的对象，这样的事情在`ES3`中可是做不到的。

      ```js
      var o = Object.create(null);
      typeof o.toString(); // 'undefined'
      ```

4. 哈哈

5. 啊哈哈

6. 安徽



#### Object.assign

**`Object.assign()`** 方法将所有[可枚举](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/propertyIsEnumerable)（`Object.propertyIsEnumerable()` 返回 true）的[自有](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)（`Object.hasOwnProperty()` 返回 true）属性从一个或多个源对象复制到目标对象，返回修改后的对象。

即从源对象先拷贝所有可枚举的自身的属性到目标对象,返回拷贝后的对象.**会直接改变目标对象**

`Object.assign(target,source)`

### Array API

数组知识,索引访问没有元素的数组会返回undefined,可直接更改没有索引的数组

```js
let arr = []
console.log(arr[3]); // undefined
arr[3] = {};
console.log(arr);	// [ <3 empty items>, {} ]
let arr = [1,2,3,4];  
console.log(arr.length);
delete arr[1];   // 使用delete操作符会把数组元素变为empty,但并不会影响数组长度
// 因此真正删除数组的方法因该是splice
console.log(arr,arr.length);
arr[10] = 11; 
console.log(arr,arr.length);  // 数组元素为empty也算作数组的length
```

数组的length属性变大,相当于为数组扩容了许多的empty空间,变小会被直接截断.

因此清空数组的一个方法就是arr.length=0

ES6新增了哪些数组方法 array.map与forEach的区别

1. 类方法

   1. Array

   2. Array.from `ES6`

      1. 从一个可迭代或者类数组中返回一个浅拷贝的数组

      2. 利用这个方法浅拷贝数组,防止引用传递.除此之外,还可以使用拓展运算符实现浅拷贝

         ```js
         let res = [];
         let path = [1,2,3];
         res.push(path); //引用传递
         res.push(Array.from(path));
         res.push([...path]);  //两种方法解决引用传递
         ```

      3. ```
         Array.from(从哪拷贝,返回的数组每个元素的操作项)
         Array.from([1,2,3],x=>x*2)  //[2,4,6]
         Array.from('xxx') // ['x','x','x']
         ```

      4. ```js
         let newArr = Array.from([1,[1,2,3],3,4],(item,index)=>{
             // return 回去表达式就可以完成数据的更改
           return item+1
         })
         
         console.log(newArr);  //[ 2, '1,2,31', 4, 5 ] 数组加数字会进行强制类型转换
         ```

   3. Array.of `ES6` 不常用

   4. Array.isArray

2. 改变自身的数组方法

   1. pop push shift unshift splice

      1. shift是删除首个,unshift是添加首个,这两个操作比pop与push的操作要慢

      2. splice可以实现添加\删除\替换操作

         ```js
         let arr = [1,2,3,4,5];
         arr.splice(0,1); // 删除 [2,3,4,5]
         arr.splice(1,0,1); // 添加,添加的元素是1 [2,1,3,4,5]
         arr.splice(2,2,'11','22') // 替换两个元素
         console.log(arr); // [ 2, 1, '11', '22', 5 ]
         ```

   2. reverse sort

      1. ```js
         sort方法不传入参数时默认按照字符编码顺序排序
         var arr = [3,2,3,34,12,23,234,84,9];
         arr.sort();
         // 结果: 12,2,23,234,3,3,34,84,9
         
         使用函数时,a-b就是升序,b-a就是降序
         ```

         

   3. fill copyWithin `ES6`

      1. fill(value,start,end) 填充数组

         ```js
         let arr = new Array(100)
         arr.fill(1)
         console.log(arr);
         ```

      2. ```js
         // 浅复制数组的一部分到指定数组位置
         // arr.copyWithin(要复制到的位置,从哪开始复制,复制到哪)
         // 这是一个随意更改数组的API
         const array1 = ['a', 'b', 'c', 'd', 'e'];
         
         // copy to index 0 the element at index 3
         console.log(array1.copyWithin(0, 3, 4)); // Array ["d", "b", "c", "d", "e"]
         
         // copy to index 1 all elements from index 3 to the end
         console.log(array1.copyWithin(1, 3));
         // ['d','d','e','d','e']
         ```

3. 不改变自身的方法

   1. concat join

      1. join用于连接字符串,concat用于合并数组

      2. join以指定的分隔符返回一个以此指定分隔符的字符串

         ```js
         let arr = [1,2,3,4,5]
         let res  = arr.join(",")
         console.log(res);  // 1,2,3,4,5
         ```

   2. slice

   3. indexOf lastIndexOf

   4. toString toLocateString

   5. includes `ES6`

      1. ```
         用于判断数组中是否包括某个值,返回true/false
         ```

4. 数组遍历或检测/筛选方法

   1. forEach map every some filter reduce

      1. reduce 理解为从左到右蒸发,减小这一个过程

         ```
         reduce((previousValue,currentValue,currentIndex,array)=>{},initialValue)
         ```

         **`reduce()`** 方法对数组中的每个元素按序执行一个由您提供的 **reducer** 函数，每一次运行 **reducer** 会将先前元素的计算结果作为参数传入，最后将其结果汇总为单个返回值。

         ```js
         const array1 = [1, 2, 3, 4];
         
         // 0 + 1 + 2 + 3 + 4
         // 当参数中制定了initialValue时,previousValue就会变成initialValue,currentValue就会变成数组的第一个value
         const initialValue = 0;
         const sumWithInitial = array1.reduce(
           (previousValue, currentValue) => previousValue + currentValue,
           initialValue
         );
         
         console.log(sumWithInitial);
         // expected output: 10
         ```

         ```js
         // 没有初始值,直接全部相加即可
         let arr=[1,2,4,8];
         let res = arr.reduce((previousValue,currentValue)=>{
           return previousValue+currentValue
         });
         console.log(res);  //js
         ```


~~~js
  2. some 判断数组中是否至少有一个值满足传入的回调函数

     ```js
     Array.some((value,index,array)=>{})
     [1,2,3].some((value)=>{
     	return value>2
     }) //true
     ```

  3. every 用于判断数组中的所有元素是否满足回调函数,如果满足,返回true/false
  4. forEach不不返回一个数组,只提供遍历的功能. map返回一个新的数组,这样就可以链式调用.同时map的性能要好于forEach
5. map
~~~

   2. entries find findIndex keys values `ES6`

      1. entries 与对象一致,返回一个键值对迭代器,通过.next().value来获取值.值是一个数组

         ```js
         const array1 = ['a', 'b', 'c'];
         
         const iterator1 = array1.entries();
         
         console.log(iterator1.next().value);
         // expected output: Array [0, "a"]
         
         console.log(iterator1.next().value);
         // expected output: Array [1, "b"]
         ```

      2. find 用于返回满足回调函数的第一个元素

         findIndex 返回满足的元素索引

         ```js
         const array1 = [5, 12, 8, 130, 44];
         
         const found = array1.find(element => element > 10);
         
         console.log(found);
         // expected output: 12
         ```

### String API

String.prototype.match

### RegExp

这些模式被用于 [`RegExp`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp) 的 [`exec`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec) 和 [`test`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test) 方法，以及 [`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 的 [`match`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/match)、[`matchAll`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll)、[`replace`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace)、[`search`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/search) 和 [`split`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/split) 方法

### js的基本类型与引用类型

1. 基本类型:number(NaN,Infinity) string boolean null undefined symbol bigint
2. 引用类型:array object function

基本类型保存的是值,引用类型保存的是内存地址,通过保存的内存地址可以找到它的真实的值.当真实的值改变,所有引用这个真实的值都会改变.

```js
var a={};
var b={};
console.log(a===b);  // 这样的比较是false,因为保存的都是内存地址
```

仅仅声明了一个变量但没有初始化时,其值为undefined.声明了变量想让这个变量的值为空时,使用null

**NaN**

主要出现在将字符串解析成数字出错的场合。

```js
let name="cheng";
name = name*2;
// 值为NaN
```

各种包装类型都是一个对象: Number, String, Boolean, Symbol. 有了包装类型的存在,让原始类型调用方法也有了可能`'string'.split()`.js内部先对基本类型进行包装,调用完方法后又变为基本类型

**包装类型**与基本类型产生的类型是不一致的

```js
let str = '11';
let str2 = new String("1");
console.log(typeof str); //string
console.log(typeof str2); // object
```

**numer**

Number.toString(要转换数字成几进制); //将数字类型转换成指定进制的字符串

Number.toFixed(保留的位数); // 格式化操作,要保留几位就保留几位.

**string**

String.charAt(指定的字符索引) 这个方法与使用string[0] 这种索引形式类似

String类型是不能直接更改的,string[0] = '1' 这样是改不了字符串的

因此许多string方法都是返回了一个新的字符串如,toLowerCase() toUpperCase()

string.indexOf(要查找的字符串,从哪一个索引开始查找); 查找不到返回-1

string.includes(是否包含的字符串,从哪一个位置开始找) `ES6` 

一般用slice方法即可

#### 类型转换

一个前提知识:

Object.prototype.valeuOf(),这个方法用于在js类型转换时js自己调用,用于获取对象的值

```js
let obj = new Object();
obj.valueOf() === obj; // true 使用valueOf就相当于获取到了obj
1 + obj // "1[object Object]"
Object.prototype.valeuOf = function(){  // 改写valueOf
	return 2;
}
1 + obj // 3 改写后的结果就是3
```

隐式转换:发生在运算符与函数中,如`console.log()`会隐式的转换成字符串

显式转换(强制转换):多发生在Number String Boolean中

1. Number

   1. ```js
      基本类型
      转换原则:先调用valueOf方法,如果结果是基本类型,直接转换成数字
      如果结果是引用类型,调用toString方法后转换数字
      
      Number({a: 1}) // NaN 对象的toStirng返回 [object Object]
      Number([1, 2, 3]) // NaN // 注意数组的toString方法,返回"1,2,3"
      Number([5]) // 5
      ```

   2. ```js
      基本类型
      // 布尔值：true 转成 1，false 转成 0
      Number(true) // 1
      Number(false) // 0
      // undefined：转成 NaN
      Number(undefined) // NaN
      // null：转成0
      Number(null) // 0
      
      // 相比parseInt,Number的转换要严格很多,一不小心就NaN
      parseInt('42 cats') // 42
      Number('42 cats') // NaN
      ```

2. String

   1. ```js
      原始类型
      清一色的转换字符串
      String(123) // "123"
      String('abc') // "abc"
      String(true) // "true"
      String(undefined) // "undefined"
      String(null) // "null"
      
      引用类型
      先调用toString方法,在调用valueOf方法,如果返回的是一个对象,报错
      String({a: 1})
      // "[object Object]"
      // 等同于
      String({a: 1}.toString())
      // "[object Object]"
      
      String({a: 1}) // "[object Object]"
      String([1, 2, 3]) // "1,2,3"
      
      自然也可以重写toString等
      String({
          toString:function(){
              return 3;
          }
      })
      ```

3. Boolean

   1. ```
      就这几种false变化
      Boolean(undefined) // false
      Boolean(null) // false
      Boolean(0) // false
      Boolean(NaN) // false
      Boolean('') // false
      ```

练习题:

```
1 + true 
1 + null 
1 + undefined  
1 + []
1 + [1] 
1 + [1, 2] 
[1, 2].valueOf() 
[1, 2].toString() 

[]==![] 结果为true

//2//1//NaN//'1'//'11'//'11,2'//[1,2]//'1,2'
```

运算符中的类型转换

1. xx + xx 算数运算符

   ```js
   obj + 2 // "[object Object]2"
   // 对象相加,先把对象转换为原始类型,再进行相加
   //转换为原始类型的方法就是先.valueOf,再toString
   ```

2. 比较运算符 相等运算符

   ```
   [] == ![]
   转换优先级 : 对象->基本类型,基本类型->数字
   等式左边是个对象,转换成基本类型就要经过valueOf与toString,得到的结果是个空字符串,空字符串是个基本类型,转换为数字为0
   右边是个布尔值是个基本类型,转换为数字为0
   因此结果为true
   {} == !{}
   左边的转换为基本类型的结果为'[object Object]'!!!!,再转换为数字为NaN.!!!
   ```

   [关于JS的[\]==![]和{}==!{}_猿林新秀的博客-CSDN博客](https://blog.csdn.net/weixin_46021847/article/details/105299396?ops_request_misc=%7B%22request%5Fid%22%3A%22167377334416800184115487%22%2C%22scm%22%3A%2220140713.130102334..%22%7D&request_id=167377334416800184115487&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduend~default-1-105299396-null-null.142^v71^one_line,201^v4^add_ask&utm_term=[] %3D%3D ![]&spm=1018.2226.3001.4187)



1. number

   1. js内部，数字的存储形式都是浮点数，1== 1.0 （true）

   2. 数字的大小不能超过15位（不能超过2的53次方），超过就会造成精度问题

      ```
      console.log(9007199254740992111);
      // 9007199254740992000 // 超出的部分变成了0
      ```

   3. 可以使用Numer.MAX_VALUE/MIN_VALUE获取最大最小值,比最大值还大的会转换成infinity,比最小还小的会转为0

   4. 0b\0B 二级制 0o 0O 八进制(**octal  ['ɒktəl]**) 0x 0X 十六进制

   5. 1+'1' 还是字符串 "6" / "2" 是个数字

#### 关于类型的全局方法

parseInt(数字,进制) parseFloat(数字) isNaN()

```js
parseInt('123', 5) // 将'123'看作 5 进制数，返回十进制数 38 => 1*5^2 + 2*5^1 + 3*5^0 = 38
parseInt做的是把传入的数看成指定的进制数,然后返回十进制数!!!!
不是把某个数进行进制转换!!!!
```

### 创建对象的几种方式

1. 工厂模式,其实也是一种常见的设计模式

   ```js
   function createObject(name,age){
   	varr obj = new Object();
   	obj.name=name;
   	obj.age=age;
   	obj.fn=function(){
   		console.log('lalala');
   	};
   	return obj;
   };
   ```


### set map weakset weakmap

map与对象类型,也是键值对的形式,但是map的键的类型不止是string或者symbol,可以是任意类型.

set 与 map都是有序的 它们也都可以迭代 能使用for of 遍历. array也可以.object不可以

这种可迭代的方法决定了其元素是有序的,顺序就是for...of迭代出来的顺序

map的底层实现就是哈希表,查找的时间复杂度O(1)

set类似如数组,不过set是不能存在重复元素的.因此可以利用set来进行数组去重

weakset与weakmap的重要特性是,它们都是弱引用

<img src="https://cdn.jsdelivr.net/gh/CXGBro/image-repo/Picgo/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5YWt5Y-26I2Jfg==,size_20,color_FFFFFF,t_70,g_se,x_16.png" alt="img" style="zoom:50%;" />

弱引用是虚假的连接,是手指的指向.一旦连接狗的绳子断了以后,狗就没有了

因此,放入weakset里的对象,一旦外部对它的引用消失,它就会被内存回收.weakset本身对它的引用并没有效果.

weakset里的元素只能是对象,weakmap元素的key也只能是对象.它们没有迭代的能力

#### map与object的区别

1. 键的类型的区别 map 任何类型 object 数字\字符串\symbol这几种
2. map有序,可迭代
3. map性能更好
4. 可以使用相关API获取内容 如map.size等

## 手写实现

### 实现new运算符

```js
function create(fn,...args){
  let obj={};
  Object.setPrototypeOf(obj,fn.prototype);
  // 改变this
  fn.apply(obj,args);
  return obj;
    // 如果构造函数有return,return后面是一个对象,那构造函数就会返回这个对象.否则,返回this对象.
}

function cons(val,num){
  this.val=val;
  this.num=num;

  // 如果这里return了一个东西,就需要做进一步的处理???
    // 这里看不明白,为何要进一步的处理
  return 5;
};

let obj = create(cons,11,22);
// 返回一个新对象
// 原型对象一致
// cons.apply(obj,args)
console.log(obj);
```

### 数组与树形结构转换

数组转树形结构

```js
const data = [
      { id: '01', name: '张大大', pid: '', job: '项目经理' },
      { id: '02', name: '小亮', pid: '01', job: '产品leader' },
      { id: '03', name: '大光', pid: '02', job: '产品经理' },
    ]

    function toTree(rootList, topParent, tree) {
      for (let item of rootList) {
        // 找到当前时刻的最高父节点
        if (item.pid === topParent) {
          tree.push(item)
        }
      }
      // 当走到最后面一层的数据时,tree的内容始终是空的.就不会再递归调用了
      for (let i of tree) {
        i.children = []
        toTree(rootList, i.id, i.children)
        if (i.children.length == 0) {
          delete i.children
        }
      }
      return tree
    }

    let res = toTree(data, '', [])
    console.log(res);
```

树结构转数组

```js
const data = [
  {
    id: 1,
    text: '节点1',
    parentId: 0,
    children: [
      {
        id: 2,
        text: '节点1_1',
        parentId: 1
      }
    ]
  }
]

function TreeToArr(tree) {
  let res=[]
  // 通过闭包访问结果数组,也是深度优先的模板了
  function DFS(tree){
    for(let item of tree){
      if(item.children){
        DFS(item.children)
        // children里面的东西都加入到res数组以后会走到这步
        // 这步就是让children删了防止上层的内容加到res数组时把children也加了进去
        delete item.children
      }
      res.push(item)
    }
  }
  DFS(tree)
  return res
}


let res = TreeToArr(data)
console.log(res);
```

### 实现一个sleep函数

```js
// 使用timeout的回调函数实现,其实就是让某个函数一定时间后才运行
// 因此并不是真正的实现了sleep
function sleep(fn,time){
  setTimeout(()=>{
    fn()
  },time)
}

console.time('time') // 计算脚本的运行时间,传入的参数是label标识符
sleep(()=>console.timeEnd('time'),3000)  //
```

使用promise实现

```js
function sleep(time){
  return new Promise((resolve)=>{
    setTimeout(()=>{
      resolve()
    },time)
  })
}

console.time('time')
sleep(3000).then(()=>{
  console.timeEnd('time')
})
```

### Promise

包括: `then all allSettle race any resolve reject`

axios做的事情,封装异步代码,让异步请求变成线性的方式,而不是看起来结构如此混乱

promise做的事情,解决回调地狱的问题(解决嵌套调用以及合并多个错误处理)

以前我们的异步请求方式为:

封装一个异步函数,请求成功后叫我一声

```js
function axios(config,resolve,reject){
  let xhr = new XMLHttpRequest()
  xhr.onreadystatechange=function(){
    if(xhr.status===200){
      // 回调函数,异步请求完毕后叫我一声
      resolve(xhr.response)
    }else{
      reject(xhr.response)
    }
  }
  xhr.open(config.method,config.url)
  xhr.send()
}

axios({
  method:'get',
  url:'https://www.baidu.com'
},(data)=>{console.log(data)},(data)=>{console.log(data);})
```

有了promise以后,让我们的请求直接返回一个promise对象,这个对象里面传入一个执行器函数,来执行具体的请求.执行器函数有两个参数,resolve与reject,通过这两个参数可以改变promise的状态.状态改变后,可以通过所暴露的then方法来实现回调与链式调用.

```js
function axios(config) {
  return new Promise((resolve,reject) => {
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
      if (xhr.status === 200) {
        // 回调函数,异步请求完毕后叫我一声
        resolve(xhr.response)  // promise里面不用写回调内容,只改变状态就可以了
      } else {
        reject(xhr.response)
      }
    }
    xhr.open(config.method, config.url)
    xhr.send()
  })
}

// promise就是给请求做了一个接口,指明了正确与错误的回调的接口位置
let res = axios({})
res.then((value)=>{  // 成功的回调

},(reason)=>{ 

}).catch((reason)=>{  //失败回调

})
```

由此,promise的两大功能:

1. 不用再使用回调的形式来进行异步请求,请求函数只传入参数即可,不用传入回调,因为回调都在then方法里面书写了
2. 解决了回调地狱的问题(第一点的延申),因为回调都在then里面写了,可以链式调用了,就解决了回调地狱问题

promise就是承诺的意思,承诺未来某一个时间一定会做某一件事

promise进行异步请求后,会把状态与数据保存起来,因此它的回调可以随时执行

他的callback可以拿到结果后再执行,而普通的事件(不使用Promise时)处理回调需要在执行 之前设置好,也就是说你的callback什么时候执行是不确定的

```
// 传统的异步回调
const data = axios.get({url:'http://www.baidu.com'})
data.trim()
```

```js
let promise = new Promise((reslove,reject)=>{
  //main函数
  setTimeout(() => {
    reslove('我是返回的结果')
  }, 1000); //模拟异步操作
}) 
//promise本体主函数执行完操作会拿到结果并保存起来

那么我要什么时候指定回调函数呢？？
想什么时候都可以，甚至可以加一个10s的定时器再指定毁掉函授
setTimeout(() => {
  promise.then(res=>{
    console.log(res);
  },err=>{
    console.log(err);
  })
}, 5000);
//我是返回的结果
```

#### 实现promise的基本功能

```js
// 保存状态常量
const PROMISE_STATUS_PENDING = 'pending';
const PROMISE_STATUS_FULFILLED = 'fulfilled';
const PROMISE_STATUS_REJECTED = 'rejected';

class newPromise {
  // 英文执行器
  constructor(executor) {

    this.status = PROMISE_STATUS_PENDING;

    const resolve = (value) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        this.status = PROMISE_STATUS_FULFILLED;
        this.value = value;
        queueMicrotask(() => {
          this.onFulfilled(this.value);
        })
      };

    };

    const reject = (reason) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        this.status = PROMISE_STATUS_REJECTED;
        this.reason = reason;
        queueMicrotask(() => {
          this.onRejected(this.reason);
        })
      };

    };

    executor(resolve, reject);
  };

  then(onFulfilled, onRejected) {
    this.onFulfilled = onFulfilled;
    this.onRejected = onRejected;
  }


}

// 手写一个promise
// 由此可见,之所以函数里有参数能够让你调用,是因为有人调用了该函数,并且把实参传入了进去
let promise = new newPromise((resolve, reject) => {
  resolve(111);
  reject(222);
})

// 一旦状态改变了,promise就可以调用then方法对返回的值进行处理
// 怎么处理,当然是调用你给传入的函数,也就是你传什么函数,它怎么处理
promise.then(value => {
  console.log(value);
}, reason => {
  console.log(reason);
})
```

#### Promise.all

all就是全部成功,any就是一个成功

all接受一个可迭代元素(Array,Map,Set),返回一个promise对象,对象的状态由传入的元素决定

1. 如果传入的数组的元素promise状态都是fulfilled,返回一个fulfilled状态的promise.内容是一个数组,包含所有成功状态的promise
2. 如果传入的元素包括rejected的状态,返回第一个出现rejected的promise的返回值
3. 如果元素不是一个promise,会调用Promise.resolve()来转换成一个promise

```js
Promise.newPromiseAll = (promises)=>{
  return new Promise((resolve,reject)=>{
    const allValues=[];
    promises.forEach(element => {
      element.then(value=>{
        allValues.push(value);
        if(allValues.length===promises.length){
          resolve(allValues);
        }
      },reason=>{
        reject(reason);
      })
    });
  })
}


const promise1 = Promise.resolve(3);
const promise2 = Promise.resolve(5);  // 如果元素是个数字呢?需要进行判断的.
const promise3 = new Promise((resolve, reject) => {
 reject('你完了')
});
Promise.newPromiseAll([promise1,promise2,promise3]).then(value=>{
  console.log(value);
},reason=>{
  console.log(reason);
})
```

#### Promise.any

all就是全部成功,any就是一个成功

```js
Promise.any = function(arr){
  let err = [];
  return new Promise((resolve,reject)=>{
    arr.forEach(element => {
      element.then(value=>{
        resolve(value);
      }).catch(reason=>{
        err.push(reason);
        if(err.length === arr.length){
          reject(new AggregateError());
        }
      })
    });
  })
}
```

#### Promise.race

race就是竞赛,谁先有返回值就返回对象状态的promise

```js
Promise.myRace=(promises)=>{
  return new Promise((resolve,reject)=>{
    promises.forEach(element => {
      element.then(value=>{
        resolve(value)
      },reason=>{
        reject(reason)
      })
    });
  })
}
```

#### Promise.allSettled

等待传入的所有元素都有了状态以后,才返回一个fulfilled状态的promise,内容为一个数组,数组里面的元素的值为对象.包含了传入的每一个promise的状态与结果

```js
 const promise1 = Promise.resolve(3);
 const promise2 = new Promise((resolve, reject) => setTimeout(reject, 100, 'foo'));
 const promises = [promise1, promise2];

 console.log(Promise.allSettled(promises)); 
```

<img src="https://cdn.jsdelivr.net/gh/CXGBro/image-repo/Picgo/image-20221208161546347.png" alt="image-20221208161546347" style="zoom:50%;" />

```js
Promise.allSettled = function(arr){
  let res = [];
  return new Promise(resolve=>{
    arr.forEach(element => {
      element.then(value=>{
        res.push({status:"fulfilled",value})
      }).catch(reason=>{
        res.push({status:"rejected",reason})
      }).finally(()=>{
        if(res.length === arr.length){
          resolve(res);
        }
      })
    })
    // resolve(res); resolve不能放在这里,因为有可能数组里面的promise还没有得到正确的状态
  })
}
```

### 手写instanceof

instanceof用于~~判断左边的对象是否是右边函数的实例~~  这样的说法有问题

用于判断 右边的构造函数的原型是否在左边对象的原型链上

```js
{} instanceof Object  // true
```

直观的感觉起来就是左边的对象是右边构造函数所制造出来的

```js
function newInstanceof(obj, fn) {
  while (true) {
    // 这里检测到顶层原型null为止,因为上面再也没有原型了
    // 如果仅仅是原型为null,有可能函数的原型也为null,这会少检测一次原型为null的情况
    if (obj === null) {
      return false;
    }
    if (obj.__proto__ === fn.prototype) {
      return true;
    }
    obj = obj.__proto__;
  }
}

console.log(newInstanceof({},Object));
```

```js
function newInstanceof(obj,fn){
  let fnPro = fn.prototype
  while(true){
    if(obj==null) return false
    if(obj=fnPro) return true
    obj = Object.getPrototypeOf(obj)
  }
}
```



### 手写Array.filter

```js
Array.prototype._filter=function(fn){
                let newArray = []
                this.forEach((item,index,array)=>{
                    if(fn(item,index,array)){
                        newArray.push(item)
                    }
                })
                return newArray
            }
```

### 手写Array.map

先想,这个东西是干什么用的?(注意是直接修改原数组还是返回一个新的数组?)

```js
Array.prototype._map=function(callback){
                let res=[];
                 this.forEach((item,index)=>{
                     res.push(callback(item));
                 })
                return res;
            }
```

### 手写用计时器实现每一秒输出一个值

```js
1.闭包
for(var i=0;i<100;i++){
	(function(i){
		setTimeout(()=>{
			console.log(i)
		},i*1000)
	})(i)
}
2.块级作用域
```

### 手动封装一个ajax

```

```

### 实现call apply bind

相较于call与apply,bind的方法在于return一个函数供调用,在调用的过程中把this改变并删除

```js
function test(hahaha,lalala){
  console.log(this,hahaha,lalala);
}

Function.prototype.newBind=function(thisArg,...args){

  // 这一层是返回函数后调用的参数位置
  let bindFunc=()=>{
    thisArg.fn=this;
    // 这一层是在调用newBind方法时就要传入的参数
    thisArg.fn(...args);
    delete thisArg.fn;
  }
  return bindFunc
}

let res = test.newBind({age:18},'hahaha')
res();
```

```js
function test(a,b){
  console.log(a,b);
}

let obj={
  a:'xxx',
  b:'yyy'
}

Function.prototype.newCall = function(thisArg,...args){
  thisArg.fn=this
  thisArg.fn(...args)
  delete thisArg.fn
}

Function.prototype.newApply = function(thisArg,args){
  thisArg.fn=this
  thisArg.fn(...args)
  delete thisArg.fn
}

Function.prototype.newBind = function(thisArg,...args){
  let bindFunc=()=>{
    thisArg.fn=this
    thisArg.fn(...args)
    delete thisArg.fn
  }
  return bindFunc
}
console.log("1",test.newCall(obj,222,333));
console.log("2",test.newApply(obj,[222,333]));
console.log("3",test.newBind(obj,222,333)());
```

### 手写拍平flat

1. 遍历数组中的每一个元素,如果是非数组元素直接进入结果数组
2. 如果是数组元素,并且可递归的次数大于等于零,进行一次递归操作,并将递归操作的返回值合并到结果数组中
3. 每进行一次递归,就要将可递归次数减1

```js
// 使用数组类方法API判断是否为数组
// concat方法不会改变原有数组,而是返回一个新的数组

const arr = [1, [2, [3,4,[5,8]]],  [6, 7]]
Array.prototype.newFlat = function (deep=1) {
  let res = []
  deep-- // 放在这里可以真正的控制递归的次数
  for (let i of this) {
    if (Array.isArray(i) && deep>=0) {
      // deep-- 把deep放到这里,deep决定了拍平一层的次数,每拍一次次数减少一次
      res = res.concat(i.newFlat(deep))
    } else {
      res.push(i)
    }
  }
  return res
}

let res = arr.newFlat()
console.log(res
```

ES6

```js
// some用于判断数组中是否至少有一个元素通过了提供的函数测试
function flatten(arr) {
  while (arr.some(item => Array.isArray(item))) {
    // 注意这里的解构赋值,111先放进数组里,222,[333]再放进数组里
      arr = [].concat(...arr);
      //此外,这里每一次赋值都直接改变了数组原值,否则就会进入死循环
  }
  return arr;
}

let arr =[111,[222,[333]]];
console.log(flatten(arr));
```

### 防抖节流

防抖,不管有几次请求,最终只执行最后一次.防抖第一次点击也需要等待一段时间后才执行

节流,每隔一段时间以后都会发送一次请求.节流第一次点击就会立即执行

防止手抖,如果在限定时间内有一次发送请求,就停止这次请求,重新计时直到设定的时间

```js
  // 防抖最终是一种函数,封装要防抖的东西
    function debounce(fn, wait) {
      let timer;
      
      let _debounce = (...args) => {
          clearTimeout(timer);
          timer = setTimeout(() => {
            fn(...args);
          }, wait)
      }
      // 我们的函数的最终目的就是返回一个防抖函数
      // 让用户在click时运行这个防抖函数
      return _debounce
    }

    let input = document.querySelector('input');

    // debounce是window调用的
    // 调用以后返回的_debounce函数是button调用的
    // 因此_debounce函数可以接收到event事件对象
    input.addEventListener('input', debounce((event) => {
        console.log('发送成功!',event.target.value);
    }, 1000));
```

节省流量,规定时间内只能发送一次请求

核心原理是使用计时来操作

现在的时间减去开始的时间大于间隔时间时进行一次请求,同时注意第一次请求直接发出来

```js
const input = document.querySelector('input')


    function newThrottle(fn, interval) {
      let startTime = 0;
      const _throttle = function () {
        let nowTime = new Date().getTime();
        if ((nowTime - startTime) >= interval) {
          fn();
          startTime = nowTime;
        }
      };
      return _throttle
    }

    let counter=0;
    input.addEventListener('input', newThrottle(() => {
      console.log('循环了'+counter);
      counter++;
    }, 3000))

// 阮一峰方式
function throttle(fn, wait) {
  var time = Date.now();
  return function() {
    if ((time + wait - Date.now()) < 0) {
      fn();
      time = Date.now();
    }
  }
}
window.addEventListener('scroll', throttle(callback, 1000));
```

使用定时器实现

```js
const button  = document.querySelector('.button')

    button.addEventListener('click',throttle(()=>{
      console.log('已发送')
    },3000))
    
    function throttle(fn, time) {
      let timer
      let throttleFunc = (...args) => {
        if (!timer) {  // 判断定时器是否存在,如果已经存在了,就不要执行下去了.如果不存在,执行
          timer = setTimeout(() => {  
            fn(...args)
            timer = null  //执行完了记得把定时器取消掉
          }, time)
        }
      }
      return throttleFunc
    }
```



### 封装一个cache工具类

```js
class Cache{
  setCache(key,value){
    localStorage.setItem(key,value);
  };

  getCache(key){
    return localStorage.getItem(key);
  }

  removeCache(key){
    localStorage.removeItem(key);
  }
}

let cacheUtil = new Cache();
```

### 深浅拷贝

#### 浅拷贝的实现

使用object.assign

```
该方法传入多个参数,一个target对象,多个source对象.用于从一个或多个源对象中把所有可枚举(enumerable)且为自身(hasOwnProperty)的属性复制到目标对象中
```

除此之外,使用展开运算符可以轻松实现浅拷贝

```js
// 这是两种浅拷贝方式
let obj={
  name:''
}

const res = Object.assign({},obj);
const res2={...obj};

console.log(res);
console.log(res2);
```

#### 深拷贝

深拷贝最简单的实现就是json,但有很多问题

好一点的方法是使用lodash的深拷贝函数

这里手写一个没有考虑太多边界条件的深拷贝

```js
let obj={
  name:'cheng',
  age:[111,222],
  hahah:{
    wawawa:'111',
    cacaca:[555]
  }
}

function isObject(item){
  return Object.prototype.toString.call(item)==='[object Object]';
}

function deepCopy(obj){
    // 非常经典的递归调用,这里要注意考虑到递归必须要return回去,if的判断写在前面而不是for里面
  if(!isObject(obj)){
    return obj;
  }

  let copyObj = {};
  for(let key in obj){
    copyObj[key] = deepCopy(obj[key]);
  }
  return copyObj
}

const res = deepCopy(obj);
console.log(res);
```

### 观察者模式

目标对象:

- 维护观察者列表
- 告知观察者状态更新

观察者:

- 更新自己的状态

目标对象 `Subject`:

- 维护观察者列表 `observerList` ———— 维护拥有订阅权限的弟子列表
- 定义添加观察者的方法 ———— 提供弟子购买订阅权限的功能
- 当自身发生变化后，通过调用自己的 `notify` 方法依次通知每个观察者执行 `update` 方法 ———— 发布对应任务后通知有订阅权限的弟子

观察者 `Observer` 需要实现 `update` 方法，供目标对象调用。`update`方法中可以执行自定义的业务逻辑 ———— 弟子们需要定义接收任务通知后的方法，例如去抢任务或任务不适合，继续等待下一个任务

```js
class TargetObject {
  constructor() {
    this.ObserverList = []
  }
  addObserver(observer) {
    this.ObserverList.push(observer)
  }
  notify() {
    this.ObserverList.forEach(item => {
      item.update()
    })
  }
}

class observer {
  update() {
  }
}
```

### 发布订阅模式

利用构造函数,创建一个观察者来观察是否有

- 发布者（Publisher）发布该事件（Publish Event）到调度中心，也就是事件触发

- 调度中心(Event Channel)也就是中介,负责任务订阅管理,提供订阅功能,发布订阅任务

- 订阅者（Subscriber）把自己想订阅的事件注册（Subscribe）到调度中心（Event Channel）


[观察者模式 vs 发布订阅模式，千万不要再混淆了 - 掘金 (juejin.cn)](https://juejin.cn/post/7055441354054172709#heading-3)

订阅者

```js
class EventChannel{
  constructor(){
    this.events={}
  }
  subscribe(type,callback){  // 在eventbus中,on就是订阅,emit就是发布
    if(!this.events[type]){
      this.events[type]=[callback]
    }
    this.events[type].push(callback)
  }
  publish(type,...args){
    this.events[type].forEach(element => {
      element(...args)
    });
  }
}

let eventChannel = new EventChannel();
eventChannel.subscribe('warname',()=>{
  console.log('warname');
})
eventChannel.publish('warname')
```

```js
class EventChannel{
  constructor(){
    this.events={}
  }
    // 发布事件是往里推送
  on(type,callback){
    if(this.events[type]){
      this.events[type].push(callback)
    }else{
      this.events[type]=[callback]
    }
  }
    // 订阅事件是调用
  emit(type,...args){
    if(!this.events[type]) return
    for(let i in this.events[type]){
      i(...args)
    }
  }
  // 用于取消发布事件
  off(type,callback){
    if(!this.events[type]) return
    if(!callback){
      this.events[type] = undefined
    }
    this.events[type] = this.events[type].filter(item=>item!==callback)
  }
}
```

## 基础练习题

### 作用域与箭头函数的练习题

```js
var a=10;
function b(){
    a = 100;
    return ;
    function a() {}
}
b();
console.log(a)

var resource = ["a.png","b.png","c.png"];
for(var i = 0;i < resource.length;i++){
  var img = new Image();
  img.src = resource[i];
  img.onload = function(){
    console.log(i);
  }
}
// 3 3 3 
```

```
var obj = { a: 10, b: 0};
console.log(obj ?. b) // 0
console.log(obj.b ?? obj.a) // 0

```



### 代码输出题

```js
function Foo() {
  var a = 0
  return function() {
    console.log(++a) // 如果这里是a++结果就是 0 1 0
  }
}

var f1 = Foo()
var f2 = Foo()
f1() // 1
f1() // 2
f2() // 1

function increment(a) {
  a = 1
}

var a = 0
increment(a)

console.log(a) //0


function increment(a) {
  a = {
    n: 2
  }
}

var a = {
  n: 1
}
increment(a)

console.log(a) //{n: 1}


function increment(a) {
  a.n = 3
}

var a = {
  n: 1
}
increment(a)

console.log(a) //{n:3}

setTimeout(function () {
  console.log('1')

  new Promise((resolve, reject) => {
    console.log('2')
    resolve()
  }).then(() => {
    console.log('3')
  })
})

new Promise((resolve, reject) => {
  console.log('6')
  resolve()
}).then(() => {
  setTimeout(function () {
    console.log('7')
  })
  console.log('8')
})

console.log('4')

setTimeout(function () {
  console.log('5')
})
// 64812357

[1, 2, 3].map(parseInt) // parseInt会在被调用的时候传入值
//第一次调用parseInt(1,0,[1,2,3]) //注意parseInt只能传入2-36范围内的数字.传0或不传会自动推算,传其他的都会为NaN 因此第一次调用会返回 1
// 第二次调用parseInt(2,1) NaN
// 第三次调用parseInt(3,2) 将3看成二进制进行转换出错,返回NaN

parseInt(10, 2) // 2
```

```
    function Foo() {
      // 没有用this赋值,构造函数上的内容并不会添加到实例对象上
      getName = function () { alert(1); };
      return this;
    }
    Foo.getName = function () { alert(2) };
    Foo.prototype.getName = function () { alert(3) };
    var getName = function () { alert(4) };
    function getName() {
      alert(5);
    }
    Foo.getName(); // 2
    getName(); // 4
    Foo().getName(); // 1
    getName(); // 1
    new Foo.getName(); // 2
    // 括号会优先执行,new后面跟的是构造函数,因此执行顺序是:
    // (new Foo()).getName()
    new Foo().getName(); // 3
    // (new (new Foo()).getName)() // 可以理解为new先找函数,而不是先运算完整个表达式
    new new Foo().getName(); // 3
```



### 遍历对象的方法

Object.getOwnPropertyNames(obj)

```js
for...in 遍历所有的可枚举属性,(注意包括继承而来的属性)
keys方法 只遍历自己身上的可枚举属性
getOwnPropertyNames 这个方法依然返回一个属性名组成的数组,注意其返回包括可枚举属性与不可枚举属性都有
还有一个配套方法,用于返回对象身上的symbol
getOwnPropertySymbols
```

keys values entries for...in

Reflect.ownKeys()

`Reflect.ownKeys()`返回的是一个大杂烩数组，即包含了对象的所有属性，无论是否可枚举还是属性是symbol，还是继承，将所有的属性返回

```css
let arr = [0,31,2]
Reflect.ownKeys(arr) // ['0', '1', '2', 'length']
复制代码
```

上面的例子声明了一个数组，返回的是数组下标和`length`属性。

### 判断对象是否是一个空对象

空对象的判断要根据空对象判断的标准,如是否可枚举,是否包括symbol,是否包括继承属性等

```js
1. for...in遍历对象,如果
2. if(Object.keys(obj).length === 0){
	console.log('是个空对象')
}
3. if(JSON.stringify(obj) === '{}'){
	console.log('是个空对象')
}

let obj = {}
Object.defineProperty(obj,'a',{
  value:2,
  enumerable:false
})
console.log(JSON.stringify(obj)); //stringify也是没办法判断不可枚举的对象的

4. if(Object.getOwnPropertyNames(obj).length === 0){
	
}
```



### 使用promise实现一个红绿灯

```js
function lights(light, time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(light);
      resolve();
    }, time)
  })
};

function xun() {
  lights('红灯', 3000).then(() => {
    lights('黄灯', 1000);
  }).then(() => {
    lights('绿灯', 2000);
  }).then(() => {
    xun();
  })
}

xun();
```

### 给一个数组,返回第一个比当前数大的坐标

题目：给定一个整型数组，数组元素随机无序的，要求打印出所有元素右边第一个大于该元素的值。如数组A=[1,5,3,6,4,8,9,10] 输出[5, 6, 6, 8, 8, 9, 10, -1] 如数组A=[8, 2, 5, 4, 3, 9, 7, 2, 5] 输出[9, 5, 9, 9, 9, -1, -1, 5, -1]

```js
let A =[8, 2, 5, 4, 3, 9, 7, 2, 5]

function returnMax(arr) {
  let max
  let res = []
  for (let i = 0; i < arr.length; i++) {
    max = arr[i]
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] > max) {
        max = arr[j]
        break
      }
    }
    if(max===arr[i]) res.push(-1) 
    else res.push(max)
  }
  return res
}

console.log(returnMax(A));
```

### 实现一个before函数

手写实现一个before函数，before(num,fn)接受两个参数，第一个参数是数字，第二个参数是函数，调用before函数num次数以内，返回与fn执行相同的结果，超过num次数返回最后一次fn的执行结果。

```js
function before(num, fn) {
  let count = 0
  let beforeNumRes
  return function (...args) {
    if (num > count) {
      beforeNumRes = fn(...args)
    }
    count += 1
    return beforeNumRes
  }
}

let func = before(3, (a, b) => a + b)
console.log(func(1, 2));
console.log(func(2, 3));
console.log(func(1, 6));
console.log(func(1, 8));
```



### 利用proxy实现数组的负向索引

```js
let arr= [1,2,3,4]
let proxy = new Proxy(arr,{
  get(target,key){
    // 获得的key是一个字符串!!!
    console.log(typeof key); // string
    if(key<0){
      return target[target.length+parseInt(key)] // 也可以使用key*1,相乘以后就进行了类型转换
    }
    return target[key] // 这里没有进行类型转换就得到了正确的结果,可见数组直接传入单个字符串也是可以获得正确结果的
  }
})
console.log(proxy[-2]);
console.log(proxy[2]);
console.log(arr['2']); // 传入字符串也得到了正确的结果
```



### JS实现简单的路由

利用a标签进行链接跳转,然后监听链接地址的变化.

注意链接地址前必须加上#,否则就会被浏览器认为是服务器请求,会造成页面刷新

### 找出数组的最大值

```js
// 找出数组的最大值
let arr = [5,2,7,9]
// let res = Math.max(...arr)
// let res = arr.sort()[arr.length-1]
let res=arr[0]
for(let i=0;i<arr.length;i++){
  if(arr[i]>res){
    res = arr[i]
  }
}
console.log(res);
```

### 输入1-10000范围内的回文子串

```js
function findNum(start,end){
  let res=[]
  for(let i=start;i<end+1;i++){
    if(i<10) continue
    let str = String(i) // !!!注意生成字符串时,使用new与不使用new的区别
    let trans = str.split("").reverse().join("")
    if(trans === str){
      res.push(i)
    }
  }
  return res
}

let res = findNum(1,10000)
console.log(res);
```

### 构建一个可以链式调用的计算器

```js
class Math{
  constructor(number){
    this.number = number
  }
  add(...args){ // 由此可见,args这种长变量是一个数组,...代表着对这个数组进行解构赋值
    this.number += args.reduce((previousValue,currentValue)=>{
      return previousValue + currentValue
    })
    return this 
  }
  minus(...args){
    this.number -= args.reduce((previousValue,currentValue)=>{
      return previousValue + currentValue
    })
    return this
  }
  times(...args){
    this.number *= args.reduce((previousValue,currentValue)=>{
      return previousValue * currentValue
    })
    return this
  }
}

let math = new Math(1)
let res = math.add(2,4).minus(3).times(2);
console.log(res);
```



### 生成随机不重复数组

```js
// 生成一个不重复的数组
function randomUniqueArr(min, max, length) {
  if ((max-min+1)<length) return false // 如果可生成的数字范围没有整个数组长度大,直接拒绝
  let arr = []
  let random
  while (arr.length < length) {
    random = Math.floor(Math.random() * (max + 1 - min)) + min  // 数字随机了,但是数组可能出现重复
    if (arr.indexOf(random) === -1) { // 当且仅当random不存在的时候才将random加入数组
      arr.push(random)
    }
  }
  return arr
}

let res = randomUniqueArr(1, 50, 50)
console.log(res);
res.sort(function(a,b){  // sort方法传入一个函数,如果return是一个大于0的数,(说明a>b).b在a的前面(说明降序排列).否则相反
  return a-b    // 这里的大于0还是小于零指的是排序以后的结果 简单记忆:a-b升序 b-a降序
})
console.log(res);
```



### 随机生成指定范围内的整数

```

```



### 构造一个100个0的数组

```
let arr = [];
for (let i = 0; i < 10; i++) {
  arr.push(0);
}
console.log('1', arr);

// fill以指定索引填充数组
// fill不会改变原数组
// 原型上的方法即实例方法是供这个数组实例调用的,而静态方法是让数组对象调用的

console.log(Array(10).fill(0));

// from返回一个传入的可迭代对象或类数组的浅拷贝实例,
// 可传入第二个参数作为每一个参数的回调,其实就是再调用了一次map方法
// 它不会改变原数组
let arr3 = [];
console.log(Array.from({length:10},item=>0));
```

### 二维数组

```
let arr = new Array(3)
for (let i = 0; i < arr.length; i++) {
  arr[i] = new Array(4).fill(0)
}
console.log(arr);

// [
//   [0, 0, 0, 0],
//   [0, 0, 0, 0],
//   [0, 0, 0, 0]
// ] 
// 把生成的数组想象成这个样子,就能理解第一层的元素是行,第二层的元素是列了

```



### 如何将一个类数组转换为普通数组

```JS
let likeArray = {length:3};
let trans = Array.from(likeArray);
console.log(trans);

// 同样是遍历输出,使用拓展运算符会报错,因为拓展运算符只能适用于iterable元素
let likeArray = {length:3};
let trans = [...likeArray];
console.log(trans);

// 可以想到的普通做法
// 这里keys与values方法都返回一个数组
// 注意!entries返回的是一个二维数组,且每一个子元素均为数组的键值对;
// let obj={
// 	oneArr:[111,222,333],
// 	twoArr:[444,555,666]
//}
//[ [ 'oneArr', [ 111, 222, 333 ] ], [ 'twoArr', [ 444, 555, 666 ] ] ]
// 
let likeArray = {length:3};
let trans =[];
let key = Object.keys(likeArray)
let value = Object.values(likeArray)

for(let i=0;i<key.length;i++){
  trans.push(key[i]);
}

console.log(trans);

let likeArray = {
  0:0,
  1:1,
  2:2,
  length:3
};

// 使用数组方法可以转化,但如果直接调用会导致找不到相应的方法
const res = Array.prototype.slice.call(likeArray);
console.log(res);

let likeArray = {
  0: 0,
  1: 1,
  2: 2,
  length: 3
};

// 使用数组方法可以转化,但如果直接调用会导致找不到相应的方法
// const res = Array.prototype.slice.call(likeArray);
// console.log(res);

// 然后我这里使用不同的数组API,注意这里的使用特性
// const res = Array.prototype.concat.apply([],likeArray);
// console.log(res);

// 除了数组API,也别忘记了构造函数,其实这也算是API的一部分
const res = Array.apply(null, likeArray);
console.log(res);
```

### 稀疏数组

```js
// 稀疏数组是一个纯纯的空数组,注意不是元素为undefined的数组
// 为空的数组是不能使用map方法的,但元素为undefined是可以使用的
Array(10);
Array(10).map(item=>1); // 这不会改变数组,因为数组还是空的

// 构造100
console.log(Array(10).fill(1));

// 使用from进行迭代的过程中说明其把empty转换成了undefined
// 此时使用map方法是可以的
console.log(Array.from(Array(10),item=>1));
```

### Offset

<img src="https://cdn.jsdelivr.net/gh/CXGBro/image-repo/Picgo/image-20221223122309231.png" alt="image-20221223122309231" style="zoom:50%;" />

也可以使用getBoundingClientRect()来获取元素的位置



## Web API

### target与currentTarget

target是事件发生的元素,currentTarget是事件绑定元素

```
<a onClick="xxx">
    <span>target1</span>target2
</a>
```

点击span,target是span,currentTarget是a

### storage

window.localStorage/sessionStorage

setItem getItem removeItem clear

storage相比cookie存储容量大了很多,但是也和cookie一样,受到同源策略的限制.

### cookie

如果服务器希望生成cookie,就会回复一个Set-cookie的字段.里面说明了要设置的cookie是什么,以及cookie的相关属性,包括

- 名字
- 值
- 到期时间: expires max-age
- 所属域名: domain 下次请求的域名包括domain时,浏览器会带上cookie请求.
- 生效路径(一般为当前网址) :path
  - 用户访问网址`www.example.com`，服务器在浏览器写入一个 Cookie。这个 Cookie 的所属域名为`www.example.com`，生效路径为根路径`/`。如果 Cookie 的生效路径设为`/forums`，那么这个 Cookie 只有在访问`www.example.com/forums`及其子路径时才有效。以后，浏览器访问某个路径之前，就会找出对该域名和路径有效，并且还没有到期的 Cookie，一起发送给服务器。
- Secure HttpOnly SameSite



[浏览器模型 - Cookie - 《阮一峰 JavaScript 教程》 - 书栈网 · BookStack](https://www.bookstack.cn/read/javascript-tutorial/docs-bom-cookie.md)

### 不同tab页之间如何进行数据通信

1. localStorage
   1. 一个页面监听localStorage的变化,存储变动后立即调用存储获得结果
   2. 会受到同源策略限制
2. webworker
   1. 先单独写一个worker,监听message事件.其实这里worker就是一个中介
   2. 在两个页面中分别监听worker,如果想要发送数据通过worker.postMessage方法来发送.另一个页面就会监听事件触发,就能拿到这个数据
   3. 会受到同源策略限制
3. websoket
   1. 利用服务器作为一个中介,页面A的数据通过服务器发给页面B,反过来也一样可以.