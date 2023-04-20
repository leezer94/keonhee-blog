---
author: Keonhee Lee
pubDatetime: 2023-04-20T17:00:00Z
title: 2637. Promise Time Limit
postSlug: 2637-promise-time-limit
featured: false
draft: false
tags:
  - Algorithms
  - LeetCode
  - Easy
description: LeetCode 2637. Promise Time Limit
---

## 2637. Promise Time Limit

---

Given an asynchronous function `fn` and a time `t` in milliseconds, return a new time limited version of the input function.

A time limited function is a function that is identical to the original unless it takes longer than `t` milliseconds to fulfill. In that case, it will reject with` "Time Limit Exceeded"`. Note that it should reject with a string, not an `Error`.

Example 1.

```js
Input:
fn = async (n) => {
  await new Promise(res => setTimeout(res, 100));
  return n * n;
}
inputs = [5]
t = 50
Output: {"rejected":"Time Limit Exceeded","time":50}
Explanation:
The provided function is set to resolve after 100ms. However, the time limit is set to 50ms. It rejects at t=50ms because the time limit was reached.
```

Example 2

```js
Input:
fn = async (n) => {
  await new Promise(res => setTimeout(res, 100));
  return n * n;
}
inputs = [5]
t = 150
Output: {"resolved":25,"time":100}
Explanation:
The function resolved 5 * 5 = 25 at t=100ms. The time limit is never reached.
```

Example 3

```js
Input:
fn = async (a, b) => {
  await new Promise(res => setTimeout(res, 120));
  return a + b;
}
inputs = [5,10]
t = 150
Output: {"resolved":15,"time":120}
Explanation:
The function resolved 5 + 10 = 15 at t=120ms. The time limit is never reached.
```

### Approach

I struggled a little bit understanding this problem.

So, I had to look for the solutions to understand how I was supposed to approach this problem.

Let's look at the cases first.

- When `fn()` time limit is less (shorter) then the given time limit(`t`) we need to send reject message.

- When `fn()` throws an error.

Firstly, we should have our own `timeout promise function` with error message like code below

```js
const timeoutPromise = new Promise((_, reject) => {
  return setTimeout(() => {
    reject(errorMessage);
  }, t);
});
```

This function will send out reject message once, given time `t` has passed.

#### Promise.race()

This `Promise.race()` was the key of this problem.
The `Promise.race()` method is one of the promise concurrency methods. It's useful when you want the first async task to complete, but do not care about its eventual state (i.e. it can either succeed or fail).

like it says they race and if `timeoutPromise` function is executed then it shows reject message before the normal `promises` ( `fn(...args)` )

### How i Solved the Problem

```js
/**
 * @param {Function} fn
 * @param {number} t
 * @return {Function}
 */
var timeLimit = function (fn, t) {
  const errorMessage = 'Time Limit Exceeded';
  const timeoutPromise = new Promise((_, reject) => {
    return setTimeout(() => {
      reject(errorMessage);
    }, t);
  });

  return async function (...args) {
    const promises = fn(...args);

    return await Promise.race([promises, timeoutPromise]);
  };
};

/**
 * const limited = timeLimit((t) => new Promise(res => setTimeout(res, t)), 100);
 * limited(150).catch(console.log) // "Time Limit Exceeded" at t=100ms
 */
```
