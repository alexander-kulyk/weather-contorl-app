import type { WeatherErrorCode } from '../../types';

export interface IApiErrorMeta {
  status?: number;
  details?: string;
}

export interface IApiError extends Error {
  readonly code: WeatherErrorCode;
  readonly status?: number;
  readonly details?: string;
}
