> **本文参加了由**[公众号@若川视野] **发起的每周源码共读活动，** 

> 【若川视野 x 源码共读】第32期 | yocto-queue 队列 链表

库的地址：https://github.com/sindresorhus/yocto-queue

通常，我们在`js`中用数组来模拟队列的操作,那为什么还要用这个库呢?

```
const queue = []
queue.push()
queue.shift()
```

这个库使用链表来模拟队列的操作,同时使用 `Symbol.iterator`实现自定义迭代器.大大降低了队列的时间复杂度.

# 数组实现与链表实现的区别

## 数组：
    
- 进行查找操作，对于使用下标进行访问，比如get(index)，其时间消耗仅为O(1)。
- 但查找特定元素get(e)，需要花费O(n)的时间，因为需要遍历数组。
- 新增add，最坏的情况下，在下标0处进行新增add操作，则需要将原有元素全部后移一位，这便意味着开销为O（n）。
- 对于删除来说，删除下标为0的元素，则需要将数组元素向前移动一个位置，开销也为0（n）。
- 仅在数组末尾进行插入和删除操作，那么开销仅为O（1）。

## 链表

- 当我们需要查找target元素或者根据下标来找元素，查找的开销O(n)。
- remove方法仅需要修改一个next引用就可以实现，使用一句代码即可A1.next = A2.next;开销仅为O(1)，因为不涉及元素的移动。
- 添加新的节点也仅仅需要修改next指针指向新的节点，开销也仅仅为O(1)。

由此可见,使用链表作为队列的实现方式具有很大的性能优势.

# 源码分析

请看注释:

```js
class Node {
    // 创建节点类,写上节点属性
	value;
	next;

	constructor(value) {
		this.value = value;
	}
}

export default class Queue {
        // 创建head和tail头尾指针
	#head;
	#tail;
        // 记录大小
	#size;

	constructor() {
        // 确保是个空队列
		this.clear();
	}

	enqueue(value) {
		const node = new Node(value);
                // 看一下头指针是否存在节点
		if (this.#head) {
                        // 存在就在尾指针所在节点后添加
			this.#tail.next = node;
                        // 同时把尾指针指向新添加的节点
			this.#tail = node;
		} else {
                        // 否则直接在头指针所在位置添加节点
			this.#head = node;
                        // 头尾指针指向一起
			this.#tail = node;
		}

		this.#size++;
	}

	dequeue() {
		const current = this.#head;
                // 看看队列是否为空,为空就不要出队了
		if (!current) {
			return;
		}
                
                // 头指针后移,就是出队
		this.#head = this.#head.next;
		this.#size--;
		return current.value;
	}

	clear() {
		this.#head = undefined;
		this.#tail = undefined;
		this.#size = 0;
	}

	get size() {
		return this.#size;
	}
        
	* [Symbol.iterator]() {
		let current = this.#head;

		while (current) {
			yield current.value;
			current = current.next;
		}
	}
}
```

## 迭代器与生成器
重点看一下最后一个函数:

```js
* [Symbol.iterator]() {
		let current = this.#head;

		while (current) {
			yield current.value;
			current = current.next;
		}
	}
```
  此处做了一个自定义的迭代器,相当于对此class所new出来的实例对象上添加了一个`[Symbol.iterator]`属性,属性的值为一个生成器函数.
  
  而生成器函数的作用就是返回一个iterator对象,这样就可以通过`iterator.next().value`方法来遍历指针所指向的值.
  
  如果不用面向对象的写法就是这样的

```js
    function Queue(){
      // 这里相当于 类 里面的constructor函数
    }
    Queue.prototype.xxx=function(){
      // 这里放 类 里面的属性和方法
    }
    var queue = new Queue();
    queue[Symbol.iterator] = function* () {
      let current = this.#head;

      while (current) {
        yield current.value;
        current = current.next;
      }
    }
```