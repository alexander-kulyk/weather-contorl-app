import {
  isApiError,
  isRequestCanceled,
  searchWeatherByCity,
} from '../../../api';
import type { IWeatherResponse } from '../../../types';
import type { IFetchWeatherResultsParams } from '../types';
import { shouldReportApiError } from './shouldReportApiError';
import { toAppError } from './toAppError';

export const fetchWeatherResults = async ({
  onApiError,
  query,
  setError,
  setResults,
  setStatus,
  signal,
}: IFetchWeatherResultsParams): Promise<void> => {
  setStatus('loading');
  setError(null);

  try {
    const weatherResults: IWeatherResponse[] = await searchWeatherByCity(
      query,
      signal,
    );

    if (signal.aborted) {
      return;
    }

    setResults(weatherResults);
    setStatus('success');
  } catch (requestError: unknown) {
    if (signal.aborted || isRequestCanceled(requestError)) {
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
  }
};
