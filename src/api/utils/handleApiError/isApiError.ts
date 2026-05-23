import type { IApiError } from '../../types';

export const isApiError = (error: unknown): error is IApiError => {
  if (!(error instanceof Error)) {
    return false;
  }

  const candidate = error as Error & { code?: unknown; status?: unknown };

  return (
    error.name === 'ApiError' &&
    typeof candidate.code === 'string' &&
    (candidate.status === undefined || typeof candidate.status === 'number')
  );
};
