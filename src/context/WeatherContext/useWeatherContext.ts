import { useContext } from 'react';
import { WeatherContext } from './context';
import type { IWeatherContextValue } from './types';

export const useWeatherContext = (): IWeatherContextValue => {
  const contextValue = useContext(WeatherContext);

  if (!contextValue) {
    throw new Error('useWeatherContext must be used inside WeatherProvider.');
  }

  return contextValue;
};
