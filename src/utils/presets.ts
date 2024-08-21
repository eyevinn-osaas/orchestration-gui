import { PipelineSettings } from '../interfaces/pipeline';

interface IOut {
  ip: string;
  srtMode: string;
  port: number;
  videoFormat: string;
  videoBit: number;
  videoKiloBit: number;
}

export const modifyProgramOutput = (pipe: PipelineSettings, out: IOut[]) => {
  return {
    ...pipe,
    program_output: out.map((output) => ({
      ...pipe.program_output[0],
      [output.srtMode === 'listener' ? 'local_ip' : 'remote_ip']: output.ip,
      srt_mode: output.srtMode,
      port: Number(output.port),
      video_format: output.videoFormat,
      video_bit_depth: Number(output.videoBit),
      video_kilobit_rate: Number(output.videoKiloBit)
    }))
  } satisfies PipelineSettings;
};
