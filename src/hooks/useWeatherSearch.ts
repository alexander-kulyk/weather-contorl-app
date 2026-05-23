import { useCallback, useEffect, useMemo, useState } from 'react';
import { isApiError, isRequestCanceled, searchWeatherByCity } from '../api';
import type { AsyncStatus, IAppError, IWeatherResponse } from '../types';
import { useDebounce } from './useDebounce';

interface IUseWeatherSearchParams {
  query: string;
  delayMs?: number;
  minLength?: number;
}

interface IUseWeatherSearchValues {
  results: IWeatherResponse[];
  status: AsyncStatus;
  error: IAppError | null;
  hasSearchStarted: boolean;
  debouncedQuery: string;
}

interface IUseWeatherSearchHandlers {
  clearResults: () => void;
}

interface IUseWeatherSearchReturn {
  values: IUseWeatherSearchValues;
  handlers: IUseWeatherSearchHandlers;
}

export const useWeatherSearch = ({
  query,
  delayMs = 400,
  minLength = 2,
}: IUseWeatherSearchParams): IUseWeatherSearchReturn => {
  const normalizedQuery = query.trim();
  const debouncedQuery = useDebounce<string>(normalizedQuery, delayMs);
  const [results, setResults] = useState<IWeatherResponse[]>([]);
  const [status, setStatus] = useState<AsyncStatus>('idle');
  const [error, setError] = useState<IAppError | null>(null);
  const hasQueryableInput = normalizedQuery.length >= minLength;
  const hasSearchStarted = hasQueryableInput && debouncedQuery.length >= minLength;

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

    queueMicrotask((): void => {
      if (abortController.signal.aborted) {
        return;
      }

      setStatus('loading');
      setError(null);
    });

    searchWeatherByCity(debouncedQuery, abortController.signal)
      .then((weatherResults: IWeatherResponse[]): void => {
        setResults(weatherResults);
        setStatus('success');
      })
      .catch((requestError: unknown): void => {
        if (isRequestCanceled(requestError)) {
          return;
        }

        const appError = toAppError(requestError);

        if (appError.code === 'NO_RESULTS') {
          setResults([]);
          setError(null);
          setStatus('success');
          return;
        }

        setResults([]);
        setError(appError);
        setStatus('error');
      });

    return (): void => {
      abortController.abort();
    };
  }, [debouncedQuery, minLength]);

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

const toAppError = (error: unknown): IAppError => {
  if (isApiError(error)) {
    return {
      code: error.code,
      message: error.message,
    };
  }

  return {
    code: 'UNKNOWN',
    message: 'Could not load weather data. Please try again.',
  };
};
