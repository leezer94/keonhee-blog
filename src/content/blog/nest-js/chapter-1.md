---
author: Keonhee Lee
pubDatetime: 2023-08-20T04:03:00Z
title: Nest.js 로 배우는 백엔드 프로그래밍 Chapter 1
postSlug: nest-js-programming-chapter-1
featured: true
draft: false
tags:
  - Typescript
  - NestJs
  - Backend
description: NestJs / Node JS 기초 지식
---

# Chapter 1

---

### `**Nestjs 의 장점**`

- Node.js에 기반을 둔 웹 API 프레임 워크로 **Express** 나 **fastify** 프레임워크를 래핑하여 동작한다.
- `IOC` / `DI` / `AOP` 같은 객체지향 개념을 도입.
- Express 보다는 생상성이 높고 모듈화가 편하다. ( 위의 개념과 연결 )
- fasify 기반이 개발을 하다보면 더 빠르긴 하지만, 개발 과정에서 필요한 라이브러리들이 express 를 지원하는것이 더 많다.

### `**Node.js**`

- Nest 로 작성한 코드는 Express 나 fastify에 의해 실행 가능한 자바스크립트 코드로 컴파일하게 된다.

### `**단일 스레드에서 구동되는 논블로킹 I/O 이벤트 기반 비동기 방식**`

여러 작업 요청이 한꺼번에 들어올 때, 각 잡업을 처리하기 위한 스레드를 만들고 할당하는 방식을 멀티스레딩 이라고 하며, 멀티스레딩 방식은 여러 작업을 동시에 처리하므로 작업 처리 속도가 빠르다는 장점이 있지만, 이는 여러 작업을 동시에 처리하므로, 공유 자원을 관리하는 노력이 많이 들고, 동기화를 잘못 작성하면 락 ( LOCK ) 에서 빠져 나오지 못하는 경우가 발생할 수 있다.

스레드가 늘어날때마다 메로리를 소모하게 되므로 메모리관리 역시 중요하다.

Node js 에서는 하나의 스레드에서 작업을 처리한다.

- 애플리케이션 단 에서는 단일 스레드
- 백그라운드에서는 스레드 풀을 구성해 작업을 처리한다.
- 개발자 대신 플랫폼 ( 정확히는 비동기 I/O 를 관리하는 라이브러리 libuv ) 이 스레드풀을 관리
- 웹 서버를 운용할 때는 CPU 코어를 분산해서 관리하므로 실제 작업은 여러개의 코어에서 별개로 처리

`Node js 에서는 이렇게 들어온 작업의 앞의 작업이 끝날때까지 **기다리지 않고 ( non - blocking 방식 ) 비동기로 처리**`

- **입력은 하나의 스레드에서 받지만 순서대로 처리하지 않고 먼저 처리된 결과를 이벤트로 반환**

### `**Node.js 의 장 단점**`

- 단일 스레드 이벤트 기반 비동기 방식은 서버에 자원에 크게 부하를 가하지 않는다.
- 대규모 `**네트워크 애플리케이션**`을 개발하기에 적합하다.
- **스레드를 하나만 사용하기 때문에 스레드에 문제가 생기면 애플리케이션 전체가 오류를 일으킬 위험이있다.**
- 하나의 스레드로 동작하는것 처럼 코드를 작성하는 것은 개발자에게 큰 장점이다.
- 컴파일러 언어의 언어처리 속도에 비해 성능이 떨어지지만, 서버의 기능이 발전하면서 엔진의 성능도 향상.

### **`이벤트 루프`**

이벤트 루프는 시스템 커널에서 가능한 작업이 있다면 그 작업을 커널에 이관한다.

- 이가 자바스크립트가 단일 스레드 기반임엑도 불구하고 Node.js 가 논블로킹 I/O 작업을 수행할 수 있도록 해주는 핵심 기능이다,

**`이벤트 루프의 6개 단계` ( 전이되는 방향 순서 )**

- 타이머 단계
- 대기 콜백 단계
- 유휴, 준비 단계
- 폴 단계 ( 수신 : 연결 데이터 등 )
- 체크 단계
- 종료 콜백 단계

