---
author: Keonhee Lee
pubDatetime: 2023-04-15T14:30:00Z
title: 2619. Array Prototype Last ( Easy )
postSlug: 2619-array-prototype-last

featured: false
draft: false
tags:
  - Algorithms
  - LeetCode
  - Easy
description: LeetCode 2619. Array Prototype Last
---

## 2619. Array Prototype Last

---

Write code that enhances all arrays such that you can call the array.last() method on any array and it will return the last element. If there are no elements in the array, it should return -1.

Example 1.

```js
Input: nums = [1,2,3]
Output: 3
Explanation: Calling nums.last() should return the last element: 3.
```

Example 2

```js
Input: nums = []
Output: -1
Explanation: Because there are no elements, return -1.
```

### Approach

Basically, We need to implement Array.prototype.last method.

we can get the Array information by calling `this` keyword.

### How i Solved the Problem

```js
Array.prototype.last = function () {
  // we can simply get last index by approaching to this.length -1
  const lastIndexOfArray = this.length - 1;

  // In case there is no elements in the Array
  if (this.length === 0) {
    return -1;
  }

  return this[lastIndexOfArray];
};
```
