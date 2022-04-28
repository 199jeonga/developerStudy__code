const hellos = document.getElementsByClassName("hello");
// 유일성을 지닌 id가 아닌 class이기 때문에 s오 className을 사용했으며 이 외에 tagName도 존재함
const h1 = document.getElementsByTagName("h1");

//이 외에 css의 개념을 적용해 js로 해당 요소를 가져오는 방법도 존재한다.
const title = document.querySelector(".hello");
// css처럼 body>.hello와 같은 개념을 적용시킬 수 있다.
// li:first-child도 사용 가능!!

// 또한 동일한 이름을 가진 여러개의 class를 가져오려고 해도 첫번째 class만 가져올 수 있다.
// 이때 사용해야 하는 것은
// document.querySelectorAll(".hello");
// 해당 요소를 array로 가져옴
// 사용하려고 한다면 title[0] 와 같이 해당 요소 하나를 선택해야 함!
