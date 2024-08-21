import { KeyboardEvent } from 'react';

interface IInput {
  label: string;
  value: string | number;
  type?: string;
  update: (value: string) => void;
  onKeyDown?: (e: KeyboardEvent) => void;
  size?: 'small' | 'large';
}

export default function Input({
  label,
  value,
  update,
  type = 'text',
  onKeyDown,
  size = 'small'
}: IInput) {
  return (
    <div className={`flex mb-5 justify-between w-full px-2`}>
      <label className="flex items-center">{label}</label>
      <input
        onKeyDown={onKeyDown}
        type={type}
        value={value}
        onChange={(e) => update(e.target.value)}
        className={`cursor-pointer border text-sm rounded-lg ${
          size === 'small' ? 'w-6/12' : 'w-7/12'
        } pl-2 pt-1 pb-1 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:border-gray-400 focus:outline-none`}
      />
    </div>
  );
}
