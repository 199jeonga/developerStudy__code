# 모던자바스크립트 DEEPDIVE - chapter 19 프로토타입

자멀티 패러타임 프로그래밍 언어

- 명령형
- 함수형
- 프로토타입 기반
- 객체지향 프로그래밍

<aside>
💡 ***클래스***

ES6에서 클래스가 도입되었다. (하지만 기존의 프로토타입 기반 객체지향 모델을 폐지하고 새로운 객체지향 모델을 제공하는 것은 아님!! 클래스도 함수 → 기존 프로토타입 기반 패턴의 문법적 설탕)

**_클래스와 생성자 함수는 모두 프로토타입 기반의 인스턴스를 생성 → But!! 동일한 작동은 아님_**

- 클래스는 생성자 함수보다 엄격하며 보다 많은 기능을 제공
- 문법적 설탕으로 보기보단 새로운 객체 생성 메커니즘으로 보는 것이 더 합당함

</aside>

자바스크립트는 객체 기반의 프로그래밍 언어

- 자바스크립트를 이루는 거의 모든 것이 객체
- 원시 타입의 값을 제외한 나머지(함수, 배열, 정규 표현식 etc.)

# 객체지향 프로그래밍

프로그램을 **명령어 또는 함수의 목록**으로 보는 전통적인 명령형 프로그래밍의 절차지향적 관점에서 벗어나 **여러개의 독립적인 단위(객체의 집합)**로 프로그램을 표현하려는 프로그래밍 패러다임을 말함

- 실세계의 실체(사물이나 개념)을 인식하는 철학적 사고를 프로그래밍에 접목하려는 시도에서 시작
  - 실체는 특징이나 성질을 나타내는 속성(attribute, property)을 가지고 있고 이를 통해 실체를 인식, 구별 가능
  - **다양한 속성 중 프로그램에 필요한 속성만 간추려 내어 표현하려는 것을 추상화라고 함**
  - 프로그래머(주체)는 속성으로 표현된 객체를 다른 객체와 구별하여 인식할 수 있다. → **속성을 통해 여러개의 값을 하나의 단위로 구성한 복잡적인 자료구조**를 `객체`라고 함
    - `객체지향 프로그래밍`
    - 독립적인 객체의 집합으로 프로그램을 표현하려는 프로그래밍 패러다임
    - 객체의 **상태(State)를 나타내는 데이터(`프로퍼티`)**와 상태 데이터를 조작할 수 있는 **동작(be-havior)(`메서드`)**을 하나의 논리적인 단위로 묶어 생각한다.
    - 객체는 상태 데이터와 동작을 하나의 논리적인 단위로 묶은 복합적인 자료구조
  - 객체는 고유의 기능을 갖는 독립적인 부품 및 자신의 고유한 기능을 수행하며 다른 객체와 관계성을 가질 수 있음
    - 메세지 주고 받기, 데이터 처리, 데이터나 동작 상속

# 상속과 프로토타입

객체지향 프로그래밍의 핵심 개념으로 어떤 객체의 프로퍼티 또는 메서드를 다른 색체가 상속받아 그대로 사용할 수 있는 것

- 프로토타입을 기반으로 상속을 구현하여 불필요한 중복을 제거함
  - 기존의 코드를 적극적으로 재사용하는 것

```jsx
function Circle(radius) {
  this.radius = radius;
  this.getArea = function () {
    //Math.PI는 원주율을 나타내는 상수
    return Math.PI * this.radius ** 2;
  };
}
const circle1 = new Circle(1); //반지름이 1인 인스턴스 생성
const circle2 = new Circle(2); //반지름이 2인 인스턴스 생성

//Circle 생성자 함수는 인스턴스를 생성할 때마다 동일한 동작을 하는 getArea 메서드를 중복 생성하고 모든 인스턴스가 중복 소유 한다.
//getArea 메서드는 하나만 생성하여 모든 인스턴스가 공유해서 사용하는 것이 바람직하다.

console.log(circle1.getArea === circle2.getArea); //false

console.log(circle1.getArea());
console.log(circle2.getArea());
```

생성자 함수는 동일한 프로퍼티 구조를 갖는 객체를 여러개 생성할 때 유용하다.

