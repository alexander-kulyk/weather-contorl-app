import { useContext } from 'react';
import { WeatherContext } from './context';
import type { IWeatherContext } from './types';

export const useWeatherContext = (): IWeatherContext => {
  const contextValue = useContext(WeatherContext);

  if (!contextValue) {
    throw new Error('useWeatherContext must be used inside WeatherProvider.');
  }

  return contextValue;
};
