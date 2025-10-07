import { useState, useEffect } from "react"

export const useCount = () => {
  const [count, setCount] = useState(0);

  const increase = () => {
    setCount(count + 1);
  }

  const decrease = () => {
    setCount(count - 1);
  }

  useEffect(() => {
    new IntersectionObserver((_) => {
    });
  }, []);

  useEffect(() => {
    console.log(count);
  }, []);

  return {
    count,
    increase, decrease
  };
}