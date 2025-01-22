import { Db, ObjectId, UpdateResult } from 'mongodb';
import { getDatabase } from '../mongoClient/dbClient';
import { Production, ProductionWithId } from '../../interfaces/production';
import { Log } from '../logger';

export async function getProductions(): Promise<Production[]> {
  const db = await getDatabase();
  return (await db.collection('productions').find({}).toArray()).map(
    (prod) => ({ ...prod, _id: prod._id.toString() })
  ) as Production[];
}

export async function getProduction(id: string): Promise<ProductionWithId> {
  const db = await getDatabase();

  return (await db
    .collection('productions')
    .findOne({ _id: new ObjectId(id) })) as ProductionWithId;
}

export async function setProductionsIsActiveFalse(): Promise<
  UpdateResult<Document>
> {
  const db = await getDatabase();
  return await db
    .collection('productions')
    .updateMany({}, { $set: { isActive: false } });
}

export async function putProduction(
  id: string,
  production: Production
): Promise<Production> {
  const db = await getDatabase();
  const newSourceId = new ObjectId().toString();

  const sources = production.sources
    ? production.sources.flatMap((singleSource) => {
        return singleSource._id
          ? singleSource
          : {
              _id: newSourceId,
              type: singleSource.type,
              label: singleSource.label,
              input_slot: singleSource.input_slot,
              html_data:
                (singleSource.type === 'html' && singleSource.html_data) ||
                undefined,
              media_data:
                (singleSource.type === 'mediaplayer' &&
                  singleSource.media_data) ||
                undefined
            };
      })
    : [];

  await db.collection('productions').findOneAndReplace(
    { _id: new ObjectId(id) },
    {
      name: production.name,
      isActive: production.isActive,
      sources: sources,
      production_settings: production.production_settings
    }
  );

  if (!production.isActive) {
    deleteMonitoring(db, id);
  }

  return {
    _id: new ObjectId(id).toString(),
    name: production.name,
    isActive: production.isActive,
    sources: sources,
    production_settings: production.production_settings
  };
}

export async function postProduction(data: Production): Promise<ObjectId> {
  const db = await getDatabase();
  return (
    await db
      .collection('productions')
      .insertOne({ ...data, _id: new ObjectId(data._id) })
  ).insertedId;
}

export async function deleteProduction(id: string): Promise<void> {
  const db = await getDatabase();

  await db.collection('productions').deleteOne({
    _id: { $eq: new ObjectId(id) }
  });
  Log().info('Deleted production', id);

  deleteMonitoring(db, id);
}

function deleteMonitoring(db: Db, productionId: string) {
  db.collection('monitoring').deleteMany({ productionId: productionId });
}

export async function getProductionPipelineSourceAlignment(
  productionId: string,
  pipelineId: string,
  ingestSourceName: string,
  ingestName: string
) {
  const production = await getProduction(productionId);

  if (!production) {
    console.error('Production not found');
    return null;
  }

  const pipeline = production.production_settings.pipelines.find(
    (p) => p.pipeline_id === pipelineId
  );

  const source = pipeline?.sources?.find(
    (source) =>
      source.ingest_name === ingestName &&
      source.ingest_source_name === ingestSourceName
  );

  const alignment =
    source?.settings?.alignment_ms !== undefined
      ? source.settings.alignment_ms
      : pipeline?.alignment_ms;

  return alignment;
}

export async function setProductionPipelineSourceAlignment(
  productionId: string,
  pipelineId: string,
  ingestName: string,
  ingestSourceName: string,
  alignment_ms: number
) {
  const db = await getDatabase();

  try {
    const result = await db.collection('productions').updateOne(
      {
        _id: new ObjectId(productionId),
        'production_settings.pipelines.pipeline_id': pipelineId,
        'production_settings.pipelines.sources.ingest_name': ingestName,
        'production_settings.pipelines.sources.ingest_source_name':
          ingestSourceName
      },
      {
        $set: {
          'production_settings.pipelines.$[p].sources.$[s].settings.alignment_ms':
            alignment_ms
        }
      },
      {
        arrayFilters: [
          { 'p.pipeline_id': pipelineId },
          {
            's.ingest_name': ingestName,
            's.ingest_source_name': ingestSourceName
          }
        ]
      }
    );

    if (result.matchedCount === 0) {
      console.error('No matching pipeline or source found to update');
      return null;
    }

    return true;
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Error updating pipeline source alignment');
  }
}

export async function getProductionSourceLatency(
  productionId: string,
  pipelineId: string,
  ingestSourceName: string,
  ingestName: string
) {
  const production = await getProduction(productionId);

  if (!production) {
    console.error('Production not found');
    return null;
  }

  const pipeline = production.production_settings.pipelines.find(
    (p) => p.pipeline_id === pipelineId
  );

  const source = pipeline?.sources?.find(
    (source) =>
      source.ingest_name === ingestName &&
      source.ingest_source_name === ingestSourceName
  );

  const latency =
    source?.settings?.max_network_latency_ms !== undefined
      ? source.settings.max_network_latency_ms
      : pipeline?.max_network_latency_ms;

  return latency;
}
export async function setProductionPipelineSourceLatency(
  productionId: string,
  pipelineId: string,
  ingestName: string,
  ingestSourceName: string,
  max_network_latency_ms: number
) {
  const db = await getDatabase();

  try {
    const result = await db.collection('productions').updateOne(
      {
        _id: new ObjectId(productionId),
        'production_settings.pipelines.pipeline_id': pipelineId,
        'production_settings.pipelines.sources.ingest_name': ingestName,
        'production_settings.pipelines.sources.ingest_source_name':
          ingestSourceName
      },
      {
        $set: {
          'production_settings.pipelines.$[p].sources.$[s].settings.max_network_latency_ms':
            max_network_latency_ms
        }
      },
      {
        arrayFilters: [
          { 'p.pipeline_id': pipelineId },
          {
            's.ingest_name': ingestName,
            's.ingest_source_name': ingestSourceName
          }
        ]
      }
    );

    if (result.matchedCount === 0) {
      console.error('No matching pipeline or source found to update');
      return null;
    }

    return true;
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Error updating pipeline source latency');
  }
}

export async function replaceProductionSourceStreamIds(
  productionId: string,
  sourceId: string | ObjectId,
  newStreamUuids: string[]
) {
  const db = await getDatabase();
  const productionObjectId = new ObjectId(productionId);

  const sourceIdForQuery =
    typeof sourceId === 'string' ? sourceId : sourceId.toString();

  const updateResult = await db.collection('productions').updateOne(
    {
      _id: productionObjectId,
      'sources._id': sourceIdForQuery
    },
    {
      $set: {
        'sources.$.stream_uuids': newStreamUuids
      }
    }
  );

  if (updateResult.matchedCount === 0) {
    throw new Error('Production or source not found');
  }

  return updateResult;
}
