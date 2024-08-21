import React, { Suspense } from 'react';
import ProductionsList from '../components/productionsList/ProductionsList';
import { CreateProduction } from '../components/createProduction/CreateProduction';
import { LoadingCover } from '../components/loader/LoadingCover';
import Link from 'next/link';
import { Button } from '../components/button/Button';
import { useTranslate } from '../i18n/useTranslate';

export const dynamic = 'force-dynamic';

function Home() {
  const t = useTranslate();
  return (
    <>
      <div>
        <div className="mb-5 min-h-[40px] flex justify-between p-2">
          <div className="flex items-center">
            <Link href={'/api/auth/signout'}>
              <Button className="hover:bg-button-hover-bg">
                {t('auth.sign_out')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <CreateProduction />
      <div className="flex items-center w-full">
        <Suspense fallback={<LoadingCover />}>
          {/* @ts-expect-error Async Server Component: https://github.com/vercel/next.js/issues/42292 */}
          <ProductionsList />
        </Suspense>
      </div>
    </>
  );
}

export default Home;
