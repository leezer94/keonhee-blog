---
author: Keonhee Lee
pubDatetime: 2023-02-23T18:06:00Z
title: Typescript Exercises 5
postSlug: typescript-exercises-5
featured: false
draft: false
tags:
  - Typescript
description: Solving Typescript Exercises 5 / 타입스크립트 공부 및 영작 연습
---

## [Typescript Exercise 5](https://typescript-exercises.github.io/#exercise=5&file=%2Findex.ts)

<br>

## Exercise 5

<br>

### Without duplicating type structures, modify filterUsers function definition so that we can pass only those criteria which are needed, and not the whole User information as it is required now according to typing.

#### `Higher difficulty bonus exercise:`

- Exclude "type" from filter criterias.

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
  {
    type: 'admin',
    name: 'Jane Doe',
    age: 32,
    role: 'Administrator',
  },
  {
    type: 'user',
    name: 'Kate Müller',
    age: 23,
    occupation: 'Astronaut',
  },
  {
    type: 'admin',
    name: 'Bruce Willis',
    age: 64,
    role: 'World saver',
  },
  {
    type: 'user',
    name: 'Wilson',
    age: 23,
    occupation: 'Ball',
  },
  {
    type: 'admin',
    name: 'Agent Smith',
    age: 23,
    role: 'Administrator',
  },
];

export const isAdmin = (person: Person): person is Admin =>
  person.type === 'admin';
export const isUser = (person: Person): person is User =>
  person.type === 'user';

export function logPerson(person: Person) {
  let additionalInformation = '';
  if (isAdmin(person)) {
    additionalInformation = person.role;
  }
  if (isUser(person)) {
    additionalInformation = person.occupation;
  }
  console.log(` - ${person.name}, ${person.age}, ${additionalInformation}`);
}

export function filterUsers(persons: Person[], criteria: User): User[] {
  return persons.filter(isUser).filter(user => {
    const criteriaKeys = Object.keys(criteria) as (keyof User)[];
    return criteriaKeys.every(fieldName => {
      return user[fieldName] === criteria[fieldName];
    });
  });
}

console.log('Users of age 23:');

filterUsers(persons, {
  age: 23,
}).forEach(logPerson);
```

---

## How I Solved This Problem

There are two ways to solve this problem.

### `1. Using Partial<Type> from Utility Types`

by using `Partial<User>` typescript construct properties of `User` type set to optional.

Since any properties of `User` can be passed passed as criteria the error will be handled.

```ts
export function filterUsers(
  persons: Person[],
  criteria: Partial<User>
): User[] {
  return persons.filter(isUser).filter(user => {
    const criteriaKeys = Object.keys(criteria) as (keyof User)[];
    return criteriaKeys.every(fieldName => {
      return user[fieldName] === criteria[fieldName];
    });
  });
}
```

But, this makes all properties of User optional which is not safe enough or precise enough.

### `2. Using Omit<T, K> in order to predefine conditional types`

```ts
export function filterUsers(
  persons: Person[],
  criteria: Partial<Omit<User, 'type'>>
): User[] {
  return persons.filter(isUser).filter(user => {
    const criteriaKeys = Object.keys(criteria) as (keyof Omit<User, 'type'>)[];
    return criteriaKeys.every(fieldName => {
      return user[fieldName] === criteria[fieldName];
    });
  });
}
```

We already know witch user type is given as parameter `( criteria )` so, we can omit unnecessary property `type` in `User` to be specific.
