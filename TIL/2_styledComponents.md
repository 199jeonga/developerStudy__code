# styled-component

**_styled-components의 이점_**

- js 내부에 css를 작성하므로 파일의 개수를 줄일 수 있다.
- style 컴포넌트를 만들어 css를 작성하기 때문에 className의 사용을 억제할 수 있다!
  - 전역클래스의 오염 억제

**_styled-components 사용하는 메서드_**

- `injectGlobal` (`{injectGlobal}`) : 컴포넌트를 생성하지 않고 태그를 생성하여 style 적용
- `withComponent` : 컴포넌트의 태그 바꾸기
  - `extend` : withComponent를 사용하여 태그를 바꾼 컴포넌트에게 style 적용
- `keyframes` (`{keyframes}`) : animation 을 사용하는 keyframes, props이 존재하면 animation이 동작하도록 할 수 있다.
- `attrs({})` : 컴포넌트를 생성하는 단계에서 어트리뷰트를 설정할 수 있음. 공통 적용 어트리뷰트 시 유용할듯!
- `css` (`{css}`) : mixin기능, 변수에 해당 style을 할당시킨 뒤, 컴포넌트 style 작성 시 호출해준다.
- `ThemeProvider` (`{ThemeProvider}`) : variable 작성 → 다른 파일에서 사용하기 위한 방법

