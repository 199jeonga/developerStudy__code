# 모던자바스크립트 DEEPDIVE - chapter 17 생성자 함수에 의한 객체 생성

객체 리터럴에 의한 객체 생성 방식은 가장 일반적이고 간단한 생성 방식이다.

하지만 이외에도 다양한 방법으로 생성할 수 있다.

# Object 생성자 함수

new 연산자와 함께 Object 생성자 함수를 호출하면 빈 객체를 생성하여 반환한다. → 프로퍼티 or 메서드를 추가하여 객체를 완성할 수 있다.

```jsx
const person = new Object();

//프로퍼티 추가
person.name = "Lee";
person.sayHello = function () {
  console.log("Hi! my name is" + this.name);
};

//{ name:"Lee", sayHello:f }
```

생성자 함수란 new 연산자와 함께 호출하여 객체(인스턴스)를 생성하는 함수를 말함

- **생성자 함수에 의해 생성된 객체를 인스턴스라고 함**

자바스크립트는 Object 생성자 함수 이외에도 `String`, `Number`, `Boolean`, `Function`, `Array`, `Date`, `RegExp`, `Promise` 등의 **빌트인 생성자 함수**를 제공

```jsx
const strObj = new String("Lee");
console.log(typeof strObj); //object
console.log(strObj); //String {"Lee"}
```

```jsx
const numObj = new Number(123);
console.log(typeof numObj); //object
console.log(numObj); //Number {123}
```

```jsx
const boolObj = new Boolean(true);
console.log(typeof boolObj); //object
console.log(boolObj); //Boolean {true}
```

```jsx
const func = new Function("x", "return x * x");
console.log(typeof func); //object
console.dir(func); // f aninymius(x)
```

```jsx
const arr = new Array(1, 2, 3);
console.log(typeof arr); //object
console.log(arr); //[1,2,3]
```

```jsx
const regExp = new RegExp(/ab+c/i);
console.log(typeof regExp); //object
console.log(regExp); ///ab+c/i
```

```jsx
const date = new Date();
console.log(typeof date); //object
console.log(date); //Mon Mat 04 2020 08:36:33 GMT+0900 (대한민국 표준시)
```

반드시!!! Object 생성자 함수를 사용해 빈 객체를 사용해야 하는 것은 아니다.

- 객체 리터럴을 사용하는 것이 더 간편하다.

# 생성자 함수

## 객체 리터럴에 의한 객체 생성 방식의 문제점

객체 리터럴에 의한 객체 생성 방식은 직관적이고 간편하다.

**하지만!!!! 객체 생성 방식은 단 하나의 객체만 생성한다.**

따라서 동일한 프로퍼티를 갖는 객체를 여러개 생성해야 하는 경우 매번 같은 프로퍼티를 기술해야 하기 때문에 비효율 적이다

```jsx
const circle1 = {
  radius: 5,
  getDiameter() {
    return 2 * this.radius;
  },
};

console.log(circle1.getDiameter()); //10

const circle2 = {
  radius: 10,
  getDiameter() {
    return 2 * this.radius;
  },
};

console.log(circle2.getDiameter()); //20
```

객체는 `프로퍼티를` 통해 **객체 고유의 상태**를 표현한다.

그리고 `메서드를` 통해 **상태 데이터인 프로퍼티를 참조하고 조작하는 동작**을 표현한다.

- 객체마다 프로퍼티 값이 다를 수 있지만 메서드 내용이 동일한 경우가 일반적임.
  - 원을 표현한 객체인 circle객체는 프로퍼티 구조가 동이라다.
  - 객체 고유의 상태 데이터인 radius 프로퍼티 값은 객체마다 다를 수 있지만 getDiameter 메서드는 완전히 동일하다.

## 생성자 함수에 의한 객체 생성 방식의 장점

마치 **객체(인스턴스)를 생성하기 위한 템플릿(클래스)처럼** 생성자 함수를 사용하여 **프로퍼티 구조가 동일한 객체 여러개를 간편하게 생성**할 수 있다.

```jsx
function Circle(radius) {
  //생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스를 가리킨다.
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

const circle1 = new Circle(5); // 반지름이 5인 Circle 객체를 생성
const cricle2 = new Circle(10);

console.log(circle1.getDiameter()); //10
```

<aside>
💡 ***this***

자신의 프로퍼티나 메서드를 참조하기 위한 **자기 참조 변수**이다.
this가 카리키는 값, 즉 this 바인딩은 함수 호출 방식에 따라 동적으로 결정된다.

