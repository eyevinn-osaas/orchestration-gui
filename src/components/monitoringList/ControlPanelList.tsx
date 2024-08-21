import { useTranslate } from '../../i18n/useTranslate';
import { MonitoringControlPanelStatusResponse } from '../../interfaces/monitoring';
import Tooltip from '../tooltip/Tooltip';
import { MonitoringList } from './MonitoringList';
import { MonitoringListItem } from './MonitoringListItem';
import { MonitoringListTitle } from './MonitoringListTitle';

type ControlPanelListProps = {
  controlPanel: MonitoringControlPanelStatusResponse;
};

export function ControlPanelList({ controlPanel }: ControlPanelListProps) {
  const t = useTranslate();
  return (
    <MonitoringList showBorder={true}>
      <Tooltip
        description={t(
          'runtime_monitoring.control_panel.sent_requests.description'
        )}
      >
        <MonitoringListItem
          description={t('runtime_monitoring.control_panel.sent_requests.name')}
          value={controlPanel.sent_requests}
        />
      </Tooltip>
      <Tooltip
        description={t(
          'runtime_monitoring.control_panel.failed_sent_requests.description'
        )}
      >
        <MonitoringListItem
          description={t(
            'runtime_monitoring.control_panel.failed_sent_requests.name'
          )}
          value={controlPanel.failed_sent_requests.value}
          hasError={controlPanel.failed_sent_requests.has_error}
          isTracked={true}
        />
      </Tooltip>
      {controlPanel.connected_to.map((connection) => {
        return (
          <MonitoringListTitle
            key={connection.uuid + controlPanel.uuid}
            title={
              'Connected to ' +
              connection.name +
              ': ' +
              connection.ip +
              ':' +
              connection.port
            }
          >
            <MonitoringList showBorder={false}>
              <Tooltip
                description={t(
                  'runtime_monitoring.control_panel.received_broken.description'
                )}
              >
                <MonitoringListItem
                  description={t(
                    'runtime_monitoring.control_panel.received_broken.name'
                  )}
                  value={connection.received_broken.value}
                  hasError={connection.received_broken.has_error}
                  isTracked={true}
                />
              </Tooltip>
              <Tooltip
                description={t(
                  'runtime_monitoring.control_panel.request_responses_count.description'
                )}
              >
                <MonitoringListItem
                  description={t(
                    'runtime_monitoring.control_panel.request_responses_count.name'
                  )}
                  value={connection.request_responses_count}
                />
              </Tooltip>
              <Tooltip
                description={t(
                  'runtime_monitoring.control_panel.received_status_messages_count.description'
                )}
              >
                <MonitoringListItem
                  description={t(
                    'runtime_monitoring.control_panel.received_status_messages_count.name'
                  )}
                  value={connection.received_status_messages_count}
                />
              </Tooltip>
            </MonitoringList>
          </MonitoringListTitle>
        );
      })}
    </MonitoringList>
  );
}
