import { useCallback, useEffect, useMemo, useState } from 'react';
import type { AsyncStatus, IAppError, IWeatherResponse } from '../../types';
import { useDebounce } from '../useDebounce';
import type {
  IUseWeatherSearchHandlers,
  IUseWeatherSearchParams,
  IUseWeatherSearchReturn,
  IUseWeatherSearchValues,
} from './types';
import { fetchWeatherResults } from './utils';

export const useWeatherSearch = ({
  delayMs = 400,
  minLength = 4,
  onApiError,
  query,
}: IUseWeatherSearchParams): IUseWeatherSearchReturn => {
  const [results, setResults] = useState<IWeatherResponse[]>([]);
  const [status, setStatus] = useState<AsyncStatus>('idle');
  const [error, setError] = useState<IAppError | null>(null);

  const normalizedQuery = query.trim();
  const debouncedQuery = useDebounce<string>(normalizedQuery, delayMs);
  const hasQueryableInput = normalizedQuery.length >= minLength;
  const hasSearchStarted =
    hasQueryableInput && debouncedQuery.length >= minLength;

  const clearResults = useCallback((): void => {
    setResults([]);
    setStatus('idle');
    setError(null);
  }, []);

  useEffect(() => {
    if (debouncedQuery.length < minLength) {
      return;
    }

    const abortController = new AbortController();

    void fetchWeatherResults({
      onApiError,
      query: debouncedQuery,
      setError,
      setResults,
      setStatus,
      signal: abortController.signal,
    });

    return (): void => {
      abortController.abort();
    };
  }, [debouncedQuery, minLength, onApiError]);

  const values = useMemo<IUseWeatherSearchValues>(
    () => ({
      results: hasSearchStarted ? results : [],
      status: hasSearchStarted ? status : 'idle',
      error: hasSearchStarted ? error : null,
      hasSearchStarted,
      debouncedQuery,
    }),
    [debouncedQuery, error, hasSearchStarted, results, status],
  );

  const handlers = useMemo<IUseWeatherSearchHandlers>(
    () => ({
      clearResults,
    }),
    [clearResults],
  );

  return { values, handlers };
};
