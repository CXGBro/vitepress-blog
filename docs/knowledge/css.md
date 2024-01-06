# CSS

## @import与link

@import会等到html完成后才会进行加载

link则会阻塞html的加载,等link加载完

## CSS怎么设置小于12px的字体

## 几种让元素看不见的方法

- `display:none`不会渲染该元素，元素消失，不占位，会造成浏览器的回流与重绘
- `visibility:hidden`元素消失，占位，会造成浏览器的重绘,原有的元素行为(如点击事件)不会触发
- `opacity: 0`透明度为0，元素看不见，占位，不会引发回流，一般情况下也会引发重绘.原有的元素行为(如点击事件)不会被触发

## @font-face

用于定义一种字体,字体文件可以来自本地,也可以来自远程.

来自远程的字体依然受到跨域的影响

## 块级元素的特点

块级元素的**宽度占用了整个水平空间**,因此宽度不由内容自己决定.高度有内容自己决定

## 元素属性的继承

css中有的元素可以继承,有的不可以,要想实现元素继承,在属性中配置inherited

## 选择器

类 id 通配符 伪类 伪元素

1. 属性

   1. ```css
      a[href="www.baidu.com"]  // 选取a标签中指定属性为href的选择器
      div[class~='important']  // 选取div标签中class中包含属性important
      // ~波浪号是不完全选择 需要根据属性值中的词列表的某个词进行选择，则需要使用波浪号（~）。
      ```




### 权重问题

不同的选择器会有不同的权重,权重越大,意味着选择器属性的渲染优先级越高.

 !important>行内样式>id>类 属性 伪类>标签 伪元素>通配符选择器

权重问题是基于层叠性而来,

!important：10000  内联样式：1000  id选择器：100  类选择器、属性选择器、伪类：10  元素选择器、伪元素：1  通配符：0

## 左侧固定,右侧自适应

flex:

```css
.main{
      display: flex;
    }
    .left{
      background: red;
      width: 300px;
      /* 内容超出主轴的时候这一部分不会被压缩 */
      flex-shrink: 0;
    }
    .content{
      background-color: blue;
      /* 占满整个剩余部分 */
      flex-grow: 1;
    }

  <div class="main">
    <div class="left">左侧</div>
    <div class="content">右侧</div>
  </div>
```

grid:

```css
.main{
      display: grid;
      // 左边占300px 右边占所有的比例
      grid-template-columns: 300px 1fr;
    }
```

float+BFC

```css
.left{
      background: red;
      /* 让其脱离标准流,触发BFC,此时右侧的内容在左侧块的下面 */
      float: left;
    // 这里使用display:absolute也一样,
      width: 300px;
    }
    .content{
      background-color: blue;
      /* 触发BFC,右侧也有了BFC,右侧就不会跑到左侧块的下面,右侧内容换行时也会在右侧的范围内*/
      // 自然这里使用margin来拉开距离也是可以的,但并不好margin-left: 200px;
      overflow: hidden;
    }
```

## 清除浮动的方法:

1. clear属性,将标准流(文档最上面的元素)移动到所有浮动元素的下面

   实际操作中通过添加一个类名为line的div,(是标准流)让它跑到浮动元素的下面撑起来整个父元素

   1. left 移动到左浮动的下面
   2. right 移动到右浮动的下面
   3. both 两者同时的下面

