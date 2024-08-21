import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '../../../../../api/manager/auth';
import { getMonitoring } from '../../../../../api/manager/monitoring';

type Params = {
  id: string;
};
export async function GET(
  request: NextRequest,
  { params }: { params: Params }
): Promise<NextResponse> {
  if (!(await isAuthenticated())) {
    return new NextResponse(`Not Authorized!`, {
      status: 403
    });
  }
  try {
    const monitoring = await getMonitoring(params.id);
    return new NextResponse(JSON.stringify(monitoring), { status: 200 });
  } catch (error) {
    return new NextResponse(`Error searching DB! Error: ${error}`, {
      status: 500
    });
  }
}
