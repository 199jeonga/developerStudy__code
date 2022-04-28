const clock = document.querySelector("h2#clock");

function getClock() {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  clock.innerText = `${hours}:${minutes}:${seconds}`;
}
getClock();
setInterval(getClock, 1000);
// 일정 시간마다(5초) sayhello function이 호출된다.

// setTimeout(sayHello, 5000);
// 일정시간이 지난 후에 sayHello function을 호출한다.

// padStart, padEnd
// "00".padStart(2, "0") 과같이 작성한다. padStart의 첫번째 인자는 글자수의 맥스값이고, 두번째 인자는 맥스값이 되기 위해 채우는 값이다.
// 1이 01이 되지 않고 10 이 되게 하고 싶다면 padEnd를 작성하면 된다.
// 또한 padStaer, padEnd는 숫자가 아닌 문자형에만 사용할 수 있기 때문에 Date로 구한 숫자형의 값에는 String을 사용하여 문자로 변형한 후 사용해야 한다.
