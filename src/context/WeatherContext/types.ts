import type { ReactNode } from 'react';
import type { AsyncStatus, ForecastRange, IAppError, IWeatherResponse } from '../../types';

export interface IWeatherContextValues {
  searchQuery: string;
  searchResults: IWeatherResponse[];
  searchStatus: AsyncStatus;
  searchError: IAppError | null;
  hasSearchStarted: boolean;
  selectedWeather: IWeatherResponse | null;
  detailStatus: AsyncStatus;
  detailError: IAppError | null;
  forecastRange: ForecastRange;
}

export interface IWeatherContextHandlers {
  setSearchQuery: (query: string) => void;
  clearSearch: () => void;
  selectWeather: (weather: IWeatherResponse) => void;
  selectCityByName: (city: string) => void;
  setForecastRange: (range: ForecastRange) => void;
  clearSelected: () => void;
  retrySelected: () => void;
}

export interface IWeatherContextValue {
  values: IWeatherContextValues;
  handlers: IWeatherContextHandlers;
}

export interface IWeatherProviderProps {
  children: ReactNode;
}
