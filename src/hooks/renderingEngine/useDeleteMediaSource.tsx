import { Result } from '../../interfaces/result';
import { DeleteRenderingEngineSourceStep } from '../../interfaces/Source';
import { API_SECRET_KEY } from '../../utils/constants';
import { CallbackHook } from '../types';
import { useState } from 'react';

export function useDeleteMediaSource(): CallbackHook<
  (
    pipelineUuid: string,
    inputSlot: number,
    ldPipelineId: string
  ) => Promise<Result<DeleteRenderingEngineSourceStep[]>>
> {
  const [loading, setLoading] = useState<boolean>(false);

  const deleteMediaSource = async (
    pipelineUuid: string,
    inputSlot: number,
    ldPipelineId: string
  ) => {
    setLoading(true);

    return fetch(
      `/api/manager/pipelines/${pipelineUuid}/rendering-engine/media/${inputSlot}/${ldPipelineId}`,
      {
        method: 'DELETE',
        headers: [['x-api-key', `Bearer ${API_SECRET_KEY}`]]
      }
    )
      .then(async (response) => {
        if (response.ok) {
          const text = await response.text();
          const data = text ? JSON.parse(text) : null;
          return data ? data : null;
        }
        throw await response.text;
      })
      .finally(() => setLoading(false));
  };
  return [deleteMediaSource, loading];
}
