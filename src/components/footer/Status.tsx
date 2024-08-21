import { useTranslate } from '../../i18n/useTranslate';

interface IStatus {
  adress: string | undefined;
  connected?: boolean;
  name: 'system_controller' | 'database';
}

export default function Status({ adress, connected, name }: IStatus) {
  const t = useTranslate();

  return (
    <h2 className="mr-10">
      {t(name)}:{' '}
      {connected ? (
        <span className="text-confirm">{t('online')}</span>
      ) : (
        <span className="text-button-delete">
          {adress ? t('server_error', { string: adress }) : t('offline')}
        </span>
      )}
    </h2>
  );
}
