import { useTranslate } from '../../i18n/useTranslate';
import { DeleteSourceStatus } from '../../interfaces/Source';
import { Button } from '../button/Button';
import { Loader } from '../loader/Loader';
import DeleteSourceFeed from '../startProduction/DeleteSourceFeed';
import { Modal } from './Modal';

type RemoveSourceModalProps = {
  name: string;
  open: boolean;
  onAbort: () => void;
  onConfirm: () => void;
  status?: DeleteSourceStatus;
  loading: boolean;
};

export function RemoveSourceModal({
  name,
  open,
  onAbort,
  onConfirm,
  loading,
  status
}: RemoveSourceModalProps) {
  const t = useTranslate();
  return (
    <Modal open={open} outsideClick={onAbort}>
      <div className="text-center flex flex-col items-center">
        <h1 className="text-xl">
          {t('workflow.remove_source_modal', { name })}
        </h1>

        <div>{status && <DeleteSourceFeed status={status} />}</div>
        <div className="flex gap-8 mt-4">
          <Button
            onClick={onAbort}
            className="bg-button-delete hover:bg-button-hover-red-bg"
          >
            {t('abort')}
          </Button>

          <Button onClick={onConfirm} className={'min-w-fit'}>
            {loading ? (
              <Loader className="w-10 h-5" />
            ) : (
              t('workflow.remove_source')
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
