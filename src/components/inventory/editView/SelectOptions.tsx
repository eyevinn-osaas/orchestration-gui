import React from 'react';
import { useTranslate } from '../../../i18n/useTranslate';
import { en } from '../../../i18n/locales/en';
import capitalize from '../../../utils/capitalize';

export default function SelectOptions({
  name,
  onChange,
  options,
  selected
}: {
  name: keyof typeof en;
  onChange: (e: { target: { value: string } }) => void;
  options: string[];
  selected: string;
}) {
  const t = useTranslate();

  return (
    <>
      <h2 className="flex w-[100px] items-center">{t(name)}</h2>
      <input
        className="cursor-pointer ml-5 border justify-center text-sm rounded-lg w-full pl-2 pt-1 pb-1 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
        list={name + 'list'}
        id={name}
        onChange={onChange}
        value={capitalize(selected)}
      />
      <datalist id={name + 'list'}>
        {options.map((option: string, index: number) => (
          <option key={option + index} value={capitalize(option)} />
        ))}
      </datalist>
    </>
  );
}
