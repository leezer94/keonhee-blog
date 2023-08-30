# Chapter 4

---

# `**SW 복잡도를 낮추기 위한 모듈 설계**`

## `모듈 : 응집성 있는 설계`

일반적으로 모듈이라고 하면 조그만 클래스나 함수처럼 한 가지 일만 수행하는 소프트웨퍼 컴포넌트가 아니라, 여러 컴포넌트를 조합하여 좀더 큰 작업을 수행할 숭 있게 하는 단위를 말한다.

- 음식 배달 서비스에서 유저의 정보를 관리하고 로그인을 처리하는 `UsersModule`
- 유저의 주문을 저장하고 주문 상태를 관리하는 `OrdersModule`
- 가게 사장님과의 채팅 기능을 담당하는 `ChatModule`

Nest 애플리케이션이 실행되기 위해서는 하나의 루트 모듈이 존재하고 이 루트 모둘은 다른 모듈들로 구성된다.

이렇게 모듈로 쪼개는 이유는 **여러 모듈에 각기 맡은 바 책임을 나누고 응집도를 높이기 위함이다.**

또한 마이크로 서비스 아키텍쳐 ( MSA ) 의 관점에서 모듈이 커지면 하나의 마이크로서비스로 분리할 수도 있을 것이다.

모듈을 어떻게 나눌 것인지에대해 명확한 기준은 없지만, 설계를 하면서 또는 서비스가 커져가면서 유사한 기능끼리 모듈로 묶어야 하게 될 것이다.

모듈은 `@Module 데코레이터`를 사용한다.

`@Module 데코레이터` 의 인수로 ModuleMetadata 를 받는데 정의는 다음과 같다.

```tsx
import {
  DynamicModule,
  ForwardReference,
  ModuleMetadata,
} from '@nestjs/common';
import { Provider } from 'react';

export declare function Module(metadata: ModuleMetadata): ClassDecorator;

export interface ModuleMetadata {
  imports?:
    | Array<Type<any>>
    | DynamicModule
    | Promise<DynamicModule>
    | ForwardReference;
  controllers?: Type<any>[];
  providers?: Provider[];
  exports?:
    | Array<DynamicModule | Promise<DynamicModule>>
    | string
    | symbol
    | Provider
    | ForwardReference
    | Abstract<any>
    | Function;
}
```

- `imports` : 이 모듈에서 사용하기 위한 프로바이더를 가지고 있는 다른 모듈을 가져온다.
- `controllers / provider` : 모듈 전반에서 컨트롤러와 프로바이더를 사용할 수 있도록 Nest 가 객체를 생성하고 주입할 수 있게 해준다.
- export :이 모듈에서 제공하는 컴포넌트를 다른 모듈에서 가져오기 ( imports ) 해서 사용하고자 한다면 모듈을 내보내기 ( export ) 해야한다.

### `전역 모듈`

Nest 는 모듈 범위 내에서 프로바이더를 캡슐화 한다. 따라서 어떤 모듈에 있는 프로바이더를 사용하려면 모듈을 먼저 가져와야 한다. 하지만 헬퍼와 같은 공통 기능이나 DB 연결과 같은 전역적으로 쓸 수 있어야 하는 프로바이더가 필요한 경우가 있다. 이런 프로바이더를 모아 전역 모듈로 제공하면 된다.

전역 모듈을 만드는 방법은 `@Global 데코레이터`만 선언하면 된다. 하지만, 전역 모듈은 루트 모듈이나 코어 모듈에서 한번만 등록하여야 한다.

보통의 객체지향의 개념에서 전역 모듈을 만드는것이 SW 구조상 좋지 않다는 것을 알고 있다. 모듈은 응집도를 높이기 위함이라 했는데 모든 것을 전역으로 만들면 기능이 어디에나 종속된다는 뜻이므로 응집도가 떨어지게 될 것이다.
