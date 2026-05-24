import type { ForecastRange, IWeatherDay, IWeatherResponse } from '../../../types';

export const getForecastDays = (
  weather: IWeatherResponse | null,
  forecastRange: ForecastRange,
): IWeatherDay[] => weather?.days.slice(0, forecastRange) ?? [];
