import { useContext } from 'react';
import { SelectedWeatherContext } from './context';
import type { ISelectedWeatherContext } from './types';

export const useSelectedWeatherContext = (): ISelectedWeatherContext => {
  const contextValue = useContext(SelectedWeatherContext);

  if (!contextValue) {
    throw new Error(
      'useSelectedWeatherContext must be used inside SelectedWeatherProvider.',
    );
  }

  return contextValue;
};
