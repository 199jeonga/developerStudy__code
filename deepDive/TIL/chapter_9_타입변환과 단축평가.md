# 타입변환과 단축 평가

## 타입변환이란?

자바스크립트의 모든 값은 타입이 있다.
`명시적 타입변환`, `타입 개스팅` : 개발자의 의도에 따라 타입이 변환될 때

- `const string = number.toString();`
  `암묵적 타입변환`, `타입 강제 변환` : 개발자의 의도에 관계 없이 암묵적으로 타입이 변환되는 것

-> 타입변환은 기존 원시값을 직접적으로 변경하는 것이 아니다. (변경 불가능한 값임!) 기존 원시값을 사용하여 다른 타입의 새로운 원시 값을 생성하는 것이다.
-> 재할당 되는 것이 아닌 새로운 타입의 값을 만들어 내는 것! (암묵적 타입변환의 경우에는 일회용이다.)

### 암묵적 타입변환

코드의 문맥을 고려해 암묵적으로 데이터 타입을 강제변환한다.

```js
'10'+1 = '101' //문자열 타입으로 타입변환

5*'10' = 50 // 숫자 타입으로 타입변환

!0 // true
if(1){} //true
```

#### 문자열로 타입변환

`+` 연산자는 피연산자 중 하나 이상이 문자열일 경우 문자열 연결 연산자로 동작한다. 따라서 모두 문자열이어야 한다.

- 템플릿리터럴의 표현식 삽입도 평과 결과를 문자열 타입으로 변환시킨다. ` `1+1=${1+1}` // "1+1=2"`

#### 숫자타입으로 타입 변환

- 산술연산자는 숫자값을 만든다. 따라서 산술연산자의 모든 피연산자는 숫자타입이어야 한다.
- 이때 숫자타입으로 변환할 수 없는 경우는 `NaN`이 도출된다.
- 비교연산자(<>) 또한 피연산자의 크기를 비교하므로 숫자타입이어야 한다.
- `+`단항 연산자는 숫자타입의 값으로 암묵적 타입변환을 할 수 있다.

#### 불리언 타입으로 변환

불리언은 참과 거짓으로 평가되어야 하는 표현식으로써 Truthy(참으로 평가되는 값) Falsy(거짓으로 평가되는 값)으로 구분하여 암묵적 타입변환을 일으킨다.

Falsy (거짓으로 평가되는 값)

- flase
- undefined
- null
- 0, -0
- NaN
- "" (빈 문자열)

이 외의 값은 모두 true로 평가되는 값이다.

### 명시적 타입 변환

- 표준 빌트인 생성자 함수(String, Number, Blooean)을 new연산자 없이 호출
  - 객체를 생성하기 위한 함수이며 new 연산자와 함꼐 사용한다.
- 빌트인 메서드를 사용
- 암묵적 타입변환 이용하는 방법

#### 문자열 타입으로 변환

```js
// String 생성자 함수를 new 연산자 없이 호출
String(1); //"1"
String(NaN); //"NaN"

// Object.prototype.toString메서드를 사용

(1).toString(); // "1"
NaN.toString(); //"NaN"

// 문자열 연결 연산자를 이용
1 + ""; // "1"
NaN + ""; //"NaN"
```

#### 숫자 타입으로 변환

```js
// Number 생성자 함수를 new 연산자 없이 호출
Number("0"); //0
Number(true); // 1

// parseInt, parseFloat함수를 사용하는 방법(문자열만 가능)
parseInt("0") +
  // +단항 산술 연산자를 이용하는 방법
  "0"; // 0
+true; // 1
+false; //0

// * 산술 연산자를 이용하는 방법
"0" * 1; //0
true * 1; //1
```

#### 불리언타입으로 변환

```js
// boolean 생성자 함수를 new연산자 없이 호출
// 문자->불리언 !!!! 문자열이 비었는지 여부를 확인한다.
Boolean("x"); //true
Boolean(""); //false
Boolean("false"); //true

// 숫자->불리언
Boolean(0); // false
Boolean(NaN); // false
Boolean(infinity); //true

Boolean(null); //false
Boolean(undefined); //false
Boolean({}); //true
Boolean([]); //true

// 부정 논리 연산자를 두번 사용
!!"x"; //true
!!""; // flase
!!"flase"; //true

!!0; // false
!!NaN; // false
// 두번 부정을 했기 때문에 원래의 값과 동일하며 없지 않다의 질문이라고 생각하면 된다!
```

