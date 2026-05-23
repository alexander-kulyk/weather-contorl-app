import { createContext } from 'react';
import type { IFavoritesContextValue } from './types';

export const FavoritesContext = createContext<IFavoritesContextValue | null>(null);