| 함수 호출 방식       | this가 가리키는 값(this 바인딩)        |
| -------------------- | -------------------------------------- |
| 일반 함수로서 호출   | 전역 객체                              |
| 메서드로서 호출      | 메서드를 호출한 객체(마침표 앞의 객체) |
| 생성자 함수로서 호출 | 생성자 함수가 미래에 생성할 인스턴스   |

```jsx
function foo() {
  console.log(this);
}
foo();
//일반적인 함수로서 호출
//전역 객체는 브라우저 환경에선 window
//node.js환경에선 global을 가리킨다.
```

```jsx
const obj = { foo }; //es6 축약표현
obj.foo(); //obj
//메서드로서 호출
```

```jsx
const inst = new foo(); //inst
```

</aside>

**생성자 함수는 이름 그대로 객체(인스턴스)를 생성하는 함수**

- 일반 함수와 동일한 방법으로 생성자 함수를 정의하고 **new 연산자와 함께 호출하면 해당 함수는 생성자 함수**로 동작한다.
  - 만약 new 연산자와 함께 호출하지 않으면 일반 함수로 동작!!

```jsx
function Circle(radius) {
  //생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스를 가리킨다.
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

const dircle3 = circle(15); //undefined -> 반환문이 없어 암묵적으로 undefined 반환
console.log(radius); //15 -> 일반 함수로 호출된 circle 내 this는 전역 객체를 가리킴
```

## 생성자 함수의 인스턴스 생성과정

- 생성자 함수의 역할은 프로퍼티 구조가 동일한 인스턴스를 생성하기 위한 **템플릿(클래스)로서 동작하여 인스턴스를 생성**하는 것
- **생성된 인스턴스를 초기화(**인스턴스 프로퍼티 추가 및 초기값 할당)하는 것

→ 생성자 함수가 인스턴스를 생성하은 필수, 초기화 하는 것은 옵션

```jsx
function Circle(radius){
	//인스턴스 초기화
	this.radius = radius;
	this.getDiameter = function(){
		return 2 * this.radius;
	};
}

//인스턴스 생성
const corcle1 = new Circle(5)/;
```

생성자 함수 내부의 코드를 살펴보면 this에 프로퍼티를 추가, 필요에 따라 전달된 인수를 프로퍼티의 초기값으로서 할당 → 인스턴스 초기화

**하지만!!! 인스턴스를 생성하고 반환하는 코드는 없다.**

- 자바스크립트 엔진은 암묵적인 처리를 통하여 인스턴스를 생성하고 반환함
  - new연산자와 함께 생성자 함수를 호출하면 자바스크립트 엔진은 암묵적으로 인스턴스를 생성하고 초기화한 후 반환함

### 인스턴스 생성의 순서

1. ㅇ인스턴스 생성과 this바인딩

   <aside>
   💡 암묵적으로 빈 객체가 생성된다.  (아직 완성되진 않았지만 생성자 함수가 생성한 인스턴스!)
   암묵적으로 생성된 빈 객체, **인스턴스는 this에 바인딩된다.** *← 런타임 이전에 실행된다.*
   생성자 함수 내부의 this가 생성자 함수가 생성할 인스턴스를 가리키는 이유가 이것!

   **바인딩이란??? → 식별자와 값을 연결하는 과정**
   변수 선언은 변수 이름과 메모리 공간의 주소를 바인딩하는 것이다. this 바인딩은 this와 this가 가리킬 객체를 바인딩하는 것!!

   </aside>

2. 인스턴스 초기화

   <aside>
   💡 **생성자 함수에 기술되어 있는 코드가 한줄씩 실행되어 this에 바인딩되어 있는 인스턴스를 초기화**
   this에 바인딩되어 있는 인스턴스에 프로퍼티 or 메서드를 추가하고 생성자 함수가 인수로 받은 초기값을 인스턴스 프로퍼티에 할당하여 초기화 하거나 고정값 할당  ← 개발자가 기술

   </aside>

3. 인스턴스 반환

   <aside>
   💡 생성자 함수 내부의 모든 처리가 끝나면 완**성된 인스턴스**와 **바인딩된 this**가 암묵적으로 반환

   </aside>

```jsx
function Circle(radius) {
  //1. 암묵적으로 빈 객체가 생성되고 this에 바인딩

  //2. this에 바인딩되어 있는 인스턴스를 초기화
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
  //3. 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환
}

//인스턴스 생성, Circle생성자 함수는 암묵적으로 this를 반환
const cricle = new Circle(1);
```

만약 this가 아닌 다른 객체를 명시적으로 반환하면 this가 반환되지 못하고 return 문에 명시한 객체가 반환된다.