1. **타이머 단계**

   이벤트 루프는 타이머 단계 에서 시작한다.

   - `setInterval` 이나 `setTimeout` 과 같은 함수를 통해 만들어진 타이머들을 큐 (queue) 에 넣고 실행하다.
   - 이 타이머 들은 최소 힙 ( heap ) 으로 관리된다.
   - 타이머의 시각이 가장 적게 남아있는 타이머가 힙의 루트가 된다.

2. **대기 콜백 단계**

   대기 단계(pending callbacks phase)의 큐(pendng_queue) 에 들었는 콜백들은 현재 동고있는 루프 이전의 작업에서 큐에 들어온 콜백이다.

   예를 들어, TCP 핸들러 내에서 비동기의 쓰기 작업을 한다면, `TCP 통신과 쓰기 작업이 끝난 후 해당 작업의 콜백이 큐에 들어온다.` 또 에`러 핸들러 콜백도 pending_queue` 로 들어온다.

3. **유휴 , 준비 단계 ( idle phase )**

   유휴 단계는 틱 (tick) 마다 실핻된다. 준비단계는 매 폴링 직전에 실행된다.

   - 이 두 단계는 Node.js 의 내부 동작을 위한 것이다.

4. **폴 단계**

   이벤트 루프중 가장 중요한 단계가 폴 단계 ( poll phase ) 이다.

   - 폴 단계 에서는 새로운 I/O 이벤트를 가져와서 관련 콜백을 수행한다.
   - 소켓 연결ㄷ과 같은 새로운 커넥션을 맺거나 파일 읽기와 같이 데이터 처리를 받아들이게 된다.
   - 이 단계가 가지고 있는 큐가 `watch_queue` 이다.
   - watch_queue 가 비어있지 않다면, `큐가 비거나 시스템 실행 한도에 다 다를 때까지 동기적으로 모든 콜백을 실행한다.`
   - 큐가 비게 된다면 node.js 는 곧바로 다음 단계로 넘어가지 않고 `check_queue` ( 다음 단계의 큐), `pending_queue`( 대기 콜백 단계의 큐 ) `closing_callback_queue`( 종료 콜백 단계 큐 ) 에 남은 작업이 있는지 검사 후, 다음 작업이 있다면 다음 단계로 이동
   - 큐가 모두 비어서 해야할 작업이 없다면 대기를 하게 된다.
   - 이 이유는 바로 타이머 다음 단계로 넘어간다고 하더라고, 어차피 첫번째 타이머를 수행할 시간이 되지 않았다면 이벤트 루프를 한번 더 돌며, 기다려야 하기 때문이다.

   1. **체크 단계**

      체크 단계 는 setImmediate의 콜백만을 위한 단계이다.

      - 큐가 비거나 시스템 실행한도에 도달할 때까지 콜백을 수행한다.

   2. **종료 콜백 단계**

      종료 콜백 단계에서는

      ```tsx
      socket.on('close', () => {}
      ```

      와 같은 close 나 destroy 이벤트 타임의 콜백이 처리된다.

      - 이벤트 루프는 종료 콜백 단계를 마치고 나면 다음 루프에서 처리해야 하는 작업이 남아있는지 검사한다.
      - 작업이 남아있다면, 타이머 단계에서부터 한번더 루프를 돌게되고, 아니라면 종료하게 된다.

   6단계는 다음과 같으며, 한편 `nextTickQueue` `process.nextTick()` API 의 콜백들을 가지고 있으며, `microTaskQueue` 는 resolve 된 `Promise 의 콜백`을 가지고 있는다.

   - 이 두 개의 큐는 기술적으로 이벤트 루프의 일부가 아니다.
   - `즉 libuv 에 포함된것이 아니라 Node.js에 포함된 기술이다.`
   - `nextTickQueue 는 micrioTaskQueue 보다 높은 우선 순위를 가지고 있다.`

   ### `패키지 의존성 관리`

**package.json 의 역할**

- 애플리케이션이 필요로 하는 패키지 목록을 나열한다.
- 각 패키지는 시맨틱 버저닝 규칙으로 필요한 버전을 기술한다.
- 다른 개발자와 같은 빌드 환경을 구성할 수 있다. 저번이 달라 발생하는 문제를 예방한다.
- 형식은 **`[Major].[Minor].[Patch].[label]` 로 형성된다.**

**Major, Minor, Patch 의 역할**

`Major`

- 이전 버전과 호환이 불가능 할때 숫자를 하나 증가시킨다.
- Major 버전이 바뀐 패키지를 사용하고자 한다면, **breaking change** 목록을 확인하고 이전 기능을 사용하는 코드를 수정해야한다.

