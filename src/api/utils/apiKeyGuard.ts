import { createApiError } from './handleApiError';

export const apiKeyGuard = (apiKey: string | undefined): string => {
  if (!apiKey) {
    throw createApiError(
      'MISSING_API_KEY',
      'Missing VITE_VISUAL_CROSSING_API_KEY environment variable.',
    );
  }

  return apiKey;
};
