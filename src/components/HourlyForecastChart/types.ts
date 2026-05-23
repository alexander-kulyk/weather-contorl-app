import type { WeatherThemeKey } from '../../theme';
import type { IWeatherHour } from '../../types';

export interface IHourlyForecastChartProps {
  hours: IWeatherHour[];
  themeKey: WeatherThemeKey;
}

export interface IHourlyChartPoint {
  time: string;
  temperature: number;
  conditions: string;
}
