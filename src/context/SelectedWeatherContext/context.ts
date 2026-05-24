import { createContext } from 'react';
import type { ISelectedWeatherContext } from './types';

export const SelectedWeatherContext =
  createContext<ISelectedWeatherContext | null>(null);
