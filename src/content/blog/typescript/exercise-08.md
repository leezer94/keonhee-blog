---
author: Keonhee Lee
pubDatetime: 2023-02-25T17:10:00Z
title: Typescript Exercises 8
postSlug: typescript-exercises-8
featured: false
draft: false
tags:
  - Typescript
description: Solving Typescript Exercises 8 / 타입스크립트 공부 및 영작 연습
---

## [Typescript Exercise 8](https://typescript-exercises.github.io/#exercise=8&file=%2Findex.ts)

<br>

## Exercise 8

<br>

### Define type PowerUser which should have all fields from both User and Admin (except for type), and also have type 'powerUser' without duplicating all the fields in the code.

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

// type needs to be specified
type PowerUser = unknown;

export type Person = User | Admin | PowerUser;

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
  {
    type: 'powerUser',
    name: 'Nikki Stone',
    age: 45,
    role: 'Moderator',
    occupation: 'Cat groomer',
  },
];

function isAdmin(person: Person): person is Admin {
  return person.type === 'admin';
}

function isUser(person: Person): person is User {
  return person.type === 'user';
}

function isPowerUser(person: Person): person is PowerUser {
  return person.type === 'powerUser';
}

export function logPerson(person: Person) {
  let additionalInformation: string = '';
  if (isAdmin(person)) {
    additionalInformation = person.role;
  }
  if (isUser(person)) {
    additionalInformation = person.occupation;
  }
  if (isPowerUser(person)) {
    additionalInformation = `${person.role}, ${person.occupation}`;
  }
  console.log(`${person.name}, ${person.age}, ${additionalInformation}`);
}

console.log('Admins:');
persons.filter(isAdmin).forEach(logPerson);

console.log();

console.log('Users:');
persons.filter(isUser).forEach(logPerson);

console.log();

console.log('Power users:');
persons.filter(isPowerUser).forEach(logPerson);
```

## How I Solved This Problem

### `Using Utility types in Typescript`

The way of approaching is basically the same we need every properties except `type` property and type PowerUser need its own `type` which is `powerUser`.

#### `1. Omit Utility Type`

I used this way of approaching because, it is less code to write definitely.

then type `PowerUser` will be able to have all properties from type User and Admin except property `type` then type : `powerUser` is added at the end.

```ts
type PowerUser = Omit<User, 'type'> &
  Omit<Admin, 'type'> & { type: 'powerUser' };

export type Person = User | Admin | PowerUser;
```

#### `2. Pick Utility Type`

We can get the same result using `Pick` utility type as well as `Omit` utility type.

like below

```ts
type PowerUser = Pick<User, 'name' | 'age' | 'occupation'> &
  Pick<Admin, 'name', 'age', 'role'> & { type: 'powerUser' };

export type Person = User | Admin | PowerUser;
```
