import { IconCheck, IconInfoCircle, IconX } from '@tabler/icons-react';
import { useTranslate } from '../../i18n/useTranslate';
import { en } from '../../i18n/locales/en';
import StatusTooltip from '../tooltip/StatusTooltip';
import { DeleteSourceStatus } from '../../interfaces/Source';

type DeleteSourceFeedProps = {
  status: DeleteSourceStatus;
};
export default function DeleteSourceFeed({ status }: DeleteSourceFeedProps) {
  const t = useTranslate();
  const startStatus: Record<keyof typeof en.delete_source_status, string> = {
    delete_stream: t('delete_source_status.delete_stream'),
    update_multiview: t('delete_source_status.update_multiview'),
    unexpected: t('delete_source_status.unexpected')
  };
  return (
    <div className="flex flex-col mb-4 w-96">
      {status.steps.map((step, i) => {
        return (
          <div key={i} className="flex flex-col items-center justify-center">
            {!step.success ? (
              <div className="flex gap-1 justify-start w-1/2">
                <div className="flex flex-col items-start">
                  <div
                    className={`h-6 w-6 p-1 flex justify-center items-center rounded-full ${
                      step.success ? 'bg-button-bg' : 'bg-button-delete'
                    }`}
                  >
                    {step.success ? <IconCheck /> : <IconX />}
                  </div>
                  {i + 1 < status.steps.length && (
                    <div className="self-center mt-1 mb-1 border-l border-gray-500 h-4"></div>
                  )}
                </div>
                <p className="whitespace-nowrap">{startStatus[step.step]}</p>

                <StatusTooltip
                  key={i}
                  description={step.message || 'Missing error message'}
                >
                  <IconInfoCircle color="#6b7280" />
                </StatusTooltip>
              </div>
            ) : (
              <div className="flex gap-1 justify-start w-1/2">
                <div className="flex flex-col items-start">
                  <div
                    className={`h-6 w-6 p-1 flex justify-center items-center rounded-full ${
                      step.success ? 'bg-button-bg' : 'bg-button-delete'
                    }`}
                  >
                    {step.success ? <IconCheck /> : <IconX />}
                  </div>
                  {i + 1 < status.steps.length && (
                    <div className="self-center mt-1 mb-1 border-l border-gray-500 h-4"></div>
                  )}
                </div>
                <p className="whitespace-nowrap">{startStatus[step.step]}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