하지만!!! 위 예제의 생성자 함수는 문제가 있다.

Cricle 생성자 함수가 생성하는 모든 객체는 radius 프로퍼티와 getArea 메서드를 갖는다.

- **radius 프로퍼티 값은 일반적으로 인스턴스마다 다르다.**
- **getArea 메서드는 모든 인스턴스가 동일한 내용의 메서드를 사용한다.**
  - 단 하나만 생성하여 모든 인스턴스가 공유해서 사용하는 것이 바람직하다.
  - 하지만 지금은 인스턴스를 생성할 때마다 getArea 메서드를 중복 생성하고 모든 인스턴스가 중복 소유함

**_→ 불필요한 메모리 낭비 & 퍼포먼스 악역향_**

프로토타입을 기반으로 상속을 구현하여!! 불필요한 중복을 제거!!

```jsx
function Circle(radius) {
  this.radius = radius;
}

//Cricle생성자 함수가 생성한 모든 인스턴스가 getArea 메서드를 공유해 사용할 수 있도록 프로토타입에 추가한다.
//프로토타입은 Cricle 생성자 함수의 prototype 프로퍼티에 바인딩 되어 있다.
Circle.prototype.getArea = function () {
  return Math.PI * this.radius ** 2;
};

const circle1 = new Circle(1);
const circle2 = new Circle(2);

//Circle 생성자 함수가 생성한 모든 인스턴스는 부모 객체의 역할을 하는 프로토타입 Circle.prototpye으로부터 getArea를 상속받는다.
//즉, Cricle 생성자 함수가 생성하는 모든 인스턴스는 하나의gerArea 메서드를 공유한다.

console.log(circle1.getArea === circle2.getArea); //true
```

Circle생성자 함수가 생성한 모든 인스턴스는 자신의 프로토타입, 상위 객체 역할을 하는 Circle.prototype의 모든 프로퍼티와 메서드를 상속받는다.

- getArea 메서드는 단 하나만 생성되어 프로토타입인 `Circle.prototype의 메서드로 할당`되어 있음
- 따라서 Circle 생성자 함수가 생성하는 모든 인스턴스는 getArea 메서드를 상속받아 사용할 수 있음
- 즉, 자신의 상태를 나타내는 radius 프로퍼티만 개별적으로 소유, 내용이 동일한 메서드는 상속을 통해 공유하고 사용

**상속은 재사용이란 관점에서 매우 유용!!**

생성자 함수가 **생성할 모든 인스턴스가 공통적으로 사용할 프로퍼티나 메서드**를 프로토타입에 미리 구현해두면 생성자 함수가 생성할 모든 인스턴스는 **_별도의 구현없이 상위 객체인 프로토타입의 자신을 공유_**하여 사용할 수 있음.

# 프로토타입 객체

객체지향 프로그래밍의 근간을 이루는 객체간 상속을 구현하기 위해 사용

`프로토타입은` 어떤 객체의 상위 객체의 역할을 하는 객체로서 **다른 객체에 공유 프로퍼티(메서드 포함)을 제공!**

- 프로토타입을 상속받은 하위 객체는 상위 객체의 프로퍼티를 자신의 프로퍼티처럼 자유롭게 사용할 수 있다.

- 모든 객체는 [[Prototype]] 이라는 내부 슬롯을 가짐
  - 이 내부슬롯의 값이 프토로타입의 참조(null)인 경우도 있다.
- [[Prototype]]에 저장되는 프로토타입은 **객체 생성 방식에 의해 결정**된다.
  - 객체가 생성될 때 객체 생성방식에 따라 결정되고, 저장됨

**예를들어 —————**

- `객체 리터럴`에 의해 생성된 객체의 프로토타입은 **Object.prototype** 이다.
- `생성자 함수`에 의해 생성된 객체의 프로토타입은 **생성자 함수의 prototype에 바인딩**되어 있는 객체

- 모든 객체는 하나의 프로토 타입을 갖는다
- 모든 프로토타입은 생성자 함수와 연결되어 있다.