`Minor`

- 기능이 추가되는 경우 숫자를 증가시킨다.
- 기능이 추가되었다고 해서 이전 버전의 하위 호환성을 깨트리지는 않는다.

`Patch`

- 버그 수정 패치를 적용할때 사용한다.

`Label`

- 선택 사항으로 pre, alpha, beta 와 같이 버전에 대해 부가 설명을 붙이고자 할때 문자열로 작성한다.

유의적 버전을 사용할때 완전히 동일한 버전을 정의해야만 하는것은 아니다.

당므과 같은 규칙으로 기술하여 의존성이 깨지지 않는 다른 버전을 설치할 수 있다.

- ver : 완전히 일치하는 버전
- =ver : 완전히 일치하는 버전
- > ver : 큰 버전
- ≥ver : 크거나 같은 버전
- <ver : 작은버전
- ≤ver : 작거나 같은 버전
- ~ver : 버전 범위 (지정한 마지막 자리 내 범위 )
- ~1.0, 1.0.x, 1.0.0 이상 1.1.0 미만의 버전

^ver : SemVer 규약을 따른다는 가정에서 동작하는 규칙

- ^1.0.2 : 1.0.2 이상 2.0 이만의 버전
- ^1.0 : 1.0.0 이상 2.0 미만의 버전
- ^1 : 1.0.0 이상 2.0 미만의 버전

### `**package-lock.json**`

- `package-lock.json` 은 `package.json` 에 선언된 패키지들이 설치될 때의 정확한 버전과 서로 간의 의존성을 표현한다.
- 팀원들 간의 정확한 버전과 서로간의 의존성을 표현한다.
- 팀원들간의 정확한 개발환경을 공유할 수 있다.
- `npm install` 명령어를 실행할때, 이 파일을 기준으로 패키지들을 설치하게 된다.
- 이 이유로 remote ( 깃 허브) 에서 package-lock.json 파일을 소스코드로 저장해 관리해야 한다.

### **`Decorator ( 데코레이터 )`**

**Nest JS** 는 **데코레이터를** 적극적으로 활용한다.

데코레이터를 잘 활용한다면, 횡단 관심사 ( cross cutting concern ) 을 분리하여 관점 지향 프로그래밍을 적용한 코드를 작성할 수 있다.

타입스크립트의 데코레이터 는 파이썬의 데코레이터나 자바의 애너테이션과 유사한 기능을 한다.

**클래스, 메서드, 접근자,프로퍼티, 매개변수에 적용이 가능하다.**

다음 코드는 유저 생성 요청의 본문을 **데이터 전송 객체 ( DTO : Data Transfer Object )** 로 표현한 클래스이다.

```tsx
class CreateUserDto {
  @IsEmail();
  @MaxLength(5);
  readonly email : string;

  @IsString();
  @Matches(/.... reges .... /);
  readonly password : string
}
```

사용자는 얼마든지 요청을 잘못 보낼수 있기 때문에 데코레이터를 이용하여, 애플리케이션이 허용하는 값으로 제대로 요청을 보냈는지 검사하고 있다.

현재의 타입스크립트에서 데코레이터는 아직 실험적인 스펙이므로,

```tsx
{
  "compilerOptions" : {
    ...
    "experimentalDecorators" : true,
    ...
  }
}
```

타입스크립트에서 컴파일 옵션에 `experimentalDecorators` 을 true 로 설정해주어야 사용할 수 있다.

비록 실험적인 기능이지만, 매우 안정적이며 많은 프로젝트에서 이미 사용하고 있다.

데코레이터는 위의 코드 예시와 같이 `**@expression`** 과 같은 형식으로 사용한다. 여기서 **expression** 은 **데코레이팅 된 선언 에 대한 정보와 함께 `런타임에 호출`되는 함수여야 한다.\*\*

다음 코드 예시를 보면,

```tsx
function deco(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  console.log('데코레이터가 평가됨');
}

class TestClass {
  @deco
  test() {
    console.log('함수 호출됨');
  }
}

const t = new TestClass();

t.test();
```

위의 `TestClass` 의 `test 메서드`를 호출하게 되면,

```tsx
데코레이터가 평가됨
함수 호출됨
```

이라는 문자열이 콘솔에 출력되게 됩니다.

