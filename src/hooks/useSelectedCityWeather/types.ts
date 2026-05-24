import type { Dispatch, SetStateAction } from 'react';
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

export interface IFetchSelectedCityWeatherParams {
  city: string;
  signal: AbortSignal;
  setSelectedWeather: Dispatch<SetStateAction<IWeatherResponse | null>>;
  setStatus: Dispatch<SetStateAction<AsyncStatus>>;
  setError: Dispatch<SetStateAction<IAppError | null>>;
  onApiError?: (error: IApiError) => void;
}
