import { Numbers } from '../interfaces/Source';
import { v4 as uuidv4 } from 'uuid';

export const channel = (value: string) => ({
  id: uuidv4(),
  value
});

export const mapAudio = (audio: Numbers[], channelsInArray: number[]) => {
  const prepareAudioMapping = audio.map((value: Numbers) =>
    typeof value === 'object'
      ? [{ upper: value[0] }, { lower: value[1] }]
      : { upper: value }
  );

  const firstRow = channelsInArray.map((_, index) => {
    const value = prepareAudioMapping.flat()[index];

    return channel((value && value.upper && String(value.upper)) || '');
  });

  const secondRow = channelsInArray.map((_, index) => {
    const value: { lower?: number; upper?: number } =
      prepareAudioMapping.flat()[index];

    return channel((value && value.lower && String(value.lower)) || '');
  });

  return [firstRow, secondRow];
};
