import { isApiError, isRequestCanceled } from '../../../api';
import { weatherService } from '../../../services';
import { toAppError } from '../../../utils';
import type { IFetchWeatherResultsParams, SearchOutcome } from '../types';
import { shouldReportApiError } from './shouldReportApiError';

export const fetchWeatherResults = async ({
  onApiError,
  query,
  signal,
}: IFetchWeatherResultsParams): Promise<SearchOutcome> => {
  try {
    const weather = await weatherService.fetchByCity(query, signal);

    if (signal.aborted) {
      return { kind: 'aborted' };
    }

    return { kind: 'success', results: [weather] };
  } catch (requestError: unknown) {
    if (signal.aborted || isRequestCanceled(requestError)) {
      return { kind: 'aborted' };
    }

    const appError = toAppError(requestError);

    if (appError.code === 'NO_RESULTS') {
      if (shouldReportApiError(requestError)) {
        onApiError?.(requestError);
      }

      return { kind: 'no-results', error: appError };
    }

    if (isApiError(requestError)) {
      onApiError?.(requestError);
    }

    return { kind: 'error', error: appError };
  }
};
