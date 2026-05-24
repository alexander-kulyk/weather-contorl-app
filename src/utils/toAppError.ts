import { isApiError } from '../api/utils';
import type { IAppError } from '../types';

export const toAppError = (error: unknown): IAppError => {
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
