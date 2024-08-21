import { useTranslate } from '../../i18n/useTranslate';
import { Button } from '../button/Button';
import { Modal } from './Modal';

type DeleteModalProps = {
  name: string;
  open: boolean;
  onAbort: () => void;
  onConfirm: () => void;
};

export function DeleteModal({
  name,
  open,
  onAbort,
  onConfirm
}: DeleteModalProps) {
  const t = useTranslate();
  return (
    <Modal open={open} outsideClick={onAbort}>
      <div className="text-center">
        <h1 className="text-xl">{t('delete.modal', { name })}</h1>
        <div className="flex justify-center gap-3 mt-4">
          <Button
            onClick={onAbort}
            className="bg-button-abort hover:bg-button-abort-hover w-16 text-center justify-center"
          >
            {t('no')}
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-button-delete hover:bg-button-hover-red-bg w-16 justify-center"
          >
            {t('yes')}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
