import React from 'react';
import Icons from '../icons/Icons';
import { WhepMultiview } from '../../interfaces/whep';
import { useTranslate } from '../../i18n/useTranslate';

type MultiviewProps = {
  viewer: WhepMultiview;
};

export const LaunchWebMultiview = ({ viewer }: MultiviewProps) => {
  const t = useTranslate();
  return (
    <a
      href={`/multiview/${viewer.pipelineName}/${viewer.id}`}
      target="_blank"
      title={t('open_in_web')}
    >
      <Icons name={'IconAppWindow'} className="bg-transpired text-p w-5" />
    </a>
  );
};

export default LaunchWebMultiview;
