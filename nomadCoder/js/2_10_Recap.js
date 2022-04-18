const calc = {
  add: function (a, b) {
    console.log(a + "+" + b + "는 " + (a + b) + "입니다.");
  },
  min: function (a, b) {
    console.log(a + "-" + b + "는 " + (a - b) + "입니다.");
  },
  // 문자와 숫자가 복합적으로 결합된 형태이기 때문에 괄호를 사용하지 않으면 오류가 나 제대로 연산을 수행하지 못한다.
  // -> 2+3이 아닌 23이 나오고 NaN이 나왔다.
  div: function (a, b) {
    console.log(a + "/" + b + "는 " + a / b + "입니다.");
  },
  mul: function (a, b) {
    console.log(a + "*" + b + "는 " + a * b + "입니다.");
  },
};

console.log("--------------");
calc.add(2, 3);
calc.min(5, 2);
calc.div(9, 3);
calc.mul(3, 6);
