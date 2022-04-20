const loginForm = document.querySelector("#login-form");
const loginInput = loginForm.querySelector("input");
const loginButton = loginForm.querySelector("button");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

// const link = document.querySelector("a");

// function onLoginBtnClick() {
//   const userName = loginInput.value;
//   if (userName === "") {
//     alert("이름을 입력해 주세요.");
//   } else if (userName.length > 15) {
//     //html 내에서 maxlength="15"를 통해 html자제적으로 글자수 방지가 가능하다.
//     alert("네 이름이 너무 길어");
//   }
// }

// loginButton.addEventListener("click", onLoginBtnClick);

//submit을 할 때마다 홈페이지는 새로고침을 반복한다.
//submit을 할 때마다 새로고침되는 것을 방지하기 위한 코드 ->  preventDefault();
//=======================
/**
 *
 *
 */
//=======================

function onLoginSubmit(e) {
  e.preventDefault();
  // 어떤 이벤트의 기본 행동이던 방지!!
  loginForm.classList.add(HIDDEN_CLASSNAME);
  //----------------------------------
  // username을 전역변수가 아닌 지역변수로 선언한 이유!!
  // addEventLister을 사용하여 submit되었을 때 해당하는 value가 username에 저장되도록 하기 위해서이다.
  // 만약 이것을 전역변수로 한다면 이벤트에 따른 선언이 아닌 일반적인 선언이기 때문에 현재 값이 비어있어 "" 로 표시된다.
  // greeting.innerText = "Hello " + username;
  localStorage.setItem(USERNAME_KEY, loginInput.value);
  paintGreeting();
}

function paintGreeting() {
  const username = localStorage.getItem(USERNAME_KEY);
  greeting.innerText = `Hello ${username}`;
  greeting.classList.remove(HIDDEN_CLASSNAME);
}
const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername === null) {
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginForm.addEventListener("submit", onLoginSubmit);
} else {
  paintGreeting();
}

// js는 이벤트가 발생된 요소에 대한 정보를 가지고 있다.
// 이벤트가 발생되면 함수를 호출하는데 이 함수에 첫번째 인자는 방금 발생된 이벤트에 대한 정보이다.
// 만약 공란으로 둔다면 어떤 정보도 넘겨 받지 않겠다는 뜻!

//----------------------------------------------------------------------------
// function handleLinkClick(e) {
//   e.preventDefault();
//   console.log(e);
//   // alert("click");
// }

// link.addEventListener("click", handleLinkClick);
// a link의 기본 동작은 링크이동이다. 따라서 preventDefalte()를 이용하여 기본 이벤트를 방지했을 때
// 다른 곳으로 앵커 이동이 방지된다.
// 또한 alert 기능을 사용하면 런타임을 막고 해당 안내 팝업이 뜨기 때문에 요즘은 사용하지 않는 기능이다.
