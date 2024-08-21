import { useTranslate } from '../../i18n/useTranslate';

interface IAppStatus {
  message?: string;
  version?: string;
}

export default function AppStatus({ version, message }: IAppStatus) {
  const t = useTranslate();

  return (
    <h2 className="mr-10">
      {t('application')}:{' '}
      <span className="text-confirm">
        {version ? `${version}` : ''} ({message})
      </span>
    </h2>
  );
}
