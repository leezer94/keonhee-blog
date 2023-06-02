---
author: Keonhee Lee
pubDatetime: 2023-04-23T15:30:00Z
title: 2648. Generate Fibonacci Sequence
postSlug: 2629-function-composition
featured: false
draft: false
tags:
  - Algorithms
  - LeetCode
  - Easy
description: LeetCode 2648. Generate Fibonacci Sequence
---

## 2648. Generate Fibonacci Sequence

---

Write a generator function that returns a generator object which yields the fibonacci sequence.

The fibonacci sequence is defined by the relation `Xn = Xn-1 + Xn-2.`

The first few numbers of the series are` 0, 1, 1, 2, 3, 5, 8, 13.`

Example 1.

```js
Input: callCount = 5
Output: [0,1,1,2,3]
Explanation:
const gen = fibGenerator();
gen.next().value; // 0
gen.next().value; // 1
gen.next().value; // 1
gen.next().value; // 2
gen.next().value; // 3
```

Example 2

```js
Input: callCount = 0
Output: []
Explanation: gen.next() is never called so nothing is outputted
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
