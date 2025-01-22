import { ResourcesPipelineResponse } from '../../types/ateliere-live';
import { MultiviewSettings } from './multiview';
import { WhepMultiview } from './whep';

export interface SrtOutput {
  srt_mode: string;
  ip: string;
  port: number;
  url: string;
}

export interface PipelineSource {
  ingest_source_name: string;
  ingest_name: string;
  settings: {
    alignment_ms?: number;
    max_network_latency_ms?: number;
  };
}

export interface ManagerPipelineResponse {
  pipeline: ResourcesPipelineResponse;
  status: {
    active: boolean;
    multiviews: SrtOutput[];
    outputs: SrtOutput[];
    whepMultiviews: WhepMultiview[];
  };
}

export interface ProgramOutput {
  port: number;
  local_ip: string;
  remote_ip: string;
  format: string;
  srt_mode: string;
  srt_latency_ms: number;
  srt_passphrase: string;
  audio_format: string;
  audio_kilobit_rate: number;
  video_bit_depth: number;
  video_format: string;
  video_gop_length: number;
  video_kilobit_rate: number;
}

export interface PipelineSettings {
  pipeline_readable_name: string;
  ingest_id?: string;
  source_id?: number;
  pipeline_id?: string;
  input_slot?: number;
  pipeline_name?: string;
  alignment_ms: number;
  max_network_latency_ms: number;
  width: number;
  height: number;
  frame_rate_d: number;
  frame_rate_n: number;
  format: string;
  encoder: string;
  encoder_device: string;
  gop_length: number;
  pic_mode: string;
  video_kilobit_rate: number;
  bit_depth: number;
  speed_quality_balance: string;
  convert_color_range: boolean;
  audio_sampling_frequency: number;
  audio_format: string;
  audio_mapping: string;
  program_output_port: number; // deprecated but kept for backward compatibility
  program_output: ProgramOutput[];
  outputs?: PipelineOutput[];
  multiviews?: MultiviewSettings[];
  interfaces: [
    {
      commit_rate: number;
      port: number;
      protocol: string;
    }
  ];
  sources?: PipelineSource[];
}

export interface PipelineOutput {
  uuid: string;
  settings: PipelineOutputEncoderSettings;
  streams: PipelineOutputSettings[];
}

// In order for there to be multiple streams on the same output
// all streams need to share encoder settings
export type PipelineOutputEncoderSettings = Pick<
  PipelineOutputSettings,
  'video_format' | 'video_bit_depth' | 'video_kilobit_rate'
>;

export interface PipelineOutputSettings {
  audio_format: string;
  audio_kilobit_rate: number;
  format: string;
  local_ip: string;
  local_port: number;
  remote_ip: string;
  remote_port: number;
  srt_latency_ms: number;
  srt_mode: string;
  srt_passphrase: string;
  video_bit_depth: number;
  video_format: string;
  video_gop_length: number;
  video_kilobit_rate: number;
  srt_stream_id: string;
}

export interface PipelineStreamSettings {
  ingest_id: string;
  source_id: number;
  pipeline_id: string;
  input_slot: number;
  alignment_ms: number;
  max_network_latency_ms: number;
  width: number;
  height: number;
  frame_rate_d: number;
  frame_rate_n: number;
  format: string;
  encoder: string;
  encoder_device: string;
  gop_length: number;
  pic_mode: string;
  video_kilobit_rate: number;
  bit_depth: number;
  speed_quality_balance: string;
  convert_color_range: boolean;
  audio_sampling_frequency: number;
  audio_format: string;
  audio_mapping: string;
  interfaces: [
    {
      commit_rate: number;
      port: number;
      protocol: string;
    }
  ];
}
