'use client';

import { useCallback, useState, useRef, useEffect } from 'react';
import { StartModal } from '../modal/StartModal';
import { Button } from '../button/Button';
import {
  Production,
  StartProductionStatus,
  StopProductionStatus
} from '../../interfaces/production';
import { useTranslate } from '../../i18n/useTranslate';
import { Loader } from '../loader/Loader';
import { useStartProduction, useStopProduction } from '../../hooks/workflow';
import { refresh } from '../../utils/refresh';
import { StopModal } from '../modal/StopModal';
import { usePutProduction } from '../../hooks/productions';
import toast from 'react-hot-toast';
import { useDeleteMonitoring } from '../../hooks/monitoring';
import { useMultiviewLayouts } from '../../hooks/multiviewLayout';
import { useUpdateSourceInputSlotOnMultiviewLayouts } from '../../hooks/useUpdateSourceInputSlotOnMultiviewLayouts';

type StartProductionButtonProps = {
  production: Production | undefined;
  disabled: boolean;
  refreshProduction: () => void;
};

export function StartProductionButton({
  production,
  disabled,
  refreshProduction
}: StartProductionButtonProps) {
  const t = useTranslate();
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const [startProductionStatus, setStartProductionStatus] =
    useState<StartProductionStatus>();
  const [stopProductionStatus, setStopProductionStatus] =
    useState<StopProductionStatus>();
  const [startProduction, loading] = useStartProduction();
  const putProduction = usePutProduction();
  const [stopProduction, loadingStopProduction] = useStopProduction();
  const [deleteMonitoring] = useDeleteMonitoring();
  const [updateSourceInputSlotOnMultiviewLayouts, updateLoading] =
    useUpdateSourceInputSlotOnMultiviewLayouts();
  const [modalOpen, setModalOpen] = useState(false);
  const [stopModalOpen, setStopModalOpen] = useState(false);
  const [multiviewLayouts] = useMultiviewLayouts(true);
  const [productionSetup, setProductionSetup] = useState<Production>();

  useEffect(() => {
    if (production && modalOpen) {
      updateSourceInputSlotOnMultiviewLayouts(production).then(
        (updatedSetup) => {
          if (!updatedSetup) return;
          setProductionSetup(updatedSetup);
          refreshProduction();
        }
      );
    }
  }, [modalOpen]);

  const onClick = () => {
    if (!production) return;
    const hasUndefinedPipeline = production.production_settings.pipelines.some(
      (p) => !p.pipeline_name
    );
    if (hasUndefinedPipeline) {
      toast.error(t('start_production_errors.no_pipeline_selected'));
      return;
    }
    const hasSamePipelines = production.production_settings.pipelines.some(
      (p, i) => {
        const rest = production.production_settings.pipelines
          .slice(i + 1)
          .map((pipe) => pipe.pipeline_name);
        return rest.includes(p.pipeline_name);
      }
    );
    if (hasSamePipelines) {
      toast.error(t('start_production_errors.same_pipeline_selected'));
      return;
    }
    const hasUndefinedControlPanel =
      !production.production_settings.control_connection.control_panel_name ||
      production.production_settings.control_connection.control_panel_name
        .length === 0;
    if (hasUndefinedControlPanel) {
      toast.error(t('start_production_errors.no_control_panel_selected'));
      return;
    }
    setModalOpen(true);
  };

  const onAbort = useCallback(() => {
    setModalOpen(false);
    setStartProductionStatus(undefined);
    clearTimeout(timeout.current);
  }, []);

  const onConfirm = useCallback(() => {
    if (!productionSetup) {
      return;
    }
    let productionToStart: Production;
    if (!productionSetup.production_settings.pipelines[0].multiviews) {
      if (!multiviewLayouts || multiviewLayouts.length === 0) {
        toast.error(t('start_production_status.unexpected'));
        return;
      }
      const pipelineToUpdateMultiview =
        productionSetup.production_settings.pipelines[0];
      productionToStart = {
        ...productionSetup,
        sources: productionSetup.sources.map((source, i) => ({
          ...source,
          input_slot: i + 1
        })),
        production_settings: {
          ...productionSetup.production_settings,
          pipelines: [
            ...productionSetup.production_settings.pipelines.filter(
              (p) => p.pipeline_name !== pipelineToUpdateMultiview.pipeline_name
            ),
            {
              ...pipelineToUpdateMultiview,
              multiviews: [
                {
                  ...multiviewLayouts[0],
                  for_pipeline_idx: 0,
                  _id: multiviewLayouts[0]._id?.toString()
                }
              ]
            }
          ]
        }
      };
    } else {
      productionToStart = {
        ...productionSetup,
        sources: productionSetup.sources.map((source, i) => ({
          ...source,
          input_slot: i + 1
        }))
      };
    }

    startProduction(productionToStart)
      .then((status) => {
        if (status.ok) {
          console.log(`Starting production '${productionSetup.name}'`);
          refreshProduction();
          refresh('/');
          setModalOpen(false);
          setStartProductionStatus(undefined);
        }
        if (!status.ok) {
          if (!status.value) {
            setStartProductionStatus({
              success: false,
              steps: [{ step: 'unexpected', success: false }]
            });
          } else {
            setStartProductionStatus({ success: false, steps: status.value });
          }
        }
      })
      .catch((error) => {
        setStartProductionStatus({
          success: false,
          steps: [{ step: 'start', success: false }]
        });
      });
  }, [startProduction, productionSetup]);

  const onStopConfirm = async () => {
    if (!production) return;
    stopProduction(production)
      .then((status) => {
        if (status.ok) {
          putProduction(production._id.toString(), {
            ...production,
            isActive: false
          }).then(() => {
            refreshProduction();
            refresh('/');
            setStopModalOpen(false);
            setStopProductionStatus(undefined);
          });
        }
        if (!status.ok) {
          putProduction(production._id.toString(), {
            ...production,
            isActive: false
          });
          if (!status.value) {
            setStopProductionStatus({
              success: false,
              steps: [{ step: 'unexpected', success: false }]
            });
          } else {
            setStopProductionStatus({ success: false, steps: status.value });
          }
        }
      })
      .catch(() => {
        toast.error(t('stop_production_status.unexpected'));
      });
  };
  const onStopCancel = () => {
    setStopModalOpen(false);
    setStopProductionStatus(undefined);
    // TODO: Only do these two refresh calls incase of a "failed" stop attempt
    refreshProduction();
    refresh('/');
  };

  if (production?.isActive) {
    return (
      <>
        <Button
          className={`${
            disabled
              ? 'bg-button-delete/50 pointer-events-none'
              : 'bg-button-delete hover:bg-button-hover-red-bg'
          }`}
          onClick={() => setStopModalOpen(true)}
          disabled={disabled}
        >
          {loading ? (
            <Loader className="w-14 h-6" />
          ) : (
            <p className="w-14">{t('workflow.stop')}</p>
          )}
        </Button>
        <StopModal
          loading={loadingStopProduction}
          open={stopModalOpen}
          onCancel={onStopCancel}
          onConfirm={onStopConfirm}
          name={production.name}
          stopStatus={stopProductionStatus}
        />
      </>
    );
  }

  return (
    <>
      <Button
        onClick={onClick}
        disabled={disabled}
        hoverMessage={disabled ? 'Preset must be selected!' : ''}
        className={`${
          disabled
            ? 'bg-button-bg/50 pointer-events-none'
            : 'hover:bg-button-hover-bg'
        } min-w-fit`}
      >
        {loading ? <Loader className="w-10 h-5" /> : t('workflow.start')}
      </Button>
      <StartModal
        name={productionSetup?.name || ''}
        onAbort={onAbort}
        onConfirm={onConfirm}
        open={modalOpen}
        loading={loading || updateLoading}
        startStatus={startProductionStatus}
      />
    </>
  );
}
