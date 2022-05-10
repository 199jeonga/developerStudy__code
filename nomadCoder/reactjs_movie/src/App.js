import { useState, useEffect } from "react";
function Hello() {
  useEffect(() => {
    console.log("나타났습니당");
    return () => console.log("숨겼습니당");
  }, []);
  return <h1>Hello</h1>;
}

function App() {
  const [showing, setShowing] = useState(false);
  const onClick = () => setShowing((prev) => !prev);
  return (
    <div>
      {showing ? <Hello /> : null}
      <button onClick={onClick}>{showing ? "hide" : "show"}</button>
    </div>
  );
}

export default App;