<aside>
💡 **일반객체 ↔ 생성자함수.prototype**
`일반 객체` : [[Prototype]] 내부 슬롯에 직접 접근할 수는 없지만 `__proto__` 접근자 프로퍼티를 통해 자신의 프로토타입(내부 슬롯이 가리키는 프로토타입)에 간접적으로 접근 가능

**생성자 함수 ↔ 생성자함수.prototype**
`생성자함수.prototype` : 자신의 constuctor 프로퍼티를 통해 생성자 함수에 접근
`생성자 함수`는 자신의 prototype프로퍼티를 통해 프로토타입에 접근할 수 있음

</aside>

## ** proto ** 접근자 프로퍼티

모든 객체는 `__proto__` 접근자 프로퍼티를 통해 자신의 프로토타입 (`[[Protytype]]`) 내부 슬롯에 간접적으로 접근할 수 있다.

`접근자 프로퍼티`

- 내부슬롯은 프로퍼티가 아니다.
- 자바스크립트는 원칙적으로 내부 슬롯과 내부 메서드에 직접적으로 접근 및 호출하는 방법을 제공하지 않음
  - 일부 내부슬롯과 내부 메서드에 한해 간접적으로 접근할 수 있는 수단을 제공
  - [[prototype]]에 직접적으로 접근할 수 없으면 접근자 프로퍼티(`__proto__`)를 통해 간접적으로 접근할 수 있다.
- 접근자 프로처티는 자체적으로 값(`[[Value]] 프로퍼티 어트리뷰트`)을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 사용하는 접근자 함수(`[[Get]], [[Set]]`)로 구성된 프로퍼티
- getter, setter 함수라고 부르는 **접근자 함수를 통해 프로토타입에 접근**하면 내부적으로 `__proto__` 프로퍼티의 **gertter 함수인 [[Get]]가 호출**된다.
- 접근자 프로퍼티를 통해 **새로운 프로토타입을 할당**하면 접근자 프로퍼티의 **setter 함수인 [[Set]] 이 호출**된다.

```jsx
const obj = {};
const parent = { x: 1 };

//getter 함수인 get __proto__가 호출되어 obj 객체이 프로토타입을 취득
obj.__proto__;

//setter 함수인 set __proto__가 호출되어 obj 객체의 프로토타입을 교체
obj.__proto__ = parent;

console.log(obj.x); //1
```

**_proto_ 접근자 프로퍼티는 상속을 통해 사용된다.**

- 객체가 직접 소유하는 프로퍼티가 아닌, Object.prototype의 프로퍼티이다.
- 모든 객체는 상속을 통해 Object.prototype.**proto** 접근자 프로퍼티를 사용할 수 있다.

```jsx
const person = { name: "Lee" };

// person 객체는 __proto__ 프로퍼티를 소유하지 않음
console.log(person.hasOwnProperty("__proto__")); //false

//__proto__ 프로퍼티는 모든 객체의 프로토타입 객체인 Object.prototype의 접근자 프로퍼티다.
console.log(Object.getOwnPropertyDescriptor(Object.prototype, "__proto__"));
//{get:f, set:f, enumerable:false, configurable:true}

//모든 객체는 Object.prototype의 접근자 프로퍼티 __proto__를 상속받아 사용할 수 있다.
console.log({}.__proto__ === Object.prototype); //true
```

<aside>
💡 **Object.prototype**

모든 객체는 프로토타입의 계층 구조인 프로토타입 체인에 묶여 있다.
자바스크립트 엔진은 객체의 프로퍼티(메서드 포함)에 접근하려고 할때 해당 객체에 프로퍼티가 없다면 **proto ** 접근자 프로퍼티가 가리키는 참조를 따라 자신의 부모 역할을 하는 프로토타입의 프로퍼티를 순차적으로 검색

프로토타입 체인의 최상위 객체는 Object.prototype이며, 이 객체의 프로퍼티와 메서드는 모든 객체에 상속된다.

</aside>

1. `**__proto__` 접근자 프로퍼티를 통해 프로토타입에 접근하는 이유\*\*

**[[Prototype]] 내부슬롯의 값 즉, 프로토타입에 접근하기 위해 접근자 프로퍼티를 사용하는 이유**

- 상호 참조에 의해 프로토타입 체인이 생성되는 것을 방지하기 위해서

