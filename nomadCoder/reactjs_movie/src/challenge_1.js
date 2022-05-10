import { useState, useEffect } from "react";
function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [selVal, setSelVal] = useState("default");
  const [inValue, setInVal] = useState("");
  const [btn, setBtn] = useState(false);
  const [exchange, setExchange] = useState("ko");
  let ko = 1276.0;
  let cny = 6.75;
  const onChange = (event) => {
    setSelVal(event.target.value);
  };
  const onSubmit = (event) => {
    setInVal(event.target.value);
  };
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  const onClick = (e) => {
    e.preventDefault();
    setBtn(!btn);
  };
  const onSelect = (e) => {
    setExchange(e.target.value);
  };
  const exSwith = (exchange) => {
    switch (exchange) {
      case "ko":
        return `구입 가능한 코인 개수 : ${inValue / ko / selVal}`;
      case "en":
        return `구입 가능한 코인 개수 : ${inValue / selVal}`;
      case "ch":
        return `구입 가능한 코인 개수 : ${inValue / cny / selVal}`;
    }
  };
  return (
    <div>
      <h1>The Coins! {loading ? "" : `(coin : ${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <div>
          <select onChange={onChange} value={selVal}>
            <option value="default">코인을 입력해 주세요!</option>
            {coins.map((coin) => (
              <option key={coin.id} value={coin.quotes.USD.price}>
                {coin.name}({coin.symbol}) : ${coin.quotes.USD.price}
              </option>
            ))}
          </select>
          <hr />
          <form>
            <label htmlFor="changeBit">총 금액</label>
            <input
              id="changeBit"
              type="number"
              value={inValue}
              onChange={onSubmit}
            />
            <select onChange={onSelect}>
              <option value="ko">한국 : 원</option>
              <option value="en">미국 : 달러</option>
              <option value="ch">중국 : 위안화</option>
            </select>
            <button onClick={onClick}>
              {btn && inValue !== "" ? "그만 볼래요!" : "환전 금액 확인하기"}
            </button>
            {btn && inValue !== "" ? <h2>{exSwith(exchange)}</h2> : null}
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
