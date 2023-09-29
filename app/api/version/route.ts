import { NextResponse } from "next/server";
// eslint-disable-next-line import/extensions
import { version } from "../../../package.json";

export function GET(_: Request) {
  return NextResponse.json(version);
}
