'use client';
import React, { useEffect, useState, KeyboardEvent } from 'react';
import { PageProps } from '../../../../.next/types/app/production/[id]/page';
import SourceListItem from '../../../components/sourceListItem/SourceListItem';
import FilterOptions from '../../../components/filter/FilterOptions';
import { AddSource } from '../../../components/addSource/AddSource';
import { IconX } from '@tabler/icons-react';
import { useSources } from '../../../hooks/sources/useSources';
import {
  AddSourceStatus,
  DeleteSourceStatus,
  SourceReference,
  SourceWithId
} from '../../../interfaces/Source';
import { useGetProduction, usePutProduction } from '../../../hooks/productions';
import { Production } from '../../../interfaces/production';
import { updateSetupItem } from '../../../hooks/items/updateSetupItem';
import { removeSetupItem } from '../../../hooks/items/removeSetupItem';
import { addSetupItem } from '../../../hooks/items/addSetupItem';
import HeaderNavigation from '../../../components/headerNavigation/HeaderNavigation';
import styles from './page.module.scss';
import FilterProvider from '../../../components/inventory/FilterContext';
import { useGetPresets } from '../../../hooks/presets';
import { Preset } from '../../../interfaces/preset';
import SourceCards from '../../../components/sourceCards/SourceCards';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { PresetDropdown } from '../../../components/startProduction/presetDropdown';
import { StartProductionButton } from '../../../components/startProduction/StartProductionButton';
import { ConfigureOutputButton } from '../../../components/startProduction/ConfigureOutputButton';
import toast from 'react-hot-toast';
import { useTranslate } from '../../../i18n/useTranslate';
import { usePipelines } from '../../../hooks/pipelines';
import { useControlPanels } from '../../../hooks/controlPanels';
import PipelineNameDropDown from '../../../components/dropDown/PipelineNameDropDown';
import ControlPanelDropDown from '../../../components/dropDown/ControlPanelDropDown';
import { Pipelines } from '../../../components/pipeline/Pipelines';
import { AddSourceModal } from '../../../components/modal/AddSourceModal';
import { RemoveSourceModal } from '../../../components/modal/RemoveSourceModal';
import { useDeleteStream, useCreateStream } from '../../../hooks/streams';
import { MonitoringButton } from '../../../components/button/MonitoringButton';
import { useGetMultiviewPreset } from '../../../hooks/multiviewPreset';
import { ISource } from '../../../hooks/useDragableItems';
import { useMultiviews } from '../../../hooks/multiviews';

