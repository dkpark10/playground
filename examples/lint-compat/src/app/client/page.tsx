'use client'

import Client from "@/components/client";
import NonUseClient from "@/components/non-use-client";
import { useCount } from "@/hooks/use-count"

export default function ClientPage() {
  const { count } = useCount();
  new IntersectionObserver(() => {;});
  return (
    <>
      <span>{count}</span>
      <Client />
      <NonUseClient />
    </>
  );
}
