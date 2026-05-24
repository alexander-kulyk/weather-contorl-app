import type { WeatherThemeKey } from '../../theme';
import type { IWeatherDay } from '../../types';

export interface IForecastListProps {
  days: IWeatherDay[];
  themeKey: WeatherThemeKey;
}

export interface IForecastTemperatureDomain {
  min: number;
  max: number;
}
