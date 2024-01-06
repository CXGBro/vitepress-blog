> **本文参加了由**[公众号@若川视野](https://link.juejin.cn/?target=https%3A%2F%2Flxchuan12.gitee.io "https://link.juejin.cn/?target=https%3A%2F%2Flxchuan12.gitee.io") **发起的每周源码共读活动，** 

> 【若川视野 x 源码共读】第19期 | axios 工具函数。

这篇文章没有按照直接贴上源码来分析的方式去写,主要原因是原文章中已经分析的很详细了;另一方面,感觉通过问答的方式思考问题学习效果更好.

这次通过回答问题的方式来巩固自己的学习成果.

# 来自@NewName的问题:
看完源码,又看到了评论区有大佬抛出问题.
感觉这些问题和自己阅读源码时遇到的问题很相似,故用这些问题来检验自己的学习成果.

## 1.js中如何判断变量属于哪种引用数据类型（例如：Array, Function等）
使用instanceof方法

```js
[] instanceof Array;  // true
{} instanceof Object;  // true
```
## 2.如何判断变量是否为文件（File)?

```js
Object.prototype.toString.call(file) == '[object File]'
```
## 3.是否了解Buffer,ArrayBuffer?
待补充
## 4.如何判断变量是否为FormData？
FormData用来以键值对的形式发送表单数据.

```js
    // 利用构造函数来创建实例
    var formData = new FormData();
    // append添加数据
    formData.append(key,value);
    // 通过ajax来发送数据
    var request = new XMLHttpRequest();
    request.open('GET','https://www.baidu.com');
    request.send(formData);
```

判断方法为:
- 使用instanceof
- 使用Object.prototype.toString.call方法

```js
    formData instanceof FormData //true
    Object.prototype.toString.call(formData) //[object FormData]
```
## 5.如何使用正则去掉字符串中的空格？
字符串中的trim方法可以去除首尾中指定的字符.

源码中的正则表达式用来去除字符串首位的空白字符:

```js
str.replace(/^\s+|\s+$/g, '');
```
若想去除字符串中的所有空格,直接匹配`\s`即可

```js
const str = ' 1  2  3 ';
const regex = /\s/g;

console.log(str.replace(regex,''));  // '123'
```

## 6.编写一个既可以遍历数组又可以遍历对象的方法？

直接看源码遍历的方法:
```js
function forEach(obj, fn) {
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  if (typeof obj !== 'object') {
    obj = [obj];
  }

  if (isArray(obj)) {
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}
```
1. 传入为null与undefined类型不做遍历
2. 非对象类型包裹一层数组(转换成数组)
3. 如果类型为数组,直接for循环遍历,每次循环调用传入的函数fn
4. 如果类型为对象,先进行if判断.for...in是可以遍历到对象原型上的属性的,语句`Object.prototype.hasOwnProperty.call(obj, key)`可以防止遍历到对象原型上的属性.然后进行函数调用.

## 7.如何合并可变个数的对象？
看源码:

```js
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }
  
  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}
```
1. 遍历传入的每一个参数,调用`forEach`方法;相当于每一个传入的对象都调用了`assignValue`方法.(在forEach方法中,默认为assignValue函数传入参数,此时参数val为对象属性值,key为对象属性名)
2. 如果result结果为空,且val为对象,进行递归,以原result为基本
3. 如果result结果不为空,且val为对象,以空对象为基本
4. 如果是数组,使用slice来返回新数组
5. 如果是其它类型,直接赋值
## 8.js中如何对数组进行深拷贝都有哪些方法？（slice(), 参见merge函数实现步骤）
感觉这个问题问的是: 如何防止数组产生引用传递?

```js
result[key] = val.slice();
```
数组的slice方法将返回一个浅拷贝后的新数组,如果直接将数组赋值给对象,将会造成`引用传递`,使用slice方法可以解决这个问题.