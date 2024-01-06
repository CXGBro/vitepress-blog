# 算法

## 剑指Offer 05.替换空格

直接API法,注意replace返回的新的字符串,并且接收的是一个正则

```js
var replaceSpace = function(s) {
    let newStr = s.replace(/ /g,'%20')
    return newStr
};
```

不使用API时,

### 重复的子字符串

利用滑动窗口,指定一个字符串个数,多次重复,,看看是否与想要的字符串相等

```js
var repeatedSubstringPattern = function(s) {
    let len = s.length;

    let step = 1;
    let initStr = s.substring(0, step);
    while(step <= len / 2) {
        if(initStr.repeat(len / step) === s) {
            return true;
        }
        step++;
        initStr = s.substring(0, step);
    }

    return false;
};
```

## 3.无重复字符的最长字串

1. 使用双指针实现滑动窗口
2. i指针每移动一次,都要重新生成一次哈希集合
3. 每添加进入一次哈希集合后,都要获取一次最大的长度

```js
 // 哈希集合双指针
 // 不需要存储值的数据结构使用哈希集合
 // 哈希集合可以增删改查
var lengthOfLongestSubstring = function (s) {
    let maxLength=0;
    for (let i = 0; i < s.length; i++) {
        let set = new Set();
        for (let j = i; j < s.length; j++) {
            if (set.has(s[j])) {
                break;
            } else {
                maxLength = Math.max(maxLength, j-i+1);
            }
            set.add(s[j]);
        }
    }
    return maxLength;
};
```

## 5.最长回文子串

超时的暴力解法

```js
var longestPalindrome = function(s) {
    let str;
    let maxLengthStr = "";
    for(let i=0;i<s.length;i++){
        for(let j=i+1;j<=s.length;j++){
            str = s.slice(i,j);
            if(str.length===1 || isHuiwen(str)){
                if(str.length > maxLengthStr.length) maxLengthStr = str;
            }
        }
    }
    return maxLengthStr;
};

var isHuiwen = function(s){
    if(s.split("").reverse().join("") === s) return true;
    return false;
}
```



## 46.全排列

排列组合问题想到利用树形图,排列问题没有数的先后顺序之分,组合问题有


