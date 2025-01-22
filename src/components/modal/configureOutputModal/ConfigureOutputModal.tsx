import { Preset } from '../../../interfaces/preset';
import { Modal } from '../Modal';
import Decision from './Decision';
import PipelineOutputConfig from './PipelineOutputConfig';
import { useEffect, useState } from 'react';
import { PipelineOutput, PipelineSettings } from '../../../interfaces/pipeline';
import { usePipelines } from '../../../hooks/pipelines';
import cloneDeep from 'lodash.clonedeep';

type ConfigureOutputModalProps = {
  open: boolean;
  preset: Preset;
  onClose: () => void;
  updatePreset: (preset: Preset) => void;
};

export interface OutputStream {
  name: string;
  pipelineIndex: number;
  ip: string;
  srtMode: string;
  srtPassphrase: string;
  port: number;
  videoFormat: string;
  videoBit: number;
  videoKiloBit: number;
  srt_stream_id: string;
}

const DEFAULT_PORT_MUMBER = 9900;

export function ConfigureOutputModal({
  open,
  preset,
  onClose,
  updatePreset
}: ConfigureOutputModalProps) {
  const [pipelines, setPipelines] = useState<PipelineSettings[]>(
    preset.pipelines || []
  );
  const [currentError, setCurrentError] = useState<string>('');
  const [currentPortNumber, setCurrentPortNumber] =
    useState<number>(DEFAULT_PORT_MUMBER);

  const [pipes] = usePipelines();

  useEffect(() => {
    setPipelines(preset.pipelines || []);
  }, [preset]);

  const onSave = () => {
    const locations = pipelines
      .map((p) =>
        p.outputs?.map((o) =>
          o.streams.map((s) => `${s.local_ip}:${s.local_port}`)
        )
      )
      .flat(2);
    function findDuplicates(array: any[]) {
      return array.filter(
        (currentValue, currentIndex) =>
          array.indexOf(currentValue) !== currentIndex
      );
    }
    const duplicates = findDuplicates(locations);
    if (duplicates.length) {
      setCurrentError('Same <IP>:<Port> used for multiple streams');
      return;
    }
    updatePreset({ ...preset, pipelines: pipelines });
    onClose();
  };

  const updatePipelineOutputFunc = (
    pipeline: PipelineSettings,
    outputs: PipelineOutput[]
  ) => {
    setCurrentError('');
    const pipelineIndex = pipelines.findIndex(
      (p) => p.pipeline_name === pipeline.pipeline_name
    );
    if (pipelineIndex >= 0) {
      const newPipelines = cloneDeep(pipelines);
      newPipelines.splice(pipelineIndex, 1, { ...pipeline, outputs: outputs });
      setPipelines(newPipelines);
    }
  };

  const getPortNumber = () => {
    setCurrentPortNumber(currentPortNumber + 1);
    return currentPortNumber;
  };

  return (
    <Modal
      open={open}
      outsideClick={() => {
        onClose();
      }}
    >
      <div className="overflow-auto max-h-[90vh]">
        <div className="flex gap-3 flex-col text-center">
          {pipelines.map((pipeline, i) => {
            return (
              <PipelineOutputConfig
                key={pipeline.pipeline_readable_name + i}
                title={pipeline.pipeline_name || ''}
                outputs={
                  pipes?.find((p) => p.name === pipeline.pipeline_name)
                    ?.outputs || []
                }
                pipelineOutputs={pipeline.outputs || []}
                updatePipelineOutputs={(outputs: PipelineOutput[]) =>
                  updatePipelineOutputFunc(pipeline, outputs)
                }
                pipeline={pipeline}
                getPortNumber={getPortNumber}
              />
            );
          })}
        </div>
        <div className="text-button-delete text-center">{currentError}</div>
        <Decision onClose={() => onClose()} onSave={onSave} />
      </div>
    </Modal>
  );
}
