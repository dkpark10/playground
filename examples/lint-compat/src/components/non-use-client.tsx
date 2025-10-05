import { useCount } from "@/hooks/use-count"

export default function NonUseClient() {
  const { count } = useCount();

  return <div>non use client {count}</div>
}
