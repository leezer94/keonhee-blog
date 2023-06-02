---
author: Keonhee Lee
pubDatetime: 2023-04-18T16:30:00Z
title: 2621. Sleep
postSlug: 2621-sleep
featured: false
draft: false
tags:
  - Algorithms
  - LeetCode
  - Easy
description: LeetCode 2621. Sleep
---

## 2621. Sleep

---

Given a positive integer millis, write an asyncronous function that sleeps for millis milliseconds. It can resolve any value.

```js
Input: millis = 100
Output: 100
Explanation: It should return a promise that resolves after 100ms.
let t = Date.now();
sleep(100).then(() => {
  console.log(Date.now() - t); // 100
});
```

Example 2

```js
Input: millis = 200
Output: 200
Explanation: It should return a promise that resolves after 200ms.
```

### Approach

In this problem, sleep()whatever function or some logics should be called after given amount of millie seconds.

By, using Promise function we can have the function `sleep(`) asynchronous. after this `sleep()` with `then()` chain later logic will be called.

### How i Solved the Problem

```js
/**
 * @param {number} millis
 */

async function sleep(millis) {
  // resolve will the the later logic with then() chian
  return await new Promise((resolve) => setTimeout(resolve, millis));
}

/**
 * let t = Date.now()
 * sleep(100).then(() => console.log(Date.now() - t)) // 100
 */
```
