const toDoForm = document.querySelector("#todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector("#todo-list");
let toDos = [];
const TODOS_KEY = "todos";

function savedTodo() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos)); //"[]" 처럼 하나의 string으로 만들어준다. -> 원래는 "\뭐"\, 이런 식의 나열이었음!
}
function deleteToDo(event) {
  const li = event.target.parentElement;
  // target은 클릭된 html element를 뜻한다.
  // target에는 여러개의 프로퍼티가 존재하고 parentElement는 클릭된 html el의 부모
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id)); // 둘의 데이터타입이 다르기 때문에 데이터 타입을 같게 만들지 않으면 !== 의 조건이 true가 되기 때문에 삭제가 제대로 이루어지지 않는다.
  li.remove();
  savedTodo();
}
function paintToDo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const span = document.createElement("span");
  span.innerText = newTodo.text;
  const button = document.createElement("button");
  button.innerText = "❌";
  button.addEventListener("click", deleteToDo);
  li.appendChild(span);
  li.appendChild(button);
  toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value; // 값을 복사해 newTodo에 할당한다.
  toDoInput.value = ""; // input요소를 빈칸으로 만든다.
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj); // local storage에 저장을 하기 위해 newTodoo를
  paintToDo(newTodoObj);
  savedTodo();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

// function sayHello(item) {
//   console.log("hello", item);
// }

const savedTodos = localStorage.getItem(TODOS_KEY);

if (savedTodos !== null) {
  const parsedTodos = JSON.parse(savedTodos);
  // parsedTodos.forEach(sayHello);
  //forEach는 배열에서만 사용이 가능하기 떄문에 JSON.parse();를 사용하여 string을 array로 변경시켜주었다.
  //forEach는 각각의 item에 대하여 function sayHello를 실행시킨다.
  toDos = parsedTodos;
  parsedTodos.forEach(paintToDo);
}
