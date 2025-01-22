import { getSourceThumbnail } from '../../../utils/source';
import EditViewContext from '../EditViewContext';
import GeneralSettings from './GeneralSettings';
import { SourceWithId } from '../../../interfaces/Source';
import UpdateButtons from './UpdateButtons';
import AudioChannels from './AudioChannels/AudioChannels';
import ImageComponent from '../../image/ImageComponent';
import { useState } from 'react';

export default function EditView({
  source,
  updateSource,
  close,
  purgeInventorySource,
  removeInventorySourceItem,
  locked
}: {
  source: SourceWithId;
  updateSource: (source: SourceWithId) => void;
  close: () => void;
  purgeInventorySource: (source: SourceWithId) => void;
  removeInventorySourceItem: (id: string) => Promise<Response | undefined>;
  locked: boolean;
}) {
  const [duplicateAudioValues, setDuplicateAudioValues] = useState(false);

  return (
    <EditViewContext source={source} updateSource={updateSource}>
      <div className="flex flex-row mb-10">
        <div className="relative w-[34rem]">
          <ImageComponent src={getSourceThumbnail(source)} />
        </div>
        <GeneralSettings locked={locked} />
      </div>

      <div className="flex">
        <AudioChannels
          source={source}
          locked={locked}
          setDuplicateAudioValues={setDuplicateAudioValues}
        />
      </div>
      <UpdateButtons
        source={source}
        close={close}
        purgeInventorySource={purgeInventorySource}
        removeInventorySourceItem={removeInventorySourceItem}
        locked={locked}
        duplicateAudioValues={duplicateAudioValues}
      />
    </EditViewContext>
  );
}
