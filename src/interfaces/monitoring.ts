import { WithId } from 'mongodb';

export interface Monitoring extends WithId<Document> {
  productionId: string;
  productionName: string;
  productionErrors: ProductionErrors;
  productionComponents: ProductionComponentsResponse;
  sources: MonitoringSourcesResponse[];
  streams: MonitoringStreamResponse[];
  outputs: MonitoringOutputStatusResponse[];
  multiviews: MonitoringMultiviewOutputResponse[];
  controlPanels: MonitoringControlPanelStatusResponse[];
  controlReceivers: MonitoringControlReceiverStatusResponse[];
}
export interface ProductionErrors {
  anyError: boolean;
  productionComponentsErrors: ProductionComponentsError;
  sourcesErrors: SourcesError;
  streamsErrors: StreamsError;
  outputsErrors: OuputsError;
  multiviewsErrors: MultiviewsError;
  controlPanelsErrors: ControlPanelsError;
  controlReceiversErrors: ControlReceiversError;
}
export interface ProductionComponentsError {
  error: boolean;
  ingestErrors: string[];
  pipelineErrors: string[];

  controlPanelsErrors: string[];
}

export interface IngestError {
  error: boolean;
  ingestWithErrors: string[];
}

export interface PipelineError {
  error: boolean;
  pipelineWithErrors: string[];
}
export interface SourcesError {
  error: boolean;
  sourcesWithErrors: string[];
}

export interface StreamsError {
  error: boolean;
  streamsWithErrors: string[];
}

export interface OuputsError {
  error: boolean;
  outputsWithErrors: string[];
}
export interface MultiviewsError {
  error: boolean;
  multiviewsWithErrors: string[];
}
export interface ControlPanelsError {
  error: boolean;
  controlPanelsWithErrors: string[];
}
export interface ControlReceiversError {
  error: boolean;
  controlReceiversWithErrors: string[];
}
export interface MonitoringOutputStatusResponse {
  title: string;
  uuid: string;
  active_streams: MonitoringOutputActiveStreamMpegTsSrt[];
  lost_frames: number;
  received_audio_frames: number;
  received_frames: number;
  received_video_frames: number;
}
export interface MonitoringOutputActiveStreamMpegTsSrt {
  id?: number;
  clients?: ResourcesOutputSrtClient[];
  encoded_audio_frames?: number;
  encoded_video_frames?: number;
  failed_encoded_audio_frames?: CriticalIndicator<number>;
  failed_encoded_video_frames?: CriticalIndicator<number>;
  muxed_audio_frames?: number;
  muxed_video_frames?: number;
}
export interface ResourcesOutputSrtClient {
  bandwidth_bps: number;
  ip: string;
  port: number;
  retransmitted_packets: CriticalIndicator<number>;
  sent_bytes: number;
  sent_packets: number;
}
export interface MonitoringControlReceiverStatusResponse {
  title: string;
  uuid: string;
  delivered_requests: number;
  failed_sent_requests: CriticalIndicator<number>;
  failed_sent_responses: CriticalIndicator<number>;
  failed_sent_status_messages: CriticalIndicator<number>;
  requests_in_queue: number;
  sent_requests: number;
  sent_responses: number;
  sent_status_messages: number;
  connected_sender: MonitoringReceiverNetworkEndpoint[];
  connected_to: MonitoringSenderNetworkEndpoint[];
}

export interface MonitoringSenderNetworkEndpoint {
  uuid: string;
  name: string;
  ip: string;
  port: number;
  received_broken: CriticalIndicator<number>;
  received_responses_count: number;
  received_status_messages_count: number;
}
export interface MonitoringReceiverNetworkEndpoint {
  uuid: string;
  name: string;
  ip: string;
  port: number;
  received_broken: CriticalIndicator<number>;
  received_request_count: number;
  received_status_messages_count: number;
}

