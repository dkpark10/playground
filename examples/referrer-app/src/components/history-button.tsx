'use client';

import { useRouter } from "next/navigation";
import type { PropsWithChildren, ButtonHTMLAttributes } from "react";

export function ForwardkButton({ children, ...rest }: PropsWithChildren & ButtonHTMLAttributes<HTMLButtonElement>) {
  const router = useRouter();
  return <button {...rest} onClick={() => router.forward()}>{children}</button>
}

export function GoBackButton({ children, ...rest }: PropsWithChildren & ButtonHTMLAttributes<HTMLButtonElement>) {
  const router = useRouter();
  return <button {...rest} onClick={() => router.back()}>{children}</button>
}
