import { useCallback, useMemo } from 'react';
import {
  useFavoritesContext,
  useSelectedWeatherContext,
  useWeatherSearchContext,
} from '../context';
import type {
  AsyncStatus,
  IAppError,
  IFavoriteCity,
  IWeatherResponse,
} from '../types';

interface IUseAppWeatherDashboardValues {
  searchQuery: string;
  searchResults: IWeatherResponse[];
  searchStatus: AsyncStatus;
  searchError: IAppError | null;
  hasSearchStarted: boolean;
  selectedWeather: IWeatherResponse | null;
  detailStatus: AsyncStatus;
  detailError: IAppError | null;
  selectedWeatherId?: string;
  selectedIsFavorite: boolean;
  favoritesCount: number;
  isFavorite: (cityId: string) => boolean;
}

interface IUseAppWeatherDashboardHandlers {
  setSearchQuery: (query: string) => void;
  clearSearch: () => void;
  retrySelected: () => void;
  handleFavoriteSelect: (favorite: IFavoriteCity) => void;
  handleWeatherSelect: (weather: IWeatherResponse) => void;
  handleWeatherFavoriteToggle: (weather: IWeatherResponse) => void;
}

interface IUseAppWeatherDashboardReturn {
  values: IUseAppWeatherDashboardValues;
  handlers: IUseAppWeatherDashboardHandlers;
}

export const useAppWeatherDashboard = (): IUseAppWeatherDashboardReturn => {
  const search = useWeatherSearchContext();
  const selected = useSelectedWeatherContext();
  const favorites = useFavoritesContext();

  const selectedWeatherId = selected.values.selectedWeather?.id;
  const selectedIsFavorite = selectedWeatherId
    ? favorites.handlers.isFavorite(selectedWeatherId)
    : false;

  const handleFavoriteSelect = useCallback(
    (favorite: IFavoriteCity): void => {
      selected.handlers.selectCityByName(favorite.resolvedAddress);
    },
    [selected.handlers],
  );

  const handleWeatherSelect = useCallback(
    (weather: IWeatherResponse): void => {
      selected.handlers.selectWeather(weather);
    },
    [selected.handlers],
  );

  const handleWeatherFavoriteToggle = useCallback(
    (weather: IWeatherResponse): void => {
      favorites.handlers.toggleWeatherFavorite(weather);
    },
    [favorites.handlers],
  );

  const values = useMemo<IUseAppWeatherDashboardValues>(
    () => ({
      searchQuery: search.values.searchQuery,
      searchResults: search.values.searchResults,
      searchStatus: search.values.searchStatus,
      searchError: search.values.searchError,
      hasSearchStarted: search.values.hasSearchStarted,
      selectedWeather: selected.values.selectedWeather,
      detailStatus: selected.values.detailStatus,
      detailError: selected.values.detailError,
      selectedWeatherId,
      selectedIsFavorite,
      favoritesCount: favorites.values.favoritesCount,
      isFavorite: favorites.handlers.isFavorite,
    }),
    [
      favorites.handlers.isFavorite,
      favorites.values.favoritesCount,
      search.values.hasSearchStarted,
      search.values.searchError,
      search.values.searchQuery,
      search.values.searchResults,
      search.values.searchStatus,
      selected.values.detailError,
      selected.values.detailStatus,
      selected.values.selectedWeather,
      selectedIsFavorite,
      selectedWeatherId,
    ],
  );

  const handlers = useMemo<IUseAppWeatherDashboardHandlers>(
    () => ({
      setSearchQuery: search.handlers.setSearchQuery,
      clearSearch: search.handlers.clearSearch,
      retrySelected: selected.handlers.retrySelected,
      handleFavoriteSelect,
      handleWeatherSelect,
      handleWeatherFavoriteToggle,
    }),
    [
      handleFavoriteSelect,
      handleWeatherFavoriteToggle,
      handleWeatherSelect,
      search.handlers.clearSearch,
      search.handlers.setSearchQuery,
      selected.handlers.retrySelected,
    ],
  );

  return { values, handlers };
};
