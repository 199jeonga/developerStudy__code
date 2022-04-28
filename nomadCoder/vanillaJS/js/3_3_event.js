const h1 = document.querySelector("h1");

function handleTitleClick() {
  // const currentColor = h1.style.color;
  // let newColor;
  // if (currentColor === "blue") {
  //   newColor = "tomato";
  // } else {
  //   newColor = "blue";
  // }
  // h1.style.color = newColor;
  // style적용은 css에서 하는 것을 권장!

  h1.innerText = "Clicked me!";
  const clickedClass = "clicked";

  // if (h1.className === clickedClass) {
  //   h1.className = "";
  // } else {
  //   h1.className = clickedClass;
  // } //if
  //하지만 위와 같은 코드는 className이 이미 존재하는 코드에서는 기존 className 을 대체하게 된다.
  //그렇다고 classsName="cliced secondClassName"을 작성하면 기존 className을 대체하지 않고 두개를 한 번에 작성할 수 있으나
  // 이것은 js가 해야 할 일을 직접 하게 돼 좋은 코드가 아니다 !!

  // classList를 사용하여 해당 className의 여부를 확인한 후 add, remove
  // if (h1.classList.contains(clickedClass)) {
  //   h1.classList.remove(clickedClass);
  // } else {
  //   h1.classList.add(clickedClass);
  // } //if

  // toggle을 사용한다면
  h1.classList.toggle(clickedClass);
  // classList에 해당 className이 있는지를 확인해서 있다면 제거 없다면 추가해주는 기능
}

// function handleTitleEnter() {
//   title.innerText = "마우스 여기있어용";
// }

// function handleTitleleave() {
//   title.innerText = "마우스 갔슴다";
//   title.style.color = "black";
// }

// function handleWindowResize() {
//   document.body.style.backgroundColor = "tomato";
//   console.log("리사이즈");
// }

// function handleWindowCopy() {
//   alert("사용자가 복사를 실행했어요!");
// }

// function handleWindowOffline() {
//   alert("SOS no WIFI");
// }

h1.addEventListener("click", handleTitleClick);
// title.onclick = handleTitleClick
// addEventListener대신 위와 같이 작성할 수 있다 !! -> ㅁddEventListener를 사용하여 작성했을 경우에 후에 remove가 가능하다.

// 사용자가 title 요소를 클릭하면 handleTitleClick 함수가 실행된다.
// console.dir(title)을 통해 event의 종류를 확인할 수 있다 -> MDN을 통해서도 가능!
// 또한 이벤트가 실행됐을 때 함수가 실행되어야 하기 때문에 함수 실행을 뜻하는 ()를 작성해서는 안 된다.

// title.addEventListener("mouseenter", handleTitleEnter);
// title.addEventListener("mouseleave", handleTitleleave);

// window.addEventListener("resize", handleWindowResize);
// window.addEventListener("copy", handleWindowCopy);
// window.addEventListener("offline", handleWindowOffline);
