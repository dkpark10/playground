import { NextResponse } from "next/server";
import { writeFile, readFile } from "fs/promises";

// eslint-disable-next-line @typescript-eslint/require-await
export async function GET(_: Request) {
  const file = await readFile("public/test.png");
  if (file) {
    return new NextResponse(file, { headers: { "content-type": "image/png" } });
  }

  const blob = await fetch("https://pm.pstatic.net/resources/asset/sp_main.2b96eea2.png").then((res) => res.blob());
  const arrayBuffer = await blob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  await writeFile("public/test.png", buffer);
  return new NextResponse(buffer, { headers: { "content-type": "image/png" } });
}
