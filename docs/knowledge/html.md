---
outline: deep
---
# HTML

## html标签使用大写

按规范来说应该小写,但大写也没问题.

## meta标签有哪些

```html
<meta http-equiv="" content=""> // 就是一个标签,不用自闭和
equiv = equivalent a. 等量的,相当的 [ɪˈkwɪvələnt
用于添加一些请求头信息,比如
<meta http-equiv="charset" content="iso-8859-1">  // 添加charset与expires请求头信息
<meta http-equiv="expires" content="31 Dec 2008">

<meta name="" content="">
name用于告知浏览器一些信息,各个厂商有不同的规范
<!-- 页面关键词 keywords -->
<meta name="keywords" content="your keywords">
<!-- 页面描述内容 description -->
<meta name="description" content="your description">
<meta name="renderer" content="webkit"> // 360浏览器可以识别到这个网站是webkit内核
<meta name="viewport" content="width=device-width, initial-scale=1.0"> // 控制网页布局
content 参数：

width viewport 宽度(数值/device-width)
height viewport 高度(数值/device-height)
initial-scale 初始缩放比例
maximum-scale 最大缩放比例
minimum-scale 最小缩放比例
user-scalable 是否允许用户缩放(yes/no)

// 特殊列子,字符集
<meta charset="utf-8">
```

[meta标签的作用及整理_阿Q虾米的博客-CSDN博客](https://blog.csdn.net/yc123h/article/details/51356143)

## src与href的区别

两者都是请求外部的文件,src会将请求到的文件内容添加到html文件里,同时src会堵塞文件的加载,其实就是同步加载

href则仅仅建立外部文件与html文件之间的一种链接,href不会堵塞文件的加载,其实也是异步加载吗?不一定

## link与@import的区别

link为异步加载,@import是同步加载

@import会嵌入内容到html中,link则不会

## HTML语义化标签

```
article
header
aside
main
footer
nav
section
除此之外,还有
table,form等
```

## DOCTYPE的意义

告知浏览器使用哪一种文档类型定义来解析文档

在HTML5中,直接声明即可

## defer与async的区别以及type="module"

两者都可以异步请求资源,防止文档读取的堵塞

`defer`与`async`的区别是：`defer`要等到整个页面在内存中正常渲染结束（DOM 结构完全生成，`DOMContentLoaded` 事件被调用**之前**,以及其他脚本执行完成），才会执行；`async`一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染。一句话，`defer`是“渲染完再执行”，`async`是“下载完就执行”。另外，如果有多个`defer`脚本，会按照它们在页面出现的顺序加载，而多个`async`脚本是不能保证加载顺序的。

除此之外,`<script type="module">`这种形式就是为了至此es6模块化的js文件,如果js文件使用了模块化,就要加上这个字段

## HTML5新增了哪些东西

1.语义化标签 2.本地存储 3.媒体标签 4.canvas 5.history API 6.websocket通信协议

## 介绍一下webworker

## 块级元素与行内元素

块级: div ul ol p h1-h6

行内元素: span img a