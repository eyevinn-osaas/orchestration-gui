import { useTranslate } from '../../i18n/useTranslate';
import { MonitoringControlReceiverStatusResponse } from '../../interfaces/monitoring';
import Tooltip from '../tooltip/Tooltip';
import { MonitoringList } from './MonitoringList';
import { MonitoringListItem } from './MonitoringListItem';
import { MonitoringListTitle } from './MonitoringListTitle';

type ControlReceiverListProps = {
  receiver: MonitoringControlReceiverStatusResponse;
};

//TODO: Fix request_responses_count
export function ControlReceiverList({ receiver }: ControlReceiverListProps) {
  const t = useTranslate();
  return (
    <MonitoringList showBorder={true}>
      <MonitoringListTitle
        title={t('runtime_monitoring.control_receiver.terminating')}
      >
        <MonitoringList showBorder={false}>
          <Tooltip
            description={t(
              'runtime_monitoring.control_receiver.delivered_requests.description'
            )}
          >
            <MonitoringListItem
              description={t(
                'runtime_monitoring.control_receiver.delivered_requests.name'
              )}
              value={receiver.delivered_requests}
            />
          </Tooltip>
          <Tooltip
            description={t(
              'runtime_monitoring.control_receiver.request_in_queue.description'
            )}
          >
            <MonitoringListItem
              description={t(
                'runtime_monitoring.control_receiver.request_in_queue.name'
              )}
              value={receiver.requests_in_queue}
            />
          </Tooltip>
          <Tooltip
            description={t(
              'runtime_monitoring.control_receiver.sent_responses.description'
            )}
          >
            <MonitoringListItem
              description={t(
                'runtime_monitoring.control_receiver.sent_responses.name'
              )}
              value={receiver.sent_responses}
            />
          </Tooltip>
          <Tooltip
            description={t(
              'runtime_monitoring.control_receiver.failed_sent_responses.description'
            )}
          >
            <MonitoringListItem
              description={t(
                'runtime_monitoring.control_receiver.failed_sent_responses.name'
              )}
              value={receiver.failed_sent_responses.value}
              hasError={receiver.failed_sent_responses.has_error}
              isTracked={true}
            />
          </Tooltip>
          <Tooltip
            description={t(
              'runtime_monitoring.control_receiver.sent_status_messages.description'
            )}
          >
            <MonitoringListItem
              description={t(
                'runtime_monitoring.control_receiver.sent_status_messages.name'
              )}
              value={receiver.sent_status_messages}
            />
          </Tooltip>
          <Tooltip
            description={t(
              'runtime_monitoring.control_receiver.failed_sent_status_messages.description'
            )}
          >
            <MonitoringListItem
              description={t(
                'runtime_monitoring.control_receiver.failed_sent_status_messages.name'
              )}
              value={receiver.failed_sent_status_messages.value}
              hasError={receiver.failed_sent_status_messages.has_error}
              isTracked={true}
            />
          </Tooltip>
          {receiver.connected_sender?.map((connectedSender) => {
            return (
              <MonitoringListTitle
                key={connectedSender.uuid + receiver.uuid}
                title={
                  'Connection from ' +
                  connectedSender.name +
                  ': ' +
                  connectedSender.ip +
                  ':' +
                  connectedSender.port
                }
              >
                <MonitoringList showBorder={false}>
                  <Tooltip
                    description={t(
                      'runtime_monitoring.control_receiver.received_broken.description'
                    )}
                  >
                    <MonitoringListItem
                      description={t(
                        'runtime_monitoring.control_receiver.received_broken.name'
                      )}
                      value={connectedSender.received_broken.value}
                      hasError={connectedSender.received_broken.has_error}
                      isTracked={true}
                    />
                  </Tooltip>
                  <Tooltip
                    description={t(
                      'runtime_monitoring.control_receiver.received_request_count.description'
                    )}
                  >
                    <MonitoringListItem
                      description={t(
                        'runtime_monitoring.control_receiver.received_request_count.name'
                      )}
                      value={connectedSender.received_request_count}
                    />
                  </Tooltip>
                </MonitoringList>
              </MonitoringListTitle>
            );
          })}
        </MonitoringList>
      </MonitoringListTitle>
      <MonitoringListTitle
        title={t('runtime_monitoring.control_receiver.forwarding')}
      >
        <MonitoringList showBorder={false}>
          <Tooltip
            description={t(
              'runtime_monitoring.control_receiver.sent_requests.description'
            )}
          >
            <MonitoringListItem
              description={t(
                'runtime_monitoring.control_receiver.sent_requests.name'
              )}
              value={receiver.sent_requests}
            />
          </Tooltip>
          <Tooltip
            description={t(
              'runtime_monitoring.control_receiver.failed_sent_requests.description'
            )}
          >
            <MonitoringListItem
              description={t(
                'runtime_monitoring.control_receiver.failed_sent_requests.name'
              )}
              value={receiver.failed_sent_requests.value}
              hasError={receiver.failed_sent_requests.has_error}
              isTracked={true}
            />
          </Tooltip>
          {receiver.connected_to.map((connectedTo) => {
            return (
              <MonitoringListTitle
                key={connectedTo.uuid}
                title={
                  'Connected to ' +
                  connectedTo.name +
                  ': ' +
                  connectedTo.ip +
                  ':' +
                  connectedTo.port
                }
              >
                <MonitoringList showBorder={false}>
                  <Tooltip
                    description={t(
                      'runtime_monitoring.control_receiver.received_broken.description'
                    )}
                  >
                    <MonitoringListItem
                      description={t(
                        'runtime_monitoring.control_receiver.received_broken.name'
                      )}
                      value={connectedTo.received_broken.value}
                      hasError={connectedTo.received_broken.has_error}
                      isTracked={true}
                    />
                  </Tooltip>
                  <Tooltip
                    description={t(
                      'runtime_monitoring.control_receiver.request_responses_count.description'
                    )}
                  >
                    <MonitoringListItem
                      description={t(
                        'runtime_monitoring.control_receiver.request_responses_count.name'
                      )}
                      value={connectedTo.received_responses_count}
                    />
                  </Tooltip>
                </MonitoringList>
              </MonitoringListTitle>
            );
          })}
        </MonitoringList>
      </MonitoringListTitle>
    </MonitoringList>
  );
}
