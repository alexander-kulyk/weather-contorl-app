import type { ReactNode } from 'react';
import type {
  AsyncStatus,
  ForecastRange,
  IAppError,
  IWeatherResponse,
} from '../../types';

export interface IWeatherProviderProps {
  children: ReactNode;
}

export interface IWeatherContext {
  values: {
    searchQuery: string;
    searchResults: IWeatherResponse[];
    searchStatus: AsyncStatus;
    searchError: IAppError | null;
    hasSearchStarted: boolean;
    selectedWeather: IWeatherResponse | null;
    detailStatus: AsyncStatus;
    detailError: IAppError | null;
    forecastRange: ForecastRange;
  };
  handlers: {
    setSearchQuery: (query: string) => void;
    clearSearch: () => void;
    selectWeather: (weather: IWeatherResponse) => void;
    selectCityByName: (city: string) => void;
    setForecastRange: (range: ForecastRange) => void;
    clearSelected: () => void;
    retrySelected: () => void;
  };
}
