# Chapter 3

---

### `**프로바이더**`

컨트롤러는 요청과 응답을 가공하고 처리하는 역할을 맡는다.

하지만, 서버가 제공하는 핵심 기능은 전달받은 데이터를 어떻게 비즈니스 로직으로 해결하는 가 이다.

앱이 제공하고자 하는 핵심 기능, 즉 비즈니스 로직을 수행하는 역할을 하는 것이 `**프로바이더**` 이다.

컨트롤러가 이 역할을 수행할 수도 있겟지만, 소프트웨어 구조상 분리해두는 것이 `**단일 책임 원칙` ( single responsibility principle, SRP )\*\* 에 부합할 것이다.

그렇지 않다면, 소스코드는 뒤죽박죽 스파게티 처럼 될 것이다.

프로바이더는 `서비스 ( service )`, `저장소 ( repository )` , `팩터리 ( factory )`, `헬퍼 ( helper )`

등 여러가지 형태로 구현이 가능하다.

Nest 에서 제공하는 `프로바이더의 핵심은 의존성을 주입할 수 있다는 점이다. 의존성을 주입하기 위한 라이브러리가 많이 있지만`, Nest 가 이를 제공해주기 때문에, 손쉽게 사용할 수 있다.

> 의존성 주입 ( Dependency Injection, DI ) 은 OOP 에서 많이 활용하는 기법이다. 의존성 주입을 이용하면, 객체를 생성하고 사용할때 관심사를 분리할 수 있다. 이는 코드 가독성과 재사용성이 높은 SW 를 만들 수 있도록 도와준다.

컨트롤러는 비즈니스 로직을 직접 수행하지는 않는다. 컨트롤러에 연결된 `서비스` 클래스에서 이를 수행한다.

아래의 코드는 아직 데이터베이스를 연결하지 않았기 때문에 UserService 내부의 코드는 문자열을 리턴하는 임시 코드만 작성되어 있지만, UserService 에 어떻게 작업을 위임하는지 보여준다.

```tsx
@Controller('users')
export class UsersController {
    constructor(private readonly usersService : UsersService) {}
    ...

    @Delete(':id')
    remove(@Param('id') id : string) {
        return this.usersService.remove(+id)
    }
}
```

```tsx
import { Injectable } from '@nestjs/common'

@Injectable()
export class UsersService {
    ...

    remove(id : number) {
        return `This action removes a #${id} user`
    }
}
```

위의 코드에서 @Injectable 데코레이터를 주목하자, UsersService 클래스에 이 데코레이터를 선언함으로써 다른 어떤 Nest 컴포넌트에서도 주입할 수 있는 프로바이더가 됩니다.

별도의 스코프( scope ) 를 지정해주지 않으면 일반적으로 싱글턴 인스턴스 가 생성된다.

### `**프로바이더 등록과 사용**`

`**프로바이더 등록**`

프로바이더 인스턴스 역시 모듈에서 사용할 수 있도록 등록을 해줘야 한다. 자동 생성된 코드에서 UsersModule 모듈에 등록해둔 것을 볼 수 있다.

```tsx
@Module({
    ...
    providers : [UsersService]
})

export class UsersModule {}
```

`**속성 기반 주입**`

지금까지는 생성자를 통해 프로바이더를 주입받았습니다. 하지만 프로바이더를 직접 주입받아 사용하지 않고 상속 관계에 있는 자식 클래스를 주입받아 사용하고 싶은 경우가 있습니다. 레거시 클래스를 확장한 새로운 클래스르 만드는 경우 새로 만든 클래스를 프로바이더로 제공하고 싶은 경우이다.

이럴때는 자식 클래스에서 부모 클래스가 제공하는 함수를 호출하기 위해서는 부모 클래스에서 필요한 프로바이더를 super()를 통해 전달해주어야 한다.

```tsx
// base-service.ts

//@Injectable이 선언되어 있지 않다. BaseService 클래스를 직접 참조하지 않기 때문이다.

export class BaseService {
    constructor (private readonly serviceA : ServiceA) {}

    getHello().: string {
        return 'Hello World Base'
    }
    doSomeFuncFromA() : string {
        return this.serviceA.getHello()
    }
}
```

```tsx
// service-A.ts

@Injectable()
export class ServiceA {
  getHello(): string {
    return 'Hello World A';
  }
}
```

```tsx
// service-B.ts

@Injectable()
export class ServiceB extends BaseService {
  getHello(): string {
    return this.doSomeFuncFromA;
  }
}
```

만약 컨트롤러에서 ServiceB 를 주입하고, getHello() 를 호출한다면 이는 BaseService 의 doSomeFuncA 함수를 호출하게 된다.

하지만, BaseService는 주입을 받을 수 있는 클래스로 선언되어 있지 않기 때문에 Nest의 IoC 컨테이너는 생성자에 선언된 ServiceA 를 주입하지 않는다.

이 상태에서 컨트롤러에 서비스를 호춯하는 엔드포인트를 만들고 작동을 해보면 에러가 발생한다.

```tsx
@Controller()
export class AppController {
  constructor(private readonly serviceB: ServiceB) {}

  @Get('/serviceB')
  getHelloC(): string {
    return this.serviceB.getHello();
  }
}
```

```tsx
@Injectable()
export class ServiceB extends BaseService {
  constructor(private readonly _serviceA: ServiceA) {
    super(_serviceA);
  }

  getHello(): string {
    return this.doSomFuncFromA;
  }
}
```

1 번의 경우에서 콘솔에 찍혀있는 콜 스택을 보니 this.serviceB 라는 객체가 undefined 라는 것을 알 수 있다.

이 문제를 해결하기위해서 2 번과 같이 ServiceB 에서 super 을 통해 ServiceA 의 인스턴스를 전달해줘야 한다.

이렇게 매번 super로 필요한 프로바이더를 전달하는 방식은 매우 번거로운데 이럴때는 `속성 기반 프로바이더를` 이용할 수 있다.

```tsx
export class BaseService {
    @Inject(ServiceA) private readonly serviceA : ServiceA;
    ...

    doSomeFuncFromA() : string {
        return this.serviceA.getHello()
    }
}
```

BaseService 클래스의 serviceA 속성에 @Inject 데코레이터를 달아준 후, 데코레이터의 인수는 타입, 문자열, 심벌을 사용할 수 있다.

어떤 걸 쓸 지는 프로바이더가 어떻게 정의되었느냐에 따라 달라진다.

@Injectable이 선언된 클래스는 클래스 이름 탕비을 쓰면 된다.

문자열과 심벌은 커스텀 프로바이더일 경우 사용한다.

> 상속관계에 있지 않는 경우는 속성 기반 주입을 사용하지 말고 생성자 기반 주입을 사용하는것을 권장한다.
