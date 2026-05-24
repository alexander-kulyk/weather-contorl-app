import type { IApiError } from '../../api';
import type { AsyncStatus, IAppError, IWeatherResponse } from '../../types';

export interface IUseSelectedCityWeatherParams {
  onApiError?: (error: IApiError) => void;
}

export interface IUseSelectedCityWeatherValues {
  selectedWeather: IWeatherResponse | null;
  status: AsyncStatus;
  error: IAppError | null;
}

export interface IUseSelectedCityWeatherHandlers {
  selectWeather: (weather: IWeatherResponse) => void;
  selectCityByName: (city: string) => void;
  clearSelected: () => void;
  retrySelected: () => void;
}

export interface IUseSelectedCityWeatherReturn {
  values: IUseSelectedCityWeatherValues;
  handlers: IUseSelectedCityWeatherHandlers;
}

export type SelectedWeatherOutcome =
  | { kind: 'success'; weather: IWeatherResponse }
  | { kind: 'error'; error: IAppError }
  | { kind: 'aborted' };

export interface IFetchSelectedCityWeatherParams {
  city: string;
  signal: AbortSignal;
  onApiError?: (error: IApiError) => void;
}
