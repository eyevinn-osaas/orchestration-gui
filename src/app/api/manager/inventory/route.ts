import { NextRequest, NextResponse } from 'next/server';
import { updateSource } from '../../../../api/manager/sources';
import { isAuthenticated } from '../../../../api/manager/auth';

export async function POST(req: NextRequest): Promise<NextResponse> {
  if (!(await isAuthenticated())) {
    return new NextResponse(`Not Authorized!`, {
      status: 403
    });
  }

  const { source } = await req.json();
  const { value } = await updateSource(source);

  return new NextResponse(JSON.stringify({ source: value }, null, 2), {
    status: 201
  });
}
