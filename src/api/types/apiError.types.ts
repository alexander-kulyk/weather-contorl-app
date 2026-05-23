import type { WeatherErrorCode } from '../../types';

export interface IApiError extends Error {
  readonly code: WeatherErrorCode;
}
