//core
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { FC } from 'react';
//other
import {
  clearStoredFavoriteCities,
  createFavoriteCity,
  loadFavoriteCities,
  saveFavoriteCities,
  upsertFavoriteCity,
} from '../../storage';
import type { IFavoriteCity, IWeatherResponse } from '../../types';
import { FavoritesContext } from './context';
import type { IFavoritesProviderProps } from './types';

export const FavoritesProvider: FC<IFavoritesProviderProps> = ({ children }) => {
  const [favorites, setFavorites] =
    useState<IFavoriteCity[]>(loadFavoriteCities);

  useEffect((): void => {
    saveFavoriteCities(favorites);
  }, [favorites]);

  const favoriteIds = useMemo<string[]>(
    () => favorites.map((favorite: IFavoriteCity) => favorite.id),
    [favorites],
  );

  const favoritesCount = favorites.length;

  const isFavorite = useCallback(
    (cityId: string): boolean => favoriteIds.includes(cityId),
    [favoriteIds],
  );

  const addFavorite = useCallback((favorite: IFavoriteCity): void => {
    setFavorites((currentFavorites: IFavoriteCity[]): IFavoriteCity[] =>
      upsertFavoriteCity(currentFavorites, favorite),
    );
  }, []);

  const removeFavorite = useCallback((cityId: string): void => {
    setFavorites((currentFavorites: IFavoriteCity[]): IFavoriteCity[] =>
      currentFavorites.filter(
        (favorite: IFavoriteCity) => favorite.id !== cityId,
      ),
    );
  }, []);

  const clearFavorites = useCallback((): void => {
    setFavorites([]);
    clearStoredFavoriteCities();
  }, []);

  const toggleWeatherFavorite = useCallback(
    (weather: IWeatherResponse): void => {
      const favorite = createFavoriteCity(weather);

      setFavorites((currentFavorites: IFavoriteCity[]): IFavoriteCity[] => {
        const exists = currentFavorites.some(
          (item: IFavoriteCity) => item.id === favorite.id,
        );

        if (exists) {
          return currentFavorites.filter(
            (item: IFavoriteCity) => item.id !== favorite.id,
          );
        }

        return upsertFavoriteCity(currentFavorites, favorite);
      });
    },
    [],
  );

  const values = {
    favorites,
    favoriteIds,
    favoritesCount,
  };

  const handlers = {
    isFavorite,
    addFavorite,
    removeFavorite,
    clearFavorites,
    toggleWeatherFavorite,
  };

  return (
    <FavoritesContext.Provider value={{ values, handlers }}>
      {children}
    </FavoritesContext.Provider>
  );
};
