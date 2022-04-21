const images = ["img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg"];

const chosenImage = images[Math.floor(Math.random() * images.length)];
const bgImage = document.createElement("img");

bgImage.src = `img/${chosenImage}`;

document.body.appendChild(bgImage);

// Math.random() 은 0~1 사이의 숫자를 랜덤으로 나오게 하는 것이기 떄문에 0~10으 ㅣ숫자를 사용하고 싶다면 Maht.random() * 10을 진행해야 한다.