2. 伪元素方式(核心思路就是把 一个元素放到所有浮动元素的下面

   ```css
   <div class="clear-fix">
   	<浮动元素></>
   	<浮动元素></>
   </div>
   
   
   .clear-fix::after{
   	content:'';  //在浮动元素的后面添加一个伪元素,内容为空,让它跑到所有浮动元素的后面
   	clear:both;
   	display:block;  //伪元素的默认格式是行内元素
   	
   }
   ```


3. BFC,让浮动元素形成BFC,就直接托起来整个高度
4. 让所有元素都浮动,就相当于每一个元素都没有浮动

## 讲一下CSS定位吧

1. static: position属性的默认值,元素不会脱离标准流,也不会成为定位元素

2. relative: 相对于自己的位置的定位,元素不会脱离标准流

3. absolute: 相对于自己第一个非static属性的父级元素的定位,如果没有相对于视口

4. fixed: 相对于视口的定位,窗口滚动时不会影响fixed. 

   > 视口(viewport): 自己能看到的页面
   >
   > 画布(canvas): 整个窗口大小

为什么子绝父相:1.让子元素找到相对的元素 2. 父亲不要脱离标准流

5. sticky: 默认为relative,设置的属性值触发以后变为fixed

比较常见的就是搜索栏,向下滚动的时候自动跟着你的屏幕滚

四种属性值的设置为top left right bottom

```css
.search{
      width: 300px;
      height: 200px;
      background-color: pink;
      position: sticky;
      top: 0;
    }
```

## 盒模型

```
标准盒模型 content-box 
IE盒模型 box-sizing: border-box;
```

border-box与content-box

border-box是css3新增的属性,设置的width大小是content+padding+border的大小

content-box设置的width就是盒模型中的content的大小,并不包含padding,border,margin

**设置方法**: box-sizing: boder-box;

## 实现一个三角形

```css
核心原理,内容区设置为0,然后设置边框,将边框设置为透明色,那个方向需要三角形,就设置哪个方向的颜色
#test{
      width: 0;
      height: 0;
      border:solid 100px transparent;
      border-bottom:solid 100px red;
    }
```



## 毛玻璃的实现效果

重点在于backdrop-filter,该属性的作用在于让元素的后面元素添加一些效果,如模糊等



## 水平垂直居中的方式

```html
.parent {
      width: 200px;
      height: 100px;
      /* position: relative; */
      background-color: #374858;
    }

    .parent .child {
      width: 100px;
      height: 50px;
      background-color: #9dc3e6;
    }

<div class="parent">
    <div class="child"></div>
</div>
```

### 水平居中

子元素为内联元素(行内块元素为内联元素),

为**父元素**设置text-align

```
.parent
```

子元素为块级元素

为子元素设置margin:0 auto

```css
.child{
      margin: 0 auto;
}
```

使用绝对定位

相对定位是相对自己原来的位置的定位

绝对定位是相对自己的父级元素的定位

```css
.child{
      position: absolute;
      left: 50%;
      transform:translate(-50%,0);
    }
```

使用flex布局

在**父元素**上使用justify-content,规定flex-item在主轴上的对齐方式

```css
.parent{
      display: flex;
      justify-content: center;
    }
```

### 垂直居中

```css
.parent{
      display: flex;
      align-items:center;
    }
    

// 针对表格元素???
.parent{
      display: table-cell;
      vertical-align: middle;
    }
    
// 定位很容易想到
.child{
      position:absolute;
      top: 50%;
      transform:translate(0,-50%);
    }
```

### 两者 同时居中

```css
块元素
.child{
      position:absolute;
      top: 50%;
      left: 50%;
      transform:translate(-50%,-50%);
    }

使用负值 的margin
.center{
      width: 100px;
      height: 100px;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -50px;  //margin一定为负值,如果为百分比会有问题
      
      margin-top: -50px;
      background-color: pink;
    }
    
    //flex
.parent{
      display: flex;
      justify-content: center;
      align-items: center;
    }

行内块元素
```

## BFC

元素的三种流:标准流;浮动流;绝对定位流

块级格式化上下文,当你在使用某些css属性的时候会触发BFC,这个上下文环境独立于其它的环境,不受其他的环境影响.(里面元素不受外部环境影响)

触发BFC的几种方式:

1. html根元素
2. float元素(float值不为none的元素)
3. 绝对定位元素(position为absolute与fixed的元素)
4. display为inline-block与table-cell的元素
5. flex与grid items元素
6. overflow不为visiable与clip的元素

BFC及其应用

解决高度塌陷问题

子元素采用了浮动,就脱离了标准流,这样它就不会向父元素汇报高度,父元素认为子元素没有高度,就会造成高度塌陷

1. 将子元素设置`overflow:hidden`,把子元素设置为BFC,解决高度塌陷的问题

防止浮动元素遮挡普通流元素

1. 浮动元素设置:`float:left`,并不会遮挡普通流的内容
2. <img src="https://cdn.jsdelivr.net/gh/CXGBro/image-repo/Picgo/image-20221208135447488.png" alt="image-20221208135447488" style="zoom:50%;" />

防止同一种元素的上/下边距发生折叠

1. 两个元素块一上一下,边距会自然重叠,最终两者的边距为最大边距,而不是边距之和
2. 使用BFC避免这种问题(例如设置:overflow:hidden) ,

总结概括:一个container里面可以直接放文字,而不能放其它东西.这个文字还可以换行,就是BFC

## grid布局

## CSS单位

1. 绝对单位

   1. px %
   2. cm mm等很少使用

2. 相对单位

   1. em 相对于自己的font-size的大小

      ```css
      .parent{
      	font-size:10px;
      }
      .child{
      	font-size: 1em; // 如果没有定义font-size,则会使用继承过来的font-size
      	width:10em;
      }
      ```

3. rem 相对于根元素(Html)的font-size

4. vw 每一个vw都是视口宽度的1% vh 每一个vh都是视口高度的1%

关于像素pixel

物理像素:设备的实际像素大小

逻辑像素:设备设置的像素大小(比如电脑设置分辨率)

逻辑像素与物理像素之比,叫做设备像素比(DPR)

PPI设备像素密度

## 移动端适配

基本知识

1. 视口

   1. 在浏览器中,看到的区域就是视口,PC端布局视口与可视视口是没有区分的.

   2. 在移动端中,布局视口使用默认的宽度980px,如果移动端的屏幕宽度无法达到980px,将会自动缩放变小,如图,元素的宽度有100px,但是并没有占用1/4左右的比例,因为缩放了

   3. 为了使移动端中的布局视口与视觉视口一致,使用标签更改布局视口,形成的视口叫做理想视口

      ```html
      <meta name="viewport" content="width=device-width,initial-scale=1">
      宽度width，移动端的宽度都不一致，一般不给一个固定值
      width=device-width这样就可以根据设备的宽度自动调节
      宽度height，没有浏览器用过
      设备宽度与viewport大小之间的缩放比例，initial-scale，一般设置为1.0
      设置用户无法缩放当前页面，user-scalable，默认yes指可以缩放，no不可以缩放，有的浏览器会忽略这个规则，所以需要设置下面的maximum-scale和minimum-scale
      定义缩放的最大值，maximum，一般设置为1.0
      定义缩放的最小值，minimum，一般设置为1.0
      ```

      



1. 百分比方案

   1. 百分比方案的参照物不同,在实际中使用这种方案很少

2. rem单位+动态的html的font-size

   1. rem单位是相对于html元素的font-size来设置的，那么如果我们需要在不同的屏幕下有不同的尺寸，可以动态的修改html的 font-size尺寸。
   2. 可以通过媒体查询,设置条件到某个设备宽度,条件触发后,将html的font-size设置为xxx.缺点是需要写大量的设备用做媒体查询,并不适合.
   3. 使用js监听屏幕宽度,如果改变,就动态改变font-size
   4. rem单位换算: 元素宽度/font-size

3. vw单位

   1. vw换算方法:设计稿中元素的宽度/设计稿的宽度

   2. 1vw=1%的视口宽度,公式:vw = 100 / 设计稿宽度* 元素宽度

   3. **Viewport width unit (vw) = 100 \* (Pixel Unit Size / Viewport width)**

      For example, to convert 120 pixel to vw if the viewport width is 1000:

      vw =100 * (120/1000)

4. flex布局

## CSS3新增的内容

1. transition

   ```css
   div
   {
   width:100px;
   height:100px;
   background:blue;
   transition:width 2s; // 对width属性进行渐变,时间是两秒
   -moz-transition:width 2s; /* Firefox 4 */
   -webkit-transition:width 2s; /* Safari and Chrome */
   -o-transition:width 2s; /* Opera */
   }
   
   div:hover
   {
   width:300px;
   }
   ```

2. transform

   1. transform:translate(转移,位移)
   2. transform:scale(缩放)
   3. transform:rotate(0.5turn) 旋转

3. 动画

   1. 利用选择器,配合@keyframes规则

      ```css
      div{
          animation: myfirst 5s;
          -webkit-animation: myfirst 5s; /* Safari 与 Chrome */
      }
      @keyframes myfirst
      {
          from {background: red;}
          to {background: yellow;}
      }
      @keyframes myfirst
      {
          0%   {background: red;}
          25%  {background: yellow;}
          50%  {background: blue;}
          100% {background: green;}
      }
      ```

4. rgba 新增的颜色属性