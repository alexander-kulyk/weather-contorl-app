import {
  formatPrecipitation,
  formatTemperature,
  getTemperatureRangePosition,
} from '../../../utils';
import type { IWeatherDay } from '../../../types';
import type { IForecastDayItemViewModel } from '../types';

export const buildViewModel = (
  day: IWeatherDay,
  domainMin: number,
  domainMax: number,
): IForecastDayItemViewModel => ({
  precipitation: formatPrecipitation(day.precipitationProbability),
  lowTemperature: formatTemperature(day.temperatureMin),
  highTemperature: formatTemperature(day.temperatureMax),
  rangePosition: getTemperatureRangePosition(
    day.temperatureMin,
    day.temperatureMax,
    domainMin,
    domainMax,
  ),
});