```jsx
const parent = {};
const child = {};

//child 의 프로토타입을 parent로 설정
child.__proto__ = parent;
//parent의 프로토타입을 child로 설정
parent.__proto__ = child; //typeError : cyclic __proto__ value
```

parent 객체를 child 객체의 프로토타입으로 설정한 후, child 객체를 parent 객체의 프로토타입으로 설정하였다.

- 에러없이 정상적으로 처리되면 서로가 자신의 프로토타입이 되는 비정상적인 프로토타입 체인이 만들어지기 때문에 **proto ** 접근자 프로퍼티는 에러를 발생시킨다.

**프로토타입 체인은 단방향 링크드 리스트로 구현되야 함**

- 검색 방향이 한쪽 방향으로만 흘러가야 함
- 위 예제와 같이 서로의 프로토타입이 되는 비정상적인 프로토타입 체인 → `순환참조가` 발생하면 프로토타입 종점이 존재하지 않기 때문에 **무한루프에 빠진다.**
- 아무런 체크 없이 무조건적으로 프로토타입을 교체할 수 없도록 `__proto__` 접근자 프로퍼티를 통해 프로토타입에 접근하고 교체하도록 구현되어 있다.

1. **`__proto__` 접근자 프로퍼티를 코드 내에서 직접 사용하는 것은 권장하지 않는다.**

- ES5까지 접근자 프로퍼티는 비표준이었다.
  - 하지만 일부 브라우저에서 `__proto__` 를 지원하고 있었기 때문에 브라우저 호환성을 고려하여 표준으로 채택
  - IE11이상 & 대부분의 브라우저에서 지원
- 하지만 코드 내에서 접근자 프로퍼티를 직접 사용하는 것을 권장하지 않는다.
  - 모든 개체가 접긎자 프로퍼티를 사용할 수 있는 것이 아님!!
  - 직접 상속을 통해 Object.prototype을 상속받지 않는 객체를 생성할 수 있기 때문

```jsx
//obj는 프로토타입 체인의 종점 -> Object.__proto__를 상속받을 수 없다.
const obj = Object.create(null);
console.log(obj.__proto__); //undefiened

//__proto__가 아닌 Object.getPrototypeOf를 사용해야 함
console.log(Object.getPrototypeOf(obj)); //null
```

- 참조를 취득하고 싶은 경우 : `Object.getPrototyleOf`
- 프로토타입을 교체하고 싶은 경우 : `Object.setPrototypeOf`

```jsx
const obj = {};
const parent = { x: 1 };
Object.getPrototypeOf(obj); //obj.__proto__;
Object.setPrototypeOf(obj, parent); //obj.__proto__ = parent;
```

**처리내용이 정확히 일치! ↔ ↔ ↔**

`Object.getPrototypeOf` (ES5에서 도입된 메서드) == `get Object.prototype.__proto__`

`Object.setPrototypeOf` (ES6에서 도입된 메서드) == `set Object.prototype.__proto_`

## 함수 객체의 prototype 프로퍼티

**함수 객체**만이 소유하는 `prototype` 프로퍼티는 **생성자 함수가 생성할 인스턴스의 프로토타입**을 가리킨다.

```jsx
//함수 객체는 prototype 프로퍼티를 소유한다.
(function () {}
  .hasOwnProperty("prototype")
  (
    //true

    //일반 객체는 prototype을 소유하지 않는다.
    {}
  )
  .hasOwnProperty("prototype")); //false
```

prototype 프로퍼티는 **생성자 함수가 생성할 객체(인스턴스)의 프로토 타입을 가리킨다.**

- 생성자 함수로처 호출할 수 없는 함수 (non-constuctor - 화살표, ES6 메서드 축약표현으로 정의한 메서드)는 prototype 프로퍼티를 소유하지 않으며, 프로토타입도 생성하지 않는다.

```jsx
//화살표 함수는 non-constructor
const Person = (name) => {
  this.name = name;
};
person.hasOwnProperty("prototype"); //false
person.ptorotype; //undefined

//ES6의 메서드 축약 표현으로 정의한 메서드는 non-constructor이다.
const obj = {
  foo() {},
};
obj.hasOwnProperty("prototype"); //false
obj.foo.ptorotype; //undefined
```

