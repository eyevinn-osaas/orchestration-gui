import React from 'react';
import Icons from '../icons/Icons';
import { useTranslate } from '../../i18n/useTranslate';

type MultiviewProps = {
  multiviews: string;
};

export const LaunchMultiview = ({ multiviews }: MultiviewProps) => {
  const t = useTranslate();
  return (
    <a href={`vlc://${multiviews}`} target="_blank" title={t('open_in_vlc')}>
      <Icons name={'IconBrandVlc'} className="bg-transpired text-brand w-5" />
    </a>
  );
};

export default LaunchMultiview;