[reset css 적용하는 방법](https://domdom.tistory.com/entry/React-resetcss-%EC%A0%81%EC%9A%A9-%EB%B0%A9%EB%B2%95) (`injectGlobal`)

[reset css적용하는 방법2](https://velog.io/@hinyc/Styled-Component-reset-CSS) (`styled-reset` 패키지) - react-movie-challenge에서 사용!

[반응형 작성하는 방](https://kim-mj.tistory.com/282)

---

```jsx
import styled from "styled-components";
```

# styled-component

```jsx
import styled from "styled-components";

function App() {
  return (
    <Container>
      <Button>내용은 이렇게 작성!</Button> {/*Green*/}
      <Button danger /> {/*red*/}
    </Container>
  );
}
const Container = styled.div`
  heigth: 100vh;
  width: 100%;
  backgroungd-color: pink;
`;
const Button = styled.button`
	border- radius:10px;
	color:red;
	&:focus,
	&:hover{
		outline:none;
	}
	background-color:${(props) => (props.danger ? "red" : "green")}
`;
export default App;
```

- styled-component를 작성하는 기본적인 방법

# 컴포넌트가 아닌, 태그에 style 지정 - `injectGlobal`

```jsx
import styled,{**injectGlobal**} from "styled-components";

**injectGlobal`
	body{
		padding:0;
		margin:0;
	}
`;**

function App(){
return <Container>
	<Button>내용은 이렇게 작성!</Button> {/*Green*/}
	<Button danger /> {/*red*/}
</Container>
}
const Container = styled.div`
	heigth:100vh;
	width:100%;
	backgroungd-color:pink;
`;
const Button = styled.button`
	border- radius:10px;
	color:red;
	&:focus,
	&:hover{
		outline:none;
	}
	background-color:${props => (props.danger?"red":"green")}
`;
export default App;
```

- 아주 작은 코드(tag명을 그대로 써도 되는 코드)에도 컴포넌트를 생성해 작성하는 것은 아주 비효율적이다.
- 그래서! 사용할 수 있는 방법은`inject global`을 사용하는 것이다!!!(따로 설치할 필요 없이 styled-component에 내장되어 있음!)

# style이 적용된 컴포넌트 태그 수정 (style 공동 사용!) - `withComponent`

- **_코드 재사용 전문_**
  ```jsx
  import styled, { injectGlobal } from "styled-components";

  injectGlobal`
  	body{
  		padding:0;
  		margin:0;
  	}
  `;

  function App() {
    return (
      <Container>
        <Button>내용은 이렇게 작성!</Button> {/*Green*/}
        <Button danger /> {/*red*/}
        <Anchor href="https://google.com">Go to google</Anchor>
      </Container>
    );
  }
  const Container = styled.div`
    heigth: 100vh;
    width: 100%;
    backgroungd-color: pink;
  `;
  const Button = styled.button`
  	border- radius:10px;
  	color:red;
  	&:focus,
  	&:hover{
  		outline:none;
  	}
  	background-color:${(props) => (props.danger ? "red" : "green")}
  `;
  const Anchor = Button.withComponent("a");
  export default App;
  ```
- 코드를 재사용하고 싶을 때는 코드를 확장해준다!
- `withComponent`

```jsx
function App() {
  return (
    <Container>
      <Button>내용은 이렇게 작성!</Button> {/*Green*/}
      <Button danger /> {/*red*/}
      <Anchor href="https://google.com">Go to google</Anchor>
    </Container>
  );
}

const Anchor = Button.withComponent("a");
```

- 해당 명령으로 `button` 태그를 `a` 태그로 변경시켰다. `button -> a`
- `withComponent`를 사용하여 a태그를 인식시켜주었기 대문에 `<Anchor href=””>` 컴포넌트에 따로 a태그에 관한 설명을 넣지 않고도!!! `href` 어트리뷰트를 사용할 수 있다.
- `withcomponent` 를 통해 <Button  />에 사용한 css를 <Anchor />에서도 사용이 가능!!

## 수정된 태그에 style 추가 - `extend`

```jsx
const Anchor = Button.withComponent("a").extend`
	text-decoration:none;
`;
```

- `withComponent`를 통해 확장시킨 컴포넌트에게 style을 적용하기 위해서는 `extend` 메서드가 필요하다.

---

# **_animation -_** `keyframes`

```jsx
import styled, { injectGlobal, keyframes } from "styled-components";

injectGlobal`
	body{
		padding:0;
		margin:0;
	}
`;

function App() {
  return (
    <Container>
      <Button>내용은 이렇게 작성!</Button> {/*Green*/}
      <Button danger rotationTime /> {/*red*/}
      <Anchor href="https://google.com">Go to google</Anchor>
    </Container>
  );
}
const Container = styled.div`
  heigth: 100vh;
  width: 100%;
  backgroungd-color: pink;
`;
const Button = styled.button`
	border- radius:10px;
	color:red;
	&:focus,
	&:hover{
		outline:none;
	}
	background-color:${(props) => (props.danger ? "red" : "green")}

	${(props) => {
    if (props.danger) {
      return `animation : ${rotation} ${props.rotationTime}s linear infinite`;
    }
  }}

`;
const Anchor = Button.withComponent("a").extend`
	text-decoration:none;
`;

const rotation = keyframes`
	from{
		transform:rotate(0deg);
	}
	to{
		transform:rotate(360deg);
	}
`;

export default App;
```

---

# **_extra Attribute and Mixins - `attrs({})` & `css`_**

```jsx
import styled, { injectGlobal } from "styled-components";

injectGlobal`
	body{
		padding:0;
		margin:0;
	}
`;
const Input = styled.input.attrs({
  // .attrs({ object입력!->{} })
  required: true,
})`
  border-radius: 5px;
`;
function App() {
  return (
    <Container>
      <Input placeholder="Hello" />
    </Container>
  );
}
const Container = styled.div`
  heigth: 100vh;
  width: 100%;
  backgroungd-color: pink;
`;
export default App;
```

`.attrs()`

- 컴포넌트로 만든 요소에 어트리뷰트를 추가하고 싶을 때 사용함.
- attrs() 소괄호 내부에 `{}` 중괄호를 사용해야만 obj 형태로 어트리뷰트를 입력할 수 있음

```jsx
const Input = styled.input.attrs({
  // .attrs({ object입력!->{} })
  required: true,
})`
  border-radius: 5px;
`;
```

- attrs()의 입력이 완료된 후 ` attrs()``; ` 의 형태로 css를 작성한다.

`mixin`

- 여러 장소에서 그룹화를 하여, 사용하고 싶은 css 그룹

```jsx
import styled, { injectGlobal, css } from "styled-components"; //import css, css 규칙을 그룹화하게 도와줌!!

injectGlobal`
	body{
		padding:0;
		margin:0;
	}
`;
const awesomeCard = css`
  box-shadow: 0 4px 6px rgba(50, 50, 83, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  background-color: white;
  border-radius: 10px;
  padding: 20px;
`;
const Container = styled.div`
  heigth: 100vh;
  width: 100%;
  backgroungd-color: pink;
`;
const Input = styled.input.attrs({
  // .attrs({ object입력!->{} })
  required: true,
})`
  border-radius: 5px;
  border: none;
  ${awesomeCard} {
    /*<-mixin 사용방법*/
  }
`;
function App() {
  return (
    <Container>
      <Input placeholder="Hello" />
    </Container>
  );
}

export default App;
```

```jsx
import styled, { css } from "styled-components";

const awesomeCard = css`
  box-shadow: 0 4px 6px rgba(50, 50, 83, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  background-color: white;
  border-radius: 10px;
  padding: 20px;
`;

const Input = styled.input.attrs({
  // .attrs({ object입력!->{} })
  required: true,
})`
  border-radius: 5px;
  border: none;
  ${awesomeCard} {
    /*<-mixin 사용방법*/
  }
`;
```

- mixin
- card를 쓸 때마다 사용하고 싶은 css
- component생성할 때에는 ` styled.div``; ` 를 사용하지만 mixin을 사용할 때에는 styled-components에서 {css} 를 불러온 후, ` css``; ` 의 방식으로 css 코드를 작성 → 해당 css를 적용하고 싶은 요소에게 `${}` 의 형식으로 작성해준다.

---

# theming

`theme.js`

```jsx
const theme = {
  mainColor: "black",
  dengerColor: "red",
  successColor: "green",
};
export default theme;
```

```jsx
import styled, { injectGlobal, ThemeProvider } from "styled-components";
import theme from "./theme";

injectGlobal`
	body{
		padding:0;
		margin:0;
	}
`;
const Container = styled.div`
  heigth: 100vh;
  width: 100%;
  backgroungd-color: pink;
`;
const Card = styled.div`
  background-color: white;
`;
const Button = styled.button`
  border-radius: 30px;
  padding: 25px 15px;
  backgound-color: ${(props) => props.theme.successColor};
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Form />
      </Container>
    </ThemeProvider>
  );
}

const Form = () => {
  <Card>
    <Button>Hello</Button>
  </Card>;
};
export default App;
```

- 현재 <Button>컴포넌트의 스코프는 한정적이다. 많은 컴포넌트 & 요소들로 감싸고 있는데도 theme.js에서 작성한 프로퍼티를 사용하고 있다.
- `ThemeProvider` 를 사용했기 때문!
- `<ThemeProvider />` 는 theme={} 를통해 theme 파일을 찾고 있고, props로 전달해주는 파일은 언제든 바꿀 수 있다.
  - 일반모드, 나이트모드 와 같은 기능을 사용할 때 유용하게 사용할 수 있음!

---

# Nesting

```jsx
import styled, { injectGlobal, ThemeProvider } from "styled-components";
import theme from "./theme";

injectGlobal`
	body{
		padding:0;
		margin:0;
	}
`;
const Container = styled.div`
	heigth:100vh;
	width:100%;
	backgroungd-color:pink;
	**${Card}:last-child{
		backgound-color:blue;
	}**
`;
const Card = styled.div`
  background-color: white;
`;
const Button = styled.button`
  border-radius: 30px;
  padding: 25px 15px;
  backgound-color: ${(props) => props.theme.successColor};
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Form />
      </Container>
    </ThemeProvider>
  );
}

const Form = () => {
  <Card>
    <Button>Hello</Button>
  </Card>;
};
export default App;
```

- scss처럼 styled-component에서는 nesting을 사용할 수 있음.