만약 데코레이터에 인수를 넘겨서 데코레이터의 동작을 변경하고 싶다면, 데코레이터 팩터리 즉 데코레이터를 리턴하는 함수를 만들면 된다.

위의 예시를 다음과 같이 value 라는 인수를 받고록 바꿔보자

```tsx
function deco(value: string) {
  console.log('데코레이터가 평가됨');

  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDecorator
  ) {
    console.log(value);
  };
}

class TestClass {
  @deco('HELLO')
  test() {
    console.log('함수 호출됨');
  }
}

const t = new TestClass();

t.test();
```

결과는 다음과 같다.

```tsx
데코레이터가 평가됨
HELLO
함수 호출됨
```

### `**데코레이터 합성**`

여러개이 데코레이터를 사용한다면 수학의 함수 합성 (function composition ) 과 같이 데코레이터를 합성하면 된다.

다음 데코레이터 선언의 합성 결과는 수학적으로는 f(g(x)) 와 같다

```tsx
@f
@g
test
```

`**여러개의 데코레이터를 사용할 때는 다음과 같은 단계가 수행된다.**`

- `**각 데코레이터의 표현은 위에서 아래로 평가된다.**`
- `**다음 결과는 아래서 위로 함수로 호출 된다.**`

다음 예의 출력 결과를 보면 합성 순서에 대해 이해를 높일 수 있다.

```tsx
function first() {
  console.log('first() : factory evaluated');
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log('first() : called');
  };
}

function second() {
  console.log('seocnd() : factory evaluated');
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log('second() : called');
  };
}

class ExampleClass {
  @first()
  @second()
  method() {
    console.log('method is called');
  }
}

const example = new ExampleClass();

example.method();
```

다음과 같이 출력된다.

```tsx
first() : factory evaluated
second() : factory evaluated
second() : called
first() : called

method is called
```

### `**클래스 데코데이터**`

클래스 데코레이터는 이름 그대로 클래스 바로 앞에 선언된다. 클래스 데코레이터는 클래스의 생성자에 적용되어 클래스 정의 를 읽거나 수정할 수 있다. 선언파일 과 선언 클래스 내에서는 사용할 수 없다. ( 런타임 동작이기 때문에 )

다음 코드는 클래스에 repotingURL 속성을 추가하는 클래스 데코레이터의 예 이다.

```tsx
function reportableClassDecorator<T extneds { new (...args : any[]) : {}}> (constructor : T) {
return class extends constructor {
    reportingURL = 'http://www.example.com';
}
}

@reportableClassDecorator
class BugReport {
    type = 'report';
    title : string;
    constructor (t : string) {
        this.title = t
    }
}

const bug = new BugReport('Needs dark mode');
console.log(bug)
```

