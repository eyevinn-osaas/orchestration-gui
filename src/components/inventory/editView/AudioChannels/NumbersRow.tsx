import { useTranslate } from '../../../../i18n/useTranslate';

interface INumbersRow {
  numbers: number[];
  small?: boolean;
}

export default function NumbersRow({ numbers, small = false }: INumbersRow) {
  const t = useTranslate();

  return (
    <>
      {small ? <h2 className="underline">{t('audio_mapping.title')}</h2> : null}
      <div className="flex relative">
        {!small && (
          <h2 className="min-w-[70px]">{t('audio_mapping.channel')}</h2>
        )}
        <div className="flex relative">
          {numbers.map((value, i) => (
            <h2
              key={value + i}
              className={`${small ? 'mr-2 w-4' : 'mr-5 w-5'} text-center`}
            >
              {value}
            </h2>
          ))}
        </div>
      </div>
    </>
  );
}
