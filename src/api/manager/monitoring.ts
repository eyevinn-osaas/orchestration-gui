import { Monitoring } from '../../interfaces/monitoring';
import { getDatabase } from '../mongoClient/dbClient';

export async function getMonitoring(id: string): Promise<Monitoring> {
  const db = await getDatabase();
  return (await db
    .collection<Monitoring>('monitoring')
    .findOne({ productionId: id })) as Monitoring;
}

export async function deleteMonitoringByProductionId(productionId: string) {
  const db = await getDatabase();
  return await db
    .collection('monitoring')
    .findOneAndDelete({ productionId: productionId });
}
