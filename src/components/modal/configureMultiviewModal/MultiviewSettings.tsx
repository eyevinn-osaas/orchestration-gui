import { useEffect, useState } from 'react';
import { useTranslate } from '../../../i18n/useTranslate';
import { MultiviewSettings } from '../../../interfaces/multiview';
import { TMultiviewLayout } from '../../../interfaces/preset';
import Input from '../configureOutputModal/Input';
import Options from '../configureOutputModal/Options';
import toast from 'react-hot-toast';
import { useMultiviewLayouts } from '../../../hooks/multiviewLayout';

type MultiviewSettingsProps = {
  lastItem: boolean;
  multiview?: MultiviewSettings;
  handleUpdateMultiview: (multiview: MultiviewSettings) => void;
  portDuplicateError: boolean;
  streamIdDuplicateError: boolean;
  newMultiviewLayout: TMultiviewLayout | null;
  productionId: string | undefined;
  refresh: boolean;
};

export default function MultiviewSettingsConfig({
  lastItem,
  multiview,
  handleUpdateMultiview,
  portDuplicateError,
  streamIdDuplicateError,
  newMultiviewLayout,
  productionId,
  refresh
}: MultiviewSettingsProps) {
  const t = useTranslate();
  const [selectedMultiviewLayout, setSelectedMultiviewLayout] = useState<
    TMultiviewLayout | undefined
  >();
  const [multiviewLayouts] = useMultiviewLayouts(refresh);

  const currentValue = multiview || selectedMultiviewLayout;
  const avaliableMultiviewLayouts = multiviewLayouts?.filter(
    (layout) => layout.productionId === productionId || !layout.productionId
  );
  const multiviewLayoutNames =
    avaliableMultiviewLayouts?.map((layout) => layout.name) || [];

  useEffect(() => {
    if (
      refresh &&
      multiview &&
      multiviewLayouts &&
      multiviewLayouts.length > 0
    ) {
      handleSetSelectedMultiviewLayout(multiview.name);
    }
  }, [refresh, multiviewLayouts]);

  useEffect(() => {
    if (multiview) {
      setSelectedMultiviewLayout(multiview);
      return;
    }
    if (multiviewLayouts) {
      const defaultMultiview = multiviewLayouts.find(
        (m) => m.productionId !== undefined
      );
      if (defaultMultiview) {
        setSelectedMultiviewLayout(defaultMultiview);
      }
    }
  }, [lastItem, multiview, multiviewLayouts, newMultiviewLayout]);

  if (!multiview) {
    if (!multiviewLayouts || multiviewLayouts.length === 0) {
      return null;
    }
    handleUpdateMultiview({
      ...multiviewLayouts[0],
      _id: multiviewLayouts[0]._id?.toString(),
      for_pipeline_idx: 0
    });
  }

  const handleSetSelectedMultiviewLayout = (name: string) => {
    const selected = multiviewLayouts?.find((m) => m.name === name);
    if (!selected) {
      toast.error(t('preset.no_multiview_found'));
      return;
    }
    const updatedMultiview = {
      ...selected,
      name,
      layout: {
        ...selected.layout
      },
      output: multiview?.output || selected.output
    };
    setSelectedMultiviewLayout(updatedMultiview);
    handleUpdateMultiview({
      ...updatedMultiview,
      _id: updatedMultiview._id?.toString(),
      for_pipeline_idx: 0
    });
  };

  const getNumber = (val: string, prev: number) => {
    if (
      val === '' ||
      (!isNaN(Number(val)) && Number.isInteger(parseFloat(val)))
    ) {
      return parseInt(val);
    } else {
      return prev;
    }
  };

  const handleChange = (key: string, value: string) => {
    if (!multiview) return;
    if (key === 'videoFormat') {
      const updatedMultiview = {
        ...multiview,
        output: {
          ...multiview.output,
          video_format: value
        },
        for_pipeline_idx: 0
      };
      handleUpdateMultiview(updatedMultiview);
    }
    if (key === 'videoKiloBit') {
      const updatedMultiview = {
        ...multiview,
        output: {
          ...multiview.output,
          video_kilobit_rate: getNumber(
            value,
            multiview.output.video_kilobit_rate
          )
        },
        for_pipeline_idx: 0
      };
      handleUpdateMultiview(updatedMultiview);
    }
    if (key === 'srtMode') {
      const updatedMultiview = {
        ...multiview,
        output: {
          ...multiview.output,
          srt_mode: value
        },
        for_pipeline_idx: 0
      };
      handleUpdateMultiview(updatedMultiview);
    }
    if (key === 'port') {
      const updatedMultiview = {
        ...multiview,
        output: {
          ...multiview.output,
          local_port: getNumber(value, multiview.output.local_port),
          remote_port: getNumber(value, multiview.output.remote_port)
        },
        for_pipeline_idx: 0
      };
      handleUpdateMultiview(updatedMultiview);
    }
    if (key === 'ip') {
      const updatedMultiview = {
        ...multiview,
        output: {
          ...multiview.output,
          local_ip: value,
          remote_ip: value
        },
        for_pipeline_idx: 0
      };
      handleUpdateMultiview(updatedMultiview);
    }
    if (key === 'srtStreamId') {
      const updatedMultiview = {
        ...multiview,
        output: {
          ...multiview.output,
          srt_stream_id: value
        },
        for_pipeline_idx: 0
      };
      handleUpdateMultiview(updatedMultiview);
    }
    if (key === 'srtPassphrase') {
      const updatedMultiview = {
        ...multiview,
        output: {
          ...multiview.output,
          srt_passphrase: value
        },
        for_pipeline_idx: 0
      };
      handleUpdateMultiview(updatedMultiview);
    }
  };

  return (
    <div className="flex flex-col gap-2 rounded p-4 pr-7">
      <div className="flex justify-between pb-5">
        <h1 className="font-bold">{t('preset.multiview_output_settings')}</h1>
      </div>
      <div>
        <Options
          label={t('preset.select_multiview_layout')}
          options={multiviewLayoutNames.map((singleItem) => ({
            label: singleItem
          }))}
          value={selectedMultiviewLayout?.name || ''}
          update={(value) => handleSetSelectedMultiviewLayout(value)}
        />
      </div>
      <div className="flex flex-col gap-3">
        <Options
          label={t('preset.video_format')}
          options={[{ label: 'AVC' }, { label: 'HEVC' }]}
          value={currentValue?.output.video_format || 'AVC'}
          update={(value) => handleChange('videoFormat', value)}
        />
        <Input
          type="number"
          label={t('preset.video_kilobit_rate')}
          inputError={!currentValue?.output.video_kilobit_rate}
          value={currentValue?.output.video_kilobit_rate || ''}
          update={(value) => handleChange('videoKiloBit', value)}
        />
        <Options
          label={t('preset.mode')}
          options={[{ label: 'listener' }, { label: 'caller' }]}
          value={currentValue?.output.srt_mode || 'listener'}
          update={(value) => handleChange('srtMode', value)}
        />
        <Input
          label={t('preset.port')}
          inputError={portDuplicateError || !currentValue?.output.local_port}
          value={currentValue?.output.local_port || ''}
          update={(value) => handleChange('port', value)}
        />
        <Input
          label={t('preset.ip')}
          inputError={
            !currentValue?.output.local_ip ||
            currentValue.output.local_ip === ''
          }
          value={currentValue?.output.local_ip || ''}
          update={(value) => handleChange('ip', value)}
        />
        <Input
          label={t('preset.srt_stream_id')}
          inputError={streamIdDuplicateError}
          value={currentValue?.output.srt_stream_id || ''}
          update={(value) => handleChange('srtStreamId', value)}
        />
        <Input
          label={t('preset.srt_passphrase')}
          value={currentValue?.output.srt_passphrase || ''}
          update={(value) => handleChange('srtPassphrase', value)}
        />
      </div>
    </div>
  );
}
