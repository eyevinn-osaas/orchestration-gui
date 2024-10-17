import { ObjectId, WithId } from 'mongodb';
import { TMultiviewLayout } from '../../interfaces/preset';
import { getDatabase } from '../mongoClient/dbClient';

export async function getMultiviewLayouts(): Promise<TMultiviewLayout[]> {
  const db = await getDatabase();
  return await db.collection<TMultiviewLayout>('multiviews').find({}).toArray();
}

export async function getMultiviewLayout(
  id: string
): Promise<WithId<TMultiviewLayout>> {
  const db = await getDatabase();
  return (await db
    .collection<TMultiviewLayout>('multiviews')
    .findOne({ _id: new ObjectId(id) })) as WithId<TMultiviewLayout>;
}

export async function putMultiviewLayout(
  newMultiviewLayout: TMultiviewLayout
): Promise<void> {
  const db = await getDatabase();
  const collection = db.collection('multiviews');
  const editLayout = await collection.findOne({
    _id: new ObjectId(newMultiviewLayout._id),
    name: newMultiviewLayout.name
  });

  const newMultiviewLayoutWithoutID = { ...newMultiviewLayout };
  delete newMultiviewLayoutWithoutID._id;

  if (editLayout) {
    await collection.updateOne(
      { name: newMultiviewLayout.name },
      { $set: { ...newMultiviewLayoutWithoutID } }
    );
  } else {
    await collection.insertOne({ ...newMultiviewLayout, _id: new ObjectId() });
  }
}
