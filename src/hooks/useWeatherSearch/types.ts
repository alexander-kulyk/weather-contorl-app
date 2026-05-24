import type { Dispatch, SetStateAction } from 'react';
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

export interface IFetchWeatherResultsParams {
  query: string;
  signal: AbortSignal;
  setResults: Dispatch<SetStateAction<IWeatherResponse[]>>;
  setStatus: Dispatch<SetStateAction<AsyncStatus>>;
  setError: Dispatch<SetStateAction<IAppError | null>>;
  onApiError?: (error: IApiError) => void;
}
