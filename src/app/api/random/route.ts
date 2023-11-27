import { NextResponse } from "next/server";

export const revalidate = 2;

// eslint-disable-next-line @typescript-eslint/require-await
export async function GET(_: Request) {
  const ran = Math.floor(Math.random() * 100);
  return NextResponse.json(ran);
}
