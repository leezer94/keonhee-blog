---
author: Keonhee Lee
pubDatetime: 2023-04-15T14:30:00Z
title: 2620. Counter ( Easy )
postSlug: 2620-counter
featured: false
draft: false
tags:
  - Algorithms
  - LeetCode
  - Easy
description: LeetCode 2620. Counter
---

## 2620. Counter

---

Given an integer n, return a counter function. This counter function initially returns n and then returns 1 more than the previous value every subsequent time it is called (n, n + 1, n + 2, etc).

Example 1.

```js
Input:
n = 10
["call","call","call"]
Output: [10,11,12]
Explanation:
counter() = 10 // The first time counter() is called, it returns n.
counter() = 11 // Returns 1 more than the previous time.
counter() = 12 // Returns 1 more than the previous time.
```

Example 2

```js
Input:
n = -2
["call","call","call","call","call"]
Output: [-2,-1,0,1,2]
Explanation: counter() initially returns -2. Then increases after each sebsequent call.
```

### Approach

Since the function is Closure, It memories the inner variable which is `n` by passing as parameter.

We need to add 1 to the passed parameter `n` by `n ++` then, Every time function `createCounter` is called, number `n` is increasing by 1

### How i Solved the Problem

```js
/**
 * @param {number} n
 * @return {Function} counter
 */
var createCounter = function (n) {
  return function () {
    return n++;
  };
};
```
