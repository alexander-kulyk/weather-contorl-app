//core
import { useCallback, useMemo, useState } from 'react';
import type { FC } from 'react';
//other
import { useSelectedCityWeather, useWeatherSearch } from '../../hooks';
import { useApiErrorContext } from '../ApiErrorContext';
import type { ForecastRange } from '../../types';
import { WeatherContext } from './context';
import type { IWeatherProviderProps } from './types';

export const WeatherProvider: FC<IWeatherProviderProps> = ({ children }) => {
  const [searchQuery, setSearchQueryState] = useState<string>('');
  const [forecastRange, setForecastRange] = useState<ForecastRange>(7);
  const {
    handlers: { reportApiError },
  } = useApiErrorContext();
  const search = useWeatherSearch({
    query: searchQuery,
    onApiError: reportApiError,
  });
  const selected = useSelectedCityWeather({
    onApiError: reportApiError,
  });

  const setSearchQuery = useCallback((query: string): void => {
    setSearchQueryState(query);
  }, []);

  const clearSearch = useCallback((): void => {
    setSearchQueryState('');
    search.handlers.clearResults();
  }, [search.handlers]);

  const values = {
    searchQuery,
    searchResults: search.values.results,
    searchStatus: search.values.status,
    searchError: search.values.error,
    hasSearchStarted: search.values.hasSearchStarted,
    selectedWeather: selected.values.selectedWeather,
    detailStatus: selected.values.status,
    detailError: selected.values.error,
    forecastRange,
  };

  const handlers = useMemo(
    () => ({
      setSearchQuery,
      clearSearch,
      selectWeather: selected.handlers.selectWeather,
      selectCityByName: selected.handlers.selectCityByName,
      setForecastRange,
      clearSelected: selected.handlers.clearSelected,
      retrySelected: selected.handlers.retrySelected,
    }),
    [
      clearSearch,
      selected.handlers.clearSelected,
      selected.handlers.retrySelected,
      selected.handlers.selectCityByName,
      selected.handlers.selectWeather,
      setSearchQuery,
    ],
  );

  return (
    <WeatherContext.Provider value={{ values, handlers }}>
      {children}
    </WeatherContext.Provider>
  );
};
