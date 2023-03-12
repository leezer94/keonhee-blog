---
author: Keonhee Lee
pubDatetime: 2023-02-25T18:03:00Z
title: Typescript Exercises 10
postSlug: typescript-exercises-10
featured: true
draft: false
tags:
  - Typescript
description: Solving Typescript Exercises 10 / 타입스크립트 공부 및 영작 연습
---

## [Typescript Exercise 10](https://typescript-exercises.github.io/#exercise=10&file=%2Findex.ts)

<br>

## Exercise 10

<br>

### We don't want to reimplement all the data-requesting functions. Let's decorate the old callback-based functions with the new Promise-compatible result.

### The final function should return a Promise which would resolve with the final data directly (i.e. users or admins) or would reject with an error (or type Error). The function should be named promisify.

<br>

### `Higher difficulty bonus exercise:`

#### Create a function promisifyAll which accepts an object

- with functions and returns a new object where each of the function is promisified.

```ts
//    Rewrite api creation accordingly:
const api = promisifyAll(oldApi);
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

type Person = User | Admin;

const admins: Admin[] = [
  { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
  { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' },
];

const users: User[] = [
  {
    type: 'user',
    name: 'Max Mustermann',
    age: 25,
    occupation: 'Chimney sweep',
  },
  { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' },
];

export type ApiResponse<T> =
  | {
      status: 'success';
      data: T;
    }
  | {
      status: 'error';
      error: string;
    };

export function promisify(arg: unknown): unknown {
  return null;
}

const oldApi = {
  requestAdmins(callback: (response: ApiResponse<Admin[]>) => void) {
    callback({
      status: 'success',
      data: admins,
    });
  },
  requestUsers(callback: (response: ApiResponse<User[]>) => void) {
    callback({
      status: 'success',
      data: users,
    });
  },
  requestCurrentServerTime(callback: (response: ApiResponse<number>) => void) {
    callback({
      status: 'success',
      data: Date.now(),
    });
  },
  requestCoffeeMachineQueueLength(
    callback: (response: ApiResponse<number>) => void
  ) {
    callback({
      status: 'error',
      error: 'Numeric value has exceeded Number.MAX_SAFE_INTEGER.',
    });
  },
};

export const api = {
  requestAdmins: promisify(oldApi.requestAdmins),
  requestUsers: promisify(oldApi.requestUsers),
  requestCurrentServerTime: promisify(oldApi.requestCurrentServerTime),
  requestCoffeeMachineQueueLength: promisify(
    oldApi.requestCoffeeMachineQueueLength
  ),
};

function logPerson(person: Person) {
  console.log(
    ` - ${person.name}, ${person.age}, ${
      person.type === 'admin' ? person.role : person.occupation
    }`
  );
}

async function startTheApp() {
  console.log('Admins:');
  (await api.requestAdmins()).forEach(logPerson);
  console.log();

  console.log('Users:');
  (await api.requestUsers()).forEach(logPerson);
  console.log();

  console.log('Server time:');
  console.log(
    `   ${new Date(await api.requestCurrentServerTime()).toLocaleString()}`
  );
  console.log();

  console.log('Coffee machine queue length:');
  console.log(`   ${await api.requestCoffeeMachineQueueLength()}`);
}

startTheApp().then(
  () => {
    console.log('Success!');
  },
  (e: Error) => {
    console.log(
      `Error: "${e.message}", but it's fine, sometimes errors are inevitable.`
    );
  }
);
```

## How I Solved This Problem

First, We need to clarify what function `promisify` does

### `What function promisify does actually`

In the exercise it says about the function `promisify`

function should be promisicated when it is facing `callback hell`

It can be done by simply converting function to Promise function

The [document](https://javascript.info/promisify) explains it like below

`“Promisification” is a long word for a simple transformation. It’s the conversion of a function that accepts a callback into a function that returns a promise.`

In this exercise we need to follow the requirement

`The final function should return a Promise which would resolve with the final data directly`

which function `promisify` needs to return resolved data which will be either `fulfilled` or `rejected`

#### `Let's make a new type that returns `Promise` using generic type`

```ts
type PromisicateddResult<T> = () => Promise<T>;

export function promisify(callbackFn: unknown): PromisicateddResult<T> {
  // this function should return Promise

  return () =>
    new Promise((resolve, reject) => {
      callbackFn((response) => {
        if (response.status === 'success') {
          resolve(response.data);
        } else {
          reject(new Error(response.error));
        }
      });
    });
}
```

But, the passed parameter callbackFn is still needs to be specified

```ts
export type ApiResponse<T> =
  | {
      status: 'success';
      data: T;
    }
  | {
      status: 'error';
      error: string;
    };

type CallbackBasedAsyncFunction<T> = (
  callback: (response: ApiResponse<T>) => void
) => void;

type PromisicateddResult<T> = () => Promise<T>;

export function promisify<T>(
  callbackFn: CallbackBasedAsyncFunction<T>
): PromisicateddResult<T> {
  // this function should return Promise
  return () =>
    new Promise((resolve, reject) => {
      callbackFn((response) => {
        if (response.status === 'success') {
          resolve(response.data);
        } else {
          reject(new Error(response.error));
        }
      });
    });
}
```

### `Create a function promisifyAll which accepts an object`
