import { useTranslate } from '../../i18n/useTranslate';
import { StartProductionStatus } from '../../interfaces/production';
import { Button } from '../button/Button';
import { Loader } from '../loader/Loader';
import StartProductionFeed from '../startProduction/StartProductionFeed';
import { Modal } from './Modal';

type StartModalProps = {
  name: string;
  open: boolean;
  onAbort: () => void;
  onConfirm: () => void;
  loading: boolean;
  startStatus?: StartProductionStatus;
};

export function StartModal({
  name,
  open,
  onAbort,
  onConfirm,
  loading,
  startStatus
}: StartModalProps) {
  const t = useTranslate();
  return (
    <Modal open={open} outsideClick={onAbort}>
      <div className="text-center">
        <h1 className="text-xl mb-2">
          {startStatus && startStatus.success
            ? t('production.started', { name })
            : startStatus && !startStatus.success
            ? t('production.failed', { name })
            : t('workflow.start_modal', { name })}
        </h1>
        <div>{startStatus && <StartProductionFeed status={startStatus} />}</div>
        <div className="flex justify-center gap-3 mt-4">
          <Button
            onClick={onAbort}
            className="bg-button-delete hover:bg-button-hover-red-bg"
          >
            {t('abort')}
          </Button>

          <Button onClick={onConfirm} className={'min-w-fit'}>
            {loading ? (
              <Loader className="w-10 h-5" />
            ) : startStatus ? (
              t('workflow.retry')
            ) : (
              t('workflow.start')
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
