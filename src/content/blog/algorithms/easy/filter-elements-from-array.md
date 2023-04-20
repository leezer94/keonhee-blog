---
author: Keonhee Lee
pubDatetime: 2023-04-20T16:00:00Z
title: 2634. Filter Elements From Array ( Easy )
postSlug: 2634-filter-elements-from-array
featured: false
draft: false
tags:
  - Algorithms
  - LeetCode
  - Easy
description: LeetCode 2634. Filter Elements From Array
---

## 2634. Filter Elements From Array

---

Given an integer array arr and a filtering function fn, return a new array with a fewer or equal number of elements.

The returned array should only contain elements where fn(arr[i], i) evaluated to a truthy value.

Please solve it without the built-in Array.filter method.

Example 1.

```js
Input: arr = [0,10,20,30], fn = function greaterThan10(n) { return n > 10; }
Output: [20,30]
Explanation:
const newArray = filter(arr, fn); // [20, 30]
The function filters out values that are not greater than 10
```

Example 2

```js
Input: arr = [1,2,3], fn = function firstIndex(n, i) { return i === 0; }
Output: [1]
Explanation:
fn can also accept the index of each element
In this case, the function removes elements not at index 0
```

Example 3

```js
Input: arr = [-2,-1,0,1,2], fn = function plusOne(n) { return n + 1 }
Output: [-2,0,1,2]
Explanation:
Falsy values such as 0 should be filtered out
```

### Approach

1. given function should have 2 arguments `n` , `index`
2. given function returns `Boolean` value if meet the requirements
3. when function returns `true` pushes elements to the filtered array

### How i Solved the Problem

```js
/**
 * @param {number[]} arr
 * @param {Function} fn
 * @return {number[]}
 */
var filter = function (arr, fn) {
  let filtered = [];

  // Brutely filters array
  for (let i = 0; i < arr.length; i++) {
    if (fn(arr[i], i)) filtered.push(arr[i]);
  }

  return filtered;
};
```
