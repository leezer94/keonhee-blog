---
author: Keonhee Lee
pubDatetime: 2023-04-20T16:30:00Z
title: 2635. Apply Transform Over Each Element in Array
postSlug: 2634-apply-transform-over-each-element-in-array
featured: false
draft: false
tags:
  - Algorithms
  - LeetCode
  - Easy
description: LeetCode 2635. Apply Transform Over Each Element in Array
---

## 2635. Apply Transform Over Each Element in Array

---

Given an integer array `arr` and a mapping function fn, return a new array with a transformation applied to each element.

The returned array should be created such that `returnedArray[i] = fn(arr[i], i)`.

Please solve it without the built-in `Array.map` method.

Example 1.

```js
Input: arr = [1,2,3], fn = function plusone(n) { return n + 1; }
Output: [2,3,4]
Explanation:
const newArray = map(arr, plusone); // [2,3,4]
The function increases each value in the array by one.
```

Example 2

```js
Input: arr = [1,2,3], fn = function plusI(n, i) { return n + i; }
Output: [1,3,5]
Explanation: The function increases each value by the index it resides in.
```

Example 3

```js
Input: arr = [10,20,30], fn = function constant() { return 42; }
Output: [42,42,42]
Explanation: The function always returns 42.
```

### Approach

1. given function should have 2 arguments `n` , `index`
2. simply push transformed elements in the new array and return the transformed array

### How i Solved the Problem

```js
/**
 * @param {number[]} arr
 * @param {Function} fn
 * @return {number[]}
 */
var map = function (arr, fn) {
  const transformedArray = [];

  for (let i = 0; i < arr.length; i++) {
    transformedArray.push(fn(arr[i], i));
  }

  return transformedArray;
};
```
