# redux

회원가입 page를 만들기에 앞서 전역적인 상태관리를 할 수 있는 redux를 배워보고자 함!

# 순수 react, redux를 사용한 react 비교

```jsx
import React, { useState } from "react";
import { createStore } from "redux";
import { Provider, useSelector, useDispatch, connect } from "react-redux";
```

`Provider` : state를 전역적으로 사용할 컴포넌트를 감싼다.

```jsx
// store 내부에 있는 state를 어떻게 변경시킬 것인지를 결정하는 것이 reducer이다.
// 그래서 두개의 파라미터(인자)를 가짐
// 현재의 state 값
// 어떻게 요청을 변경할 것인지에 대한 요청
// 을 받아서 return을 해주면, 이게 바로 새로운 state의 값!!!!
function reducer(currentState, action) {
  if (currentState === undefined) {
    // 현재 state인 currentState가 undefined라면..!!!
    // 아직 state가 정의되지 않았다는 뜻으로 기본 state의 값을 return
    return {
      number: 1,
    };

    // redux는 각각의 state의 변화를 불변하게 유지해야 함.
    // 새로운 state를 만들 때, 과거의 state를 복제하는 것이다.
    // 복제본을 수정하면 불변성 유지가 가능하다. -> 이것을 return 한다.
    const newState = { ...currentState };

    if (action.type === "PLUS") {
      // 이렇게 작성하면 이 값이 return되면서 새로운 state의 값이 됨!
      newState.number++;
    }
  }

  return newState;
}

//Provider의 prop으로 전달해줘야 하는 sotre~!
const store = createStore(reducer);
```

```jsx
export default function App(){
	//reducer를 설정하였기 때문에 이게 필요 없어짐
	// 기본값 세팅~!
	// currentState가 undefined일 때 === useState(1);
	// return [number, setNumber] = useState(1);
	return (
		<div id="container">
			<h1>Root : {number}<h1>
			<div id="grid">
				<Provider store={store}>
				{/* Provider는 store를 prop으로 지정해줘야 에러가 안 남! */}
					<Left1 />
					<Right1 />
				</Provider>
			</div>
		</div>
	);
}
```

```jsx
function Left1(props){
	return (
			<div>
				<h1>Left1</h1>
				<Left2 />
			</div>
		)
	}
function Left2(props){
	return (
			<div>
				<h1>Left2</h1>
				<Left3 />
			</div>
		)
	}

// 또한 !! Left2, Left3에 console.log로 확인을 해보았을 때!
// (값이 변화되는 컴포넌트인) useSelector가 있는 컴포넌트만이 리랜더링되는 것을 확인할 수 있다.
function Left3(props){
	// useSelector가 인자로 받는 함수는!! state값을 인자로 받는데!
	// 현재 가지고 있는 state 값 중에서 어떤 것을 사용할 것인지를 지정해준다.
	function f(state){
		return date.number;
	}
	// useSelector를 사용하면 prop으로 하나하나 연결해주지 않아도 state 사용이 가능하다.
	// useSelector는 함수를 인자로 받음.
	const number = useSelector(f);

	// 위에 작성한 것을 간단하게 작성하려면 아래와 같이 작성할 수도 있다.
	// const number = userSelector(state=>state.number);

	return (
			<div>
				<h1>Left3:{number}</h1>
			</div>
		)
	}

function Right1(props){
	return (
			<div>
				<h1>Right1</h1>
				<Right2 />
			</div>
		)
	}
function Right2(props){
	return (
			<div>
				<h1>Right1</h1>
				<Right3 />
			</div>
		)
	}
function Right3(props){
	const dispatch = useDispatch();
	// 값을 변경시키기 위해서는 dispatch를 사용해야 하며, 이것은 useDispatch를 통해 사용할 수 있음
	return (
			<div>
				<h1>Right1</h1>
				<input type="button" value="+" onClick={()=>{
					// 이렇게 작성하면 reducer가 호출이 된다.
					// reducer가 호출되었을 때 만약(if)에 타입이 PLUS면 ~~~
					dispatch({type:"PLUS"})
				}}
			</div>
		)
	}
```

---

## react-redux가 제공하는 기능

```jsx
import { Provider, useSelector, useDispatch, connect } from "react-redux";
```

`Provider`

- compoent
- state를 어떤 컴포넌트에게 제공할 것인지에 대한 가장 넓은 테두리를 제공한다.
- `store` 를 prop으로 전달해줌

`useSelector`

- 어떤 state값을 사용하고 싶은지 선택한다.
- state의 값을 표시하고 싶은 곳(component)가 있다면!!! useSelector를 사용한다.

`useDispatch`

- state의 값을 변경시킬 때 사용
-

`connect`

- 이것은 어려워서.. 나중에!
- 재사용할 때 필요함
