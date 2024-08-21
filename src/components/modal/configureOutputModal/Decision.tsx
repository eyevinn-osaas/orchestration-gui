import { useTranslate } from '../../../i18n/useTranslate';
import { Button } from '../../button/Button';

interface IDecision {
  onClose: () => void;
  onSave: () => void;
}

export default function Decision({ onClose, onSave }: IDecision) {
  const t = useTranslate();

  return (
    <div className="flex justify-center w-full min-w-max mt-10 gap-16">
      <Button className="hover:bg-red-500" onClick={onClose} state="warning">
        {t('close')}
      </Button>
      <Button
        className="relative flex hover:bg-green-400"
        type="submit"
        onClick={onSave}
      >
        {t('save')}
      </Button>
    </div>
  );
}
