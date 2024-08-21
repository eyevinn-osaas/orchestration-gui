import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';

export async function GET(): Promise<NextResponse> {
  const version = readFileSync('./gui-version.txt', 'utf-8');

  const result = { message: 'OK!', version };
  return new NextResponse(JSON.stringify(result, null, 2), { status: 200 });
}
