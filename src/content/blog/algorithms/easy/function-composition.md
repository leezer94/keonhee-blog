---
author: Keonhee Lee
pubDatetime: 2023-04-20T15:30:00Z
title: 2629. Function Composition ( Easy )
postSlug: 2629-function-composition
featured: false
draft: false
tags:
  - Algorithms
  - LeetCode
  - Easy
description: LeetCode 2629. Function Composition
---

## 2629. Function Composition

---

Given an array of functions [f1, f2, f3, ..., fn], return a new function fn that is the function composition of the array of functions.

The function composition of [f(x), g(x), h(x)] is fn(x) = f(g(h(x))).

The function composition of an empty list of functions is the identity function f(x) = x.

You may assume each function in the array accepts one integer as input and returns one integer as output.

Example 1.

```js
Input: functions = [x => x + 1, x => x * x, x => 2 * x], x = 4
Output: 65
Explanation:
Evaluating from right to left ...
Starting with x = 4.
2 * (4) = 8
(8) * (8) = 64
(64) + 1 = 65
```

Example 2

```js
Input: functions = [x => 10 * x, x => 10 * x, x => 10 * x], x = 1
Output: 1000
Explanation:
Evaluating from right to left ...
10 * (1) = 10
10 * (10) = 100
10 * (100) = 1000
```

Example 3

```js
Input: functions = [], x = 42
Output: 42
Explanation:
The composition of zero functions is the identity function
```

### Approach

1. Starting value will be `x`
2. If length of the functions array is 0 then return the initialValue `x`
3. Looping through the array from the end ( which is the last index )
4. Each element of the array is function so update the `value`

### How i Solved the Problem

```js
/**
 * @param {Function[]} functions
 * @return {Function}
 */
var compose = function (functions) {
  return function (x) {
    let value = x;
    // if length of the functions array is 0. then return x
    if (functions.length === 0) return x;

    // function should be called right to left
    // pop the array or looping through the array from the end

    for (let i = functions.length - 1; i >= 0; i--) {
      value = functions[i](value);
    }

    return value;
  };
};

/**
 * const fn = compose([x => x + 1, x => 2 * x])
 * fn(4) // 9
 */
```
