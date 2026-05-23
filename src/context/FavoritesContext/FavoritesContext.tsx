//core
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { FC } from 'react';
//other
import {
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

  const isFavorite = useCallback(
    (cityId: string): boolean => favoriteIds.includes(cityId),
    [favoriteIds],
  );

  const removeFavorite = useCallback((cityId: string): void => {
    setFavorites((currentFavorites: IFavoriteCity[]): IFavoriteCity[] =>
      currentFavorites.filter(
        (favorite: IFavoriteCity) => favorite.id !== cityId,
      ),
    );
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
  };

  const handlers = {
    isFavorite,
    toggleWeatherFavorite,
    removeFavorite,
  };

  return (
    <FavoritesContext.Provider value={{ values, handlers }}>
      {children}
    </FavoritesContext.Provider>
  );
};
