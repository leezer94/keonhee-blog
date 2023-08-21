---
author: Keonhee Lee
pubDatetime: 2023-08-21T04:03:00Z
title: Nest.js 로 배우는 백엔드 프로그래밍 Chapter 2
postSlug: nest-js-programming-chapter-2
featured: true
draft: false
tags:
  - Typescript
  - NestJs
  - Backend
description: 애플리케이션의 관문 interface
---

# Chapter 2

---

### `**컨트롤러**`

NestJS 의 컨트롤러는 MVC 패턴에서 말하는 컨트롤러를 말한다. ( 비즈니스 로직 )

컨트롤러는 들어오는 요청 ( request ) 를 받고, 처리된 결과를 응답 ( response ) 로 돌려주는 인터페이스 역할을 한다.

컨트롤러는 엔드포인트 라우팅 매커니즘을 통해 각 컨트롤러가 받을 수 있는 요청을 분류한다.

컨트롤러를 사용 목적에 따라 구분하면 구조적이고 모듈화된 소프트웨어를 작성할 수 있다.

Nest 에서는 @Query(), @Param(key? : string), @Body() 데코레이터를 이용해서 요청에 포함된 쿼리 매개변수, 패스 ( Path ) , 매개변수 본문을 쉽게 받을 수 있게 해준다.

> HTTP 메서드에는 업데이트를 위해 동작을 기술 하는 메서드가 두 가지가 있는데 `PUT` 은 리소스 전체를 교체할 때 쓰이고, `PATCH` 는 리소스의 일부를 업데이트 할때 사용한다.

string, number, boolean 과 같은 자바스크립트의 원시 타입을 리턴할 경우에는 직렬화 ( stringify ) 없이, 바로 보내지만, 객체를 리턴한다면 직렬화를 통해 JSON 형식으로 자동 변환해준다.

이 방법이 권장하는 방법이지만, 라이브러리별 응답 객체를 직접 다룰 수도 있다.

앞서 Nest 는 CRUD 에 대해 성공 응답으로 POST는 201, 그외는 200 을 보낸다.

만약 이 상태코드를 다른 값으로 바꾸려면, Nest 에서는 이를 손쉽게 적용할 수 있는

`@HttpCode` 데코레이터를 이용하면 된다.

### `**헤더**`

만약 응답에 커스텀 헤더를 추가하고 싶다면 @Header ㅔㄷ코레이터를 사용하면 된다.

```tsx
import { Header } from '@nestjs/common';

@Header('Custom', 'Test Header')
@Get('id')
findOneWithHeader(@Param('id') id : string) {
  return this.userService.findOne(+id);
}
```

### `**리디렉션**`

종종 서버가 요청을 처리한 후, 요청을 보낸 클라이언트를 다른 페이지로 이동하고 싶은 경우가 있는데, 이를 `리디렉션`이라고 한다.

응답 본문에 리디렉션할 URL 을 포함해서 클리이언트가 스스로 페이지를 이동 할 수도 있지만,

`@Redirect 데코레이터`를 사용하면 쉽게 구현이 가능하다.

```tsx
import { Redirect } from '@nestjs/common';

@Redirect('https://www.leezer-ui.com',301)
@Get(':id')
findOne(@Param('id') id : string ){
  return this.userService.findOne(+id)
}
```

### `**라우트 매개변수**`

라우트 매개변수는 패스( path ) 매개변수라고도 합니다. 이미 앞선 예제에서 사용했다.

1전 유저의 정보를 가져오려면 `https://localhost:3000/users/1` 로 요청을 한다.

여기서 1 에 `해당하는 부분이 유저 ID 인데 이는 동적으로 구성된다.`

즉, 경로를 구성하는 매개변수가 된다. 전달받은 매개변수는 인수에 @Param 데코레이터로 주입받을 수 있다.

라우트 매개변수를 전달받는 방법은 두 가지가 있는데, `먼저 매개변수가 여러 개 전달될경우 객체의 형태로 한번에 받는 방법이다.`

`이 방법은 params 의 타입이 any 가 되어 권장되지는 않는다.` 물론 매개변수의 타입이 항상 string 이기 때문에 명시적으로

`{[key : string] : string }` 타입을 지정해도 된다.

더 일반적인 방법은 다음 코드처럼 라우팅 매개변수를 따로 받는것 이다.

```tsx
@Delete(':userId/memo/:memoId')
  deleteUserMemo(
    @Param('userId') userId : string;
    @Param('memoId') memoId : string;
  ) {
     return `userId : ${userId}, memoId: ${params.memoId}`
  }
  }
```

### **`하위 도메인 라우팅`**

서버에서 제공하는 기능을 API로 외부에 공개하기로 했다고 가정합시다. 현재 회사가 사용하고 있는 도메인은 [example.com](http://example.com) 이고, API 요청은 [api.example.com](http://api.example.com)으로 받기로 했습니다.

즉, `http://example.com` `http://api.example.com` 로 들어온 요청을 서로 다르게 처리하고 싶다고 한다면,

또한 하위 도메인에서 처리하지 못하는 요청은 원래의 도메인에서 처리되도록 하고 싶다고 하자. 이런 경우 하위 도메인 라우팅 기법을 사용할 수 있다.

예를 들어, `app.controller.ts` 에 이미 루트 라우팅 경로를 가진 엔드포인드가 존재한다면, ApiController 에서도 같은 엔드포인트를 받을 수 있도록 하기 위해 ApiController 가 먼저 처리되도록 순서를 수정해야한다.

```tsx
@Module({
	// ApiController 가 먼처 처리되도록 한다.
  controllers : [ApiController, AppController],
  ...
})

export class AppModule {}
```

@Controller 데코레이터는 ControllerOptoins 객체를 인수로 받는데, host 속성에 하위 도메인을 기술하면 된다.

```tsx
@Controller({ host: 'api.example.com' }) // 하위 도메인 요청 처리 설정
export class ApiController {
  @Get()
  index(): string {
    return 'Hello, API'; // 다른 응답
  }
}
```

로컬에서 테스트를 하기 위해 하위 도메인을 api.localhost 로 지정하면, curl 명령어가 제대로 동작하지 않습니다. 이는 api.localhost가 로컬 요청을 받을 수 있도록 설정되어 있지 않기 때문인데, 이를 해결하려면

`/etc/hosts` 파일의 마지막에 127.0.0.1 api.localhost를 추가하고 서버를 다시 구동하면 된다.

```tsx
// /etc/hosts

127.0.0.1 api.localhost
127.0.0.1 v1.api.localhost
```

코드는 아래와 같이 바뀌게 된다.

```tsx
@Controller({host : 'api.localhost'}) // localhost 로 변경
export class ApiController {
  @Get()
  index: string () {
    return 'Hello World'
  }
}
```

앞서 우리는 요청 패스를 @Param 데코레이터로 받아 동적으로 처리할 수 있었는데, 유사하게 @HostParam 데코레이터를 이용하면, 서브 도메인을 변수로 받을 수 있다.

API 버저닝을 하는 방법은 여러 가지 방법이 있지만, 하위 도메인을 이용하는 방법을 많이 사용한다.

```tsx
@Controller({ host: ':version.api.localhost' }) // localhost 로 변경
export class ApiController {
  @Get()
  index(@HostParam('version') version: string): string {
    return `Hello, API ${version}`;
  }
}
```

여기서, host param이 없는 host 로 요청을 하면 기존 도메인으로 요청이 처리되는 것을 볼 수 있다.
