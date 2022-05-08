내부 슬록과 내부 메서드는 자바스크립트 엔진의 구현 알고리즘을 설명하기 위해 ECMAScript 사양에서 사용하는 의사 프로퍼티와 의사 메서드다.

- `[[...]]` 이중 대괄호로 감싼 이름들이 내부 슬롯과 내부 메서드이다.

**자바 스크립트 엔진에서 실제로 동작하지만 개발자가 직접 접근할 수 있도록 외부로 공개된 객체의 프로퍼티는 아니다.**

→ 즉!! 내부 슬록과 내부 메서드는 **자바스크립트 엔진의 내부 로직**이므로 원칙적으로 직접 접근하거나 호출할 수 있는 방법을 제공하지는 않음.

(단, _일부 내부 슬롯과 메서드에 한하여 간접적으로 접근할 수 있는 수단을 제공하기는 함_)

<aside>
💡 모든 객체는[[prototype]]이라는 내부 슬롯을 갖는다. 일반적으로 내부 슬롯이기 때문에 접근할 수 없으나 `__**proto__`** 를 통해 간접적 접근이 가능하다.

</aside>

```jsx
const o ={};
o.[[prototye]] //Uncaught SyntaxError : Unexpeted token '[' <직접접근 권한 없음
o.__proto__ //Object.prototype <간접접근
```

# 프로퍼티 어트리뷰트와 프로퍼티 디스크립터 객체

자바스크립트 엔진은 프로퍼티를 생성할 때 **_프로퍼티 상태를 나타내는 프로퍼티 어트리뷰트를 기본값_**으로 자동 정의한다.

- 프로퍼티의 값 `value`
- 값의 갱신 가능 여부 `writable`
- 열거 가능 여부 `cumerable`
- 재정의 가능 여부 `configurable`

**프로퍼티 어트리뷰트**는 자바스크립트 엔진이 관리하는 **_내부 상태 값인 내부슬롯_** `[[Value]], [[Writable]], [[Enumerable]] [[Configurable]]` 이다.

따라서 프로퍼티 어트리뷰터에 직접 접근할 수 없지만 `Object.getOwnPropertyDescriptor` 메소드를 사용하여 **간접적으로 확인**할 수는 있다.

```jsx
const person = {
  name: "jeonga",
};

// 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체를 반환
console.log(Object.getWunPropertyDescriptor(person, "name"));
//{value:"jeonga", writable:true, cumerable:true, configurable:true}

//getWunPropertyDescriptor 메서드를 호출할 때 첫 번째 매개변수는 객체의 참조를 전달, 프로퍼티 키를 문자열로 전달
// 해당 메서드는 **프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체를 반환**
// 존재하지 않는 프로퍼티나 상속받은 프로퍼티에 대한 프로퍼티 디스크립터를 요구하면 undefined가 반환된다.
```

`getOwnpropertyDescriptor`는 하나의 프로퍼티에 대해 프로퍼티 디스크립터 객체를 반환하지만

ES8에서 도입된 `getOwnpropertyDescriptors` 는 **_모든 프로프티의 프로퍼티 어트리뷰트 정보를 제공_**하는 프로퍼티 디스크립터 객체들을 반환한다.

```jsx
const person = {
  name: "jeonga",
};
person.age = 20;

// 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체를 반환
console.log(Object.getWunPropertyDescriptors(person));
/*
{
	{value:"jeonga", writable:true, cumerable:true, configurable:true},
	{value:20, writable:true, cumerable:true, configurable:true}
}
*/
```

# 데이터 프로퍼티와 접근자 프로퍼티

**데이터 프로퍼티**

- 키와 값으로 구성된 일반적인 프로퍼티
- 지금까지 본 모든 프로퍼티는 데이터 프로퍼티

**접근자 프로퍼티**

- 자체적으로 값을 갖지 않고 **다른 데이터 프로퍼티의 값을 읽거나 저장할 때 호출되는 접근자 함수**로 구성됨

## 데이터 프로퍼티

데이터 프로퍼티는 프로퍼티 어트리뷰트를 가지며, 자바스크립트 엔진이 프로퍼티를 생성할 때 기본값으로 자동 정의된다.

