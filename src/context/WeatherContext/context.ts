import { createContext } from 'react';
import type { IWeatherContext } from './types';

export const WeatherContext = createContext<IWeatherContext | null>(null);
