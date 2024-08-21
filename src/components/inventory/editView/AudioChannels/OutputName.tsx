import { useTranslate } from '../../../../i18n/useTranslate';

interface IContents {
  value: string;
  id: string;
}

export default function OutputName({
  outputRows,
  name
}: {
  outputRows: IContents[][];
  name: 'audio_mapping.outR' | 'audio_mapping.outL';
}) {
  const t = useTranslate();

  return (
    <h2 className="min-w-[70px]">
      {t(outputRows.length > 1 ? name : 'audio_mapping.out')}
    </h2>
  );
}
