import { useTranslate } from '../../i18n/useTranslate';
import { MonitoringSourcesResponse } from '../../interfaces/monitoring';
import Tooltip from '../tooltip/Tooltip';
import { MonitoringList } from './MonitoringList';
import { MonitoringListItem } from './MonitoringListItem';

type SourcesListProps = {
  source: MonitoringSourcesResponse;
};

const SourcesList = ({ source }: SourcesListProps) => {
  const t = useTranslate();
  return (
    <MonitoringList key={source?.source_id} showBorder={false}>
      <Tooltip
        description={t(
          'runtime_monitoring.sources.dropped_video_frames.description'
        )}
      >
        <MonitoringListItem
          description={t(
            'runtime_monitoring.sources.dropped_video_frames.name'
          )}
          value={source.dropped_video_frames}
          isTracked={false}
        />
      </Tooltip>
      <Tooltip
        description={t(
          'runtime_monitoring.sources.dropped_audio_frames.description'
        )}
      >
        <MonitoringListItem
          description={t(
            'runtime_monitoring.sources.dropped_audio_frames.name'
          )}
          value={source.dropped_audio_frames}
          isTracked={false}
        />
      </Tooltip>
      <Tooltip
        description={t(
          'runtime_monitoring.sources.duplicated_video_frames.description'
        )}
      >
        <MonitoringListItem
          description={t(
            'runtime_monitoring.sources.duplicated_video_frames.name'
          )}
          value={source.duplicated_video_frames}
          isTracked={false}
        />
      </Tooltip>
      <Tooltip
        description={t(
          'runtime_monitoring.sources.duplicated_audio_frames.description'
        )}
      >
        <MonitoringListItem
          description={t(
            'runtime_monitoring.sources.duplicated_audio_frames.name'
          )}
          value={source.duplicated_audio_frames}
          isTracked={false}
        />
      </Tooltip>
      <Tooltip
        description={t(
          'runtime_monitoring.sources.lost_video_frames.description'
        )}
      >
        <MonitoringListItem
          description={t('runtime_monitoring.sources.lost_video_frames.name')}
          value={source.lost_video_frames.value}
          isTracked={true}
          hasError={source.lost_video_frames.has_error}
        />
      </Tooltip>
      <Tooltip
        description={t(
          'runtime_monitoring.sources.lost_audio_frames.description'
        )}
      >
        <MonitoringListItem
          description={t('runtime_monitoring.sources.lost_audio_frames.name')}
          value={source.lost_audio_frames.value}
          isTracked={true}
          hasError={source.lost_audio_frames.has_error}
        />
      </Tooltip>
      <Tooltip description={t('runtime_monitoring.sources.active.description')}>
        <MonitoringListItem
          description={t('runtime_monitoring.sources.active.name')}
          value={source.active.value}
          isTracked={true}
          hasError={source.active.has_error}
        />
      </Tooltip>
    </MonitoringList>
  );
};

export default SourcesList;
