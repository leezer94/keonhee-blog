---
author: Keonhee Lee
pubDatetime: 2023-02-25T16:47:00Z
title: Typescript Exercises 9
postSlug: typescript-exercises-9
featured: false
draft: false
tags:
  - Typescript
description: Solving Typescript Exercises 9 / 타입스크립트 공부 및 영작 연습
---

## [Typescript Exercise 9](https://typescript-exercises.github.io/#exercise=9&file=%2Findex.ts)

<br>

## Exercise 9

<br>

### Remove `UsersApiResponse` and `AdminsApiResponse` types and use generic type ApiResponse in order to specify API response formats for each of the functions.

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

// type needs to be specified here
export type ApiResponse<T> = unknown;

type AdminsApiResponse =
  | {
      status: 'success';
      data: Admin[];
    }
  | {
      status: 'error';
      error: string;
    };

export function requestAdmins(callback: (response: AdminsApiResponse) => void) {
  callback({
    status: 'success',
    data: admins,
  });
}

type UsersApiResponse =
  | {
      status: 'success';
      data: User[];
    }
  | {
      status: 'error';
      error: string;
    };

export function requestUsers(callback: (response: UsersApiResponse) => void) {
  callback({
    status: 'success',
    data: users,
  });
}

export function requestCurrentServerTime(
  callback: (response: unknown) => void
) {
  callback({
    status: 'success',
    data: Date.now(),
  });
}

export function requestCoffeeMachineQueueLength(
  callback: (response: unknown) => void
) {
  callback({
    status: 'error',
    error: 'Numeric value has exceeded Number.MAX_SAFE_INTEGER.',
  });
}

function logPerson(person: Person) {
  console.log(
    ` - ${person.name}, ${person.age}, ${
      person.type === 'admin' ? person.role : person.occupation
    }`
  );
}

function startTheApp(callback: (error: Error | null) => void) {
  requestAdmins((adminsResponse) => {
    console.log('Admins:');
    if (adminsResponse.status === 'success') {
      adminsResponse.data.forEach(logPerson);
    } else {
      return callback(new Error(adminsResponse.error));
    }

    console.log();

    requestUsers((usersResponse) => {
      console.log('Users:');
      if (usersResponse.status === 'success') {
        usersResponse.data.forEach(logPerson);
      } else {
        return callback(new Error(usersResponse.error));
      }

      console.log();

      requestCurrentServerTime((serverTimeResponse) => {
        console.log('Server time:');
        if (serverTimeResponse.status === 'success') {
          console.log(
            `   ${new Date(serverTimeResponse.data).toLocaleString()}`
          );
        } else {
          return callback(new Error(serverTimeResponse.error));
        }

        console.log();

        requestCoffeeMachineQueueLength((coffeeMachineQueueLengthResponse) => {
          console.log('Coffee machine queue length:');
          if (coffeeMachineQueueLengthResponse.status === 'success') {
            console.log(`   ${coffeeMachineQueueLengthResponse.data}`);
          } else {
            return callback(new Error(coffeeMachineQueueLengthResponse.error));
          }

          callback(null);
        });
      });
    });
  });
}

startTheApp((e: Error | null) => {
  console.log();
  if (e) {
    console.log(
      `Error: "${e.message}", but it's fine, sometimes errors are inevitable.`
    );
  } else {
    console.log('Success!');
  }
});
```

## How I Solved This Problem

This was definitely a tricky for me but, once i understood how i should approach this problem, it was pretty logical

### `1. Let's remove type UsersApiResponse and UsersApiResponse as requested `

After removing type `UsersApiResponse` and `UsersApiResponse`, we are facing code below

ApiResponse is a type consist of generics.

we already know status for api responses should be a type

like below

```ts
export type ApiResponse<T> = unknown;

export function requestAdmins(callback: (response: unknown) => void) {
  callback({
    status: 'success',
    data: admins,
  });
}

export function requestUsers(callback: (response: unknown) => void) {
  callback({
    status: 'success',
    data: users,
  });
}
```

### `2. Let's guess what data should be passed as parameter of the function`

```ts
// When Api response succeed
{
  status: 'success';
  data: T; // whatever data can be passed in
}

// When Api response failed
{
  status: 'error';
  message: string;
}
```

Now, we can transform the type `ApiResponse` with generics by combining the code above

The most important part is what type or response is passed as the argument to the request functions

```ts
export type ApiResponse<T> =
  | { status: 'success'; data: T }
  | { status: 'error'; message: string };

export function requestAdmins(
  callback: (response: ApiResponse<Admin[]>) => void
) {
  callback({
    status: 'success',
    data: admins,
  });
}

export function requestUsers(
  callback: (response: ApiResponse<User[]>) => void
) {
  callback({
    status: 'success',
    data: users,
  });
}
```

### `3. Make it more expandable`

In the type `ApiResponse` we shouldn't pass `T []` as type for data because, we never know which type will be passed as data type

It's not the end.

We have another requests as well.

Since, type for `requestCoffeeMachineQueueLength` is easy,
the name of function is already mentioning `Length` so number will be passed into the parameter.

But, what about type for `requestCurrentServerTime`?

```js
const currentTime = Date.now();

console.log(typeof currentTime); // returns type 'number'
```

It is now much clear to guess which type should be passed in

```ts
export function requestCurrentServerTime(
  callback: (response: ApiResponse<number>) => void
) {
  callback({
    status: 'success',
    data: Date.now(), // this should be a 'number' type
  });
}

export function requestCoffeeMachineQueueLength(
  callback: (response: ApiResponse<number>) => void
) {
  callback({
    status: 'error',
    error: 'Numeric value has exceeded Number.MAX_SAFE_INTEGER.',
  });
}
```