| 프로퍼티 어트리뷰트                                                                                      | 프로퍼티 디스크립터 객체의 프로퍼티 | 설명                                           |
| -------------------------------------------------------------------------------------------------------- | ----------------------------------- | ---------------------------------------------- |
| [[Value]]                                                                                                | value                               | - 프로퍼티 키를 통해 값에 접근하면 반환되는 값 |
| - 값을 변경하면 프로퍼티 어트리뷰트 [[Value]] 에 값을 재할당 → 프로퍼티가 없으면 동적 생성하여 값을 저장 |
| [[Writavle]]                                                                                             | writable                            | - 변경 가능 여부를 나타내어 불리언 값을 가짐   |
| - 값이 false인 경우 값을 변경할 수 없는 읽기 전용 프로퍼티가 됨                                          |
| [[Enumerable]]                                                                                           | enumerable                          | - 열거 가능 여부를 나타내며 불리언 값을 가짐   |
| - 값이 false인 경우 해당 프로퍼티는 for...in문이나 Object.keys 메서드 등으로 열거할 수 없다.             |
| [[Configurable]]                                                                                         | donfigurable                        | - 재정의 가능 여부를 나마태며 불리언 값을 가짐 |

- 값이 false인 경우 프로퍼티 삭제, 프로퍼티 어트리뷰터 값의 변경이 금지
- 값이 true인 경우 [[Value]], [[Writable]]을 false로 변경하는 것은 허용 |
- 프로퍼티가 생성될 때 `[[Value]]` 값은 프로퍼티 값으로 초기화 되며, 그 외의 프로퍼티 어트리뷰트 또한 true 로 초기화 된다.

## 접근자 프로퍼티

자체적으로 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 사용하는 접근자 함수로 구성된 프로퍼티

| 프로퍼티 어트리뷰트                                                                                                                | 프로퍼티 디스크립터 객체의 프로퍼티 | 설명                                                                           |
| ---------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------ |
| [[Get]]                                                                                                                            | get                                 | - 접근자 프로퍼티를 통해 데이터 프로퍼티의 값을 읽을 때 호출되는 접근자 함수   |
| - 접근자 프로퍼티 키로 값에 접근하면 프로퍼티 어트리뷰트 [[Get]] 의 값, 즉 getter 함수가 호출되고 결과가 프로퍼티 값으로 반환된다. |
| [[Set]]                                                                                                                            | set                                 | - 접근자 프로퍼티를 통해 데이터 프로퍼티의 값을 저장할 때 호출되는 접근자 함수 |
| - 접근자 프로퍼티 키로 값을 저장하면 [[SET]] 의 값, setter 함수가 호출되고 결과가 값으로 저장된다.                                 |
| [[Enumerable]]                                                                                                                     | enumerable                          | 데이터 프로퍼티와 같다                                                         |
| [[Configurable]]                                                                                                                   | congiurable                         | 데이터 프로퍼티와 같다                                                         |

- 접근자 함수는 getter, getter함수라고도 부름
- 접근자 프로퍼티는 getter, getter 함수를 모두 정의할 수 있고, 하나만 정의할 수도 있다.

```jsx
const person = {
	//데이터 프로퍼티
	firstName : 'ungmo',
	lastName : 'Lee'

	//fullName은 접근자 함수로 구성된 접근자 프로퍼티
	get fullName(){
		return `${this.firstName} ${this.lastName}`;
	}

	set fullName(name){
		//배열 디스트럭처링 할당
		[this.firstName, this.lastName] = name.split(' ');
	}
};

//데이터 프로퍼티를 통한 프로퍼티 값 참조
console.log(person.firstName + ' ' + person.lastName); //ungmo Lee

//접근자 프로퍼티를 통한 값의 저장 fummName에 값을 저장하면 setter함수가 호출됨!!!
person.fullName = 'jeonga Lee';
console.log(person); //{firstName:'jeonga', lastName:'Lee'}

//접근자 프로퍼티를 통한 값의 참조, 값에 접근하면 getter 함수가 호출된다.
console.log(person.fullName); //jeonga Lee

//--------
//firstName은 데이터 프로퍼티 이다. 데이터 프로퍼티는 프로퍼티 어트리뷰트를 갖는다. e.g [[Value]]...
let descriptor = Object.getQwnPripertyDescriptor(person, 'firstName');
//{value:"jeogna", writable:true, enumerable:true, configurable:ture}

//fullNamed은 접근자 프로퍼티다. 접근자 프로퍼티는 [[Get]]... 프로퍼티 어트리뷰트를 갖는다.
desciptor = Object.getOwnPropertyDescriptor(person,'fullName');
//{get:f, set:f, enumerable:true, configurable:true}
```

