import { useTranslate } from '../../i18n/useTranslate';
import { MonitoringPipelinesResponse } from '../../interfaces/monitoring';
import Tooltip from '../tooltip/Tooltip';
import { MonitoringList } from './MonitoringList';
import { MonitoringListItem } from './MonitoringListItem';

type PipelineListProps = {
  pipeline: MonitoringPipelinesResponse;
};

export default function PipelineList({ pipeline }: PipelineListProps) {
  const t = useTranslate();
  return (
    <MonitoringList showBorder={true}>
      <Tooltip description={t('runtime_monitoring.pipeline.description')}>
        <MonitoringListItem
          description={t('runtime_monitoring.pipeline.name')}
          value={pipeline.active.value}
          hasError={pipeline.active.has_error}
          isTracked={true}
        />
      </Tooltip>
    </MonitoringList>
  );
}
