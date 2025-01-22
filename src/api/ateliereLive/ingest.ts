import {
  ResourcesCompactIngestResponse,
  ResourcesIngestResponse,
  ResourcesIngestStreamResponse,
  ResourcesSourceResponse,
  ResourcesThumbnailResponse
} from '../../../types/ateliere-live';
import { LIVE_BASE_API_PATH } from '../../constants';
import { getAuthorizationHeader } from './utils/authheader';
import { SrtSource } from '../../interfaces/Source';

// TODO: create proper cache...
const INGEST_UUID_CACHE: Map<string, string> = new Map();
const SOURCE_ID_CACHE: Map<string, Map<string, number>> = new Map();

export async function getUuidFromIngestName(
  ingestName: string,
  useCache = true
) {
  if (ingestName !== undefined) {
    const cache = INGEST_UUID_CACHE.get(ingestName);
    if (cache && useCache) {
      return cache;
    }
    const ingests = await getIngests();
    const ingest = ingests.find((ingest) => ingest.name === ingestName);

    if (!ingest) {
      console.warn(`Could not find ingest ${ingestName}`);
      throw 'get_uuid';
    }
    INGEST_UUID_CACHE.set(ingestName, ingest.uuid);
    return ingest.uuid;
  }
}

export async function getSourceIdFromSourceName(
  ingestUuid: string,
  sourceName: string,
  useCache = true
) {
  if (ingestUuid !== undefined && sourceName !== undefined) {
    let ingestCache = SOURCE_ID_CACHE.get(ingestUuid);
    if (!ingestCache) {
      ingestCache = new Map();
      SOURCE_ID_CACHE.set(ingestUuid, ingestCache);
    }
    const cache = ingestCache?.get(sourceName);
    if (cache && useCache) {
      return cache;
    }
    const ingest = await getIngest(ingestUuid);
    const source = ingest.sources?.find((source) => source.name === sourceName);

    if (source && source.source_id !== undefined) {
      ingestCache.set(sourceName, source.source_id);
      return source.source_id;
    }
    console.warn(
      `Could not find id for source ${sourceName} in ingest ${ingestUuid}`
    );
    throw `Could not find id for source ${sourceName} in ingest ${ingestUuid}`;
  }
}

export async function getIngests(): Promise<ResourcesCompactIngestResponse[]> {
  const response = await fetch(
    new URL(LIVE_BASE_API_PATH + `/ingests?expand=true`, process.env.LIVE_URL),
    {
      headers: {
        authorization: getAuthorizationHeader()
      },
      next: {
        revalidate: 0
      }
    }
  );
  if (response.ok) {
    return response.json();
  }
  throw await response.json();
}

export async function getIngest(
  uuid: string
): Promise<ResourcesIngestResponse> {
  const response = await fetch(
    new URL(
      LIVE_BASE_API_PATH + `/ingests/${uuid}?expand=true`,
      process.env.LIVE_URL
    ),
    {
      headers: {
        authorization: getAuthorizationHeader()
      }
    }
  );
  if (response.ok) {
    return response.json();
  }
  throw await response.json();
}

export async function getSourceThumbnail(
  ingestUuid: string,
  sourceId: number,
  { width = 1920, height = 1080 }: { width?: number; height?: number } = {}
) {
  const response = await fetch(
    new URL(
      LIVE_BASE_API_PATH +
        `/ingests/${ingestUuid}/sources/${sourceId}/thumbnail`,
      process.env.LIVE_URL
    ),
    {
      next: { tags: ['image'] },
      method: 'POST',
      body: JSON.stringify({
        encoder: 'auto',
        quality: 85,
        height,
        width
      }),
      headers: {
        authorization: getAuthorizationHeader(),
        cache: 'no-store'
      }
    }
  );
  if (response.ok) {
    const json = (await response.json()) as ResourcesThumbnailResponse;
    return json.data;
  }
  throw await response.json();
}

export async function deleteSrtSource(ingestUuid: string, sourceId: number) {
  const response = await fetch(
    new URL(
      LIVE_BASE_API_PATH + `/ingests/${ingestUuid}/sources/${sourceId}`,
      process.env.LIVE_URL
    ),
    {
      method: 'DELETE',
      headers: {
        authorization: getAuthorizationHeader()
      },
      next: {
        revalidate: 0
      }
    }
  );
  if (response.ok) {
    return response.status;
  }
  throw await response.text();
}

export async function createSrtSource(
  ingestUuid: string,
  srtPayload: SrtSource
) {
  let payload;

  // Making sure remote_port is only passed if mode is 'caller'
  if (srtPayload.mode === 'caller') {
    payload = {
      srt_source: {
        ...srtPayload,
        local_port: Number(srtPayload.local_port),
        latency_ms: Number(srtPayload.latency_ms),
        remote_port: Number(srtPayload.remote_port)
      }
    };
  } else {
    payload = {
      srt_source: {
        ...srtPayload,
        local_port: Number(srtPayload.local_port),
        latency_ms: Number(srtPayload.latency_ms)
      }
    };
  }

  const response = await fetch(
    new URL(
      LIVE_BASE_API_PATH + `/ingests/${ingestUuid}/sources`,
      process.env.LIVE_URL
    ),
    {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        authorization: getAuthorizationHeader()
      }
    }
  );
  if (response.ok) {
    return response.json();
  }
  const errorText = await response.text();
  throw new Error(errorText);
}

export async function getIngestSources(
  ingestUuid: string
): Promise<ResourcesSourceResponse[]> {
  const response = await fetch(
    new URL(
      LIVE_BASE_API_PATH + `/ingests/${ingestUuid}/sources?expand=true`,
      process.env.LIVE_URL
    ),
    {
      method: 'GET',
      headers: {
        authorization: getAuthorizationHeader()
      }
    }
  );
  if (response.ok) {
    return response.json();
  }
  const errorText = await response.text();
  throw new Error(errorText);
}

export async function getIngestStreams(
  ingestUuid: string
): Promise<ResourcesIngestStreamResponse[]> {
  const response = await fetch(
    new URL(
      LIVE_BASE_API_PATH + `/ingests/${ingestUuid}/streams?expand=true`,
      process.env.LIVE_URL
    ),
    {
      method: 'GET',
      headers: {
        authorization: getAuthorizationHeader()
      }
    }
  );
  if (response.ok) {
    return response.json();
  }
  throw await response.text();
}
