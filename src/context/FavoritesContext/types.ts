import type { ReactNode } from 'react';
import type { IFavoriteCity, IWeatherResponse } from '../../types';

export interface IFavoritesContextValues {
  favorites: IFavoriteCity[];
  favoriteIds: string[];
}

export interface IFavoritesContextHandlers {
  isFavorite: (cityId: string) => boolean;
  toggleWeatherFavorite: (weather: IWeatherResponse) => void;
  removeFavorite: (cityId: string) => void;
}

export interface IFavoritesContextValue {
  values: IFavoritesContextValues;
  handlers: IFavoritesContextHandlers;
}

export interface IFavoritesProviderProps {
  children: ReactNode;
}
