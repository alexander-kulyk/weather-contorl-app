import type { ReactNode } from 'react';
import type { IFavoriteCity, IWeatherResponse } from '../../types';

export interface IFavoritesProviderProps {
  children: ReactNode;
}

export interface IFavoritesContext {
  values: {
    favorites: IFavoriteCity[];
    favoriteIds: string[];
    favoritesCount: number;
  };
  handlers: {
    isFavorite: (cityId: string) => boolean;
    addFavorite: (favorite: IFavoriteCity) => void;
    removeFavorite: (cityId: string) => void;
    clearFavorites: () => void;
    toggleWeatherFavorite: (weather: IWeatherResponse) => void;
  };
}