get, set이 붙은 메서드는 getter, setter 함수이다.

접근자 프로퍼티는 자체적으로 값을 가지고 있지 않으며, 데이터 프로퍼티의 값을 읽거나 저장할 때 관여한다.

내부 슬롯, 메서드 관점에서 설명하면 다음과 같다.

fullName으로 값에 접근하면 내부적으로 `[[Get]]` 내부 메서드가 호출되어 다음과 같이 동작

1. **프로퍼티 키가 유효한지 확인. (프로퍼티 키는 문자열 또는 심벌)**
   1. “fullName”은 문자열이므로 유효한 프로퍼티 키
2. **프로토타입 체인에서 프로퍼티를 검색한다.**
   1. person객체에 fullName 프로퍼티가 존재
3. **검색된 프로퍼티가 데이터 프로퍼티인지 접근자 프로퍼티인지 확인한다.**
   1. 접근자 프로퍼티 이다
4. **검색된 fullName 프로퍼티 어트리뷰트 `[[Get]]` 의 값 getter 함수를 호출하여 결과를 반환한다.→ getter가 반환한 값은 프로퍼티 디스크립터 객체의 get 프로퍼티 값과 같다.**

<aside>
💡 **프로토타입**

어떤 객체의 상위 객체 역할을 하는 객체이다.
하위 객체에게 자신의 프로퍼티와 메서드를 상속한다.
프로포타입 객체의 프로퍼티나 메서드를 상속받은 하위 객체는 자신의 것처럼 자유롭게 사용할 수 있다.

**프로토타입 체인**
단방향 링크드 리스트 형태로 연결되어 있는 상속 구조를 뜻함
객체의 프로퍼티나 메서드에 접근하려고 할 때 해당 객체에 접근하려는 프로퍼티 또는 메서드가 없다면 프로토타입 체인을 따라 차례로 검색한다.

</aside>

**접근자 프로퍼티와 데이터 프로퍼티를 구별하는 방법**

```jsx
Object.getOwnPropertyDescriptor(Object, "__proto__");
//일반 객체의 __proto__는 접근자 프로퍼티이다.

Object.getOwnPropertyDescriptor(function () {}, "prototype");
//함수 객체의 prototype은 데이터 프로퍼티이다.
```

메서드가 반환한 프로퍼티 어트리뷰트를 객체로 표현한 프로퍼티 기스크립터 객체를 보면, 접근자 프로퍼티와 데이터 프로퍼티 디스크립터 객체의 프로퍼티가 다른 것을 알 수 있음! → get, value ...

# 프로퍼티 정의

새로운 프로퍼티를 추가하면서 프로퍼티 어트리뷰트를 명시적으로 정의하거나 기존 프로퍼티의 프로퍼티 어트리뷰트를 재정의하는 것을 말함!

- 프로퍼티 값의 갱신 가능여부
- 프로퍼티 열거 가능 여부
- 프로퍼티 재정의 가능여부

를 통하여 객체의 프로퍼티가 어떻게 동작해야 하는지를 명확하게!! 정의할 수 있다.

`Object.definProperty 메서드를 사용하면 됨!`

- 인수로 전달
  - 객체의 참조
  - 데이터 프로퍼티 키인 문자열
  - 프로퍼티 디스크립터 객체

**프로퍼티 정의**

```jsx
const person = {};

//데이터 프로퍼티 정의
Object.defineProperty(person, "firstName", {
  value: "ungmo",
  writable: true,
  enumerabel: true,
  configurable: true,
});

Object.defineProperty(person, "lastName", {
  value: "lee",
});
```

**변수에 프로퍼티 할당, 재할당**

