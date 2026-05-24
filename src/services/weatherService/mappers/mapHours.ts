import type { IVisualCrossingHour } from '../../../api';
import type { IWeatherHour } from '../../../types';
import { formatHourLabel } from '../../../utils';
import { WEATHER_DEFAULTS } from '../constants';

export const mapHours = (hours: IVisualCrossingHour[]): IWeatherHour[] =>
  hours.map((hour: IVisualCrossingHour) => {
    const datetime = hour.datetime ?? WEATHER_DEFAULTS.TIME;

    return {
      datetime,
      timeLabel: formatHourLabel(datetime),
      temperature: hour.temp ?? 0,
      feelsLike: hour.feelslike ?? hour.temp ?? 0,
      humidity: hour.humidity ?? 0,
      windSpeed: hour.windspeed ?? 0,
      precipitationProbability: hour.precipprob ?? 0,
      conditions: hour.conditions ?? WEATHER_DEFAULTS.CONDITION,
      icon: hour.icon ?? WEATHER_DEFAULTS.ICON,
    };
  });
