import { createContext } from 'react';
import type { IWeatherSearchContext } from './types';

export const WeatherSearchContext = createContext<IWeatherSearchContext | null>(
  null,
);
