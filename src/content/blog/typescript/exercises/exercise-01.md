---
author: Keonhee Lee
pubDatetime: 2023-02-20T03:06:00Z
title: Typescript Exercises 1
postSlug: typescript-exercises-1
featured: false
draft: false
tags:
  - Typescript
description: Solving Typescript Exercises 1 / 타입스크립트 공부 및 영작 연습
---

## [Typescript Exercise 1](https://typescript-exercises.github.io/#exercise=1&file=%2Findex.ts)

<br>

## Exercise 1

<br>

### Given the data, define the interface `User` and use it accordingly.

<br>

```ts
export type User = unknown;

export const users: unknown[] = [
  {
    name: 'Max Mustermann',
    age: 25,
    occupation: 'Chimney sweep',
  },
  {
    name: 'Kate Müller',
    age: 23,
    occupation: 'Astronaut',
  },
];

export function logPerson(user: unknown) {
  console.log(` - ${user.name}, ${user.age}`);
}

console.log('Users:');
users.forEach(logPerson);
```

---

## How I Solved This Problem

Since Type `User` is `Unknown`, in compile time Javascript Engine doesn't know what type the `users` variable is.

We know `users` is an Array of Objects and as we can see type Users is missing properties of `name, age and occupation`

type `User` should have below properties with types

```typescript
type User = {
  name: string;
  age: number;
  occupation: string;
};
```

We can fix this facing type errors by assigning properties to type `User`

```typescript
export type User = {
  name: string;
  age: number;
  occupation: string;
};

export const users: User[] = [
  {
    name: 'Max Mustermann',
    age: 25,
    occupation: 'Chimney sweep',
  },
  {
    name: 'Kate Müller',
    age: 23,
    occupation: 'Astronaut',
  },
];

export function logPerson(user: User) {
  console.log(` - ${user.name}, ${user.age}`);
}

console.log('Users:');
users.forEach(logPerson);
```
