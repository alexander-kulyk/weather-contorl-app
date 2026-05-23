import type { IVisualCrossingHour, IWeatherHour } from '../../../types';
import { formatHourLabel } from '../../../utils';
import { SETTINGS } from '../../settings';

export const processHoursData = (
  hours: IVisualCrossingHour[],
): IWeatherHour[] =>
  hours.map((hour: IVisualCrossingHour) => {
    const datetime = hour.datetime ?? SETTINGS.DEFAULT_TIME;

    return {
      datetime,
      timeLabel: formatHourLabel(datetime),
      temperature: hour.temp ?? 0,
      feelsLike: hour.feelslike ?? hour.temp ?? 0,
      humidity: hour.humidity ?? 0,
      windSpeed: hour.windspeed ?? 0,
      precipitationProbability: hour.precipprob ?? 0,
      conditions: hour.conditions ?? SETTINGS.DEFAULT_CONDITION,
      icon: hour.icon ?? 'clear-day',
    };
  });
