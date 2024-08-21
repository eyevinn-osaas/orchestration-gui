'use client';
import { CSSProperties } from 'react';
import style from './indication.module.scss';
import colors from 'tailwindcss/colors';

type RunningIndicationProps = {
  running: boolean;
};

export default function RunningIndication({ running }: RunningIndicationProps) {
  const customProperty = {
    '--indicator-color': running ? colors.red['600'] : colors.gray['600']
  } as CSSProperties;

  return (
    <div className="flex">
      <div
        style={customProperty}
        className={`${style.circle} ${running && style.running}`}
      ></div>
    </div>
  );
}
