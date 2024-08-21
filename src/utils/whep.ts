import { Log } from '../api/logger';

type SrtWhepMap = {
  [srt: string]: string;
};

export function getWhepUrlForSRT(srtAddress: string): URL | undefined {
  Log().debug(process.env.SRT_WHEP);
  if (!process.env.SRT_WHEP) {
    return undefined;
  }

  const srtWhepMaps: SrtWhepMap = {};
  process.env.SRT_WHEP.split(',').map((s) => {
    const [srt, whep] = s.split('|');
    srtWhepMaps[srt] = whep;
  });
  const whepString = srtWhepMaps[srtAddress];
  if (whepString) {
    return new URL(whepString);
  }
  return undefined;
}
