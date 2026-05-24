import type { IFavoriteCity, IWeatherResponse } from '../types';

const FAVORITES_STORAGE_KEY = 'weather-dashboard:favorites';
const MAX_FAVORITES = 12;

export const loadFavoriteCities = (): IFavoriteCity[] => {
  if (typeof localStorage === 'undefined') {
    return [];
  }

  try {
    const rawValue = localStorage.getItem(FAVORITES_STORAGE_KEY);

    if (!rawValue) {
      return [];
    }

    const parsedValue: unknown = JSON.parse(rawValue);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue.filter(isFavoriteCity);
  } catch {
    return [];
  }
};

export const saveFavoriteCities = (favorites: IFavoriteCity[]): void => {
  if (typeof localStorage === 'undefined') {
    return;
  }

  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
};

export const clearStoredFavoriteCities = (): void => {
  if (typeof localStorage === 'undefined') {
    return;
  }

  localStorage.removeItem(FAVORITES_STORAGE_KEY);
};

export const createFavoriteCity = (weather: IWeatherResponse): IFavoriteCity => ({
  id: weather.id,
  city: weather.city,
  resolvedAddress: weather.resolvedAddress,
  country: weather.country,
  temperature: weather.current.temperature,
  conditions: weather.current.conditions,
  icon: weather.current.icon,
  updatedAt: weather.updatedAt,
});

export const upsertFavoriteCity = (
  favorites: IFavoriteCity[],
  favorite: IFavoriteCity,
): IFavoriteCity[] => {
  const filteredFavorites = favorites.filter((item: IFavoriteCity) => item.id !== favorite.id);

  return [favorite, ...filteredFavorites].slice(0, MAX_FAVORITES);
};

const isFavoriteCity = (value: unknown): value is IFavoriteCity => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.id === 'string' &&
    typeof candidate.city === 'string' &&
    typeof candidate.resolvedAddress === 'string' &&
    typeof candidate.country === 'string' &&
    typeof candidate.temperature === 'number' &&
    typeof candidate.conditions === 'string' &&
    typeof candidate.icon === 'string' &&
    typeof candidate.updatedAt === 'string'
  );
};