```jsx
function Circle(radius) {
  //1. 암묵적으로 빈 객체가 생성되고 this에 바인딩

  //2. this에 바인딩되어 있는 인스턴스를 초기화
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
  //3. 암묵적으로 this반환
  //명시적으로 객체를 반환하면 암묵적인 this반환이 무시됨
  return {};
}

//인스턴스 생성, Circle생성자 함수는 암묵적으로 this를 반환
const cricle = new Circle(1);
console.log(circle); //{}
```

하지만 명시적으로 원시값을 반환하면 원시값 반환은 무시되고 암묵적 this가 반환된다.

```jsx
function Circle(radius) {
  //1. 암묵적으로 빈 객체가 생성되고 this에 바인딩

  //2. this에 바인딩되어 있는 인스턴스를 초기화
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
  return 100;
}

//인스턴스 생성, Circle생성자 함수는 암묵적으로 this를 반환
const cricle = new Circle(1);
console.log(circle); // Circle {redius:1, getDiameter:f}
```

- 생성자 함수 내부에 명시적으로 this 외의 다른 값을 반환하는 것은 생성자 함수의 기본동작을 훼손
  - return문은 반드시 생략해야 함!!

## 내부 메서드 [Call]] 과 [[Construct]]

함수 선언문 or 함수 표현식으로 정의한 함수는 일반적인 함수로서 호출할 수 있는 것은 물론!! 생성자 함수로서 호출 할 수 있다.

→ new 연산자와 함께 호출하여 객체를 생성하는 것을 의미

- 함수는 객체이므로 일반 객체와 동일하게 동작할 수 있다.
  - 내부 슬롯, 내부 메서드를 모두 가지고 있음

```jsx
function foo() {} //함수는 객체다.

foo.prop = 10; //프로퍼티를 소유할 수 있다.

foo.method = function () {
  console.log(this.prop);
}; //메서드를 소유할 수 있다.
```

- 함수는 객체이지만 일반객체와는 다르다!!!
  - 일반 객체는 호출 할 수 없지만! 함수는 호출할 수 있다.
  - 일반 객체가 가지고 있는 `내부 슬롯`, `내부 메서드`를 가지고 있음
  - **함수로서 동작하기 위해 함수 객체만을 위한 내부슬롯과 내부메서드를 가지고 있다.**
    - `[[Environment]],` `[[FormalParameters]]` → 내부 슬롯
    - `[[Call]]`, `[[Constuctor]]` ← 내부메서드

함수가 일반 함수로서 호출되면 함수 객체의 내부 메서드 [[Call]]이 호출되고 new연산자와 함꼐 생성자 함수로서 호출되면 내부 메서드 [[Constructor]]가 호출된다.

```jsx
function foo() {}
foo(); //Call
new foo(); //Constructor
```

- 내부 메서드 [[Call]]을 갖는 함수 객체를 `callable`이라고 함
  - 호출할 수 있는 객체 → 함수를 뜻함
- 내부 메서드 [[Constructor]]를 갖는 함수 객체를 `constructor` 라고 함
  - **생성자 함수로서 호출할 수 있는 함수**
  - 내부메서드를 갖지 않으면 non-constuctor
    - 객체를 생성자 함수로서 호출할 수 없는 함수

호출할 수 없는 객체는 함수 객체가 아니므로 함수로서 기능하는 객체는 반드시 callable이어야 함!! → 모든 함수 객체는 내부 메서드 [[Call]]을 갖고 있으므로 호출 할 수 있음

- 하지만 모든 함수 객체가 [[Constuctor]]를 갖는 것은 아님
- 모든 함수 객체는 호출할 수 있지만, 모든 함수 객체를 생성자 함수로서 호출할 수 있는 것은 아님!

### constructor와 non-constuctor의 구분

자바스크립트 엔진은 함수 정의를 평가하여 함수 객체를 생성할 때 정의 방식에 따라 구분

`constructor`

- 함수 선언문, 함수 표현식, 클래스(클래스도 함수)

`non-constructor`

- 메서드, 화살표 함수

→ ECMAScript 사양에서 메서드로 인정하는 범위가 일반적인 의미보다 좁음

```jsx
//일반 함수 정의 : 함수 선언문, 함수 표현식
function foo() {}
const bar = function () {};
//프로퍼티 x의 값으로 할당된 것은 일반 함수로 정의된 함수이므로 메서드로 인정하지 않음
const baz = {
  x: function () {},
};

//일반함수로 정의된 함수만이 constuctor이다
new foo();
new bar();
new bax.x();
```

