import { useCallback, useEffect, useState } from 'react';
import { DataHook } from './types';
import { ResourcesCompactPipelineResponse } from '../../types/ateliere-live';
import { ManagerPipelineResponse } from '../interfaces/pipeline';
import { API_SECRET_KEY } from '../utils/constants';

const ONE_MINUTE = 1000 * 60;

type ModifiedDataHook<DataType> = [DataType | undefined, boolean];

async function getPipeline(id: string): Promise<ManagerPipelineResponse> {
  return fetch(`/api/manager/pipelines/${id}`, {
    method: 'GET',
    headers: [['x-api-key', `Bearer ${API_SECRET_KEY}`]]
  }).then(async (response) => {
    if (response.ok) {
      return response.json();
    }
    throw await response.text();
  });
}

export function usePipeline(
  id: string
): [...DataHook<ManagerPipelineResponse>, () => void] {
  const [trigger, setTrigger] = useState(0);
  const [loading, setLoading] = useState(true);
  const [response, setPipeline] = useState<ManagerPipelineResponse>();

  const refresh = useCallback(() => setTrigger((trigger) => trigger + 1), []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    setLoading(true);
    getPipeline(id)
      .then((pipeline) => {
        setPipeline(pipeline);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
        timeout = setTimeout(() => setTrigger(trigger + 1), ONE_MINUTE);
      });
    return () => clearTimeout(timeout);
  }, [trigger, id]);

  return [response, loading, undefined, refresh];
}

export function usePipelines(): [
  ...DataHook<ResourcesCompactPipelineResponse[]>,
  () => void
] {
  const [loading, setLoading] = useState(true);
  const [trigger, setTrigger] = useState(0);
  const [pipelines, setPipelines] = useState<
    ResourcesCompactPipelineResponse[]
  >([]);
  const refresh = useCallback(() => setTrigger((trigger) => trigger + 1), []);
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    setLoading(true);
    fetch('/api/manager/pipelines', {
      method: 'GET',
      headers: [['x-api-key', `Bearer ${API_SECRET_KEY}`]]
    })
      .then(async (response) => {
        if (response.ok) {
          setPipelines((await response.json()).pipelines);
        }
      })
      .finally(() => {
        setLoading(false);
        timeout = setTimeout(() => setTrigger(trigger + 1), ONE_MINUTE / 6);
      });
    return () => clearTimeout(timeout);
  }, [trigger]);

  return [
    pipelines.sort((a, b) => a.name.localeCompare(b.name)),
    loading,
    undefined,
    refresh
  ];
}

export function GetPipelines(): [
  ...ModifiedDataHook<ResourcesCompactPipelineResponse[]>
] {
  const [loading, setLoading] = useState(true);
  const [pipelines, setPipelines] = useState<
    ResourcesCompactPipelineResponse[]
  >([]);
  useEffect(() => {
    setLoading(true);
    fetch('/api/manager/pipelines', {
      method: 'GET',
      headers: [['x-api-key', `Bearer ${API_SECRET_KEY}`]]
    })
      .then(async (response) => {
        if (response.ok) {
          setPipelines((await response.json()).pipelines);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return [pipelines.sort((a, b) => a.name.localeCompare(b.name)), loading];
}
