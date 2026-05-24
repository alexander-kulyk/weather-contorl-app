import { createApiError } from './handleApiError';

export const normalizedCityGuard = (city: string): string => {
  const normalizedCity = city.trim();

  if (!normalizedCity) {
    throw createApiError(
      'NO_RESULTS',
      'No cities found. Check the spelling and try again.',
    );
  }

  return normalizedCity;
};
