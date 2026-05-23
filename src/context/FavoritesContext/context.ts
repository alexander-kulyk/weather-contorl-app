import { createContext } from 'react';
import type { IFavoritesContext } from './types';

export const FavoritesContext = createContext<IFavoritesContext | null>(null);
