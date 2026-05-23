import { useContext } from 'react';
import { FavoritesContext } from './context';
import type { IFavoritesContext } from './types';

export const useFavoritesContext = (): IFavoritesContext => {
  const contextValue = useContext(FavoritesContext);

  if (!contextValue) {
    throw new Error('useFavoritesContext must be used inside FavoritesProvider.');
  }

  return contextValue;
};
