---
author: Keonhee Lee
pubDatetime: 2023-02-23T19:06:00Z
title: Typescript Exercises 6
postSlug: typescript-exercises-6
featured: false
draft: false
tags:
  - Typescript
description: Solving Typescript Exercises 6 / 타입스크립트 공부 및 영작 연습
---

## [Typescript Exercise 6](https://typescript-exercises.github.io/#exercise=6&file=%2Findex.ts)

<br>

## Exercise 6

<br>

### Fix typing for the filterPersons so that it can filter users and return User[] when personType='user' and return Admin[] when personType='admin'. Also filterPersons should accept partial User/Admin type according to the personType. `criteria` argument should behave according to the `personType` argument value. `type` field is not allowed in the `criteria` field

### `Higher difficulty bonus exercise:`

- Implement a function `getObjectKeys()` which returns more
  convenient result for any argument given, so that you don't
  need to cast it.

```ts
let criteriaKeys = Object.keys(criteria) as (keyof User)[];

--->

let criteriaKeys = getObjectKeys(criteria);

```

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
  { type: 'user', name: 'Wilson', age: 23, occupation: 'Ball' },
  { type: 'admin', name: 'Agent Smith', age: 23, role: 'Anti-virus engineer' },
];

export function logPerson(person: Person) {
  console.log(
    ` - ${person.name}, ${person.age}, ${
      person.type === 'admin' ? person.role : person.occupation
    }`
  );
}

export function filterPersons(
  persons: Person[],
  personType: string,
  criteria: unknown
): unknown[] {
  return persons
    .filter(person => person.type === personType)
    .filter(person => {
      let criteriaKeys = Object.keys(criteria) as (keyof Person)[];
      return criteriaKeys.every(fieldName => {
        return person[fieldName] === criteria[fieldName];
      });
    });
}

export const usersOfAge23 = filterPersons(persons, 'user', { age: 23 });
export const adminsOfAge23 = filterPersons(persons, 'admin', { age: 23 });

console.log('Users of age 23:');
usersOfAge23.forEach(logPerson);

console.log();

console.log('Admins of age 23:');
adminsOfAge23.forEach(logPerson);
```

---

## How I Solved This Problem

### `1. Basic way to solve problem using function overloading`

Since, type `criteria` and return type of function `filterPersons` is set to `unknown`, `unknown[]` we can specify or make the function type flexible by using function overloading.

By overloading function by the time the actual function is called typed functions check types depend on what arguments are passed into parameter

We know the arguments for `personType` will only be either `admin` or `user` therefore, only two functions are needed to be written to be overloaded

like below,

```ts
// function overloading for personType 'admin'
export function filterPersons(
  persons: Person[],
  personType: 'admin',
  criteria: Partial<Omit<Admin, 'type'>>
): Admin[];

// function overloading for personType 'user'
export function filterPersons(
  persons: Person[],
  personType: 'user',
  criteria: Partial<Omit<User, 'type'>>
): User[];

// criteria's type `Person` still needs to be wrapped in Partial<Type>
export function filterPersons(
  persons: Person[],
  personType: string,
  criteria: Partial<Person>
): Person[] {
  return persons
    .filter(person => person.type === personType)
    .filter(person => {
      let criteriaKeys = Object.keys(criteria) as (keyof Person)[];
      return criteriaKeys.every(fieldName => {
        return person[fieldName] === criteria[fieldName];
      });
    });
}
```

### `2. Bonus exercise Using Generic Type`

We can implement `getObjectKeys()` function in order to get convenient result ( to make the function more flexible )

```ts
const getObjectKeys = <T>(obj: T) => Object.keys(obj) as (keyof T)[];

export function filterPersons(
  persons: Person[],
  personType: string,
  criteria: Partial<Person>
): Person[] {
  return persons
    .filter(person => person.type === personType)
    .filter(person => {
      let criteriaKeys = getObjectKeys(criteria); // replaced
      return criteriaKeys.every(fieldName => {
        return person[fieldName] === criteria[fieldName];
      });
    });
}
```
