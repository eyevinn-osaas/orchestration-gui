export type Result<T> =
  | { ok: true; value: T }
  | { ok: false; value?: T; error: string };
