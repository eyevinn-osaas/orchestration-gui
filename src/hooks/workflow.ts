import { useCallback, useState } from 'react';
import {
  Production,
  StartProductionStep,
  StopProductionStep
} from '../interfaces/production';
import { CallbackHook } from './types';
import { Result } from '../interfaces/result';

export function useStopProduction(): CallbackHook<
  (production: Production) => Promise<Result<StopProductionStep[]>>
> {
  const [loading, setLoading] = useState(false);

  const stopPipelines = useCallback(async (production: Production) => {
    setLoading(true);

    return fetch('/api/manager/stop', {
      method: 'POST',
      // TODO: Implement api key
      headers: [['x-api-key', `Bearer apisecretkey`]],
      body: JSON.stringify({ production })
    })
      .then((response) => {
        if (response.ok) {
          return response.json() as Promise<Result<StopProductionStep[]>>;
        }
        throw response.text();
      })
      .finally(() => setLoading(false));
  }, []);

  return [stopPipelines, loading];
}

export function useStartProduction(): CallbackHook<
  (production: Production) => Promise<Result<StartProductionStep[]>>
> {
  const [loading, setLoading] = useState(false);

  const startProduction = useCallback(async (production: Production) => {
    setLoading(true);
    return fetch('/api/manager/start', {
      method: 'POST',
      // TODO: Implement api key
      headers: [['x-api-key', `Bearer apisecretkey`]],
      body: JSON.stringify(production)
    })
      .then((response) => {
        return response.json() as Promise<Result<StartProductionStep[]>>;
      })

      .finally(() => setLoading(false));
  }, []);

  return [startProduction, loading];
}
