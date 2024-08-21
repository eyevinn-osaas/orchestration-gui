/* uniform return types for hooks  */

// hook that fetches data, [data, loading, error]
export type DataHook<DataType> = [
  DataType | undefined,
  boolean,
  unknown | null
];
export type MonitoringHook<DataType> = [
  DataType | boolean,
  boolean,
  unknown | null
];
// hook that provides a callback to fetch data [callback, loading]
export type CallbackHook<CallbackType> = [CallbackType, boolean];
