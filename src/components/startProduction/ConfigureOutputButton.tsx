'use client';

import { useState } from 'react';
import { IconSettings } from '@tabler/icons-react';
import { Preset } from '../../interfaces/preset';
import { useTranslate } from '../../i18n/useTranslate';
import { Button } from '../button/Button';
import { ConfigureOutputModal } from '../modal/configureOutputModal/ConfigureOutputModal';
type ConfigureOutputButtonProps = {
  preset?: Preset;
  disabled?: boolean;
  updatePreset: (preset: Preset) => void;
};

export function ConfigureOutputButton({
  preset,
  updatePreset,
  disabled
}: ConfigureOutputButtonProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const toggleConfigModal = () => {
    if (preset) {
      setModalOpen((state) => !state);
    }
  };
  const t = useTranslate();
  return (
    <>
      <Button
        onClick={toggleConfigModal}
        disabled={!preset || disabled}
        hoverMessage={!preset ? t('preset.preset_necessary') : ''}
        className={`min-w-fit`}
      >
        <IconSettings className="text-p" />
      </Button>
      {preset && (
        <ConfigureOutputModal
          open={modalOpen}
          preset={preset}
          onClose={toggleConfigModal}
          updatePreset={updatePreset}
        />
      )}
    </>
  );
}
