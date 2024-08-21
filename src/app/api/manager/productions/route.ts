import { NextRequest, NextResponse } from 'next/server';
import {
  getProductions,
  postProduction
} from '../../../../api/manager/productions';
import { Production } from '../../../../interfaces/production';
import { isAuthenticated } from '../../../../api/manager/auth';

type RequestForProduction = Request & Production;

export async function GET(request: NextRequest): Promise<NextResponse> {
  if (!(await isAuthenticated())) {
    return new NextResponse(`Not Authorized!`, {
      status: 403
    });
  }
  try {
    const productions = await getProductions();
    return new NextResponse(JSON.stringify(productions), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(`Error searching DB! Error: ${error}`, {
      status: 500
    });
  }
}

export async function POST(
  request: RequestForProduction
): Promise<NextResponse> {
  if (!(await isAuthenticated())) {
    return new NextResponse(`Not Authorized!`, {
      status: 403
    });
  }
  try {
    const data = (await request.json()) as Production;
    const insertedId = await postProduction(data);
    return new NextResponse(JSON.stringify(insertedId), {
      status: 200
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      `Error occurred while posting to DB! Error: ${error}`,
      {
        status: 500
      }
    );
  }
}
