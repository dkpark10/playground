import { NextResponse } from 'next/server';
// eslint-disable-next-line import/extensions
import packageJson from '../../../../package.json';

export async function GET() {
  return NextResponse.json(packageJson.version);
}
