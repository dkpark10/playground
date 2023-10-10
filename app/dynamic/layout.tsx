import type { Metadata } from "next";
import GlobalProvider from "@/global-provider";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "next next",
  description: "next next description",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return <main>{children}</main>;
}
