import { useTranslate } from '../../i18n/useTranslate';
import { MonitoringIngestsResponse } from '../../interfaces/monitoring';
import Tooltip from '../tooltip/Tooltip';
import { MonitoringList } from './MonitoringList';
import { MonitoringListItem } from './MonitoringListItem';

type IngestListProps = {
  ingest: MonitoringIngestsResponse;
};

export default function IngestList({ ingest }: IngestListProps) {
  const t = useTranslate();
  return (
    <MonitoringList showBorder={true}>
      <Tooltip description={t('runtime_monitoring.ingest.description')}>
        <MonitoringListItem
          description={t('runtime_monitoring.ingest.name')}
          value={ingest.active.value}
          hasError={ingest.active.has_error}
          isTracked={true}
        />
      </Tooltip>
    </MonitoringList>
  );
}