생성자 함수로 호출하기 위해 정의하지 않은 일반함수(함수 선언문, 함수 표현식)도 prototype 프로퍼티를 소유함

- 하지만 객체를 생성하지 않는 일반함수의 prototype 프로퍼티는 의미 없음

- 모든 객체가 가지고 있는(Object.prototype으로부터 상속받은) `__proto__` 접근자 프로퍼티
- 함수 객체만이 가지고 있는 `prototype` 프로퍼티

**는 동일한 프로토타입을 가리키만 프로퍼티를 사용하는 주체가 다르다!!!!**

| 구분                     | 소유        | 값                | 사용주체    | 사용목적                                                                     |
| ------------------------ | ----------- | ----------------- | ----------- | ---------------------------------------------------------------------------- |
| **proto** 접근자프로퍼티 | 모든 객체   | 프로토타입의 참조 | 모든 객체   | 객체가 자신의 프로토타입에 접근 또는 교체하기 위해 사용                      |
| prototype 프로퍼티       | constructor | 프로토타입의 참조 | 생성자 함수 | 생성자 함수가 자신이 생성할 객체(인스턴스)의 프로토타입을 할당하기 위해 사용 |

예를 들어 생성자 함수로 객체를 생성한 후 프로토타립에 접근할 때

```jsx
function Person(name) {
  this.name = name;
}
const me = new Person("Lee");

console.log(Person.prototype === me.__proto__); //true
//결국 Person.prototype과 me.__proto__는 동일한 프로토타입을 가짐
```

## 프로토타입의 constuctor 프로퍼티와 생성자 함수

모든 프로토타입은 constuctor 프로퍼티를 갖는다.

- `constuctor` 프로퍼티는 `prototype프로퍼티로` **자신을 참조하고 있는 생성자 함수**를 가리킴
  - 생성자 함수가 생성될 때, 함수 객체가 생성될 때 이뤄짐

```jsx
function Person(name) {
  this.name = name;
}
const me = new Person("Lee");

console.log(me.constuctor === Person); //true
// me 객체의 생성자 함수는 Person이다
```

me 객체에는 constuctor 프로퍼티가 없지만

**me 객체의 프로토타입**인 `Person.prototype`에는 constuctor 프로퍼티가 있다.

따라서 me 객체는 프로토타입인 Person.prototype의 **constuctor 프로퍼티를 상속받아 사용할 수 있다.**

# 리터럴 표기법에 의해 생성된 객체의 생성자 함수와 프로토타입

생성자 함수에 의해 생성된 인스턴스는 프로토타입의 constuctor 프로퍼티에 의해 생성자 함수와 연결된다.

이때 `constructor` 프로퍼티가 가리키는 생성자 함수는 `인스턴스를 생성한 생성자 함수`이다.

```jsx
//obj 객체를 생성한 생성자 함수는 Object다.
const obj = new Object();
console.log(obj.constuctor === Object); //true

//add 함수 객첼ㄹ 생성한 생성자 함수는 Function이다.
const add = new Function("a", "b", "return a+b");
console.log(add.constructor === Function); //true

//생성자 함수
function Person(name) {
  this.name = naem;
}
//me 객체를 생성한 생성자 함수는 Person이다
const me = new Person("Lee");
console.log(me.constuctor === Person); //true
```

하지만 리터럴 표기법에 의한 객체 생성 방식과 같이 명시적으로 new 연산자와 함꼐 생성자 함수를 호출하여 인스턴스를 생성하지 않은 객체 생성방식도 있음

```jsx
//리터럴 표기법에 의해 생성된 객체도 프로토 타입이 존재
//하지만!! 프로토타입의 constructor가 가리키는 생성자 함수가 반드시 객체를 생성한 생성자 함수라고 단정지을 수는 없음

const obj = {};
const add = function (a, b) {
  return a + b;
};
const arr = [1, 2, 3];
const regexp = /is/gi;

//하지만! objㅇ객체의 생성자 함수는 Object 생성자 함수이다.
obj.constuctor === Object; //true
```

- Object 생성자 함수에 인수를 전달하지 않거나 undeined or null을 인수로 전달하면서 호출하면 내부적으로 추정연산 `OrdinaryObjectCreate`를 호출하여 **Object.prototype을 프로토타입으로 갖는 빈객체를 생성**

