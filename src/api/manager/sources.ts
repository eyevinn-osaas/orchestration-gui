import inventory from './mocks/inventory.json';
import { Source } from '../../interfaces/Source';
import { ObjectId } from 'mongodb';
import { getDatabase } from '../mongoClient/dbClient';

export function getMockedSources() {
  return inventory;
}

export async function postSource(data: Source): Promise<ObjectId> {
  const db = await getDatabase();
  return (await db.collection('inventory').insertOne(data))
    .insertedId as ObjectId;
}

export async function getSources() {
  const db = await getDatabase();
  return await db.collection<Source>('inventory').find().toArray();
}

export async function getSourcesByIds(_ids: string[]) {
  const db = await getDatabase().catch(() => {
    throw "Can't connect to Database";
  });
  const objectIds = _ids.map((id: string) => {
    return new ObjectId(id);
  });

  return (
    await db
      .collection<Source>('inventory')
      .find({
        _id: {
          $in: objectIds
        }
      })
      .toArray()
  ).sort(
    (a, b) =>
      _ids.findIndex((id) => a._id.equals(id)) -
      _ids.findIndex((id) => b._id.equals(id))
  );
}

export async function updateSource(source: any) {
  const db = await getDatabase();
  const { _id, ...rest } = source;

  return await db.collection<Source>('inventory').findOneAndReplace(
    { _id: new ObjectId(_id) },
    {
      ...rest
    },
    { returnDocument: 'after' }
  );
}

export async function upsertSource(source: Source) {
  const db = await getDatabase();
  const { _id, ...rest } = source;

  return await db
    .collection<Source>('inventory')
    .findOneAndReplace(
      { _id: new ObjectId(_id) },
      { ...rest },
      { upsert: true, returnDocument: 'after' }
    );
}
