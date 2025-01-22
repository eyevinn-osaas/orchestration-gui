import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '../../../../../../../../api/manager/auth';
import { getPipelineMediaSources } from '../../../../../../../../api/ateliereLive/pipelines/renderingengine/renderingengine';
import { Log } from '../../../../../../../../api/logger';

type Params = {
  id: string;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  if (!(await isAuthenticated())) {
    return new NextResponse(`Not Authorized!`, {
      status: 403
    });
  }

  try {
    const mediaSources = await getPipelineMediaSources(params.id);
    return new NextResponse(
      JSON.stringify({
        mediaSources
      }),
      {
        status: 200
      }
    );
  } catch (error) {
    Log().error(error);
    return new NextResponse(
      `Error fetching pipeline media sources! Error: ${error}`,
      {
        status: 500
      }
    );
  }
}
