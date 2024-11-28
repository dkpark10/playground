'use client';

import { PropsWithChildren } from "react";
import { useSearchParams } from "next/navigation";

export default function StepButton({ children }: PropsWithChildren) {
  const searchParams = useSearchParams();

  const order = searchParams.get('order');

  return (
    <button
      onClick={() => {
        window.history.pushState(null, '', `?order=${Number(order) + 1}`);
      }}
    >
      {children}
    </button>
  );
}