[「代码随想录」带你学透回溯算法！46. 全排列 - 全排列 - 力扣（LeetCode）](https://leetcode.cn/problems/permutations/solution/dai-ma-sui-xiang-lu-dai-ni-xue-tou-hui-s-mfrp/)

```js
// 递归后,数组中的每一项都会被使用,但在分支中有些数字并没有加入到path中,所以要回溯.其实就是让数组返回之前的一个状态.

var permute = function (nums) {
    let path = [];
    let res = [];
    function backtracking(used) {
        if (path.length === nums.length) {
            res.push([...path]);
            return;
        }
        for (let i = 0; i < nums.length; i++) {
            if (used[i]) continue;
            path.push(nums[i]);
            used[i] = true;
            backtracking(used);
            path.pop();
            used[i] = false;
        }
    }
    backtracking([]);
    return res;
};
```

## 48.旋转图像

先左对角线对称一次,再轴对称一次.

要想实现左对角线对称,就要拿到1,4,5,7,8,9的指针

拿到这部分的坐标,与右边的坐标置换.

中心对称,拿到左半部分坐标,与右半部分置换.

```js
var rotate = function (matrix) {
    let n = matrix.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < i; j++) {
            let temp = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = temp;
        }
    }
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < (n / 2); j++) {
            let temp = matrix[i][j];
            matrix[i][j] = matrix[i][n - j - 1];
            matrix[i][n - j - 1] = temp;
        }

    }
    return matrix;
};
```



## 54.螺旋矩阵

想象有一条线来控制左右边距,按照顺序每转一条边,线就会移动来控制边距

```js
var spiralOrder = function (matrix) {
    if (matrix.length === 0) return;
    let m = matrix.length, n = matrix[0].length;
    let left = 0, right = n - 1, top = 0, bottom = m - 1;
    let res = [];
    while (true) {
        for (let i = left; i <= right; i++) {
            res.push(matrix[top][i]);
        };
        if (++top > bottom) break;
        for(let i=top;i<=bottom;i++){
            res.push(matrix[i][right])
        };
        if(left > --right) break;
        for(let i=right;i>=left;i--){
            res.push(matrix[bottom][i]);
        }
        if(top>--bottom) break;
        for(let i=bottom;i>=top;i--){
            res.push(matrix[i][left]);
        };
        if(++left>right) break;
    }
    return res;
};
```

[【LeetCode 每日一题】54. 螺旋矩阵 | 手写图解版思路 + 代码讲解_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1Bb4y1x7xX/?spm_id_from=333.337.search-card.all.click&vd_source=8816acf923c2174dbb5ff9579616ba7b)

## 59.螺旋矩阵2

原来那一题是给你一个矩阵,生成螺旋以后的结果.这道题相当于反过来,给你结果,让你生成一个矩阵.

同样的思路,用一条线来限制边界,然后把需要的数字填上去,注意js需要声明好二维数组才可以使用.

```js
var generateMatrix = function(n) {
    let num = 1;
    let left=0,right=n-1,top=0,bottom=n-1;
    let res=[];
    while(n--){
        res.push([]);
    }
    while(true){
        for(let i=left;i<=right;i++){
            res[top][i] = num++;
        }
        if(++top>bottom) break;
        for(let i=top;i<=bottom;i++){
            res[i][right]= num++;
        }
        if(--right<left) break;
        for(let i=right;i>=left;i--){
            res[bottom][i] = num++;
        }
        if(--bottom<top) break;
        for(let i=bottom;i>=top;i--){
            res[i][left] = num++;
        }
        if(++left>right) break;
    }
    return res;

};
```



## 70.爬楼梯

```js
var climbStairs = function(n) {
    let dp = [];
    dp[1]=1;
    dp[2]=2;
    for(let i=3;i<=n;i++){
        dp[i] = dp[i-1]+dp[i-2];
    }
    return dp[n];
};
```



## 125.验证回文串

回文串可以利用双指针法,一前一后两个指针判断字符是否一样,都一样的就是回文串

```js
var isPalindrome = function (s) {
    // 正则匹配方法,为什么这么匹配
    s=s.replace(/[^a-zA-Z0-9]/g,"").toLowerCase();
    console.log(s);
    let l=0;
    let r= s.length-1;
    while(l<r){
        if(s[l] !== s[r]) return false;
        l++;
        r--;
    }
    return true;
};
```

## 206.反转链表

```js
var reverseList = function (head) {
    // 改变指向用双指针,后面指前面的
    // 为防止断链,每一次都在current的后面设置一个temp指针
    // 后面指前面,然后指针后移
    // 通过想象移动指针,发现current指针为空时可以跳出循环
    let pre=null
    let current = head
    // 当current指向最后一个节点的时候,依然需要操作,此时还要进行循环
    // 当current为空时,不需要再改变链表的指向了,也就是不要进行循环了
    while(current){
        temp = current.next
        current.next =pre
        pre = current
        current = temp
    }
    return pre
};
```



## 344.反转字符串

1. 字符串的反转最简单的方式就是前后两个元素互相交换位置
2. 当两个指针指向同一个元素或者l指针比r指针还要快的情况下停止反转

```js
var reverseString = function(s) {
    let l=0
    let r=s.length-1;
    let temp;
    while(l<r){
        temp=s[l]
        s[l]=s[r]
        s[r]=temp
        l++
        r--
    }
    return s
};
```

## 541.反转字符串II

1. 将字符串每两段两段的划分可以通过for循环的最后一个选项

2. 更改字符串的一个重要方法就是将字符转为字符数组,单纯的更改字符串并不好实现


```js
var reverseStr = function (s, k) {
    // 通过split方法转换为字符数组
    let arr = s.split('')
    for (let i = 0; i < arr.length; i = i + 2 * k) {
        // 即大于k个元素,反转前k个.不到k个元素,全部反转
        // 反转元素左闭右开
        if ((i + k) <= arr.length) {
            reverse(arr, i, i + k)
        } else {
            reverse(arr, i, arr.length)
        }
    }
    // 通过join方法将数组字符转为字符串
    return arr.join('')
};

var reverse = function(arr,start,end){
    let l=start;
    let r=end-1;
    let temp;
    while(l<r){
        temp = arr[l]
        arr[l]=arr[r]
        arr[r]=temp
        l++
        r--
    }
    return arr
}
```

## 647.回文子串

暴力算法简单,但时间复杂度太高:直接遍历字符串

```java
class Solution {
public:
    // 中心扩展, 分别以一个字符为中心、两个字符为中心。 共2n-1种可能
    int countSubstrings(string s) {
        int n = s.size(), ans = n;  // 默认一个字符的均为回文串
        for (int i = 0; i < n; i++) {   // 以一个字符为中心
            int left = i - 1, right = i + 1;
            while (left >= 0 && right < n) {
                if (s[left--] == s[right++]) ans++;
                else break;
            }
        }
        for (int i = 0; i < n - 1; i++) {   // 以两个字符为中心
            if (s[i] == s[i + 1]) {
                ans++;
                int left = i - 1, right = i + 2;
                while (left >= 0 && right < n) {
                    if (s[left--] == s[right++]) ans++;
                    else break;
                }
            }
        }
        return ans;
    }
};
```

```js
var countSubstrings = function (s) {
    let num = s.length;
    for (let i = 0; i < s.length; i++) {
        let left = i - 1;
        let right = i + 1;
        while (left >= 0 && right < s.length) {
            if (s[left] === s[right]) {
                num++;
                left--;
                right++;
            } else break;
        }
    }
    for (let i = 0; i < s.length - 1; i++) {
        if (s[i] === s[i + 1]) {
            num++;
            let left = i - 1;
            let right = i + 2;
            while (left >= 0 && right < s.length) {
                if (s[left] === s[right]) {
                    num++;
                    left--;
                    right++;
                } else break;
            }
        }
    }
    return num;
};
```



## 1556.千位分隔数

字符串法

```js
var thousandSeparator = function (n) {
    let str = n.toString();
    let res = [];
    let count = 0;
    for (let i = str.length - 1; i >= 0; i--) {
        res.unshift(str[i]);
        count += 1;
        if (count === 3 && i) {
            res.unshift('.');
            count = 0;
        }
    }
    res = res.join('');
    return res;
};
```

api法

locale  [ləʊˈkæl]

```js
let num = 1234567893.99;
function format(num){
  let res = num.toLocaleString();
  console.log(res);

}
format(num)
```



## LRU缓存

最新最近的缓存是有用的,老的缓存是没有用的

解释案例就是浏览器地址栏的地址保存方式

```js
/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
    this.capacity=capacity;
    this.cacheMap = new Map();
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    cacheMap = this.cacheMap
    if(cacheMap.has(key)){
        let value = cacheMap.get(key)
        cacheMap.delete(key)
        cacheMap.set(key,value)
        return value
    }else{
        return -1
    }
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    cacheMap = this.cacheMap
    if(cacheMap.has(key)){
        cacheMap.delete(key)
        cacheMap.set(key,value)
    }else{
        if(cacheMap.size>=this.capacity){
            cacheMap.delete(cacheMap.keys().next().value)
            cacheMap.set(key,value)
        }else{
            cacheMap.set(key,value)
        }
    }
};
```

## 排序方法

### 冒泡排序

冒泡排序右边的数字永远最大,每排序一次,右边又多了一个大数

利用双指针法,右边一个指针指着最大的数,左边一个指针从左到右指着.

```js
let arr = [1, 5, 7, 2, 5, 7, 10, 3]

function popSort(arr) {
  let temp
  for (let i = arr.length - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if (arr[j + 1] < arr[j]) {
        temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j+1] = temp
      }
    }
  }
  return arr
}

console.log(popSort(arr));
```

### 选择排序

```js
let arr = [10, 5, 7, 2, 5, 7, 10, 3]

function selectSort(arr){
  let temp
  for(let i=0;i<arr.length;i++){
    let min=i
    for(let j=i+1;j<arr.length;j++){
      if(arr[j]<arr[min]){
        min=j
      }
    }
    temp=arr[i]
    arr[i]=arr[min]
    arr[min] = temp
  }
  return arr
}

let res = selectSort(arr)
console.log(res);
```

### 插入排序(扑克牌排序)

```js
let arr = [10, 5, 7, 2, 5, 7, 10, 3]

function insertSort(arr){
  for(let i=1;i<arr.length;i++){
    let temp = arr[i]
    let j
    for(j=i-1;j>=0;j--){
      if(temp<arr[j]){
        arr[j+1] = arr[j]
      }else{
        break
      }
    }
    arr[j+1] = temp
  }
  return arr
}

let res = insertSort(arr)
console.log(res);
```

### 快速排序

快速排序的核心原理:

选择一个基准值,(一般为最左边),从最右边开始放置一个指针,一次向左边对比大小.如果左边的大于右边的,置换.

置换后,**基准值依然不变**,指针继续向前移动.第一轮排序完成后,基准值在指定的位置不动,把数字分成左右两部分.再进行下一次的置换.

```
// 注意这里小知识点;
// 数组里面的元素不是引用类型,赋值给新的变量后,新的变量就永久的得到了这个值
// 数组是引用了类型,数组的元素不是引用类型

let arr=[1,2,3,4]
let pivot=arr[0];
pivot=4;
console.log(arr);
```



```js
// 挖坑填数与分治法
// 选到的基准值就是挖下的坑位,左边有坑位就用右边的指针来找数填坑,右边有坑位就用左边的指针找数填坑
// 通过计算到mid,在进行分治就容易了
// 注意分支时各个区间的范围,是不包含mid的(是指mid不参与排序)
let arr = [5, 1, 3, 4, 8, 2];

function getMid(arr,left,right){
  let pivot = arr[left];
  let l = left;
  let r = right;
  while (l < r) {
    while (arr[r] >= pivot && l < r) {
      r--;
    }
    if (arr[r] < pivot) {
      arr[l] = arr[r];
      l++;
    }
    while (arr[l]<=pivot && l<r){
      l++;
    }
    if(arr[l]>pivot){
      arr[r] = arr[l];
      r--;
    }
  }
  arr[l] = pivot;
  return l;
}

function quickSort(arr,left,right) {
  if(left<right){
    let mid = getMid(arr,left,right);
    quickSort(arr,left,mid-1);
    quickSort(arr,mid+1,arr.length-1);
  }
  return arr;
}

let newArr = quickSort(arr,0,arr.length-1);
console.log(newArr);
```

## 洗牌算法

一副扑克牌,随机洗牌,并且让每一张牌从左到右出现在指定位置上的可能性都相等.一共出现的组合种类有:54!个.

```js
let arr = [1,2,3,4,6,7,8,9,12];
function shuffle(arr){
  for(let i=arr.length-1;i>0;i--){
    let rad = Math.floor(Math.random()*i);
    let temp = arr[rad];
    arr[rad] = arr[i];
    arr[i] = temp;
  }
  return arr;
}
console.log(shuffle(arr));
```

具体原理见:

## 二分查找

举例:查找数组中是否具有哪一个元素

二分查找的前提是**数组无重复元素且数组有序**,因为一旦有重复元素,查找返回元素的下标可能不唯一

二分查找要定义好区间,按照定义好的区间进行查找,比如查找到的区间必须是左闭右开

```js
var search = function (nums, target) {
  let l=0;
  let r=nums.length-1;
  let middle;
  let mValue;
  while(l<=r){
    middle = Math.floor((l+r)/2);
    mValue = nums[middle];
    if(mValue===target){
      return middle;
    }
    if(mValue<target){
      l=middle+1;
    }else{
      r=middle-1;
    }
  }
  return -1;
};
```

## 中文数字转阿拉伯数字

```js
const chNum = "零一二三四五六七八九";
const chUnit = "十百千万亿";

function chToNumber(chStr){
  let chStrArr = chStr.split("");
  let res=0;
  for(let item of chStrArr){
    let num = chNum.indexOf(item);
    let unit = chUnit.indexOf(item);
    // 整数部分
    if(num !== -1){
      res += num;
      // 单位部分
    }else{
      res *= Math.pow(10,unit+1);
    }
  }
  return res;
}

let res = chToNumber('');
console.log(res);
```



## 移除数组元素

数组的删除不是直接删除的,数组在内存中是一段连续的地址,删除一个元素后,后面的元素都需要向前进一位补齐删除后的空位.

### 暴力法

```js
for(let i=0;i<nums.length;i++){
    if(nums[i]===val){
      for(let j=i+1;j<nums.length;j++){
        nums[j-1]=nums[j];
      }
      // 指针再给我回去,防止后面的数字跟上来删除不掉
      i--;
      nums.length--;
    }
  }
  return nums.length;
```

### 快慢指针法

核心在于要删除元素,不删除,所有不该删除的保留下来,该删除的用后面不该删除的覆盖掉.

```js
let slow=0;
  for (let fast = 0; fast < nums.length; fast++) {
    if (nums[fast] !== val) {
      nums[slow] = nums[fast];
      slow++
    };
  }
  return slow;
```