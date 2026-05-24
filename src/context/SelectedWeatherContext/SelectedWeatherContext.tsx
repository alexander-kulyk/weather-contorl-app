//core
import { useMemo } from 'react';
import type { FC } from 'react';
//other
import { useSelectedCityWeather } from '../../hooks';
import { useApiErrorContext } from '../ApiErrorContext';
import { SelectedWeatherContext } from './context';
import type {
  ISelectedWeatherContext,
  ISelectedWeatherProviderProps,
} from './types';

export const SelectedWeatherProvider: FC<ISelectedWeatherProviderProps> = ({
  children,
}) => {
  const {
    handlers: { reportApiError },
  } = useApiErrorContext();
  const selected = useSelectedCityWeather({ onApiError: reportApiError });

  const values = useMemo<ISelectedWeatherContext['values']>(
    () => ({
      selectedWeather: selected.values.selectedWeather,
      detailStatus: selected.values.status,
      detailError: selected.values.error,
    }),
    [
      selected.values.error,
      selected.values.selectedWeather,
      selected.values.status,
    ],
  );

  const contextValue = useMemo<ISelectedWeatherContext>(
    () => ({ values, handlers: selected.handlers }),
    [selected.handlers, values],
  );

  return (
    <SelectedWeatherContext.Provider value={contextValue}>
      {children}
    </SelectedWeatherContext.Provider>
  );
};
