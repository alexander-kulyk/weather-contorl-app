import type { IApiError } from '../../types';

export const isApiError = (error: unknown): error is IApiError => {
  if (!(error instanceof Error)) {
    return false;
  }

  const candidate = error as Error & { code?: unknown };

  return error.name === 'ApiError' && typeof candidate.code === 'string';
};
