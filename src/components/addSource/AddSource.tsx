import React from 'react';
import { IconVideoPlus } from '@tabler/icons-react';
import { useTranslate } from '../../i18n/useTranslate';

type AddSourceProps = {
  onClick: () => void;
  disabled: boolean;
};
export function AddSource({ onClick, disabled }: AddSourceProps) {
  const t = useTranslate();
  return (
    <button
      className={`bg-zinc-700 aspect-video m-2 p-2 text-p border-2 border-zinc-300 rounded flex justify-center items-center ${
        disabled ? 'opacity-10 cursor-default' : 'opacity-100'
      }`}
      onClick={() => {
        !disabled && onClick();
      }}
    >
      <IconVideoPlus className="mr-2" />
      <span>{t('production.add_source')}</span>
    </button>
  );
}
