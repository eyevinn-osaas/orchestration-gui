import { ObjectId } from 'mongodb';
import { getDatabase } from '../mongoClient/dbClient';
import { Numbers } from '../../interfaces/Source';

interface IResponse {
  audio_stream?: {
    audio_mapping?: Numbers[];
    number_of_channels: number;
    sample_rate: number;
  };
}

export async function getAudioMapping(id: ObjectId): Promise<IResponse> {
  const db = await getDatabase();

  return (await db
    .collection('inventory')
    .findOne({ _id: id }, { projection: { audio_stream: 1, _id: 0 } })
    .catch(() => {
      throw `Could not find audio mapping for source: ${id.toString()}`;
    })) as IResponse;
}
