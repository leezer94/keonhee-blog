---
author: Keonhee Lee
pubDatetime: 2023-04-20T14:30:00Z
title: 2626. Array Reduce Transformation
postSlug: 2626-array-reduce-transformation

featured: false
draft: false
tags:
  - Algorithms
  - LeetCode
  - Easy
description: LeetCode 2626. Array Reduce Transformation
---

## 2626. Array Reduce Transformation

---

Given an integer array nums, a reducer function fn, and an intial value init, return a reduced array.

A reduced array is created by applying the following operation: val = fn(init, nums[0]), val = fn(val, nums[1]), val = fn(val, arr[2]), ... until every element in the array has been processed. The final value of val is returned.

If the length of the array is 0, it should return init.

Please solve it without using the built-in Array.reduce method.

Example 1.

```js
Input:
nums = [1,2,3,4]
fn = function sum(accum, curr) { return accum + curr; }
init = 0
Output: 10
Explanation:
initially, the value is init=0.
(0) + nums[0] = 1
(1) + nums[1] = 3
(3) + nums[2] = 6
(6) + nums[3] = 10
The final answer is 10.
```

Example 2

```js
Input:
nums = [1,2,3,4]
fn = function sum(accum, curr) { return accum + curr * curr; }
init = 100
Output: 130
Explanation:
initially, the value is init=100.
(100) + nums[0]^2 = 101
(101) + nums[1]^2 = 105
(105) + nums[2]^2 = 114
(114) + nums[3]^2 = 130
The final answer is 130.
```

Example 3

```js
Input:
nums = []
fn = function sum(accum, curr) { return 0; }
init = 25
Output: 25
Explanation: For empty arrays, the answer is always init.

```

### Approach

Implementing `Array.reduce()` method.

We are given three arguments nums array, callbackFn, initialValue

firstly, if there is no elements in the array the `reduce function` should return the given initial value.

secondly, by looping through the nums array we can get each elements in the nums array and Since, the callbackFn needs 2 arguments which are `accumulator` and `currentValue`

this `accumulator` will be the new initial value made from every loop of array.

`currentValue` will be the index of element in the array

Lastly, In the loop of the array we need to update the value for the `accumulator`

### How i Solved the Problem

```js
/**
 * @param {number[]} nums
 * @param {Function} fn
 * @param {number} init
 * @return {number}
 */
var reduce = function (nums, fn, init) {
  // Array is consist of numbers so initial value will be given init
  let val = init;

  // For Empty arrays, the answer is always init.
  if (nums.length === 0) return init;

  // fn() always have 2 arguments which are (accumulator , currentValue)
  for (let i = 0; i < nums.length; i++) {
    val = fn(val, nums[i]);
  }

  return val;
};
```
