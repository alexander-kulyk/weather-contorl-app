import { useContext } from 'react';
import { FavoritesContext } from './context';
import type { IFavoritesContextValue } from './types';

export const useFavoritesContext = (): IFavoritesContextValue => {
  const contextValue = useContext(FavoritesContext);

  if (!contextValue) {
    throw new Error('useFavoritesContext must be used inside FavoritesProvider.');
  }

  return contextValue;
};
