import axios from 'axios';
import { createApiError } from './createApiError';
import type { IApiError } from '../../types';

export const handleApiError = (error: unknown): IApiError => {
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return createApiError(
      'NETWORK',
      'You appear to be offline. Check your internet connection.',
    );
  }

  if (axios.isAxiosError(error)) {
    const status = error.response?.status;

    if (status === 400 || status === 404) {
      return createApiError(
        'NO_RESULTS',
        'No cities found. Check the spelling and try again.',
      );
    }

    if (status === 401 || status === 403 || status === 429) {
      return createApiError(
        'API_LIMIT',
        'Weather data is temporarily unavailable. Please try again later.',
      );
    }

    if (!error.response) {
      return createApiError(
        'NETWORK',
        'You appear to be offline. Check your internet connection.',
      );
    }
  }

  return createApiError(
    'API',
    'Could not load weather data. Please try again.',
  );
};
