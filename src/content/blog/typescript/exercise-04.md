---
author: Keonhee Lee
pubDatetime: 2023-02-23T07:06:00Z
title: Typescript Exercises 4
postSlug: typescript-exercises-4
featured: false
draft: false
tags:
  - Typescript
description: Solving Typescript Exercises 4 / 타입스크립트 공부 및 영작 연습
---

## [Typescript Exercise 4](https://typescript-exercises.github.io/#exercise=4&file=%2Findex.ts)

<br>

## Exercise 4

<br>

### Figure out how to help TypeScript understand types in this situation and apply necessary fixes.

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

export type Person = User | Admin;

export const persons: Person[] = [
  {
    type: 'user',
    name: 'Max Mustermann',
    age: 25,
    occupation: 'Chimney sweep',
  },
  { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
  { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' },
  { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' },
];

export function isAdmin(person: Person) {
  return person.type === 'admin';
}

export function isUser(person: Person) {
  return person.type === 'user';
}

export function logPerson(person: Person) {
  let additionalInformation: string = '';

  if (isAdmin(person)) {
    additionalInformation = person.role;
  }
  if (isUser(person)) {
    additionalInformation = person.occupation;
  }
  console.log(` - ${person.name}, ${person.age}, ${additionalInformation}`);
}

console.log('Admins:');
persons.filter(isAdmin).forEach(logPerson);

console.log();

console.log('Users:');
persons.filter(isUser).forEach(logPerson);
```

---

## How I Solved This Problem

Though, Type for `Person` is defined either `User` or `Admin` function logPerson dose not know what type parameter `person` will be passed in

we can see functions like `isAdmin` and `isUser` to define whether passed parameter person is belong to `Admin` or `User`

This time we can use user-defined type guard to define a function whose return type is a type predicate by adding `: [parameter] is part of [Type]`

like below

```ts
export function isAdmin(person: Person): person is Admin {
  return person.type === 'admin';
}

export function isUser(person: Person): person is User {
  return person.type === 'user';
}
```
