---
author: Keonhee Lee
pubDatetime: 2023-02-25T12:22:00Z
title: Typescript Exercises 7
postSlug: typescript-exercises-7
featured: false
draft: false
tags:
  - Typescript
description: Solving Typescript Exercises 7 / 타입스크립트 공부 및 영작 연습
---

## [Typescript Exercise 7](https://typescript-exercises.github.io/#exercise=7&file=%2Findex.ts)

<br>

## Exercise 7

<br>

### Implement swap which receives 2 persons and returns them in the reverse order. The function itself is already there, actually. We just need to provide it with proper types.

### Also this function shouldn't necessarily be limited to just Person types, lets type it so that it works with any two types specified.

<br>

```ts
interface User {
  type: 'user';
  name: string;
  age: number;
  occupation: string;
}

interface Admin {
  type: 'admin';
  name: string;
  age: number;
  role: string;
}

function logUser(user: User) {
  const pos = users.indexOf(user) + 1;
  console.log(` - #${pos} User: ${user.name}, ${user.age}, ${user.occupation}`);
}

function logAdmin(admin: Admin) {
  const pos = admins.indexOf(admin) + 1;
  console.log(` - #${pos} Admin: ${admin.name}, ${admin.age}, ${admin.role}`);
}

const admins: Admin[] = [
  {
    type: 'admin',
    name: 'Will Bruces',
    age: 30,
    role: 'Overseer',
  },
  {
    type: 'admin',
    name: 'Steve',
    age: 40,
    role: 'Steve',
  },
];

const users: User[] = [
  {
    type: 'user',
    name: 'Moses',
    age: 70,
    occupation: 'Desert guide',
  },
  {
    type: 'user',
    name: 'Superman',
    age: 28,
    occupation: 'Ordinary person',
  },
];

// Type needs to be specified here
export function swap(v1, v2) {
  return [v2, v1];
}

function test1() {
  console.log('test1:');
  const [secondUser, firstAdmin] = swap(admins[0], users[1]);
  logUser(secondUser);
  logAdmin(firstAdmin);
}

function test2() {
  console.log('test2:');
  const [secondAdmin, firstUser] = swap(users[0], admins[1]);
  logAdmin(secondAdmin);
  logUser(firstUser);
}

function test3() {
  console.log('test3:');
  const [secondUser, firstUser] = swap(users[0], users[1]);
  logUser(secondUser);
  logUser(firstUser);
}

function test4() {
  console.log('test4:');
  const [firstAdmin, secondAdmin] = swap(admins[1], admins[0]);
  logAdmin(firstAdmin);
  logAdmin(secondAdmin);
}

function test5() {
  console.log('test5:');
  const [stringValue, numericValue] = swap(123, 'Hello World');
  console.log(` - String: ${stringValue}`);
  console.log(` - Numeric: ${numericValue}`);
}

[test1, test2, test3, test4, test5].forEach((test) => test());
```

---

## How I Solved This Problem

### `1. Using Generic type in typescript`

#### Benefit of using `Generic type` in Typescript

Instead of specifying one type, with `Generic type` in typescript is very flexible and highly reusable.

```ts
export function swap(v1, v2) {
  return [v2, v1];
}
```

As we can see typescript again dose not know which type will be passed into the v1 , v2 parameters

We expect that either v1 can be type `User` or `Admin` vice versa

so we can have that function to be a bit more flexible from specific types by using generics

```ts
export function <T,U> swap(v1 : T, v2 : U) : [U , T] {
  return [v2, v1];
}
```

Added type `T , U` does not mean anything as far as i know, It can be named as `T1, T2` or something else as well.
It just needs to be clear that the other workers or myself to understand without big efforts.

Type `T` is for argument `v1` and `U` is for `v2` and most importantly, since the function is swapping the args order and returns as `Array`

the function's return type must be an `[ U, T ]`
