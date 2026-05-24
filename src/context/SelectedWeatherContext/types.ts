import type { ReactNode } from 'react';
import type { AsyncStatus, IAppError, IWeatherResponse } from '../../types';

export interface ISelectedWeatherProviderProps {
  children: ReactNode;
}

export interface ISelectedWeatherContext {
  values: {
    selectedWeather: IWeatherResponse | null;
    detailStatus: AsyncStatus;
    detailError: IAppError | null;
  };
  handlers: {
    selectWeather: (weather: IWeatherResponse) => void;
    selectCityByName: (city: string) => void;
    clearSelected: () => void;
    retrySelected: () => void;
  };
}
