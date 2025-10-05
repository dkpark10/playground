import { useEffect } from "react"

export const useInterSect = () => {
  useEffect(() => {
    new IntersectionObserver((_) => {
    });
  }, []);
}