- 클래스 데코레이터 팩터리 이다.
- 생성자 타입 ( new (…args : any[]) : {} 즉, new 키워드와 함께 어떠한 형식의 인수들도 받을 수 있는 타입을 상속받는 제네릭 타입 `T` 를 가지는 생성자를 팩터리 메서드 인수로 전달하고 있다.
- 클래스 데코레이터는 생성자를 리턴하는 함수여야 한다.
- 클래스 데코레이터가 적용되는 클래스에 새로운 reportingURL 이라는 새로운 속성을 추가한다.

위 코드의 출력 결과는 다음과 같다.

```tsx
{type : 'report', title : 'Needs dark mode', reportingURL : 'http://www.example.com'}
```

**BugReport** 클래스에 선언되지 않았던 새로운 속성이 추가되었다.

`여기서 클래스의 타입이 변경되는 것은 아니다. 타입 시스템은 reportingURL 을 인식하지 못하기 때문에 bug.reportURL 가 같이 직접 사용할 수는 없다.`

### `메서드 데코레이터`

**메서드 데코레이터는 메서드 바로 앞에 선언된다.**

- 메서드의 속성 설명자( property decorator) 에 적용되고 메서드의 정의를 읽거나 수정할 수 있다.
- 선언파일, 오버로드 메서드, 선언 클래스에 사용할 수 없다.

메서드 데코레이터는 다음과 같은 세 개의 인수를 가진다.

- 정적 멤버가 속한 클래스의 생성자 함수이거나 인스턴스 멤버에 대한 클래스의 프로토 타입
- 멤버의 이름
- 멤버의 속성 설명자. **PropertyDescriptor** 타입을 가진다.

메서드 데코레이터가 값을 반환한다면, 이는 해당 메서드의 속성 설명자가 된다.

함수를 실행하는 과정에서 에러가 발생했을 때, 이 에러를 잡아서 처리하는 로직을 구현한다.

```tsx
function HandleError() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    // 1번
    console.log(target); // 2번
    console.log(propertyKey); // 3번
    console.log(descriptor); // 4번

    const method = descriptor.value; // 5번

    descriptor.value = function () {
      try {
        method(); // 6번
      } catch (e) {
        // 에러 핸들링 로직 구현 // 7번
        console.log(e); // 8번
      }
    };
  };
}

class Greeter {
  @HandleError()
  hello() {
    throw new Error('테스트 에러');
  }
}

const test = new Greeter();

test.hello();
```

1. 메서드 데커레이터가 가져야하는 3개의 인수이다.

   - 이중 PropertyDescriptor 는 객체의 속성의 특성을 기술하는 객체로 `enumerable` 외에도 여러가지 속성을 가지고 있다.
   - enumerable 속성이 true 가 되면, 이 속성은 `열거형` 이라는 의미이다.

   ```tsx
   interface PropertyDescriptor {
     configurable?: boolean; // 속성의 정의를 수정할 수 있는지 여부
     enumerable?: boolean; // 열거형인지 여부
     value?: any; // 속성 값
     writable?: boolean; // 수정 가능 여부
     get?(): any; // getter
     set?(): any; // setter
   }
   ```

2. 출력 결과는 `{ constructor : *f* , hello : *f* }` 이다.
   - 데코레이터가 선언된 메서드 hello 에 속해 있는 클래스의 생성자와 프로토타입을 가지는 객체임을 알 수 있다.
3. 함수 이름 hello 가 출력된다.
4. hello 함수가 처음 가지고 있던 설명자가 출련된다.
   - 출력 결과는 `{ value : *f ,* writable : true, enumerable : false, configurable : true }` 이다
5. 설명자의 value 속성으로 원래 정의된 메서드를 저장한다.
6. 원래 메서드를 호출한다.
7. 원래 메서드를 수행하는 과정에서 발생한 에러를 핸들링 하는 로직을 구현한다.
8. Error : 테스트 에러 가 출력된다.

### `**접근자 데코레이터**`

**접근자 데코레이터는 접근자 바로 앞에 선언한다.**

- 접근자의 속성 설명에 적용되고 접근자의 정의를 읽거나 수정할 수 있다.
- 선언파일과 선언클래스에는 사용할 수 없다.
- 접근자 데코레이터가 반환하는 값은 해당 멤버의 속성 설명자가 된다.

특정 멤버가 열거가 가능한지 결정하는 데코레이터의 예를 확인해 보자

```tsx
]function Enumerable (enumerable : boolean) {
    return function (target : any, propertyKey : string, descriptor : PropertyDescriptor) {
        descriptor.enumerable = enumerable // 1번
    }

}

class Person {
    constructor(private name : string) {} // 2번

    @Enumerable(true) // 3번
    get getName() {
        return this.name
    }

    @Enumerable(false) // 4번
    set setName(name : string) {
        this.name = name
    }
}

const person = new Person('keonhee')

for (let key in person) {
    console.log(`${key} : ${person[key]}`) // 5번
}
```

출력결과는 다음과 같다

```tsx
[LOG]: "name : keonhee"
[LOG]: "getName : keonhee"
```

1. 설명자의 enumerable 속성을 데코레이터의 인수로 결정한다.
2. name은 외부에서 접근하지 못하는 private 멤버이다.
3. 게터 getName 함수는 열거가 가능하도록 한다.
4. 세터 setName 은 열거가 불가능 하도록 한다.
5. 결과를 출력하면 getName 은 출력이 가능하지만, setName은 열거하지 못하게 되었기 때문에 for 문에서 key 로 받을 수가 없다.

### `속성 데코레이터`

**속성 데코레이터는 클래스의 속성 바로 앞에 선언된다.**

- 선언 파일 , 선언 클래스에서는 사용하지 못한다.
- 속성 데코레이터는 `두 개의 인수`를 가지는 함수이다.
- 정적 멤버가 속한 클래스의 생성자 함수이거나 인스턴스 멤버에 대한 클래스의 프로토타입
- 멤버의 이름

메서드 데코레이나 접근자 데코레이터와 비교해보면, 세 번째 인수인 속성 설명자가 존재하지 않는다.

`**공식문서에 따르면, 반환값도 무시되는데 이는 현재 프로토타입의 멤버를 정의할 때 인스턴스 속성을 설명하는 메커니즘이 없고 속성의 초기화 과정을 관찰하거나 수정할 방법이 없기 때문이다.**`

```tsx
function format(formatString: string) {
  return function (target: any, properyKey: string): any {
    let value = target[properyKey];

    function getter() {
      return `${formatString} ${value}`; // 1q너
    }

    function setter(newVal: string) {
      value = newVal;
    }

    return {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    };
  };
}

class Greeter {
  @format('Hello') // 2번
  greeting: string;
}

const test = new Greeter();
test.greeting = 'World';

console.log(test.greeting); // 3번
```

출력 결과는 다음과 같다

```tsx
'Hello World';
```

1. 게터에서 데코레이터 인수로 들어온 formatString을 원래 속성과 조합한 스트링으로 바꾼다.
2. 데코레이터에서 formatString을 전달한다.
3. 속성을 읽을 때 게터가 호출되면서 Hello World 가 출려된다.

### `**매개변수 데코레이터**`

매개변수 데코레이터는 생성자 또는 메서드의 매개변수에 선언되어 적용된다.

- 선언 파일, 선언 클래스에서는 사용할 수 없다.
- 매개변수 데코레이터는 호출될 때 3가지 인수와 함께 호출 한다.
- 반환값은 무시된다.

1. 정적 멤버가 속한 클래스의 생성자 함수 이거나 , 인스턴스 멤버에 대한 클래스의 프로토타입
2. 멤버의 이름
3. 매개변수가 함수에서 몇 번째 위치에 선언되었는지를 나타내는 인덱스

**매개변수가 제대로 된 값으로 전달되었는지 검사하는 데코레이터**

매개변수 데코레이터는 단독으로 사용하는것 보다 함수 데코레이터와 함께 사용될 때 유용하게 쓰인다.

Nest 에서 API 요청 매개변수에 대해 유효성을 검사할 때 이와 유사한 데커레이터를 많이 사용한다.

```tsx
import { BasdRequestException } from '@nestjs/common';

function MinLength(min: number) {
  // 1번
  return function (target: any, propertyKey: string, parameterIndex: number) {
    target.validators = {
      // 2번
      minLength: function (args: string[]) {
        // 3번
        return args[parameterIndex].length >= min; // 4번
      },
    };
  };
}

function Validate(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  // 5번
  const method = descriptor.value; // 6번

  descriptor.value = function (...args) {
    // 7번
    Object.keys(target.validators).forEach((key) => {
      // 8번
      if (!target.validators[key](args)) {
        // 9번
        throw new BasdRequestException();
      }
    });
    method.apply(this, args); // 10번
  };
}

class User {
  private name: string;

  @Validate
  setName(@MinLength(3) name: string) {
    this.name = name;
  }
}

const test = new User();

test.setName('Keonhee'); // 11번

console.log('-------------');
test.setName('Le'); // 12번
```

1. 매개변수의 최솟값을 검사하는 매개변수 데코레이터
2. target 클래스 ( User ) 의 validators 속성에 유효성을 검사하는 함수를 할당한다.
3. args 인수는 9 번에서 넘겨받은 메서드의 인수이다.
4. 유효성 검사를 위한 로직이다. parameterIndex에 위치한 인수의 길이가 최솟값보다 같거나 큰지 검사
5. 함께 사용할 메서드 데코레이터
6. 메서드 데코레이터가 선언된 메서드를 method 변수에 임시 저장한다.
7. 설명자의 value에 유효성 검사 로직이 추가된 함수를 할당
8. target (User) 클래스에 저장해둔 validators 를 모두 수행해야 하낟. 이때 원래 메서드에 전달된 인수 (args ) 들을 각 validators에 전달
9. 인수를 validators 에 전달해 유효성 검사를 수행한다.
10. 원래의 함수를 실행한다.
11. 매개변수 name의 길이가 6 이기 때문에 문제가 없다,
12. 매개변수 name의 길이가 3 보다 작기 때문에 BadRequestException 이 발생한다.

### `**데코레이터 요약**`
