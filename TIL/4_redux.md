# redux & redux-Thunk

회원가입 page를 만들기에 앞서 전역적인 상태관리를 할 수 있는 redux를 배워보고자 함!

# 순수 react, redux를 사용한 react 비교

```jsx
import React, { useState } from "react";
import { createStore } from "redux";
import { Provider, useSelector, useDispatch, connect } from "react-redux";
```

`Provider` : state를 전역적으로 사용할 컴포넌트를 감싼다.

`useSelector` : 값이 바뀌는 state를 지정

`useDispatch` : 값을 변화시킬 이벤트를 작성한다.

```jsx
// store 내부에 있는 state를 어떻게 변경시킬 것인지를 결정하는 것이 reducer이다.
// 그래서 두개의 파라미터(인자)를 가짐
// 현재의 state 값, 어떻게 요청을 변경할 것인지에 대한 요청
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
```

```jsx
//Provider의 prop으로 전달해줘야 하는 sotre~!
const store = createStore(reducer);
```

```jsx
export default function App(){
	// reducer를 설정하였기 때문에 ↓↓↓ 이게 필요 없어짐
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
	// useSelector가 인자로 받는 함수는!!
	// state값을 인자로 받는데!
	// 현재 가지고 있는 state 값 중에서 어떤 것을 사용할 것인지를 지정해준다.
	function f(state){
		return state.number;
	}

	// useSelector를 사용하면 prop으로 하나하나 연결해주지 않아도 state 사용이 가능하다.
	// useSelector는 함수를 인자로 받음.
	const number = useSelector(f);
	// 위에 작성한 것을 간단하게 작성하려면 아래와 같이 작성할 수도 있다.
	const number = userSelector(state=>state.number);

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

`connect`

- 이것은 어려워서.. 나중에!
- 재사용할 때 필요함

---

# redux Thunk & saga

redux의 미들웨어

미들웨어는 리덕스가 다른 상태관리 라비르러리와 차별되는 핵심 개념 중 하나이다.

리덕스의 flux 패턴에서 맨 처음 맨 처음 액션을 디스패치하게 되면서 **리듀서에서 해당 리액션에 대한 정보를 바탕으로 스토어의 값을 변경**하게됨

이때!!! **미들웨어를** 사용하면 **액션이 스토어에서 상태값을 바꾸기 전, 특정 작업을 수행**할 수 있다.

- 특정 조건에 따라 액션 수행 여부를 판단
- 액션을 콘솔에 출력, 서버쪽에 로깅
- 액션이 디스패치되었을 때, 데이터를 수정 or 가공하여 리듀서에게 전달
- 비동기적인 작업을 수행 `← 이걸 위해 주로 사용!`

## redux Thunk

`redux`는 기본적으로 **액션 객체**만을 디스패치 할 수 있다.

하지만 `redux Thunk`를 활용하면 객**체 대신 함수를 생성하는 액션 생성 함수**를 작성할 수 있게 함 → 비동기적인 프로그래밍 구현 가능

- Redux-Toolkit에서 기본적으로 제공하는 기능이기 때문에 Store에 미들웨어로 등록하지 않아도 된다.

```jsx
import axios from "axios";
import { createAsyncThunk, createSlice } form "@redux/toolkit";

const fetchData = createAsyncThunk("FETCH_DATA", sync()=>{
	try{
		const reponse = await axios.get("http://localhost:8080");
		return response.data;
	} catch (error){
		console.log(error);
	}
});

export const rootReducer = createSlice({
	name:"Data",
	initalState:{data:[]},
	reducers:{},
	extraReducers:(builder) => {
		builder
		// 데이터 통신 대기중일 때
		.addCase(fetchData.pending,(state,action)={})

		// 데이터 통신 성공했을 때
		.addCase(fetchData.fulfilled,(state,action)={
			return {...state, data:[...action.payload]}

		// 데이터 통신 실패했을 때
		.addCase(fetchData.reject, (state, action)=>{})
		})
	}
})
```

```jsx
// app.ts
dispatch(fetchData());
```

비동기적으로 서버에서 데이터를 불러와 활용하는 기본적인 구조의 액션함수

비동기 작업 함수를 생성하여 필요한 시점에 불러와 액션을 디스패치한다.

---

## redux saga

비동기 작업을 처리하기 위한 미들웨어

`redux thunk` **함수를 디스패치할 수 있게 만드는 미들웨어**라면

`saga`는 **액션을 모니터링하고 있다가 특정 액션이 발생했을 때 정해둔 로직에 따라 특정작업**이 이루어지는 방식

sagas라는 순수함수들로 로직을 처리할 수 있음 순수 함수로 이뤄지다보니

- 사이드 이펙트도 적음
- 테스트 코드를 작성하기 용이

→ Thunk에 비해 많은 기능을 수행할 수 있다.

- 비동기 작업 진행시, 기존 요청 취소
- 특정 액션이 발생했을 때 이를 구덕하고 있다가 다른 액션을 디스패치 하거나 특정 자바 스크립트 코드를 실행
- 웹소켓 사용 시 더 효율적인 코드 관리
- API요청 실패 시 재요청 가능

saga는 제너레이터라는 특수한 형태의 함수로 구현이 된다.

- 함수의 실행을 특정 구간에 멈추게 함
- 원하는 시점으로 돌아가게 할 수 있음
- 결과값을 여러번 리턴하게 할 수 있음

```jsx
// 일반함수
function foo() {
  return 1;
  return 2;
  return 3;
  return 4;
}
// 1만을 return한다.
```

```jsx
// 제너레이터
function* generatorFunction() {
  console.log("1번");
  yield 1;
  console.log("2번");
  yield 2;
  console.log("3번");
  yield 3;
  console.log("4번");
  yield 4;
}
// 모든 값을 반환받을 수 있다.
// 특정 위치에서 잠시 정지 시킬 수 있다.
```

- `function*` 키워드를 사용하여 작성
- 제너레이터 함수와 제너레이터의 차이 : 제너레이터 함수를 통해 제너레이터 객체가 반환
- yield는 함수의 실행을 일시적으로 정지 시킴 → 뒤에 오는 표현식은 제너레이터를 관할하고 있던 호출자(caller)에게 반환된다.
  - return과 유사한 기능
- 이후에 함수를 마저 실행시키기 위해서는 `generatorFunction.next();` 를 사용한다.

### 외부 통신을 통해 데이터를 불러오는 비동기 함수를 예시로 saga 작성 예시 코드

saga는 Redux-Toolkit에서 기본적으로 제공하는 기능이 아니기 때문에 Store에 미들웨어로 등록해야 한다.

```jsx
// store.ts
import { configureStore } from "@Reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { rootReducer } from "~store/rootReducer";
import sagaMiddleware, {rootSaga} from "~store/rootSaga";
export const store = configureStore({
	// sagaMiddleware를 configureStore에 등록
	reducer:rootReducer,
	middleware:[sagamiddleware]
});

//rootSaga 실행
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
```

위와 같은 방식으로 sagaMiddleware를 Store에 등록

```jsx
// rootSaga.ts
import createSagaMiddleware from "redux-saga";
import { all, call } from "redux-saga/effects";
import watchGetData from "~store/fetchDataSaga";

// sagaMiddleware를 생성합니다.
const sagaMiddleware = createSagaMiddleware();

// 모든 saga들을 합치는 rootSaga를 만듭니다.
// 여러 saga들을 하나로 합칠 때에는 all()의 인자로 들어있는 배열에 saga들을 넣어주시면 됩니다.
export function* rootSaga() {
  yield all([call(watchGetData)]);
}

export default sagaMiddleware;
```

...작성중
