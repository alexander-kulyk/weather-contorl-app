import type { WeatherThemeKey } from '../../theme';
import type { IWeatherDay } from '../../types';

export interface IForecastDayItemProps {
  day: IWeatherDay;
  domainMin: number;
  domainMax: number;
  themeKey: WeatherThemeKey;
}