```jsx
//first 디스크립터 객체를 변수에 할당함
let descriptor = Object.getOwnPropertyDescriptor(person, 'first);
//{value::"Ungmo", writable:ture, enumeravle:ture, configurable:ture}

//last 디스크립터 객체를 변수에 재할당함
//lastName을 선언할 때 함께 선언하지 않았던 디스크립터 객체의 프로퍼티는 undefined(value일듯)나 flase가 기본값이디.
descriptor = Object.getOwnPropertyDescriptor(person, 'lastName');
//{value:"Lee", writable:false, enumeravle:false, configurable:false}
```

**디스크립터 객체의 프로퍼티가 false일 경우**

```jsx
// enumeravle:false인 경우!!
// for...in 문이나 Object.keys 등으로 열거할 수 없다.
console.log(Object.keys[person]); //['firstNama']

//writable:false 인경우!!
// value값을 변경할 수 없다. -> 하더라도 에러는 발생하지 않고 해당 동작이 무시된다.
person.lastName = "kim";

//configurable:false인경우!!
// 해당 프로퍼티를 삭제할 수 없다. -> 하더라도 에러는 발생하지 않고 해당 동작이 무시된다.
delete person.lastName;
// 해당 프로퍼티를 재정의 할 수 없다.
Object.difineProperty(person, "lastName", { enumerable: true });
//Unvaught TypeError : cannot redefin property : lastName

//{value:"Lee", writable:false, enumerable:false, configurable:false}
```

**접근자 프로퍼티 정의**

```jsx
Object.definProperty(person, 'fullName',{
	//getter함수
	get(){
		return `${this.firstName} ${this.lastName}`
	},
	set(name){
		[this.firstName, this.lastName] = naem.split(" ");
	},
	enumerable :true,
	configurable: true
});
descriptor = Object.getOwnPeopertyDescriptor(person, 'fullName');
console.log('fullName', descriptor);
//{get:f, set:f, enumerable:true, configurable:true}
person.full?Name = "jeonga LEE";
//{firstName:'jeonga', lastName:'Lee'}
```

- Object.defineProperty 메서드로 프로퍼티를 정의할 때 디스크립터 객체의 프로퍼티를 일부 생략할 수 있다.

| 프로퍼티 디스크립터 객체의 프로퍼티 | 생략 시 기본 값 |
| ----------------------------------- | --------------- |
| value                               | undefined       |
| get                                 | undefined       |
| set                                 | undefined       |
| writable                            | false           |
| enumerable                          | false           |
| confiurable                         | false           |

`Object.defineProperty` 한 번에 하나의 프로퍼티만 정의할 수 있다.

`Object.definePropertyes` 여러개의 프로퍼티를 한 번에 정의할 수 있다.

```jsx
const person = [};

Object.defineProperties(person, {
	firstName:{
		value:"",
		witable:true,
		enumerable:true,
		configurable:true
	},
	lastName:{
		value:"",
		witable:true,
		enumerable:true,
		configurable:true
	},
	fullName : {
		get(){
			return `${this.firstName} ${this.lastName}`
		},
		set(name){
			[this.firstName, this.lastName] = naem.split(" ");
		},
		enumerable :true,
		configurable: true
	}
});
```

# 객체 변경 방지

객체는 변경 가능한 값이르모 재할당 없이 직접 변경할 수 있다.

- 프로퍼티를 추가하거나 삭제할 수 있다.
- 프로퍼티 값을 갱신할 수 있다.
- Object.definProperty 또는 Object.definedPripertues 메소드를 사용하여 프로퍼티 어트리뷰트를 재정의 할 수도 있다.

자바스크립트는 객체의 변경을 방지하는 다양한 메서드를 제공

| 구분           | 메서드                   | 프로퍼티추가 | 프로퍼티삭제 | 프로퍼티 값 읽기 | 프로퍼티 값 쓰기 | 프로퍼티 어트리뷰트 재정의 |
| -------------- | ------------------------ | ------------ | ------------ | ---------------- | ---------------- | -------------------------- |
| 객체 확장 금지 | Object.preventExtensions | X            | O            | O                | O                | O                          |
| 객체 밀봉      | Object.seal              | X            | X            | O                | O                | X                          |
| 객체 동결      | Object.freeze            | X            | X            | O                | X                | X                          |

## 객체 확장 금지

`Object.preventExtensions`

메섣는 확장을 금지한다.

- 프로퍼티 추가 금지를 의미한다.
- 확장이 금지된 객체는 프로퍼티 추가가 금지된다.
  - 이것이 금지됨!! → 프로퍼치 동적 추가와 `Object.defineProperty` 메서드로 추가할 수 있다.

