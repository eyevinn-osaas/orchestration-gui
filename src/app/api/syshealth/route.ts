import { NextResponse } from 'next/server';
import { getIngests } from '../../../api/agileLive/ingest';
import { connected } from '../../../api/mongoClient/dbClient';
import { isAuthenticated } from '../../../api/manager/auth';
import { AGILE_BASE_API_PATH } from '../../../constants';

export async function GET(): Promise<NextResponse> {
  if (!(await isAuthenticated())) {
    return new NextResponse(`Not Authorized!`, {
      status: 403
    });
  }
  const isConnectedToAgile = await getIngests()
    .then(() => true)
    .catch(() => false);

  const isConnectedToDatabase = await connected().catch(() => false);

  if (isConnectedToAgile && isConnectedToDatabase) {
    return new NextResponse(
      JSON.stringify({
        message: 'Connected!',
        database: {
          connected: isConnectedToDatabase
        },
        agileApi: { connected: isConnectedToAgile }
      }),
      {
        status: 200
      }
    );
  }

  const databaseUrl = new URL('', process.env.MONGODB_URI);

  return new NextResponse(
    JSON.stringify({
      message: 'Something went wrong with the connection!',
      agileApi: {
        connected: isConnectedToAgile,
        url: new URL(AGILE_BASE_API_PATH, process.env.AGILE_URL)
      },
      database: {
        connected: isConnectedToDatabase,
        url: databaseUrl.host + databaseUrl.pathname
      }
    }),
    {
      status: 500
    }
  );
}
