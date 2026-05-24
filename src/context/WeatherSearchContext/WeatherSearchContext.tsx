//core
import { useCallback, useMemo, useState } from 'react';
import type { FC } from 'react';
//other
import { useWeatherSearch } from '../../hooks';
import { useApiErrorContext } from '../ApiErrorContext';
import { useSelectedWeatherContext } from '../SelectedWeatherContext';
import { WeatherSearchContext } from './context';
import type {
  IWeatherSearchContext,
  IWeatherSearchProviderProps,
} from './types';

export const WeatherSearchProvider: FC<IWeatherSearchProviderProps> = ({
  children,
}) => {
  const [searchQuery, setSearchQueryState] = useState<string>('');
  const {
    handlers: { reportApiError },
  } = useApiErrorContext();
  const { handlers: selectedHandlers } = useSelectedWeatherContext();
  const search = useWeatherSearch({
    query: searchQuery,
    onApiError: reportApiError,
  });

  const setSearchQuery = useCallback((query: string): void => {
    setSearchQueryState(query);
  }, []);

  const clearSearch = useCallback((): void => {
    setSearchQueryState('');
    search.handlers.clearResults();
    selectedHandlers.clearSelected();
  }, [search.handlers, selectedHandlers]);

  const values = useMemo<IWeatherSearchContext['values']>(
    () => ({
      searchQuery,
      searchResults: search.values.results,
      searchStatus: search.values.status,
      searchError: search.values.error,
      hasSearchStarted: search.values.hasSearchStarted,
    }),
    [
      search.values.error,
      search.values.hasSearchStarted,
      search.values.results,
      search.values.status,
      searchQuery,
    ],
  );

  const handlers = useMemo<IWeatherSearchContext['handlers']>(
    () => ({
      setSearchQuery,
      clearSearch,
    }),
    [clearSearch, setSearchQuery],
  );

  const contextValue = useMemo<IWeatherSearchContext>(
    () => ({ values, handlers }),
    [handlers, values],
  );

  return (
    <WeatherSearchContext.Provider value={contextValue}>
      {children}
    </WeatherSearchContext.Provider>
  );
};
