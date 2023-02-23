---
author: Keonhee Lee
pubDatetime: 2023-02-20T19:06:00Z
title: Typescript Exercises 3
postSlug: typescript-exercises-3
featured: false
draft: false
tags:
  - Typescript
description: Solving Typescript Exercises 3 / 타입스크립트 공부 및 영작 연습
---

## [Typescript Exercise 3](https://typescript-exercises.github.io/#exercise=3&file=%2Findex.ts)

<br>

## Exercise 3

<br>

### Fix type errors in logPerson function. <br> logPerson function should accept both User and Admin and should output relevant information according to the <br>`input: occupation` for User and role for Admin.

<br>

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

export const persons: Person[] = [
  {
    name: 'Max Mustermann',
    age: 25,
    occupation: 'Chimney sweep',
  },
  {
    name: 'Jane Doe',
    age: 32,
    role: 'Administrator',
  },
  {
    name: 'Kate Müller',
    age: 23,
    occupation: 'Astronaut',
  },
  {
    name: 'Bruce Willis',
    age: 64,
    role: 'World saver',
  },
];

export function logPerson(person: Person) {
  let additionalInformation: string;
  if (person.role) {
    additionalInformation = person.role;
  } else {
    additionalInformation = person.occupation;
  }
  console.log(` - ${person.name}, ${person.age}, ${additionalInformation}`);
}

persons.forEach(logPerson);
```

---

## How I Solved This Problem

We are facing Type Error which is saying property `role` does not exist on type `Person`

Since passed parameter `person` might not have property `role`,

given condition `person.role === true` does not always make sense.

```ts
if (person.role) {
  additionalInformation = person.role;
} else {
  additionalInformation = person.occupation;
}
```

Rather than using `dot notation` to access an object passed as a parameter, it is recommended to use the `in operator` to check if a property exists in the object, ensuring that the condition is `true`.

like below

```ts
if ('role' in person) {
  additionalInformation = person.role;
} else {
  additionalInformation = person.occupation;
}
```
