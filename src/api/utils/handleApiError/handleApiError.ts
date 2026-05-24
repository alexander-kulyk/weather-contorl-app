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
    const details = getErrorDetails(
      error.response?.data,
      error.response?.statusText,
    );

    if (status === 400 || status === 404) {
      return createApiError(
        'NO_RESULTS',
        'No cities found. Check the spelling and try again.',
        { status, details },
      );
    }

    if (status === 401 || status === 403 || status === 429) {
      return createApiError(
        'API_LIMIT',
        'Weather data is temporarily unavailable. Please try again later.',
        { status, details },
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

const getErrorDetails = (
  responseData: unknown,
  fallback?: string,
): string | undefined => {
  if (typeof responseData === 'string' && responseData.trim()) {
    return responseData;
  }

  if (typeof responseData !== 'object' || responseData === null) {
    return fallback;
  }

  const data = responseData as Record<string, unknown>;

  if (typeof data.message === 'string' && data.message.trim()) {
    return data.message;
  }

  if (typeof data.error === 'string' && data.error.trim()) {
    return data.error;
  }

  return fallback;
};
