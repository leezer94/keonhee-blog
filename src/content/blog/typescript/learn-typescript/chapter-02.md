---
author: Keonhee Lee
pubDatetime: 2023-06-04T04:03:00Z
title: Learning Typescript Chapter 2
postSlug: learning-typescript-2
featured: true
draft: false
tags:
  - Typescript
description: 타입 시스템
---

## 타입의 종류

---

`타입` 은 자바스크립트에서 다루는 값의 형태에 대한 설명이다.

`형태`란 값에 존재하는 속성과 메서드 그리고 내장되어 있는 typeof 연산자가 설명하는 것을 의미.

예를 들어, 아래와 같은 경우에는 타입스크립트는 singer 변수가 문자열 타입임을 유추할 수 있다.

```tsx
let singer = 'Aretha';
```

타입 스크립트의 기본적인 타입의 구성은 자바스크립트의 일곱가지 기본 원시 타입과 같은데

| null      | null              |
| --------- | ----------------- |
| undefined | undefined         |
| boolean   | true              |
| string    | 'Louise’          |
| number    | 1337              |
| bigint    | 1337n             |
| symbol    | Symbol(’Frankin’) |

또한, 타입스크립트는 계산된 초깃값을 갖는 변수의 타입을 유추할 수 있을 만큼 충분히 똑똑하다.

## 타입 시스템

---

`타입 시스템` 은 프로그래밍 언어가 프로그램에서 가질 수 있는 타입을 이해하는 방법에 대한 규칙 집합이다.

기본적인 타입스크립트의 동작 방법

- 코드를 읽고 존재하는 모든 타입과 값을 이해한다.
- 각 값이 초기 선언에서 가질 수 있는 타입을 확인한다.
- 각 값이 추후 코드에서 어떻게 사용될 수 있는지 모든 방법을 확인한다.
- 값의 사용법이 타입과 일치하지 않으면 사용자에게 오류를 표시한다.

타입 추론의 과정

```tsx
let firstName = 'WHitney';
firstName.length();

//
// Error : This expression is not callable
//.    Type 'Number' has no call signatures
```

### 오류 종류

타입스크립트를 작성하는 동안 가장 자주 접하게 되는 오류 두 가지는 다음과 같다.

- `구문 오류` : 타입스크립트가 자바스크립트로 변환되는것을 차단한 경우
- `타입 오류` : 타입 검사기에 따라 일치하지 않는 것이 감지된 경우

---

`구문 오류`

구문 오류는 타입스크립트가 코드로 이해할 수 없는 잘못된 구문을 감지할 때 발생.

타입스크립트가 타입스크립트 파일에서 자바스크립트 파일을 올바륵 생성할 수 없도록 차단.

---

`타입 오류`

타입 오류는 타입스크립트의 타입 검사기가 프로그램의 타입에서 오류를 감지 했을때 발생.

오류가 발생했다고 타입스크립트 구문이 자바스크립트로 변환되는 것을 차단 하지는 않는다.

---

## 할당 가능성

---

타입스크립트 변수는 변수의 초깃값을 읽고 해당 변수가 허용되는 타입을 결정. 나중에 해당 변수에 새로운 값이 할당되면 새롭게 할당된 값의 타입과 동일한지 확인한다.

`동일한 타입의 다른값을 할당하는것에는 문제가 없지만, 다른 타입의 값이 할당되면 타입 오류가 발생한다.`

```tsx
// 동일한 타입이지만 다른 값 할당
let firstName = 'Carole';
firstName = 'Joan';

// 다른 타입의 값 할당
let lastName = 'King';
lastName = true;

// Error : Type 'boolean' is not assignable to type 'string'
```

여기서, 타입스크립트에서 함수 호출이나 변수에 값을 제공할 수 있는지 여부를 확인하는 것을 `할당 가능성` 이라 함.

---

## 타입 애너테이션

---

때로는 변수에 타입스크립트가 읽어야 할 초깃값이 없는 경우도 있다.

타입스크립트는 나중에 사용할 변수의 초기 타입을 파악하려고 하지 않고 기존변수를 암묵적으로 `any`

