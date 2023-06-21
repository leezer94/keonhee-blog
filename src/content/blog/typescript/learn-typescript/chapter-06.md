---
author: Keonhee Lee
pubDatetime: 2023-06-20T07:49:00Z
title: Learning Typescript Chapter 6
postSlug: learning-typescript-6
featured: true
draft: false
tags:
  - Typescript
description: 튜플
---

# 6) 배열

---

자바스크립트 배열은 매우 유연하고 내부에 모든 타입의 값을 혼합해서 저장할 수 있다.

```tsx
const elements = [true, null, undefined, 42];

elements.push('even', ['more']);

// [ true, null, undefined, 42, 'even', [ 'more' ] ]
```

타입스크립트는 초기 배열에 어떤 데이터 타입이 있는지 기억하고, 배열이 해당 데이터 타입에서만 작동하도록 제한한다.

```tsx
const warriors = ['artemisia', 'boudica'];

warriors.push('zenobia');

warriors.push(true); // boolean 타입을 string 타입에 할당할 수 없다.
```

타입스크립트가 초기 배열에 담긴 요소를 통해 배열의 타입을 유추하는 방법은 변수의 초깃값에서 변수타입을 유추하는 방법과 유사하다.

---

## 배열 타입

---

다른 변수선언과 마찬가지로 배열을 저장하기 위한 변수는 초깃값이 필요하지 않다.

변수는 undefined 로 초기화되어 나중에 배열값을 할당 받을 수 있다.

타입스크립트는 변수에 타입 애너테이션을 제공해 배열이 포함해야 하는 값의 타입을 알려주고, 배열에 대한 타입 애너테이션은 배열의 요소 타입 다음에 `[]` 가 와야한다.

```tsx
let arrayOfNumbers: number[];

arrayOfNumbers = [1, 2, 3, 4, 5, 6];
```

---

### `배열과 함수 타입`

배열 타입은 함수타입에 무엇이 있는지를 구별하는 괄호가 필요한 구문 컨테이너의 예 이다.

괄호는 애너테이션의 어느 부분이 함수 반환ㅇ 부분이고 어느 부분이 배열 타입 묶음인지를 나타내기 위해 사용.

```tsx
// string 배열을 반환하는 함수
let createString: () => string[];

// 각각의 string을 반환하는 함수 배열
let stringCreater: (() => string)[];
```

---

### `유니언 타입 배열`

배열의 각 요소가 여러 선택타입 중 하나일 수 있음을 나타내려면, 유니언 타입을 사용한다.

유니언 배열에서 괄호 사용은 매우 중요한데, 배열의 콘텐츠이고 어느 부분이 유니언 타입 묶음인지를 나태낸다.

```tsx
// 타입이 string 또는 number 의 배열
let stringOrArratOfNumbers: string | number[];

// number 또는 string인 요소의 배열
let arratOfStringOrNumbers: (string | number)[];

const namesMaybe: (string | undefined)[] = ['Aqultune', 'Belnda', 'undefined'];
```

---

### `any 배열의 진화`

초기에 빈 배열로 설정된 변수에서 타입 애너테이션을 포함하지 않으면 타입스크립트는 배열을 any[] 로 취급하고 모든 콘텐츠를 받을 수 있다.

타입 애너테이션이 없는 빈 배열은 잠재적으로 잘못된 값을 추가로 허용하기 때문에 검사기가 갖는 이점을 무력화 한다.

```tsx
// any[]
let values = [];

// string[]
values.push('');

// (number | string)[]
values[0] = 0;
```

타입스크립트는 타입을 알 때 가장 잘 동작한다.

---

### `다차원 배열`

2차원 배열 또는 배열의 배열은 두개의 `[]` 를 갖는다. 또는 `(type[])[]` 으로도 표현이 가능함.

```tsx
let arrayOfArraysNumbers: number[][]; // OK
let arrayOfArraysNumbers: number[][]; // OK

arrayOfArraysNumbers = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
```

배열의 차원이 늘어날 수록 `[]` 도 늘어나게 된다.

---

## 배열 멤버

---

타입스크립트는 배열의 멤버를 찾아서 해당 배열의 타입 요소를 되돌려주는 전형적인 인덱스 기반 접근 방식을 이해하는 언어다.

```tsx
const defenders: string[] = ['clarenza', 'dina'];

const defender = defenders[0]; // string type

const soldiersOrDate = ['Deborah Sampson', new Date(1782, 6, 3)]; // (string | Date)[]

const soldierOrDate = soldiersOrDate[0]; // string | Date
```

---

### `주의 사항 : 불안정한 멤버`

타입스크립트의 타입 시스템은 기술적으로 불안정하다고 알려져 있는데, 대부분 올바른 타입을 얻을 수 있지만, 때로는 값 타입에 대한 타입 시스템의 이해가 올바르지 않을 수 있다.

특히 배열은 타입 시스템에서 불안정한 소스 이다. 기본적으로 타입스크립트는 모든 배열의 멤버에 대한 접근이 해당 배열의 멤버를 반환한다고 가정하지만, 자바스크립트에서조차도 배열의 길이보다 큰 인덱스로 배열 요소에 접근하면 `undefiend` 를 제공하낟.

