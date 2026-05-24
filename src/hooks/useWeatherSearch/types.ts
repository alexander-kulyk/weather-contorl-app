import type { IApiError } from '../../api';
import type { AsyncStatus, IAppError, IWeatherResponse } from '../../types';

export interface IUseWeatherSearchParams {
  query: string;
  delayMs?: number;
  minLength?: number;
  onApiError?: (error: IApiError) => void;
}

export interface IUseWeatherSearchValues {
  results: IWeatherResponse[];
  status: AsyncStatus;
  error: IAppError | null;
  hasSearchStarted: boolean;
  debouncedQuery: string;
}

export interface IUseWeatherSearchHandlers {
  clearResults: () => void;
}

export interface IUseWeatherSearchReturn {
  values: IUseWeatherSearchValues;
  handlers: IUseWeatherSearchHandlers;
}

export type SearchOutcome =
  | { kind: 'success'; results: IWeatherResponse[] }
  | { kind: 'no-results'; error: IAppError }
  | { kind: 'error'; error: IAppError }
  | { kind: 'aborted' };

export interface IFetchWeatherResultsParams {
  query: string;
  signal: AbortSignal;
  onApiError?: (error: IApiError) => void;
}
