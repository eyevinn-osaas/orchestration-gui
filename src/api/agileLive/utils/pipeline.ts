import { ResourcesPipelineResponse } from '../../../../types/agile-live';

export function isActive(pipeline: ResourcesPipelineResponse) {
  return !!pipeline.streams?.length;
}
