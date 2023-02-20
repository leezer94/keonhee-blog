---
author: Keonhee Lee
pubDatetime: 2023-02-20T17:06:00Z
title: Typescript Exercises 2
postSlug: typescript-exercises-2
featured: false
draft: false
tags:
  - Typescript
description: Solving Typescript Exercises 2 / 타입스크립트 공부 및 영작문 연습
---

## [Typescript Exercise 2](https://typescript-exercises.github.io/#exercise=2&file=%2Findex.ts)

<br>

## Exercise 2

#### Type `Person` is missing, please define it and use it in persons array and logPerson function in order to fix all the TS errors.

```ts
interface User {
  name: string;
  age: number;
  occupation: string;
}

interface Admin {
  name: string;
  age: number;
  role: string;
}

export type Person = unknown;

export const persons: User[] /* <- Person[] */ = [
  {
    name: "Max Mustermann",
    age: 25,
    occupation: "Chimney sweep",
  },
  {
    name: "Jane Doe",
    age: 32,
    role: "Administrator",
  },
  {
    name: "Kate Müller",
    age: 23,
    occupation: "Astronaut",
  },
  {
    name: "Bruce Willis",
    age: 64,
    role: "World saver",
  },
];

export function logPerson(user: User) {
  console.log(` - ${user.name}, ${user.age}`);
}

persons.forEach(logPerson);
```

---

## How I Solved This Problem

Variable `persons` is Array of Objects and it is considered as `User[]` type.

However, Each object contains different properties like `role and occupation`

while property `role` belongs to `User` type, property occupation belongs to type `Admin`.

By using `Union Type`, typescript can choose what properties `persons` contained object has.

```ts
interface User {
  name: string;
  age: number;
  occupation: string;
}

interface Admin {
  name: string;
  age: number;
  role: string;
}

export type Person = User | Admin;

export const persons: Person[] /* <- Person[] */ = [
  {
    name: "Max Mustermann",
    age: 25,
    occupation: "Chimney sweep",
  },
  {
    name: "Jane Doe",
    age: 32,
    role: "Administrator",
  },
  {
    name: "Kate Müller",
    age: 23,
    occupation: "Astronaut",
  },
  {
    name: "Bruce Willis",
    age: 64,
    role: "World saver",
  },
];

export function logPerson(user: Person) {
  console.log(` - ${user.name}, ${user.age}`);
}

persons.forEach(logPerson);
```

---
