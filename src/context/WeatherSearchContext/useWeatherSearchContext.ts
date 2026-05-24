import { useContext } from 'react';
import { WeatherSearchContext } from './context';
import type { IWeatherSearchContext } from './types';

export const useWeatherSearchContext = (): IWeatherSearchContext => {
  const contextValue = useContext(WeatherSearchContext);

  if (!contextValue) {
    throw new Error(
      'useWeatherSearchContext must be used inside WeatherSearchProvider.',
    );
  }

  return contextValue;
};
