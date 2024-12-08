import { NextResponse } from 'next/server';

export async function GET() {
  const ran = Math.floor(Math.random() * 100);
  return NextResponse.json(ran);
}
