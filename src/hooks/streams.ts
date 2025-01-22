import { useState } from 'react';
import {
  AddSourceResult,
  DeleteSourceStep,
  SourceWithId
} from '../interfaces/Source';
import { Production } from '../interfaces/production';
import { CallbackHook } from './types';
import { Result } from '../interfaces/result';
import { API_SECRET_KEY } from '../utils/constants';

export function useCreateStream(): CallbackHook<
  (
    source: SourceWithId,
    production: Production,
    input_slot: number
  ) => Promise<Result<AddSourceResult>>
> {
  const [loading, setLoading] = useState(false);

  const createStream = async (
    source: SourceWithId,
    production: Production,
    input_slot: number
  ): Promise<Result<AddSourceResult>> => {
    setLoading(true);

    return fetch(`/api/manager/streams/`, {
      method: 'POST',
      headers: [['x-api-key', `Bearer ${API_SECRET_KEY}`]],
      body: JSON.stringify({
        source: source,
        production: production,
        input_slot: input_slot
      })
    })
      .then(async (response) => {
        if (response.ok) {
          return response.json();
        }
        throw await response.text();
      })
      .finally(() => setLoading(false));
  };
  return [createStream, loading];
}

export function useDeleteStream(): CallbackHook<
  (
    streamUuids: string[],
    production: Production,
    input_slot: number
  ) => Promise<Result<DeleteSourceStep[]>>
> {
  const [loading, setLoading] = useState(false);
  const deleteStream = async (
    streamUuids: string[],
    production: Production,
    input_slot: number
  ): Promise<Result<DeleteSourceStep[]>> => {
    setLoading(true);

    const pipelineUUID =
      production.production_settings.pipelines[0].pipeline_id;

    const multiviews = production.production_settings.pipelines[0].multiviews;
    const multiviewViews = multiviews?.flatMap((singleMultiview) => {
      return singleMultiview.layout.views;
    });
    const multiviewsToUpdate = multiviewViews?.filter(
      (v) => v.input_slot === input_slot
    );

    if (!multiviewsToUpdate || multiviewsToUpdate.length === 0) {
      const streamRequests = streamUuids.map((streamUuid) => {
        return fetch(`/api/manager/streams/${streamUuid}`, {
          method: 'DELETE',
          headers: [['x-api-key', `Bearer ${API_SECRET_KEY}`]],
          body: JSON.stringify({
            pipelineUUID: pipelineUUID
          })
        });
      });
      const result = await Promise.all(streamRequests);
      const promises = result.map(async (r) => {
        return (await r.json()) as Result<DeleteSourceStep[]>;
      });
      const data = await Promise.all(promises);
      const failed = data.find((data) => !data.ok);
      if (failed) {
        setLoading(false);
        return failed;
      }
      setLoading(false);
      const ok = data.find((data) => data.ok);
      if (ok) {
        return ok;
      }
      return {
        ok: false,
        error: 'unexpected'
      };
    }

    const updatedMultiviews = multiviewsToUpdate?.map((view) => {
      return {
        ...view,
        label: view.label
      };
    });

    const rest = multiviewViews?.filter((v) => v.input_slot !== input_slot);

    const restWithLabels = rest?.map((v) => {
      const sourceForView = production.sources.find(
        (s) => s.input_slot === v.input_slot
      );

      if (sourceForView) {
        return { ...v, label: sourceForView.label };
      }

      return v;
    });

    if (
      !restWithLabels ||
      !updatedMultiviews ||
      updatedMultiviews.length === 0 ||
      !multiviews?.some((singleMultiview) => singleMultiview.layout)
    ) {
      setLoading(false);
      return {
        ok: false,
        error: 'unexpected'
      };
    }

    const streamRequests = streamUuids.map((streamUuid) => {
      return fetch(`/api/manager/streams/${streamUuid}`, {
        method: 'DELETE',
        headers: [['x-api-key', `Bearer ${API_SECRET_KEY}`]],
        body: JSON.stringify({
          pipelineUUID: pipelineUUID
        })
      });
    });
    const result = await Promise.all(streamRequests);
    const promises = result.map(async (r) => {
      return (await r.json()) as Result<DeleteSourceStep[]>;
    });
    const data = await Promise.all(promises);
    const failed = data.find((data) => !data.ok);
    if (failed) {
      setLoading(false);
      return failed;
    }
    setLoading(false);
    const ok = data.find((data) => data.ok);
    if (ok) {
      return ok;
    }
    return {
      ok: false,
      error: 'unexpected'
    };
  };
  return [deleteStream, loading];
}

export function useUpdateStream(): CallbackHook<
  (streamUuid: string, alignment_ms: number) => void
> {
  const [loading, setLoading] = useState(false);

  const updateStream = async (
    streamUuid: string,
    alignment_ms: number
  ): Promise<void> => {
    setLoading(true);
    const response = await fetch(`/api/manager/streams/${streamUuid}`, {
      method: 'PATCH',
      headers: [['x-api-key', `Bearer ${API_SECRET_KEY}`]],
      body: JSON.stringify({ alignment_ms: alignment_ms })
    });

    setLoading(false);

    if (response.status === 204) {
      return;
    }

    if (response.ok) {
      return await response.json();
    }

    throw await response.text();
  };

  return [updateStream, loading];
}
