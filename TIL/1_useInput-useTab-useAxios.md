# useInput

useInput은 raact hook이 아닌, hook을 보다 깔끔하게 사용할 수 있는 function이다.

`useInput`은 기본적으로 input을 업데이트 한다.

- **이벤트를 분리된 파일을 사용하여 연결하여 처리할 수 있다.**

```jsx
const useInput = (initialValue)=>{
	const [value, setValue] = useState(initialValue);
	const onChange = (event)=>{
		console.log(event.target);
	}
	return {value, onChange}
}

const App = ()=>{
	const name = useInput("Mr.");
	return (
		<div className="App">
			<h1>Hello<h1>
			<input placeholder="Name" {...name} />
			// <input placeholder="Name" value={name.value} onChange={name.onChange} />
			// {...name}으로 작성하면 name에 있는 모든 것을 풀어준다.
			// name은 name.value가 된다.
		<div>
	)
}
```

1. useInput은 value를 리턴할 것임
2. name은 value와 같음

## npm에 등록시켜 사람들이 사용할 수 있도록 설정

```jsx
const useInput = (initialValue, validator)=>{
//validator : 어떤 문자를 사용하지 못하게 하도록 설정하고 싶을 때 사용하는 function
	const [value, setValue] = useState(initialValue);
	const onChange = (event)=>{
		const {
			target:{value}
		} = event;
		let willUadate = true;
		//willUadate는 true이기 때문에 항상 update된다.

		if(typeof validator === "function"){
			willUadate = validator(value);
		}

		if(willUpdate){
			setValue(value);
		}

	}
	return {value, onChange}
}

const App = ()=>{
	const maxLen = (value) =>value.length <= 10;
	const name = useInput("Mr.",maxLen);
	return (
		<div className="App">
			<h1>Hello<h1>
			<input placeholder="Name" {...name} />
		<div>
	)
}
```

- 다른 조건을 사용한다면

```jsx
const useInput = (initialValue, validator)=>{
//validator : 어떤 문자를 사용하지 못하게 하도록 설정하고 싶을 때 사용하는 function
	const [value, setValue] = useState(initialValue);
	const onChange = (event)=>{
		const {
			target:{value}
		} = event;
		let willUadate = true;
		if(typeof validator === "function"){
			willUadate = validator(value);
		}
		if(willUpdate){ //willUadate는 true이기 때문에 항상 update된다.
			setValue(value);
		}
	}

	return {value, onChange}
}

const App = ()=>{
	// const maxLen = (value) => value.includes("@");
	// @를 포함하고 있다면 true를 return 할 것이다.

	const maxLen = (value) => !value.includes("@");
	// !를 적음으로써 !를 포함하지 않는다면 업데이트를 하게된다.

	const name = useInput("Mr.",maxLen);
	return (
		<div className="App">
			<h1>Hello<h1>
			<input placeholder="Name" {...name} />
		<div>
	)
}
```

---

# useTab

**button 클릭 시 해당하는 content 보여주기**

```jsx
const content = [
	{
		tab:"Section 1",
		content:"I'm the content of the Section 1"
	},
	{
		tab:"Section 2",
		content:"I'm the content of the Section 2"
	}
]

const useTabs = (initialTab, allTabs)=>{
if(!allTabs || Array.isArray(allTabs)){ //배열이 아닐 때 return한다.
		return; // 조건이 일치하면 리턴이 되고 끝이 난다.
	}
	const [currentIndex, setCurrentIndex] = useState(initialTab);
	return {
		currentItem : allTabs[currentIndex],
		changeItem : setCurrentIndex //state를 업데이트 시켜준다.
	}
}

const App = ()=>{
const {currentItem} = useTabs(0, content); //content[0]을 기본값으로 가진다.

	return (
		<div className="App">
			{content.map((section,index) => <button onClick={()=>changeItem(index)}>{section.tab}</button>)}
//onClick : index는 0 또는 1이 되어야 하고, 모든 버튼은 onClick 이벤트를 가진다. 누군가 클릭하면 changeItem(index)를 실행하게 되고 setCurrentIndex의 item을 변경시킨다. -> State를 바꿔줌! -> currentItem의 currentIndex를 변경시키게 됨.
// 모든 것을 새로고침 하게 된다!

			<div>{currentItem.content}</div>
		<div>
	)
}
```

- useState는 이렇게 사용해야 함
- setState는 모든 것을 새로 고침해주느 것 → 리랜더링한다.

---

# useAxios

HTTP 리퀘스트를 만든다.

- default URL을 설정하거나 자동으로 헤더를 설정하는 것을 동의한다.
- axios instance를 얻을 것이고, 만약 그렇지 못한다면 import한 axios를 전달해줄 것이다!

## index.js

```jsx
import React, {useState, useEffect, useRef} form "react";
import ReactDom from "react-dom";

const App = () => {
	// const request = useAxios({url:"data를 가져올 URL"}, )
	// axios는 첫번째로 URL을 받는다.
	// 그리고 그들에게 instance를 주지 않은 게 보임
	const {loading, data, refetch} = useAxios({url:"data를 가져올 URL"}, )


	return (
		<div className ="App">
			<h1>{data && data.status}</h1>

			<h2>{loading && "Loading"}</h2>
			{/* ^ loading일 때는 이렇게 되야 함 h2에 loading이라는 글자가 나오고, loading이 끝나면..!! h2가 사라진다. 이것은 refetch를 확인할 때, 현재 로딩중인 것을 확인하기 위해 작성함*/}
			<button onClick={refetch}>refetch</button>
		</div>
	)
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

## useAxios.js
