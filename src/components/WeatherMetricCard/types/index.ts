import type { ReactNode } from 'react';
import type { WeatherThemeKey } from '../../../theme';

export interface IWeatherMetricCardProps {
  label: string;
  value: string;
  helper?: string;
  icon: ReactNode;
  themeKey: WeatherThemeKey;
}