#### 단축평가

##### 논리 연산자를 사용한 단축 평가

논리합(`||`) 또는 논리곱(`&&`) 연산자 표현식의 평가결과는 불리언 값이 아닐 수도 있다.
논리합, 논리곱 연산자 표현식은 언제나 2개의 피연산자 중 한쪽으로 평가된다.

```js
"cat" && "dog"; //"dog"
// 논리곱 연산자는 좌항에서 우항으로 평가가 진행된다.
// 'cat'은 Truthy 값이므로 true로 평가된다.
// 논리곱 연산자는 논리 연산의 결과를 결정하는 두번째 피연산자 (문자열 "dog")를 그대로 반환한다.

"cat" || "dog"; //"cat"
// 논리합 연산자도 좌항에서 우항으로 평가가 진행된다.
// 논리 연산의 결과를 결정한 첫번째 피연산자가 그대로 반환된다. (두번째 피연산자까지 확인할 필요 없이 true값이기 때문이다.)
```

논리곱 연산자와 논리합 연산자는 논리연산의 결과를 결정하는 피연산자를 타입변환하지 않고 그대로 반환한다 -> 단축평가!!!!

- 표현식을 평가하는 도중에 평가 결과가 확정된 경우 나머지 평가 과정을 생략하는 것을 뜻함
- if문을 대체할 수 있다.
  - 어떤 조건이 Truthy 값일 때 무언가를 해야한다면 논리곱 연산자 표현식을 사용할 수 있다.
  - 조건이 Falsy값일 때 논리합 연산자로 if문을 대체할 수 있다.

```js
var done = true;
var msg = "";

// &&과 Truthy값
msg = done && "완료"; // 첫번째 피연산자가 true고 두번째 피연산자도 true일 때 두번째 피연산자의 값이 도출된다.

// ||와 Falty값
done = false;
msg = done || "미완료"; // 첫번째 피연산자는 false, 두번째 피연산자는 true이기 때문에 true의 값이 msg에게 할당되었다.
```

객체를 가리키기를 기대하는 변수가 null 또는 undefined가 아닌지를 확인하고 프로퍼티를 참조할 때!! 단축평가를 활용하면 좋다.

```js
var elem = null;
// elem이 false면 elem, elem이 참이면 elem.value값으로 평가된다.
var value = elem && elem.value;
```

함수 매개변수에 기본값을 설정할 때
함수를 호출할 때 인수를 전달하지 않으면 매개변수는 undefined가 할당되는데 단축 평가를 사용해 매개변수의 기본값을 설정하면 이러한 에러를 방지할 수 있다.

```js
function getStringLength(str) {
  str = str || "";
  return srt.length;
}
getStringLength(); //0
getStringLength("hi"); //2

//es6의 기본값 설정
function getStringLength(str = "") {
  return srt.length;
}
```

#### 옵셔널 체이닝 연산자

- es11에서 더입된 옵셔널 체이닝 연산자 `?.` 는 좌항의 피연산자가 null or undefined인 경우 undefined를 반환하고 그렇지 않으면 우항의 프로퍼티 참조를 이어간다.
- 옵셔널 체이닝 연산자가 도입되기 전엔 논리연산자 &&를 사용한 단축평가를 통해 변수가 null 혹은 undefined인지를 확인했다.
- 좌항의 값이 Falty 값이더라도 null, undefined가 아니라면 우항의 프로퍼티 참조를 이어간다.

```js
var elem = null;
// value의 좌항인 elem이 null이나 undefined 여부를 확인한다.
var value = elem?.value;
console.log(value); // undefiend
```

#### null병합연산자

- es11에서 도입된 null병합연산자 `??`는 좌항의 피연산자가 null or undefined인 경우 우항의 피연산자를 반환 / 그렇지 않으면 좌항의 피연산자를 반환한다.
- 변수에 기본값 설정 시 유용

```js
//?.와 다르게 ??는 좌항이 null, undefined일 때 우항의 피연산자를 반환한다.
var foo = null ?? "default String";
console.log(foo); //'default String'

//Falty한 값이더라도 undefined or null이 아니라면 좌항의 피연산자를 반환한다.
var foo = "" ?? "default String";
console.log(foo); //""
```
