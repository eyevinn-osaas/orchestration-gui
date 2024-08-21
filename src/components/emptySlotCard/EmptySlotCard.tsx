import React from 'react';
import { IconVideoPlus } from '@tabler/icons-react';
import { useTranslate } from '../../i18n/useTranslate';

type EmptySlotCardProps = {
  inputSlot: number;
  isFirstEmptySlot: boolean;
};
export function EmptySlotCard({
  inputSlot,
  isFirstEmptySlot
}: EmptySlotCardProps) {
  const t = useTranslate();
  return (
    <div
      className={`${
        isFirstEmptySlot && 'animate-pulse opacity-10'
      } bg-zinc-700 aspect-video m-2 p-2 text-p border-2 border-dotted border-zinc-300 rounded flex justify-center items-center opacity-20`}
    >
      <IconVideoPlus className="mr-2" />
      <span>{`${t('empty_slot.input_slot')}: ${inputSlot}`}</span>
    </div>
  );
}
