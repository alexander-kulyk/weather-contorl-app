import type { WeatherThemeKey } from '../../../theme';
import type { ITemperatureRangePosition } from '../../../utils';
import type { IWeatherDay } from '../../../types';

export interface IForecastDayItemProps {
  day: IWeatherDay;
  domainMin: number;
  domainMax: number;
  themeKey: WeatherThemeKey;
}

export interface IForecastDayItemViewModel {
  precipitation: string;
  lowTemperature: string;
  highTemperature: string;
  rangePosition: ITemperatureRangePosition;
}