```tsx
function withElements(elements: string[]) {
  console.log(elements[9001].length); // 타입 오류 없음
}

withElements(["It's", 'over']);
```

타입 스크립트는 검색된 배열의 멤버가 존재하는지 의도적으로 확인하지 않기 때문에, 위의 코드 스니펫에서

`elemets[9001]` 은 `undefined` 가 아니라 `string` 타입으로 간주된다.

> 타입스크립트에서 배열 조회를 더 제한하고자 한다면, `noUncheckedIndexedAccess` 플래그를 사용하면 되지만, 매우 엄격해서 대부분의 프로젝트에서는 사용하지 않는다.

---

## 스프레드와 나머지 매개변수

---

### `스프레드`

`...` 스프레드 연산자를 사용해 배열을 결합한다. 타입스크립트는 입력된 배열중 하나의 값이 결과 배열에 포함될 것임을 이해한다.

```tsx
const soldiers = ['Harriet Tubman', 'Joan of Arc', 'Khutulun']; // string[]

const soldierAges = [90, 19, 45]; // number[]

const conjoined = [...soldiers, ...soldierAges]; // (string | number)[]
```

---

### `나머지 매개변수 스프레드`

타입스크립트는 나머지 매개변수로 배열을 스프레드하는 자바스크립트 실행을 인식하고 이에대해 타입 검사를 수행한다. 나머지 매개변수를 위한 인수로 사용되는 배열은 나머지 매개변수와 동일한 배열 타입을 가져야 한다.

```tsx
function logWarriors(greetings: string, ...names: string[]) {
  for (const name of names) {
    console.log(`${greetings}, ${namme}!!`);
  }
}

const warriors = ['Cathay Williams', 'Lozen', 'Nzinga'];

logWarriors('Hello', ...warriors);

const birthYears = [1844, 1994, 1920];

logWarriors('Born in', ...birthYears);
// number 타입이 string 타입에 할당 가능하지 않다.
```

---

## 튜플

---

자바스크립트 배열은 이론상 어떤 크기라도 될 수 있는데, 때로는 `튜플` 이라고 하는 고정된 크기의 배열을 사용하는 것이 유용합니다. 튜플 배열은 각 인덱스에 알려진 특정 타입을 가지며, 배열의 모든 가능한 멤버를 갖는 유니언 타입보다 더욱 구체적이다.

`튜플 타입` 을 선언하는 구문은 배열 리터럴처럼 보이지만 요소의 값 대신 타입을 적는다.

```tsx
let yearAndWarriors: [number, string];

yearAndWarriors = [530, 'Tomryis']; // OK

yearAndWarriors[(false, 'Tomyris')]; // boolean 타입을 string 타입에 할당 가능하지 않다.

yearAndWarriors = [530];
// [number] 타입은 [number, string] 타입에 할당 가능하지 않다.
// 2개의 elements 를 예상했지만, ㅎ
```

자바스크립트에서는 단일 조건을 기반으로 두개의 변수에 초깃값을 설정하는 것처럼 한번에 여러 값을 할당하기 위해 튜플과 배열 구조 분해 할당 을 함께 자주 사용한다.

```tsx
let [year, warrior]: [number, string] =
  Math.random() > 0.5 ? [340, 'Archidamia'] : [1828, 'Rani of Jhansi'];
```

---

### `튜플 할당 가능성`

타입스크립트에서 튜플 타입은 가변길이 의 배열 타입보다 더 구체적으로 처리한다. `즉 가변길이의 배열타입은 튜플 타입에 할당할 수 없다.`

```tsx
let pairLoode : (boolean | number)[] = [false , 123];
const pariTupleLoose : [boolean, number] = pairLoose

// Error : (boolean | number)[] 타입을 [boolean , number] 타입에 할당 가능하지 않다.

튜플은 배열의 길이를 이미 알고 있기 때문에, 서로 할당할 수 없다.
```

```tsx
const tupleThree: [boolean, number, string] = [false, 1503, 'Nzinga'];

const tupleTwoExact: [boolean, number] = [tupleThree[0], tupleThree[1]];

const tupleTwoExtra: [boolean, number] = tupleThree;
// Error : [boolean, number, string] 이 타입 [boolean, number] 에 할당 가능하지 않다.
```

---

### `나머지 매개변수로서의 튜플`

튜플은 구체적인 길이와 요소타입 정보를 가지는 배열로 간주되므로 함수에 전달할 인수를 저장하는데 특히 유용하다.

타입스크립트는 `...` 나머지 매개변수로 전달된 튜플에 정확한 타입검사를 제공할 수 있다.

```tsx
function logPair(name: string, value: number) {
  console.log(`${name} has ${value}`);
}

const pariArray = ['Amage', 1];

logPair(...pariArray);

// Error : spread arguments 는 튜플 타입이거나 rest 파라미터로 전달되어야 한다.

const pairTupleIncorrect: [number, string] = [1, 'Amage'];

logPair(...pairTupleIncorrect);

// Error : number 타입은 string 타입에 할달될 수 없다.

const pairTupleCorrect: [string, number] = ['Amage', 1];

logPair(...pairTupleCorrect); // OK
```

