import { useTranslate } from '../../i18n/useTranslate';
import { MonitoringControlPanelResponse } from '../../interfaces/monitoring';
import Tooltip from '../tooltip/Tooltip';
import { MonitoringList } from './MonitoringList';
import { MonitoringListItem } from './MonitoringListItem';

type ControlPanelListProps = {
  controlPanel: MonitoringControlPanelResponse;
};

export function CompactControlPanelList({
  controlPanel
}: ControlPanelListProps) {
  const t = useTranslate();
  return (
    <MonitoringList showBorder={true}>
      <Tooltip
        description={t('runtime_monitoring.compact_control_panel.description')}
      >
        <MonitoringListItem
          description={t('runtime_monitoring.compact_control_panel.name')}
          value={controlPanel.active.value}
          hasError={controlPanel.active.has_error}
          isTracked={true}
        />
      </Tooltip>
    </MonitoringList>
  );
}
