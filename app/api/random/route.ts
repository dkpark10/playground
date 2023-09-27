import { NextResponse } from "next/server";

export function GET(_: Request) {
  const ran = Math.floor(Math.random() * 100);
  return NextResponse.json(ran);
}