export interface MonitoringControlPanelStatusResponse {
  title: string;
  uuid: string;
  connected_to: MonitoringSenderNetworkEndpoint[];
  failed_sent_requests: CriticalIndicator<number>;
  sent_requests: number;
}
export interface MonitoringSenderNetworkEndpoint {
  connection_uuid: string;
  ip: string;
  port: number;
  received_broken: CriticalIndicator<number>;
  received_status_messages_count: number;
  request_responses_count: number;
}

export interface MonitoringMultiviewOutputResponse {
  title: string;
  uuid: string;
  failed_rendered_frames: CriticalIndicator<number>;

  mpeg_ts_srt: MonitoringOutputActiveStreamMpegTsSrt;

  rendered_frames: number;
}

export interface MonitoringStreamResponse {
  title: string;
  uuid: string;
  ingestSide: MonitoringIngestStreamResponse;
  pipelineSide: MonitoringPipelineStreamResponse;
  ingestUuid: string;
}

export interface MonitoringIngestStreamResponse {
  dropped_video_frames: CriticalIndicator<number>;

  encoded_audio_frames: number;

  encoded_video_frames: number;
  video_frames_in_queue: number;

  failed_encoded_audio_frames: CriticalIndicator<number>;
  failed_encoded_video_frames: CriticalIndicator<number>;
  failed_sent_audio_frames: CriticalIndicator<number>;
  failed_sent_video_frames: CriticalIndicator<number>;

  grabbed_audio_frames: number;
  grabbed_video_frames: number;

  interfaces: MonitoringStreamInterfaceIngest[];

  sent_audio_frames: number;
  sent_video_frames: number;
  source_id: number;

  stream_uuid: string;

  video_kilobit_rate: number;
}

export interface MonitoringStreamInterfaceIngest {
  uuid: string;
  bandwidth_bps: number;

  ip: string;

  port: number;

  retransmitted_packets: CriticalIndicator<number>;

  sent_bytes: number;
  sent_packets: number;
}

export interface MonitoringSourcesResponse {
  title: string;
  ingestUuid: string;
  source_id: string;
  active: CriticalIndicator<boolean>;
  dropped_audio_frames: number;
  dropped_video_frames: number;
  duplicated_audio_frames: number;
  duplicated_video_frames: number;
  lost_audio_frames: CriticalIndicator<number>;
  lost_video_frames: CriticalIndicator<number>;
}

export interface MonitoringIngestsResponse {
  title: string;
  ingestUuid: string;
  active: CriticalIndicator<boolean>;
}

export interface MonitoringPipelinesResponse {
  title: string;
  pipelineUuid: string;
  active: CriticalIndicator<boolean>;
}

export interface MonitoringControlPanelResponse {
  title: string;
  controlPanelUuid: string;
  active: CriticalIndicator<boolean>;
}

export type CriticalIndicator<T> = {
  value: T;
  has_error: boolean;
  last_modified: Date;
};

export interface MonitoringPipelineStreamResponse {
  decoded_audio_frames: number;
  decoded_video_frames: number;
  delivered_frames: number;
  dropped_frames: CriticalIndicator<number>;
  failed_decoded_audio_frames: CriticalIndicator<number>;
  failed_decoded_video_frames: CriticalIndicator<number>;
  interfaces: MonitoringStreamInterfacePipeline[];
  lost_frames: CriticalIndicator<number>;
  received_audio_frames: number;
  received_broken_frames: CriticalIndicator<number>;
  received_video_frames: number;
  stream_uuid: string;
  video_frames_in_queue: number;
}

export interface MonitoringStreamInterfacePipeline {
  uuid: string;
  bandwidth_bps: number;
  dropped_packets: CriticalIndicator<number>;
  lost_packets: CriticalIndicator<number>;
  received_bytes: number;
  received_packets: number;
}

export interface ProductionComponentsResponse {
  ingests: MonitoringIngestsResponse[];
  pipelines: MonitoringPipelinesResponse[];
  controlPanels: MonitoringControlPanelResponse[];
}
