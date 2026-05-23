import React, { useCallback, useMemo, useState } from 'react';
import { useSelectedCityWeather, useWeatherSearch } from '../../hooks';
import type { ForecastRange } from '../../types';
import { WeatherContext } from './context';
import type {
  IWeatherContextHandlers,
  IWeatherContextValue,
  IWeatherContextValues,
  IWeatherProviderProps,
} from './types';

export const WeatherProvider: React.FC<IWeatherProviderProps> = ({ children }) => {
  const [searchQuery, setSearchQueryState] = useState<string>('');
  const [forecastRange, setForecastRange] = useState<ForecastRange>(7);
  const search = useWeatherSearch({ query: searchQuery });
  const selected = useSelectedCityWeather();

  const setSearchQuery = useCallback((query: string): void => {
    setSearchQueryState(query);
  }, []);

  const clearSearch = useCallback((): void => {
    setSearchQueryState('');
    search.handlers.clearResults();
  }, [search.handlers]);

  const values = useMemo<IWeatherContextValues>(
    () => ({
      searchQuery,
      searchResults: search.values.results,
      searchStatus: search.values.status,
      searchError: search.values.error,
      hasSearchStarted: search.values.hasSearchStarted,
      selectedWeather: selected.values.selectedWeather,
      detailStatus: selected.values.status,
      detailError: selected.values.error,
      forecastRange,
    }),
    [
      forecastRange,
      search.values.error,
      search.values.hasSearchStarted,
      search.values.results,
      search.values.status,
      searchQuery,
      selected.values.error,
      selected.values.selectedWeather,
      selected.values.status,
    ],
  );

  const handlers = useMemo<IWeatherContextHandlers>(
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

  const contextValue = useMemo<IWeatherContextValue>(
    () => ({
      values,
      handlers,
    }),
    [handlers, values],
  );

  return <WeatherContext.Provider value={contextValue}>{children}</WeatherContext.Provider>;
};
