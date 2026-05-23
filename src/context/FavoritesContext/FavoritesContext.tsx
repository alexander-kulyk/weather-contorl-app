import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  createFavoriteCity,
  loadFavoriteCities,
  saveFavoriteCities,
  upsertFavoriteCity,
} from '../../storage';
import type { IFavoriteCity, IWeatherResponse } from '../../types';
import { FavoritesContext } from './context';
import type {
  IFavoritesContextHandlers,
  IFavoritesContextValue,
  IFavoritesContextValues,
  IFavoritesProviderProps,
} from './types';

export const FavoritesProvider: React.FC<IFavoritesProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<IFavoriteCity[]>(loadFavoriteCities);

  useEffect((): void => {
    saveFavoriteCities(favorites);
  }, [favorites]);

  const favoriteIds = useMemo<string[]>(
    () => favorites.map((favorite: IFavoriteCity) => favorite.id),
    [favorites],
  );

  const isFavorite = useCallback(
    (cityId: string): boolean => favoriteIds.includes(cityId),
    [favoriteIds],
  );

  const removeFavorite = useCallback((cityId: string): void => {
    setFavorites((currentFavorites: IFavoriteCity[]): IFavoriteCity[] =>
      currentFavorites.filter((favorite: IFavoriteCity) => favorite.id !== cityId),
    );
  }, []);

  const toggleWeatherFavorite = useCallback((weather: IWeatherResponse): void => {
    const favorite = createFavoriteCity(weather);

    setFavorites((currentFavorites: IFavoriteCity[]): IFavoriteCity[] => {
      const exists = currentFavorites.some((item: IFavoriteCity) => item.id === favorite.id);

      if (exists) {
        return currentFavorites.filter((item: IFavoriteCity) => item.id !== favorite.id);
      }

      return upsertFavoriteCity(currentFavorites, favorite);
    });
  }, []);

  const values = useMemo<IFavoritesContextValues>(
    () => ({
      favorites,
      favoriteIds,
    }),
    [favoriteIds, favorites],
  );

  const handlers = useMemo<IFavoritesContextHandlers>(
    () => ({
      isFavorite,
      toggleWeatherFavorite,
      removeFavorite,
    }),
    [isFavorite, removeFavorite, toggleWeatherFavorite],
  );

  const contextValue = useMemo<IFavoritesContextValue>(
    () => ({
      values,
      handlers,
    }),
    [handlers, values],
  );

  return <FavoritesContext.Provider value={contextValue}>{children}</FavoritesContext.Provider>;
};
