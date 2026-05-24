import { formatDayLength, formatHourLabel } from '../../../utils';
import type { IWeatherDay } from '../../../types';
import type { ISunriseSunsetViewModel } from '../types';

export const buildViewModel = (day: IWeatherDay): ISunriseSunsetViewModel => ({
  sunrise: formatHourLabel(day.sunrise),
  sunset: formatHourLabel(day.sunset),
  dayLength: formatDayLength(day.dayLengthMinutes),
});