export default function ProductionConfiguration({ params }: PageProps) {
  const t = useTranslate();

  //SOURCES
  const [sources] = useSources();
  const [filteredSources, setFilteredSources] = useState(
    new Map<string, SourceWithId>()
  );
  const [addSourceModal, setAddSourceModal] = useState(false);
  const [removeSourceModal, setRemoveSourceModal] = useState(false);
  const [selectedSource, setSelectedSource] = useState<
    SourceWithId | undefined
  >();
  const [selectedSourceRef, setSelectedSourceRef] = useState<
    SourceReference | undefined
  >();
  const [createStream, loadingCreateStream] = useCreateStream();
  const [deleteStream, loadingDeleteStream] = useDeleteStream();
  //PRODUCTION
  const putProduction = usePutProduction();
  const getPresets = useGetPresets();
  const getProduction = useGetProduction();
  const [configurationName, setConfigurationName] = useState<string>('');
  const [productionSetup, setProductionSetup] = useState<Production>();
  const [presets, setPresets] = useState<Preset[]>();
  const [selectedPreset, setSelectedPreset] = useState<Preset>();
  const selectedProductionItems =
    productionSetup?.sources.map((prod) => prod._id) || [];

  //MULTIVIEWS
  //TODO: move useGetMultiviewPreset into useMultiviews (refactor)
  const getMultiviewPreset = useGetMultiviewPreset();
  const [updateMultiviewViews] = useMultiviews();

  //FROM LIVE API
  const [pipelines, loadingPipelines, , refreshPipelines] = usePipelines();
  const [controlPanels, loadingControlPanels, , refreshControlPanels] =
    useControlPanels();
  //UI STATE
  const [inventoryVisible, setInventoryVisible] = useState(false);
  const [isPresetDropdownHidden, setIsPresetDropdownHidden] = useState(true);
  const [addSourceStatus, setAddSourceStatus] = useState<AddSourceStatus>();
  const [deleteSourceStatus, setDeleteSourceStatus] =
    useState<DeleteSourceStatus>();

  useEffect(() => {
    refreshPipelines();
    refreshControlPanels();
  }, [productionSetup?.isActive]);

  const setSelectedControlPanel = (controlPanel: string[]) => {
    setProductionSetup((prevState) => {
      if (!prevState) return;
      putProduction(prevState._id, {
        ...prevState,
        production_settings: {
          ...prevState?.production_settings,
          control_connection: {
            ...prevState?.production_settings?.control_connection,
            control_panel_name: controlPanel
          }
        }
      });
      return {
        ...prevState,
        production_settings: {
          ...prevState?.production_settings,
          control_connection: {
            ...prevState?.production_settings?.control_connection,
            control_panel_name: controlPanel
          }
        }
      };
    });
  };
  const setSelectedPipelineName = (
    pipelineIndex: number,
    pipelineName?: string
  ) => {
    setProductionSetup((prevState) => {
      const updatedPipelines = prevState?.production_settings.pipelines;
      if (!updatedPipelines) return;
      updatedPipelines[pipelineIndex].pipeline_name = pipelineName;
      putProduction(prevState._id, {
        ...prevState,
        production_settings: {
          ...prevState?.production_settings,
          pipelines: updatedPipelines
        }
      });
      return {
        ...prevState,
        production_settings: {
          ...prevState?.production_settings,
          pipelines: updatedPipelines
        }
      };
    });
  };

  const checkProductionPipelinesAndControlPanels = (production: Production) => {
    if (!production.production_settings) return production;
    const productionPipelines = production.production_settings?.pipelines;

    const activePipelinesForProduction = pipelines?.filter((pipeline) =>
      productionPipelines.some(
        (productionPipeline) =>
          productionPipeline.pipeline_name === pipeline.name
      )
    );
    const availablePipelines = productionPipelines.map((productionPipeline) => {
      const activePipeForProduction = activePipelinesForProduction?.find(
        (p) => p.name === productionPipeline.pipeline_name
      );
      if (activePipeForProduction?.streams.length === 0) {
        return productionPipeline;
      }
      return productionPipeline;
    });

    return {
      ...production,
      production_settings: {
        ...production.production_settings,
        pipelines: availablePipelines
      }
    };
  };

  const refreshProduction = () => {
    getProduction(params.id).then((config) => {
      // check if production has pipelines in use or control panels in use, if so update production
      const production = config.isActive
        ? config
        : checkProductionPipelinesAndControlPanels(config);

      putProduction(production._id, production);
      setProductionSetup(production);
      setConfigurationName(production.name);
      setSelectedPreset(production.production_settings);
      getPresets().then((presets) => {
        if (!production.production_settings) {
          setPresets(presets);
        } else {
          const presetsExludingProductionSettings = presets.filter(
            (preset) => preset._id !== production?.production_settings._id
          );
          setPresets([
            ...presetsExludingProductionSettings,
            production.production_settings
          ]);
        }
      });
    });
  };

  useEffect(() => {
    refreshProduction();
  }, []);

  useEffect(() => {
    if (productionSetup && sources) {
      const hasMissingSource = productionSetup?.sources.find(
        (productionSource) =>
          !Array.from(sources.values()).find(
            (source) => source._id.toString() === productionSource._id
          )
      );
      if (hasMissingSource) {
        toast.error(t('error.missing_sources_in_db'));
      }
    }

    setFilteredSources(sources);
  }, [sources]);

  const updatePreset = (preset: Preset) => {
    if (!productionSetup?._id) return;
    putProduction(productionSetup?._id.toString(), {
      ...productionSetup,
      production_settings: {
        ...preset,
        control_connection: {
          ...preset.control_connection,
          control_panel_name:
            productionSetup.production_settings.control_connection
              .control_panel_name
        },
        pipelines: preset.pipelines.map((p, i) => {
          return {
            ...p,
            pipeline_name:
              productionSetup.production_settings.pipelines[i].pipeline_name
          };
        })
      }
    }).then(() => {
      refreshProduction();
    });
  };
  const updateProduction = (id: string, productionSetup: Production) => {
    setProductionSetup(productionSetup);
    putProduction(id, productionSetup);
  };

  const updateSource = (
    source: SourceReference,
    productionSetup: Production
  ) => {
    const updatedSetup = updateSetupItem(source, productionSetup);
    setProductionSetup(updatedSetup);
    putProduction(updatedSetup._id.toString(), updatedSetup);
    const pipeline = updatedSetup.production_settings.pipelines[0];
    if (
      pipeline.pipeline_id &&
      pipeline.multiview &&
      pipeline.multiview.multiview_id
    ) {
      updateMultiviewViews(pipeline.pipeline_id, updatedSetup, source);
    }
  };

  const updateConfigName = (nameChange: string) => {
    if (productionSetup?.name === nameChange) {
      return;
    }
    setConfigurationName(nameChange);
    const updatedSetup = {
      ...productionSetup,
      name: nameChange
    } as Production;
    setProductionSetup(updatedSetup);
    putProduction(updatedSetup._id.toString(), updatedSetup);
  };

  async function updateSelectedPreset(preset?: Preset) {
    if (!preset && productionSetup?._id) {
      getPresets().then((presets) => {
        setPresets(presets);
      });
      setSelectedPreset(undefined);
      return;
    }
    if (!preset?.default_multiview_reference) {
      toast.error(t('production.missing_multiview'));
      return;
    }
    const defaultMultiview = await getMultiviewPreset(
      preset?.default_multiview_reference
    );

    setSelectedPreset(preset);

    const multiview = {
      layout: defaultMultiview.layout,
      output: defaultMultiview.output,
      name: defaultMultiview.name,
      for_pipeline_idx: 0
    };
    setIsPresetDropdownHidden(true);
    let controlPanelName: string[] = [];
    if (
      productionSetup?.production_settings &&
      productionSetup?.production_settings.control_connection.control_panel_name
    ) {
      // Keep the control panels name array from the current production setup
      controlPanelName =
        productionSetup.production_settings.control_connection
          .control_panel_name!;
    }

    const updatedSetup = {
      ...productionSetup,
      production_settings: {
        _id: preset._id,
        name: preset.name,
        control_connection: {
          control_panel_endpoint:
            preset.control_connection.control_panel_endpoint,
          pipeline_control_connections:
            preset.control_connection.pipeline_control_connections,
          control_panel_name: controlPanelName
        },
        pipelines: preset.pipelines
      }
    } as Production;
    updatedSetup.production_settings.pipelines[0].multiview = multiview;
    setProductionSetup(updatedSetup);
  }

  function addPresetComponent(preset: Preset, index: number) {
    const id = `${preset.name}-${index}-id`;
    return (
      <li
        key={preset.name}
        className="flex w-40 px-1 mb-1 hover:bg-gray-600"
        onClick={() => {
          updateSelectedPreset(preset);
        }}
      >
        <div className="flex items-center w-full p-2 rounded hover:bg-gray-600">
          <label
            htmlFor={id}
            className="w-full text-sm text-center font-medium"
          >
            {preset.name}
          </label>
        </div>
      </li>
    );
  }
  function getSourcesToDisplay(
    filteredSources: Map<string, SourceWithId>
  ): React.ReactNode[] {
    return Array.from(filteredSources.values()).map((source, index) => {
      return (
        <SourceListItem
          key={`${source.ingest_source_name}-${index}`}
          source={source}
          disabled={selectedProductionItems?.includes(source._id.toString())}
          action={(source: SourceWithId) => {
            if (productionSetup && productionSetup.isActive) {
              setSelectedSource(source);
              setAddSourceModal(true);
            } else if (productionSetup) {
              const updatedSetup = addSetupItem(
                {
                  _id: source._id.toString(),
                  label: source.ingest_source_name,
                  input_slot: getFirstEmptySlot()
                },
                productionSetup
              );
              if (!updatedSetup) return;
              setProductionSetup(updatedSetup);
              putProduction(updatedSetup._id.toString(), updatedSetup).then(
                () => {
                  setAddSourceModal(false);
                  setSelectedSource(undefined);
                }
              );
            }
          }}
        />
      );
    });
  }

  const getFirstEmptySlot = () => {
    if (!productionSetup) throw 'no_production';
    let firstEmptySlot = productionSetup.sources.length + 1;
    if (productionSetup.sources.length === 0) {
      return firstEmptySlot;
    }
    for (
      let i = 0;
      i <
      productionSetup.sources[productionSetup.sources.length - 1].input_slot;
      i++
    ) {
      if (
        !productionSetup.sources.some((source) => source.input_slot === i + 1)
      ) {
        firstEmptySlot = i + 1;
        break;
      }
    }
    return firstEmptySlot;
  };

  const handleAddSource = async () => {
    setAddSourceStatus(undefined);
    if (
      productionSetup &&
      productionSetup.isActive &&
      selectedSource &&
      productionSetup.production_settings.pipelines[0].multiview?.layout.views
    ) {
      const firstEmptySlot = getFirstEmptySlot();
      const result = await createStream(
        selectedSource,
        productionSetup,
        firstEmptySlot ? firstEmptySlot : productionSetup.sources.length + 1
      );
      if (!result.ok) {
        if (!result.value) {
          setAddSourceStatus({
            success: false,
            steps: [{ step: 'unexpected', success: false }]
          });
        } else {
          setAddSourceStatus({
            success: false,
            steps: result.value.steps
          });
        }
      }
      if (result.ok) {
        if (result.value.success) {
          const sourceToAdd = {
            _id: result.value.streams[0].source_id,
            label: selectedSource.name,
            stream_uuids: result.value.streams.map((r) => r.stream_uuid),
            input_slot: getFirstEmptySlot()
          };
          const updatedSetup = addSetupItem(sourceToAdd, productionSetup);
          if (!updatedSetup) return;
          setProductionSetup(updatedSetup);
          putProduction(updatedSetup._id.toString(), updatedSetup).then(() => {
            refreshProduction();
            setAddSourceModal(false);
            setSelectedSource(undefined);
          });
          setAddSourceStatus(undefined);
        } else {
          setAddSourceStatus({ success: false, steps: result.value.steps });
        }
      }
    }
  };

  const handleRemoveSource = async () => {
    if (
      productionSetup &&
      productionSetup.isActive &&
      selectedSourceRef &&
      selectedSourceRef.stream_uuids
    ) {
      const multiview =
        productionSetup.production_settings.pipelines[0].multiview;
      if (!multiview) return;
      const viewToUpdate = multiview?.layout.views.find(
        (v) => v.input_slot === selectedSourceRef.input_slot
      );
      if (!viewToUpdate) {
        if (!productionSetup.production_settings.pipelines[0].pipeline_id)
          return;
        const result = await deleteStream(
          selectedSourceRef.stream_uuids,
          productionSetup,
          selectedSourceRef.input_slot
        );
        if (!result.ok) {
          if (!result.value) {
            setDeleteSourceStatus({
              success: false,
              steps: [{ step: 'unexpected', success: false }]
            });
          } else {
            setDeleteSourceStatus({ success: false, steps: result.value });
            const didDeleteStream = result.value.some(
              (step) => step.step === 'delete_stream' && step.success
            );
            if (didDeleteStream) {
              const updatedSetup = removeSetupItem(
                selectedSourceRef,
                productionSetup
              );
              if (!updatedSetup) return;
              setProductionSetup(updatedSetup);
              putProduction(updatedSetup._id.toString(), updatedSetup).then(
                () => {
                  setSelectedSourceRef(undefined);
                }
              );
              return;
            }
          }
          return;
        }
        const updatedSetup = removeSetupItem(
          selectedSourceRef,
          productionSetup
        );
        if (!updatedSetup) return;
        setProductionSetup(updatedSetup);
        putProduction(updatedSetup._id.toString(), updatedSetup).then(() => {
          setRemoveSourceModal(false);
          setSelectedSourceRef(undefined);
        });
        return;
      }
      const result = await deleteStream(
        selectedSourceRef.stream_uuids,
        productionSetup,
        selectedSourceRef.input_slot
      );
      if (!result.ok) {
        if (!result.value) {
          setDeleteSourceStatus({
            success: false,
            steps: [{ step: 'unexpected', success: false }]
          });
        } else {
          setDeleteSourceStatus({ success: false, steps: result.value });
          const didDeleteStream = result.value.some(
            (step) => step.step === 'delete_stream' && step.success
          );
          if (didDeleteStream) {
            const updatedSetup = removeSetupItem(
              selectedSourceRef,
              productionSetup
            );
            if (!updatedSetup) return;
            setProductionSetup(updatedSetup);
            putProduction(updatedSetup._id.toString(), updatedSetup);
            return;
          }
        }
        return;
      }
      const updatedSetup = removeSetupItem(selectedSourceRef, productionSetup);
      if (!updatedSetup) return;
      setProductionSetup(updatedSetup);
      putProduction(updatedSetup._id.toString(), updatedSetup).then(() => {
        setRemoveSourceModal(false);
        setSelectedSourceRef(undefined);
      });
    }
  };

  const handleAbortAddSource = () => {
    setAddSourceStatus(undefined);
    setAddSourceModal(false);
    setSelectedSource(undefined);
  };

  const handleAbortRemoveSource = () => {
    setRemoveSourceModal(false);
    setSelectedSource(undefined);
    setDeleteSourceStatus(undefined);
  };
  return (
    <>
      <HeaderNavigation>
        <input
          className="m-2 text-4xl text-p text-center bg-transparent"
          type="text"
          value={configurationName}
          onChange={(e) => {
            setConfigurationName(e.target.value);
          }}
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key.includes('Enter')) {
              e.currentTarget.blur();
            }
          }}
          onBlur={() => updateConfigName(configurationName)}
        />
        <div
          className="flex mr-2 w-fit rounded justify-end items-center gap-3"
          key={'StartProductionButtonKey'}
          id="presetDropdownDefaultCheckbox"
        >
          <PresetDropdown
            disabled={productionSetup ? productionSetup.isActive : false}
            isHidden={isPresetDropdownHidden}
            setHidden={setIsPresetDropdownHidden}
            selectedPreset={selectedPreset}
            onSelectPreset={() => {
              updateSelectedPreset(undefined);
            }}
          >
            {presets &&
              presets.map((item, index) => {
                return addPresetComponent(item, index);
              })}
          </PresetDropdown>
          <ConfigureOutputButton
            disabled={productionSetup?.isActive}
            preset={selectedPreset}
            updatePreset={updatePreset}
          />
          <StartProductionButton
            refreshProduction={refreshProduction}
            production={productionSetup}
            disabled={!selectedPreset ? true : false}
          />
        </div>
      </HeaderNavigation>
      <div className="flex max-h-full min-h-[100%] flex-row">
        <div
          className={`overflow-hidden transition-[min-width] w-0 min-w-0 ${
            inventoryVisible ? 'min-w-[35%] ml-2 mt-2 max-h-[89vh]' : ''
          }`}
        >
          <div className={`p-3 w-full bg-container rounded break-all h-full`}>
            <div className="flex justify-end mb-2">
              <button className="flex justify-end mb-2">
                <IconX
                  className="w-5 h-5 text-brand"
                  onClick={() => setInventoryVisible(false)}
                />
              </button>
            </div>
            <div className="mb-1">
              <FilterProvider sources={sources}>
                <FilterOptions
                  onFilteredSources={(filtered: Map<string, SourceWithId>) => {
                    setFilteredSources(new Map<string, SourceWithId>(filtered));
                  }}
                />
              </FilterProvider>
            </div>
            <ul
              className={`flex flex-col border-t border-gray-600 overflow-scroll h-full ${
                !inventoryVisible && 'hidden'
              } ${styles.no_scrollbar}`}
            >
              {getSourcesToDisplay(filteredSources)}
              {addSourceModal && selectedSource && (
                <AddSourceModal
                  name={selectedSource.name}
                  open={addSourceModal}
                  onAbort={handleAbortAddSource}
                  onConfirm={handleAddSource}
                  status={addSourceStatus}
                  loading={loadingCreateStream}
                />
              )}
            </ul>
          </div>
        </div>
        <div className="flex flex-col h-fit w-full">
          <div
            id="prevCameras"
            className="grid p-3 m-2 bg-container grow rounded grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 h-fit"
          >
            {productionSetup?.sources && sources.size > 0 && (
              <DndProvider backend={HTML5Backend}>
                <SourceCards
                  productionSetup={productionSetup}
                  updateProduction={(updated) => {
                    updateProduction(productionSetup._id, updated);
                  }}
                  onSourceUpdate={(
                    source: SourceReference,
                    sourceItem: ISource
                  ) => {
                    sourceItem.label = source.label;
                    updateSource(source, productionSetup);
                  }}
                  onSourceRemoval={(source: SourceReference) => {
                    if (productionSetup && productionSetup.isActive) {
                      setSelectedSourceRef(source);
                      setRemoveSourceModal(true);
                    } else if (productionSetup) {
                      const updatedSetup = removeSetupItem(
                        {
                          _id: source._id,
                          label: source.label,
                          input_slot: source.input_slot
                        },
                        productionSetup
                      );
                      if (!updatedSetup) return;
                      setProductionSetup(updatedSetup);
                      putProduction(
                        updatedSetup._id.toString(),
                        updatedSetup
                      ).then(() => {
                        setRemoveSourceModal(false);
                        setSelectedSourceRef(undefined);
                      });
                    }
                  }}
                />
                {removeSourceModal && selectedSourceRef && (
                  <RemoveSourceModal
                    name={selectedSourceRef.label}
                    open={removeSourceModal}
                    onAbort={handleAbortRemoveSource}
                    onConfirm={handleRemoveSource}
                    status={deleteSourceStatus}
                    loading={loadingDeleteStream}
                  />
                )}
              </DndProvider>
            )}
            <AddSource
              disabled={
                productionSetup?.production_settings === undefined ||
                productionSetup?.production_settings === null
              }
              onClick={() => {
                setInventoryVisible(true);
              }}
            />
          </div>
          <div className="w-full flex gap-2 p-3">
            {productionSetup?.production_settings &&
              productionSetup?.production_settings.pipelines.map(
                (pipeline, i) => {
                  return (
                    <PipelineNameDropDown
                      disabled={productionSetup.isActive}
                      key={pipeline.pipeline_readable_name}
                      label={pipeline.pipeline_readable_name}
                      options={pipelines?.map((pipeline) => ({
                        option: pipeline.name,
                        available: pipeline.streams.length === 0
                      }))}
                      pipelineIndex={i}
                      initial={pipeline.pipeline_name}
                      setSelectedPipelineName={setSelectedPipelineName}
                    />
                  );
                }
              )}
            {productionSetup?.production_settings && (
              <ControlPanelDropDown
                disabled={productionSetup.isActive}
                options={controlPanels?.map((controlPanel) => ({
                  option: controlPanel.name,
                  available: controlPanel.outgoing_connections?.length === 0
                }))}
                initial={
                  productionSetup?.production_settings?.control_connection
                    .control_panel_name
                }
                setSelectedControlPanel={setSelectedControlPanel}
              />
            )}

            <div className="w-full flex justify-end">
              <Pipelines production={productionSetup} />
            </div>
          </div>
          {productionSetup && productionSetup.isActive && (
            <div className="flex justify-end p-3">
              <MonitoringButton id={productionSetup?._id.toString()} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