초기 타입을 유추할 수 없는 변수를 `진화하는 any` 라고 부르며, 특정 타입을 강제하는 대신 `새로운 값이 할당될 때마다 변수 타입에 대한 이해를 발전시킨다.`

하지만, 일반적으로 any 타입을 사용해 any 타입으로 진화하는 것을 허용하게 되면 타입스크립트의 타입 검사 목적을 부분적으로 쓸모없게 만든다.

타입스크립트는 어떤 값이 어떤 타입인지 알고 있을때 가장 잘 작동한다.

그리하여, 타입스크립트는 초깃값을 할당하지 않고도 변수의 타입을 선언할 수 있는 구문인 `타입 애너테이션` 을 제공

`타입 애너테이션`은 변수 이름 뒤에 배치되면 `콜론( : ) 과 타입 이름`을 차례대로 기재한다.

```tsx
let rocker: string;

rocker = 'Joan Jett'; // OK

rocker = 19.59; // Error : Type 'Number' is not assignable to type 'string';
```

---

`**불필요한 타입 애너테이션**`

타입 애너테이션은 코드를 명확하게 문서화 하거나 실수로 변수 타입이 변경되지 않도록 타입스크립트를 보호하기 위해 변수에 명시적으로 타입 애너테이션을 포함하는 경우에는 유용할 수 있으나, 타입을 즉시 유추할 수 있거나, 변하지 않는 값에 대해 타입 애너테이션을 추가해 주는 것은 불필요한 작업일 수 있다.

---

## 타입 형태

타입스크립트는 `변수에 할당된 값이 원래 타입과 일치하는지 확인하는것 뿐만 아니라, 객체에 어떤 멤버 속성이 존재하는지도 알고` 있다.

```tsx
let cher = {
  firstName: 'Cherilyn',
  lastName: 'Sarkisian',
};

cher.middelName;

// Error : Property 'middleName' does not exist on type
// '{ fistName : string; lastNmae : string}'
```

타입스크립트는 객체의 형태에 대한 이해를 바탕으로 할당 가능성 뿐만 아니라 객체 사용과 연관된 문제도 알려준다.

---

**모듈**

자바스크립트는 비교적 최근까지 서로 다른 파일에 작성된 코드를 공유하는 방법과 관련된 사양을 제공하지 않았고, `ECMA2015 에는 파일간 import / export 구문을 표준화 하기 위해 ECMA 모듈 ( ESM )` 이 추가되었다.

- `모듈` : export 또는 import 가 있는 파일
- `스크립트` : 모듈이 아닌 모든 파일

파일이 모듈이라면 상관 없겠지만, 스크립트 형식이라면 다음과 같은 상황에서 오류가 발생한다.

```tsx
import { shared } from './a';
// Error : Import declaratation confilicts with local declaration of 'shared'

export const shared = 'Cher';
// Error : Indivisual declarations in merged declaration
// 'shared' must be all exported or all local
```

해당 파일을 `전역 스코프` 로 간주하므로 모든 스크립트가 파일의 내용에 접근 할 수 있다.

즉, 스크립트 파일에 선언된 변수는 다른 스크립트 파일에 선언된 변수와 동일한 이름을 가질 수 없다.

> 타입스크립트는 CommonJS 와 같은 이전 모듈을 사용해서 작성된 타입스크립트 파일의 `import, export` 현태는 인식하지 못한다. 타입스크립트는 일반적으로 CommonJS 스타일의 `require` 함수에서 반환된 값을 any 타입으로 인식한다.

**요약**

- 타입은 무엇인지 알아보고 타입스크립트가 인식하는 원시 타입 이해하기
- 타입 시스템은 무엇인지 알아보고 타입스크립트의 타입 시스템이 코드를 이해하는 방법 살펴보기
- 타입 오류와 구문 오류의 차이점
- 유추된 변수 타입과 변수 할당 가능성
- 타입 애너테이션으로 변수 타입을 명시적으로 선언하고 any 타입의 진화 방지
- 타입 형태에서 객체 멤버 확인하기
- 스크립트 파일과는 다른 ECMA스크립트 모듈 파일의 선언 스코프
