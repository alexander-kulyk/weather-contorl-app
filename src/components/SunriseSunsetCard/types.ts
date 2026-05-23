import type { WeatherThemeKey } from '../../theme';
import type { IWeatherDay } from '../../types';

export interface ISunriseSunsetCardProps {
  day: IWeatherDay;
  themeKey: WeatherThemeKey;
}
