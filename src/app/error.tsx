'use client';

import Link from 'next/link';
import { Button } from '../components/button/Button';
import { useTranslate } from '../i18n/useTranslate';

type ErrorProps = {
  error: Error;
  reset: () => void;
};

const Error = ({ error, reset }: ErrorProps) => {
  const t = useTranslate();
  return (
    <div className="flex justify-center mt-12 h-screen">
      <div className="text-3xl rounded-lg bg-container text-white w-full max-w-md max-h-64 p-4 flex flex-col gap-2">
        <div>{t('error.unexpected')}!</div>
        <div className="text-xl">
          {t('error.message')}: {error.message}
        </div>
        <Link className="self-center mt-16" href="/">
          <Button>{t('homepage')}</Button>
        </Link>
      </div>
    </div>
  );
};
export default Error;
