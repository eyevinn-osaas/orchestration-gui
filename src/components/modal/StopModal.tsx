'use client';
import { useTranslate } from '../../i18n/useTranslate';
import { Button } from '../button/Button';
import { Modal } from './Modal';
import { Loader } from '../loader/Loader';
import { StopProductionStatus } from '../../interfaces/production';
import StopProductionFeed from '../startProduction/StopProductionFeed';

type DeleteModalProps = {
  name: string;
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  loading: boolean;
  stopStatus?: StopProductionStatus;
};

export function StopModal({
  name,
  open,
  onCancel,
  onConfirm,
  loading,
  stopStatus
}: DeleteModalProps) {
  const t = useTranslate();
  return (
    <Modal open={open} outsideClick={onCancel}>
      <div className="text-center">
        <h1 className="text-xl mb-2">
          {stopStatus && stopStatus.success
            ? t('production.stopped', { name })
            : stopStatus && !stopStatus.success
            ? t('production.stop_failed', { name })
            : t('workflow.stop_modal', { name })}
        </h1>
        <div>{stopStatus && <StopProductionFeed status={stopStatus} />}</div>
        <div>
          <div className="flex justify-center gap-3 mt-4">
            <Button
              onClick={onCancel}
              className="bg-button-abort hover:bg-button-abort-hover w-16 w-min-fit text-center justify-center"
            >
              {t('abort')}
            </Button>
            <Button
              onClick={onConfirm}
              className="bg-button-delete hover:bg-button-hover-red-bg disabled:bg-red-400 w-16 min-w-fit text-center justify-center"
            >
              {loading ? (
                <Loader className="w-10 h-5" />
              ) : stopStatus ? (
                t('workflow.retry')
              ) : (
                t('workflow.stop')
              )}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
