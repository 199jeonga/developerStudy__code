const API_KEY = "40febf8231c32c9d001b93cde5499613";

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  // console.log(url); // 제대로 url이 불러와지는지 확인
  fetch(url)
    //fetch를 통해 url을 불러온다. 이것은 Network를 통해 확인이 가능!
    .then((response) => response.json())
    .then((data) => {
      const weather = document.querySelector("#weather span:first-child");
      const city = document.querySelector("#weather span:last-child");
      weather.innerText = `${data.weather[0].main} / ${data.main.temp}`;
      city.innerText = data.name;
    });
}
function onGeoError() {
  alert("날짜 정보를 찾을 수 없습니다.");
}
navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError); //브라우저의 위치좌표를 찾는 함수
// getCurrentPosition(성공했을 때, 실패했을 때) getCurrentPosition은 두개의 인자를 받는다.
