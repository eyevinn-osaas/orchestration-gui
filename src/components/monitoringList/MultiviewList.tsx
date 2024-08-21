import { useTranslate } from '../../i18n/useTranslate';
import { MonitoringMultiviewOutputResponse } from '../../interfaces/monitoring';
import Tooltip from '../tooltip/Tooltip';
import { MonitoringList } from './MonitoringList';
import { MonitoringListItem } from './MonitoringListItem';
import { MonitoringListTitle } from './MonitoringListTitle';

type Props = {
  multiview: MonitoringMultiviewOutputResponse;
};

export function MultiviewList({ multiview }: Props) {
  const t = useTranslate();
  return (
    <MonitoringList showBorder={true}>
      <Tooltip
        description={t(
          'runtime_monitoring.multiview.rendered_frames.description'
        )}
      >
        <MonitoringListItem
          description={t('runtime_monitoring.multiview.rendered_frames.name')}
          value={multiview.rendered_frames}
          hasError={false}
          isTracked={false}
        />
      </Tooltip>
      <Tooltip
        description={t(
          'runtime_monitoring.multiview.failed_rendered_frames.description'
        )}
      >
        <MonitoringListItem
          description={t(
            'runtime_monitoring.multiview.failed_rendered_frames.name'
          )}
          value={multiview.failed_rendered_frames.value}
          hasError={false}
          isTracked={multiview.failed_rendered_frames.has_error}
        />
      </Tooltip>
      <Tooltip
        description={t(
          'runtime_monitoring.multiview.encoded_audio_frames.description'
        )}
      >
        <MonitoringListItem
          description={t(
            'runtime_monitoring.multiview.encoded_audio_frames.name'
          )}
          value={multiview.mpeg_ts_srt.encoded_audio_frames}
          hasError={false}
          isTracked={false}
        />
      </Tooltip>
      <Tooltip
        description={t(
          'runtime_monitoring.multiview.encoded_video_frames.description'
        )}
      >
        <MonitoringListItem
          description={t(
            'runtime_monitoring.multiview.encoded_video_frames.name'
          )}
          value={multiview.mpeg_ts_srt.encoded_video_frames}
          hasError={false}
          isTracked={false}
        />
      </Tooltip>
      <Tooltip
        description={t(
          'runtime_monitoring.multiview.failed_encoded_audio_frames.description'
        )}
      >
        <MonitoringListItem
          description={t(
            'runtime_monitoring.multiview.failed_encoded_audio_frames.name'
          )}
          value={multiview.mpeg_ts_srt.failed_encoded_audio_frames?.value}
          isTracked={true}
          hasError={
            multiview.mpeg_ts_srt.failed_encoded_audio_frames?.has_error
          }
        />
      </Tooltip>
      <Tooltip
        description={t(
          'runtime_monitoring.multiview.failed_encoded_video_frames.description'
        )}
      >
        <MonitoringListItem
          description={t(
            'runtime_monitoring.multiview.failed_encoded_video_frames.name'
          )}
          value={multiview.mpeg_ts_srt.failed_encoded_video_frames?.value}
          isTracked={true}
          hasError={
            multiview.mpeg_ts_srt.failed_encoded_video_frames?.has_error
          }
        />
      </Tooltip>
      <Tooltip
        description={t(
          'runtime_monitoring.multiview.muxed_audio_frames.description'
        )}
      >
        <MonitoringListItem
          description={t(
            'runtime_monitoring.multiview.muxed_audio_frames.name'
          )}
          value={multiview.mpeg_ts_srt?.muxed_audio_frames}
          hasError={false}
          isTracked={false}
        />
      </Tooltip>
      <Tooltip
        description={t(
          'runtime_monitoring.multiview.muxed_video_frames.description'
        )}
      >
        <MonitoringListItem
          description={t(
            'runtime_monitoring.multiview.muxed_video_frames.name'
          )}
          value={multiview.mpeg_ts_srt?.muxed_video_frames}
          hasError={false}
          isTracked={false}
        />
      </Tooltip>
      {!multiview.mpeg_ts_srt?.clients ||
      multiview.mpeg_ts_srt?.clients.length < 1 ? (
        <div className="p-4">
          <span>No clients</span>
        </div>
      ) : (
        multiview.mpeg_ts_srt?.clients?.map((client) => {
          return (
            <MonitoringListTitle
              key={client.ip}
              title={
                'Client connected from: ' +
                client.ip +
                ':' +
                client.port.toString()
              }
            >
              <MonitoringList key={client.ip} showBorder={false}>
                <Tooltip
                  description={t(
                    'runtime_monitoring.multiview.bandwidth_bps.description'
                  )}
                >
                  <MonitoringListItem
                    description={t(
                      'runtime_monitoring.multiview.bandwidth_bps.name'
                    )}
                    value={client.bandwidth_bps}
                    hasError={false}
                    isTracked={false}
                  />
                </Tooltip>
                <Tooltip
                  description={t(
                    'runtime_monitoring.multiview.sent_packets.description'
                  )}
                >
                  <MonitoringListItem
                    description={t(
                      'runtime_monitoring.multiview.sent_packets.name'
                    )}
                    value={client.sent_packets}
                    hasError={false}
                    isTracked={false}
                  />
                </Tooltip>
                <Tooltip
                  description={t(
                    'runtime_monitoring.multiview.sent_bytes.description'
                  )}
                >
                  <MonitoringListItem
                    description={t(
                      'runtime_monitoring.multiview.sent_bytes.name'
                    )}
                    value={client.sent_bytes}
                    hasError={false}
                    isTracked={false}
                  />
                </Tooltip>
                <Tooltip
                  description={t(
                    'runtime_monitoring.multiview.retransmitted_packets.description'
                  )}
                >
                  <MonitoringListItem
                    description={t(
                      'runtime_monitoring.multiview.retransmitted_packets.name'
                    )}
                    value={client.retransmitted_packets.value}
                    hasError={client.retransmitted_packets.has_error}
                    isTracked={true}
                  />
                </Tooltip>
              </MonitoringList>
            </MonitoringListTitle>
          );
        })
      )}
    </MonitoringList>
  );
}
