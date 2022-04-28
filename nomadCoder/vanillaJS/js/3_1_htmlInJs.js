//document는 js에서 html을 읽을 수 있게 도와주는 obj로 document의 함수 중엔 getElementById 등이 있다.
//또한 해당 obj를 가져오는 것 외에 내용을 변경하는 것도 가능하다.

const title = document.getElementById("title");
title.innerText = "변경되었습니다~!";
