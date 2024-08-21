import { useTranslate } from '../../i18n/useTranslate';
import { MonitoringOutputStatusResponse } from '../../interfaces/monitoring';
import Tooltip from '../tooltip/Tooltip';
import { MonitoringList } from './MonitoringList';
import { MonitoringListItem } from './MonitoringListItem';
import { MonitoringListTitle } from './MonitoringListTitle';
type OutputListProps = {
  output: MonitoringOutputStatusResponse;
};
const OutputList = ({ output }: OutputListProps) => {
  const t = useTranslate();

  return (
    <MonitoringList showBorder={true}>
      <Tooltip
        description={t(
          'runtime_monitoring.outputs.received_frames.description'
        )}
      >
        <MonitoringListItem
          description={t('runtime_monitoring.outputs.received_frames.name')}
          value={output.received_frames}
        />
      </Tooltip>
      <Tooltip
        description={t(
          'runtime_monitoring.outputs.received_video_frames.description'
        )}
      >
        <MonitoringListItem
          description={t(
            'runtime_monitoring.outputs.received_video_frames.name'
          )}
          value={output.received_video_frames}
        />
      </Tooltip>
      <Tooltip
        description={t(
          'runtime_monitoring.outputs.received_audio_frames.description'
        )}
      >
        <MonitoringListItem
          description={t(
            'runtime_monitoring.outputs.received_audio_frames.name'
          )}
          value={output.received_audio_frames}
        />
      </Tooltip>
      <Tooltip
        description={t('runtime_monitoring.outputs.lost_frames.description')}
      >
        <MonitoringListItem
          description={t('runtime_monitoring.outputs.lost_frames.name')}
          value={output.lost_frames}
        />
      </Tooltip>
      {output.active_streams &&
        output.active_streams.length > 0 &&
        output.active_streams.map((stream) => {
          const hasError =
            stream.failed_encoded_audio_frames?.has_error ||
            stream.failed_encoded_video_frames?.has_error;
          return (
            <MonitoringListTitle
              key={stream.id}
              title={
                stream.id ? 'Output Stream ID: ' + stream.id.toString() : ''
              }
              hasError={hasError}
            >
              <MonitoringList showBorder={false}>
                <Tooltip
                  description={t(
                    'runtime_monitoring.outputs.encoded_audio_frames.description'
                  )}
                >
                  <MonitoringListItem
                    description={t(
                      'runtime_monitoring.outputs.encoded_audio_frames.name'
                    )}
                    value={stream.encoded_audio_frames}
                  />
                </Tooltip>
                <Tooltip
                  description={t(
                    'runtime_monitoring.outputs.encoded_video_frames.description'
                  )}
                >
                  <MonitoringListItem
                    description={t(
                      'runtime_monitoring.outputs.encoded_video_frames.name'
                    )}
                    value={stream.encoded_video_frames}
                  />
                </Tooltip>
                <Tooltip
                  description={t(
                    'runtime_monitoring.outputs.failed_encoded_audio_frames.description'
                  )}
                >
                  <MonitoringListItem
                    description={t(
                      'runtime_monitoring.outputs.failed_encoded_audio_frames.name'
                    )}
                    value={stream.failed_encoded_audio_frames?.value}
                    hasError={stream.failed_encoded_audio_frames?.has_error}
                    isTracked={true}
                  />
                </Tooltip>
                <Tooltip
                  description={t(
                    'runtime_monitoring.outputs.failed_encoded_video_frames.description'
                  )}
                >
                  <MonitoringListItem
                    description={t(
                      'runtime_monitoring.outputs.failed_encoded_video_frames.name'
                    )}
                    value={stream.failed_encoded_video_frames?.value}
                    hasError={stream.failed_encoded_video_frames?.has_error}
                    isTracked={true}
                  />
                </Tooltip>
                <Tooltip
                  description={t(
                    'runtime_monitoring.outputs.muxed_audio_frames.description'
                  )}
                >
                  <MonitoringListItem
                    description={t(
                      'runtime_monitoring.outputs.muxed_audio_frames.name'
                    )}
                    value={stream.muxed_audio_frames}
                  />
                </Tooltip>
                <Tooltip
                  description={t(
                    'runtime_monitoring.outputs.muxed_video_frames.description'
                  )}
                >
                  <MonitoringListItem
                    description={t(
                      'runtime_monitoring.outputs.muxed_video_frames.name'
                    )}
                    value={stream.muxed_video_frames}
                  />
                </Tooltip>
              </MonitoringList>
              <MonitoringList showBorder={false}>
                {stream.clients && stream.clients.length > 0 ? (
                  stream.clients.map((client) => {
                    return (
                      //TODO:  add port to ip.
                      <MonitoringListTitle
                        key={client.ip}
                        title={
                          'Client connected from: ' +
                          client.ip +
                          ':' +
                          client.port
                        }
                        hasError={client.retransmitted_packets.has_error}
                      >
                        <MonitoringList showBorder={false}>
                          <Tooltip
                            description={t(
                              'runtime_monitoring.outputs.bandwidth_bps.description'
                            )}
                          >
                            <MonitoringListItem
                              description={t(
                                'runtime_monitoring.outputs.bandwidth_bps.name'
                              )}
                              value={client.bandwidth_bps}
                            />
                          </Tooltip>
                          <Tooltip
                            description={t(
                              'runtime_monitoring.outputs.sent_bytes.description'
                            )}
                          >
                            <MonitoringListItem
                              description={t(
                                'runtime_monitoring.outputs.sent_bytes.name'
                              )}
                              value={client.sent_bytes}
                            />
                          </Tooltip>
                          <Tooltip
                            description={t(
                              'runtime_monitoring.outputs.sent_packets.description'
                            )}
                          >
                            <MonitoringListItem
                              description={t(
                                'runtime_monitoring.outputs.sent_packets.name'
                              )}
                              value={client.sent_packets}
                            />
                          </Tooltip>
                          <Tooltip
                            description={t(
                              'runtime_monitoring.outputs.retransmitted_packets.description'
                            )}
                          >
                            <MonitoringListItem
                              description={t(
                                'runtime_monitoring.outputs.retransmitted_packets.name'
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
                ) : (
                  <div className="p-4">
                    <span>No clients</span>
                  </div>
                )}
              </MonitoringList>
            </MonitoringListTitle>
          );
        })}
    </MonitoringList>
  );
};

export default OutputList;
