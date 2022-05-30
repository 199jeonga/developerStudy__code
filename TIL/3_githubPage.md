# git hub page push

```jsx
npm i gh-pages
```

깃허브 페이지에 build된 코드를 업로드를 해준다.

```jsx
"build": "react-scripts build",

"deploy": "gh-pages -d build",
"predeploy": "npm run build"
```

- pakage.json을 보면 bulid가 있는데 브라우저가 인식할 수 있도록 & 파일 용량의 효율성을 높이기 위한 작업이다.
- deploy는 깃허브페이지에 빌드된 파일을 업로드 하는 명령어
- predeploy는 deploy를 할 때마다 bulid를 해야하는 것이 번거롭기 때문에 deploy 명령을 하면 자동으로 predeploy가 실행되도록 한다.

```jsx
npm run bulid
npm run deploy
```

npm run ... 명령어를 사용한다.

```jsx
"homepage": "https://199jeonga.github.io/developerStudy__code"
```

pakege.json의 마지막에 “homepage”의 프로퍼티 키값을 가진 프로퍼티를 입력한다.

빌드 파일이 push될 url을 입력해주는 곳인데 레파지토리 명을 입력한다.

- 다른 이름으로 하니까 안 된걸로 보아 레파지토리 명만 가능한 것 같음..!
