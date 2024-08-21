import { NextRequest, NextResponse } from 'next/server';
import { getMockedSources, getSources } from '../../../../api/manager/sources';
import { isAuthenticated } from '../../../../api/manager/auth';

export async function GET(request: NextRequest): Promise<NextResponse> {
  if (!(await isAuthenticated())) {
    return new NextResponse(`Not Authorized!`, {
      status: 403
    });
  }

  const url = new URL(request.url);

  if (url.searchParams.get('mocked') === 'true') {
    return new NextResponse(JSON.stringify(getMockedSources()), {
      status: 200
    });
  }

  try {
    return NextResponse.json(await getSources());
  } catch (e) {
    return new NextResponse(JSON.stringify(e), {
      status: 500
    });
  }
}
