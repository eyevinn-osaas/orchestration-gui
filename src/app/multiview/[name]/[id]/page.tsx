'use client';

import { Multiview } from '../../../../components/multiview/Multiview';
import { usePipelines } from '../../../../hooks/pipelines';
import { PageProps } from '../../../../../.next/types/app/multiview/[name]/[id]/page';
import { useTranslate } from '../../../../i18n/useTranslate';

export default function Page({ params }: PageProps) {
  const [pipelines, loading] = usePipelines();
  const t = useTranslate();

  const pipeline = pipelines?.find((pipe) => pipe.name === params.name);
  if (!pipeline) {
    return null;
  }

  return (
    <>
      <Multiview pipeline={pipeline} multiviewId={params.id} />
      <p className="text-p">
        <i>experimental</i>
      </p>
    </>
  );
}