<aside>
💡 ***추상연산***
ECMAScript 사양에서 내부 동작의 구현 알고리즘을 표현한 것
→ 설명을 위해 사용되는 함수와 유사한 의사코드

</aside>

```jsx
// 2. Object 생성자 함수에 의한 객체 생성
// 인수가 전달되지 않았을 때 추상 연산 OrdinaryObjectCreate를 호출하여 빈 객체를 생성
let obj = new Object();
console.log(obj); //{}

// 1. new.target이 undefined나 Object가 아닌 경우
// 인스턴스 -> Foo.prototype -> Object.prototype 순으로 프로토타입 체인이 생성된다.
class Foo extends Object {}
new foo(); // foo{}

// 3. 인수가 전달된 경우에는 인수를 객체로 변환한다.
// Number 객체 생성
obj = new Object(123); //Number {123}

//String 객체 생성
obj = new Object("123"); //String {"123"}
```

객체 리터럴이 평가될 때 추상연산을 호출하여(`OrdinaryObjectCreate`) 빈 객체를 생성하고 프로퍼티를 추가하도록 정의되어 있다.

- **Object 생성자 함수 호출**과 **객체 리터럴의 평가**는 추상 연산을 호출하여 빈 객체를 생성하는 점에서는 동일
- new.target의 확인이나 프로퍼티를 추가하는 처리 등 세부 내용은 다르다.
- 객체 리터럴에 의해 생성된 객체는 Object 생성자 함수가 생성한 객체가 아니다.

**Function 생성자 함수를 호출하여 생성한 함수**

- 렉시컬 스코프를 만들지 않고
- 전역 함수인것처럼 스코프를 생성하며
- 클로저도 만들지 않음!!

→ 함수 선언문과 함수 표현식을 평가하여 함수 객체를 생성한 것은 Fucntion 생성자 함수가 아님

→ 하지만 constuctor를 통해 화긴했을 때 foo 함수의 생성자 함수는 Function 생성자 함수임

```jsx
//foo 함수는 Function 생성자 함수로 생성한 함수 객체가 아니라 함수 선언문으로 생성
function foo() {}

//하지만 Constructor 프로퍼티를 통해 확인해 보면 함수 foo의 생성자 함수는 Function 생성자 함수다.
console.log(foo.constructor === Function); //true
```

리터럴 표기법에 의해 생성된 객체도 상속을 위해 프로토타입이 필요하다.

- 리터럴 표기법에 의해 생성된 객체도 가상적인 생성자 함수를 가짐

프로토타입은 생성자 함수와 더불어 생성 → porototype, constructor 프로퍼티에 의해 연결되어 있음

**프로토타입과 생성자 함수는 단독으로 존재할 수 없고 언제나 쌍으로 존재함**

리터럴 표기법(객체 리커럴, 함수 리터럴, ㅐ열 리터럴, 정규 표현식 리터럴 등)에 의해 생성된 객체는 생성자 함수에 의해 생성된 객체는 아니지만 큰 틀에서 보면 **리터럴 표기법으로 생성한 객체도 생성자 함수로 생성한 객체와 본질적인 면에서 큰 차이는 없음**

→ e.g 객체 리터럴에 의해 생성한 객체와 Object 생성자 함수에 의해 생성한 객체는 생성과정에 미묘한 차이는 존재하지만 동일한 특성을 가짐

- 생성과정, 스코프, 클로저 등의 차이는 있으나 함수로서 동일한 특성을 가짐

**constructor 프로퍼티를 통해 연결되어 있는 생성자 함수**를

**리터럴 표기법으로 생성한 객체를 생성한 생성자 함수로 생각**해도 큰 무리는 없음

| 리터럴 표기법      | 생성자 함수 | 프로토타입         |
| ------------------ | ----------- | ------------------ |
| 객체 리터럴        | Object      | Object.prototype   |
| 함수 리터럴        | Function    | Function.prototype |
| 배열 리터럴        | Array       | Array.prototype    |
| 정규 표현식 리터럴 | RegExp      | RegExp.prototype   |

d
