export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error';

export type ForecastRange = 7 | 15;

export type WeatherErrorCode =
  | 'API'
  | 'API_LIMIT'
  | 'NETWORK'
  | 'NO_RESULTS'
  | 'MISSING_API_KEY'
  | 'UNKNOWN';

export interface IAppError {
  code: WeatherErrorCode;
  message: string;
}