```jsx
const arrow = () => {};
new arrow(); //TypeError:arrow is not constructor

const obj = {
  x() {},
}; //메서드 -> ES6의 메서드 축약 표현만 메서드로 인정한다.
new obj.x(); //TypeError:obj.x is not constructor
```

함수를 프로퍼티 값으로 사용하면 일반적으로 메서드로 통칭하지만

- **ECMAScipt 사양에서 메서드란 ES6 축약 표현만을 의미**
- 함수가 어디에 할당되어 있는지에 따라 메서드를 파악하는 것이 아닌 정의 방식에 따라 구분

함수를 일반함수로 호출하면 함수 객체의 내부 메서드 [[Call]] 이 호출되고, new연산자와 함께 호출하면 [[Constructor]]가 호출된다.

- 하지만 non-Constuctor로 호출하면 내부메서드 constuctor를 갖지 않음. → non-... 인 함수 객체를 생성자 함수로 호출하면 에러 발생

## new연산자

일반 함수와 생성자 함수는 특별한 형식적 차이는 없다. → new연산자와 함께 함수를 호출하면 해당 함수는 생성자 함수로 동작함

- [[Call]]이 호출되는 것이 아닌 [[Constructor]]가 호출되는 것이다.

## new.target

생성자 함수가 new연산자 없이 호출되는 것을 방지하기 위해 파스칼 케이스 컨벤션을 사용한다고 하더라도 실수는 발생할 수 있다.

→ ES6에선 `new.target`을 지원한다.

`new.target`은 this와 유사하게 constuctor인 모든 함수 내부에서 **암묵적인 지역변수와 같이 사용**하게 되며 메타 프로퍼티라고 부른다.

- IE지원안함

*함수 내부에서 `new.target`*을 사용하면 new연산자와 함께 생성자 함수로서 호출되었는지를 확인할 수 있음!!

new연산자와 함께 **생성자 함수로서 호출되면 함수 내부의 new.target은 함수 자신을 가리킨다.**

- _new연산자 없이 일반 함수로서 호출된 함수 내부의 new.target은 undefiend_
- 함수 내부에서 생성자 함수로서 호출했는지를 확인하여 그렇지 않은 경우 new연산자와 함께 재귀호출을 통해 생성자 함수로서 호출할 수 있음

```jsx
//생성자 함수
function Circle(redius) {
  //이 함수가 new연산자와 함께 호출되지 않았다면 new.target은 undefined이다.
  if (!new.target) {
    //new연산자와 함께 생성자 함수를 재귀호출 하여 생성된 인스턴스를 반환
    return new Circle(radius);
  }
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

const circle = Circle(5);
//new연산자 없이 호출하여도 new.target을 통해 생성자 함수로서 호출됨
```

<aside>
💡 **스코프 세이프 생성자 패턴**

new.target은 ES6에서 도입된 최신 문법으로 IE에선 지원하지 않음
new.target을 사용할 수 없는 상황이라면 스포크 세이프 생성자 패턴을 사용하면 됨

```jsx
// 생성자 함수가 new연산자와 함께 호출되면 함수의 선두에서 빈 객체를 생성하고
// this에 바인딩한다.
// 이때 this의 Cricle은 프로토타입에 의해 연결됨

function Circle(radius) {
  //이함수가 new연산자와 함께 호출되지 않았다면 이 시점의 this는 window를 가리킨다.
  //즉 this와 Circle는 프로토타입에 의해 연결되지 않았다.
  if (!(this instanceof Circle)) {
    return new Circle(radius);
  }
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}
```

`instanceof` 연산자는 생성자의 prototype 속성이 객체의 프로토타입 체인 어딘가 존재하는지 판별합니다.

</aside>

빌트인 생성자 함수(Object, Number, String, Boolean, Date, Array, Function, RegExp, Promise)는 ne연산자와 함께 호출되었는지를 확인한 후 적절한 값을 반환

- Object, Function의 생성자 함수는 new연산자 없이 호출해도 new연산자와 함꼐 호출했을 때와 동일하게 동작

```jsx
let obj = new Object(); //{}
obj = Object(); //{}

let f = new Function("x", "return x **x"); //f anonymous(x) {return x ** x}
f = Function("x", "return x **x"); //f anonymous(x) {return x ** x}
```

- String, Number, Boolean 생성자 함수는 new연산자와 함꼐 호출했을 때 객체를 생성하여 반환하지만
- new연산자 없이 호출하면 문자열, 숫자, 불리언 값을 반환 → 데이터 타입을 변환하기도 함
