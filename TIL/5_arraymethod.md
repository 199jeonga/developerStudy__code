# Array method - `find&`map&filter

# .find

**_작성방식_**

```jsx
function findRed(currentColor) {
  return currentColor === "red";
}
const colors = ["red", "blue", "yellow", "green"];
const chooseRed = colors.find(findRed);
```

- `.find` - js는 findRed 함수를 호출한다.

```jsx
// 이런식으로 코드가 흘러간다고 생각하면 됨!
// colors의 첫번째 순서부터 findRed에 매개변수로 입력하여
// currentColor === "red" 로 판단하여 값을 도출

const chooseRed = colors.find(
	findRed("red")
	findRed("blue")
	findRed("yellow")
	findRed("green")
);
```

- `.find()` 의 규칙은 콜백함수가 true를 반환하는 경우 (현재 처리중인 항목은 .find 함수의 결과값이 된다.)

# .map

**_작성방식_**

```jsx
function double(currentNumber) {
  return currentNumber * 2;
}

const source = [2, 4, 6, 8, 10];
const transeformed = source.map(double);
```

- `.map`을 사용하면 배열의 요소를 가져와 변환한 **다음 새로운 배열에 배치**한다. → `.map을 돌리기 전과 같은 인덱스를 가진 배열을 반환함`
- 콜백함수는 배열의 각 항목에 대해 호출되고

```jsx
// 이런식으로 코드가 흘러간다고 생각하면 됨!

function double(currentNumber) {
  return currentNumber * 2;
}

const source = [2, 4, 6, 8, 10];
const transeformed = source.map(
  double(2),
  double(4),
  double(6),
  double(8),
  double(10)
);

console.log(transeformed); // [4, 8, 12, 16, 20]
```

- `.map` 의 규칙은 콜백 함수에 의해 반환되는 값이 새 배열에 있는 값이 됨
- 콜백 함수는 **currentNumber** 인수 안에 **배열의 각각 숫자**를 받고 있다. → **currentNumber \* 2를 리턴함!**

# arrow function

```jsx
const source = [2, 4, 6, 8, 10];
const transformed = source.map((currentNumber) => currentNumber * 2);
```

```jsx
const colors = ["red", "blue", "yellow", "green"];
const chooseRed = colors.find((currentColor) => currentColor === "red");
```

- 화살표 함수는 **코드 한 줄에 함수를 쓸 수 있도록 허용**!
- 암묵적 리턴 가능

# .filter

```jsx
const foods = ["apple", "banana", "rice", "abocado"];
const fruits = foods.filter((currentFood) => currentFood !== "rice");
// true를 반환하면 항목이 새 배열로 이동
// false를 반환하면 항목흔 새 배열에서 제거된다.
```

- `.map` 처럼 배열을 변형시키지 않고, **false인 값을 제외한 채(true인 값만을 이용하여) 새로운 배열을 생성한다.**