나머지 매개변수 튜플을 사용하고 싶다면 여러 번 함수를 호출 하는 인수 목록을 배열에 저장해 함께 사용 할 수 있다.

```tsx
function logTrio(name: string, value: [number, boolean]) {
  console.log(`${name} has ${value[0]} ${value[1]}`);
}

const trios: [string, [number, boolean]][] = [
  ['Amanitore', [1, true]],
  ['AEthelsakjd', [2, false]],
  ['Ann E. Dunwoody', [3, false]],
];

trios.forEach((trio) => logTrio(...trio)); // OK

trios.forEach(logTrio);

// Error : Arguments of type '(name : string, value : [number, boolean]) => void' 는 (value : [string, [number, boolean], ...] => void) 에 할당될 수 없다.

// parameter 'name' 과 'value' 는 호환되지 않는다.

// 타입 [string, [number,boolean]] 은 'string' 타입에 할당 되지 않는다.
```

---

### `튜플 추론`

타입스크립트는 생성된 배열을 튜플이 아닌 가변 길이의 배열로 취급한다.

배열이 변수의 초깃값 또는 함수에 대한 반환값으로 사용되는 경우 고정된 크기의 튜플이 아닌 유연한 크기의 배열로 가정한다.

```tsx
function firstCharAndSize : (string | number)[] {
    return [input[0], input.length]
}

const [firstChar, size]:  (string | number)[] = firstCharAndSize('Gudit')
```

타입스크립트에서는 값이 일반적인 배열 타입 대신 좀 더 구체적인 튜플 타입이어야 함을 다음 구 가지 방법으로 나타낸다 `명시적 튜플 타입`과 `const assertion`

---

### `명시적 튜플 타입`

함수에 대한 반환 타입 애너테이션 처럼 튜플 타입도 타입 애너테이션에 사용할 수 있다.

함수가 튜플 타입을 반환한다고 선언되고, 배열 리터럴을 반환한다면, 해당 배열 리터럴은 일반적인 가변 길이의 배열 대신 튜플로 간주한다.

```tsx
function firstCharAndSizeExplicit(input: string): [string, number] {
  return [input[0], input.length];
}

const [firstChar, size]: [string, number] =
  firstCharAndSizeExplicit('Cathay Williams');
```

---

### `const assertion`

명시적 타입 애너테이션에 튜플 타입을 입력하는 작업은 명시적 타입 애너테이션을 입력할 때 와 동일한 이유로 코드 변경에 따라 작성 및 수정이 필요한 구문을 추가해야하기 때문에 고통스러울 수 있다.

하지만, 그 대안으로 타입스크립트는 값뒤에 넣을 수 있는 `const assertion` 인 `as const` 연산자를 제공한다.

`const assertion` 은 타입스크립트에 타입을 유추할 때 읽기 전잉이 가능한 값 형식을 사용하도록 지시한다.

```tsx
const unionArray: (string | number)[] = [1157, 'Tomoe'];

// readonly[1157,'Tomoe']
const readonlyTuple = [1157, 'Tomoe'] as const;
```

`const assertion` 은 유연한 크기의 배열을 고정된 크기의 `튜플로 전환하는 것을 넘어 해당 튜플이 읽기 전용`이고 값 수정이 예상되는 곳에서 사용할 수 없는것을 나타낸다.

```tsx
const pairMutable: [number, string] = [1157, 'Tomoe'];
pariMutable[0] = 1147; // OK

const pariAlsoMutable: [number, string] = [1157, 'Tomoe'] as const;

// Error : 타입 readonly [1157, 'Tomoe'] 는 읽기 전용이기때문에 [number, string] 에 할당할 수 없다.

const pairConst = [1157, 'Tomoe'] as const;
pairConst[0] = 1247;

// Error : 읽기 전용 프로퍼티에 '0' 을 할당할 수 없다
```

실제로 읽기 전용 튜플은 함수 반환에 편리하다.

튜플은 반환하는 함수로서 반환된 값은 보통 즉시 구조화 되지 않으므로 읽기전용인 튜플은 함수를 사용하는데 방해가 되지 않는다.

```tsx
function forstCharAndSizeAsConst(input: string): readonly [string, number] {
  return [input[0], input.length] as const;
}

// fisrtChar : string, size : number
const [firstChar, size] = forstCharAndSizeAsConst('Ching Shih');
```

---

## 요약

- [ ]로 배열 타입 선언하기
- 괄호를 사용해 함수의 배열 또는 유니언 타입의 배열 선언하기
- 타입스크립트가 배열 요소르,ㄹ 배열의 타입으로 이해하는 방법
- … 스프레드와 나머지 매개변수로 작업하는 방법
- 고정된 크기의 배열을 나타내는 튜플 타입 선언하기
- 타입 애너테이션 또는 as const 어서션으로 튜플 생성하기
