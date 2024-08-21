import { NextRequest, NextResponse } from 'next/server';
import { getPresets } from '../../../../api/manager/presets';
import { isAuthenticated } from '../../../../api/manager/auth';

export async function GET(request: NextRequest): Promise<NextResponse> {
  if (!(await isAuthenticated())) {
    return new NextResponse(`Not Authorized!`, {
      status: 403
    });
  }

  try {
    return NextResponse.json(await getPresets());
  } catch (e) {
    return new NextResponse(JSON.stringify(e), {
      status: 500
    });
  }
}
