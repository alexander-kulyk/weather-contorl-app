import type { IWeatherDay } from '../../../types';
import type { IForecastTemperatureDomain } from '../types';

export const getForecastTemperatureDomain = (
  days: IWeatherDay[],
): IForecastTemperatureDomain => ({
  min: Math.min(...days.map((day: IWeatherDay) => day.temperatureMin)),
  max: Math.max(...days.map((day: IWeatherDay) => day.temperatureMax)),
});
