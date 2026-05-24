import { useCallback, useEffect, useMemo, useState } from 'react';
import { isApiError, isRequestCanceled, searchWeatherByCity } from '../api';
import type { IApiError } from '../api';
import type { AsyncStatus, IAppError, IWeatherResponse } from '../types';
import { useDebounce } from './useDebounce';

const LOCATION_NOT_FOUND_MESSAGE = 'No valid locations could be determined';
const ADDRESS_TOO_SHORT_MESSAGE =
  'Address is too short to be uniquely identified';
const SUPPRESSED_NO_RESULTS_MESSAGES = [
  LOCATION_NOT_FOUND_MESSAGE,
  ADDRESS_TOO_SHORT_MESSAGE,
] as const;

interface IUseWeatherSearchParams {
  query: string;
  delayMs?: number;
  minLength?: number;
  onApiError?: (error: IApiError) => void;
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
  delayMs = 400,
  minLength = 4,
  onApiError,
  query,
}: IUseWeatherSearchParams): IUseWeatherSearchReturn => {
  const [results, setResults] = useState<IWeatherResponse[]>([]);
  const [status, setStatus] = useState<AsyncStatus>('idle');
  const [error, setError] = useState<IAppError | null>(null);

  const abortController = new AbortController();
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
          if (shouldReportApiError(requestError)) {
            onApiError?.(requestError);
          }

          setResults([]);
          setError(appError);
          setStatus('success');
          return;
        }

        if (isApiError(requestError)) {
          onApiError?.(requestError);
        }

        setResults([]);
        setError(appError);
        setStatus('error');
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

const shouldReportApiError = (error: unknown): error is IApiError =>
  isApiError(error) && !isSuppressedNoResultsError(error);

const isSuppressedNoResultsError = (error: IApiError): boolean =>
  error.code === 'NO_RESULTS' &&
  SUPPRESSED_NO_RESULTS_MESSAGES.some((message: string): boolean =>
    Boolean(error.details?.includes(message)),
  );
