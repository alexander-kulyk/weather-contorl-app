import type { ReactNode } from 'react';
import type { IFavoriteCity, IWeatherResponse } from '../../types';

export interface IFavoritesProviderProps {
  children: ReactNode;
}

export interface IFavoritesContext {
  values: {
    favorites: IFavoriteCity[];
    favoriteIds: string[];
  };
  handlers: {
    isFavorite: (cityId: string) => boolean;
    toggleWeatherFavorite: (weather: IWeatherResponse) => void;
    removeFavorite: (cityId: string) => void;
  };
}
