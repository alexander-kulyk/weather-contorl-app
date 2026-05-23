import { createContext } from 'react';
import type { IWeatherContextValue } from './types';

export const WeatherContext = createContext<IWeatherContextValue | null>(null);
