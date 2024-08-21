import { Suspense } from 'react';
import HeaderNavigation from '../../components/headerNavigation/HeaderNavigation';
import { useTranslate } from '../../i18n/useTranslate';
import { LoadingCover } from '../../components/loader/LoadingCover';
import Inventory from '../../components/inventory/Inventory';

export default function Page() {
  const t = useTranslate();

  return (
    <>
      <HeaderNavigation>
        <h1 className="m-2 text-4xl text-p text-center mx-auto">
          {t('inventory')}
        </h1>
      </HeaderNavigation>
      <Suspense fallback={<LoadingCover />}>
        <Inventory />
      </Suspense>
    </>
  );
}
