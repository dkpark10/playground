import { NextResponse } from 'next/server';
// eslint-disable-next-line import/extensions
import packageJson from '../../../../package.json';

// eslint-disable-next-line @typescript-eslint/require-await
export async function GET(_: Request) {
  return NextResponse.json(packageJson.version);
}