확장이 가능한 객체인지 확인하는 방법은 `Object.isExtensible` 메서드로 확인이 가능하다.

```jsx
const person = { name: "Lee" };
console.log(Object.isExtensible(person)); //true -> 확장 금지된 객체가 아님!!

Object.preventExtensions(person); //객체의 확장을 금지하여 프로퍼티 추가를 금지함
console.log(Object.isExtensible(person)); //false

person.age = 20; //무시, strict mode에서는 에러가 남
console.log(person); //{name : "Lee" }

delete person.name;
console.log(person); //{}

Object.defineProperty(person, "age", { value: 20 }); //프로퍼티 정의에 의한 추가도 금지됨
//typeError:cannot defined property age, object is not extensible
```

## 객체 밀봉

`Object.seal`

객체 밀봉이란 프로퍼티 `추가` 및 `삭제`, `어트리뷰트 재정의 금지`

- 읽기, 쓰기만 가능

`Object.isSealed` 메서드로 확인이 가능하다.

```jsx
const person = { name : "Lee" };
console.log(Object.isSealed(person)); //false

Object.seal(person); //프로퍼티 추가, 삭제, 재정의 금지
console.log(Object.isSealed(person)); //true

console.log(Object.getOwnPropertyDescriptors(person));
/*
{
	name : {value:"Lee", writable:true, enumerable:ture, configurable:false}
}
*/

person.age = 20;
delete person.name; // 추가 및 삭제 금지, 해당 요청은 무시된다.

person.name "kim"; //프로퍼티 값 갱신은 가능하다.
console.log(person); //{name:"kim"}

//어트리뷰트 재정의가 금지되었다.
Object.defineProperty(person, 'age', { configurable :true });
//typeError:cannot defined property : name

```

## 객체 동결

`Object.freeze`

객체를 동결한다.

- 프로퍼티 `추가` 및 `삭제`, `프로퍼티 어트리뷰트 재정의 금지`, `프로퍼티 값 갱신금지`
  - 읽기만 가능하다.

`Object.isFrozen`

```jsx
const person = { name: "Lee" };
console.log(Object.isFrozen(person)); //false -> 동결된 객체가 아님

Object.freeze(person);
console.log(Object.isFrozen(person)); //true
console.log(Object.getOwnPropertyDescriptors(person));
/*
{
	name:{value:"Lee", writable:false, enumerable:ture, configurable:false}
}
*/

person.age = 20;
delete person.name;
person.name = "Kim";
//추가, 삭제, 값갱신이 금지된다. 무시 -> strit mode에서는 에러가 남!!

Object.defineProperty(person, "name", { configurable: true });
//typeError:cannot defined property : name
```

## 불변객체

지금까지 살펴본 변경 방지 메서는 얕은 변경방지로 직속 프로퍼티만 변경이 방지되고 중첩 객체까지는 영향을 주지 않음!!

- `Object.freeze` 메서드로 객체를 동결해도 중첩 객체가지 동결할 수 없음

```jsx
const person = {
	name : 'Lee',
	address : {city : 'seoul'}
}

Object.freeze(person}; //얕은 객체 동결

console.log( Object.isFrozen(person) ) //true
console.log( Object.isFrozen(person.address) ) //false
```

객체의 중첩 객체까지 동결하여 변경이 불가능한 읽기 전용의 불변 객체를 구현하려면 **객체를 값으로 갖는 모든 프로퍼티에 대해 재귀적으로 Object.freeze 메서드를 호출해야 함**

```jsx
function deepFreeze(target) {
  //객체가 아니거나 동결된 객체는 무시하고 객체이고 동결되지 않은 객체만 동결한다.
  if (target && typeof target === "object" && !Object.isFrozen(target)) {
    Object.freeze(target);
    //Object.keys 메서드는 객체 자신의 열거 가능한 프로퍼티 키를 배열로 반환
    Object.keys(target).forEach((key) => deepFreeze(target[key]));
  }
  return target;
}

const person = {
  name: "Lee",
  address: { city: seoul },
};

deepFreeze(person);
console.log(Object.isFrozen(person)); //true
console.log(Object.isFrozen(person.address)); //true
```
