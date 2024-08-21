import { NextRequest, NextResponse } from 'next/server';
import { Production } from '../../../../interfaces/production';
import { startProduction } from '../../../../api/manager/workflow';
import { Log } from '../../../../api/logger';
import { isAuthenticated } from '../../../../api/manager/auth';

export async function POST(request: NextRequest): Promise<NextResponse> {
  if (!(await isAuthenticated())) {
    return new NextResponse(`Not Authorized!`, {
      status: 403
    });
  }

  const production: Production = await request.json();
  return startProduction(production)
    .then((response) => {
      return new NextResponse(JSON.stringify(response));
    })
    .catch((error) => {
      Log().error(error);
      const errorResponse = {
        ok: false,
        error: 'unexpected'
      };
      return new NextResponse(JSON.stringify(errorResponse), { status: 500 });
    });
}
