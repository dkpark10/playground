import type { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "blog",
  description: "my blog",
  viewport: "width=device-width, initial-scale=1",
};

export default function BlogLayout({ children }: PropsWithChildren) {
  return <main>{children}</main>;
}
