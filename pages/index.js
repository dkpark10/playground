import { useState } from "react"

export default function Home() {
  const [count, setCount] = useState(0);
  const inc = () => {
    setCount(count + 1);
  };

  const dec = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={inc}>증가</button>
      <button onClick={dec}>감소</button>
    </div>
  )
}
