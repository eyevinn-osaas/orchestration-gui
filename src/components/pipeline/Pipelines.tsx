import { Production } from '../../interfaces/production';
import { PipelineCard } from './PipelineCard';

type PipelinesProps = {
  production?: Production;
};
export function Pipelines({ production }: PipelinesProps) {
  if (!production || !production.production_settings) return null;

  return (
    <div className="flex flex-col gap-2 max-w-max">
      {production.production_settings.pipelines?.flatMap((pipeline) => {
        if (pipeline.pipeline_id) {
          return (
            <PipelineCard
              isActive={production.isActive}
              key={pipeline.pipeline_id + pipeline.pipeline_readable_name}
              pipelineId={pipeline.pipeline_id}
            />
          );
        }
        return [];
      })}
    </div>
  );
}
