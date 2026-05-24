import type { IVisualCrossingDay } from '../../../api';
import type { IWeatherDay } from '../../../types';
import {
  formatDateLabel,
  formatDayLabel,
  getDayLengthMinutes,
} from '../../../utils';
import { WEATHER_DEFAULTS } from '../constants';
import { mapHours } from './mapHours';

export const mapDays = (days: IVisualCrossingDay[]): IWeatherDay[] =>
  days.map((day: IVisualCrossingDay, index: number) => {
    const datetime = day.datetime ?? new Date().toISOString().slice(0, 10);
    const sunrise = day.sunrise ?? WEATHER_DEFAULTS.TIME;
    const sunset = day.sunset ?? WEATHER_DEFAULTS.TIME;

    return {
      datetime,
      dayLabel: formatDayLabel(datetime, index),
      dateLabel: formatDateLabel(datetime),
      temperature: day.temp ?? 0,
      temperatureMin: day.tempmin ?? day.temp ?? 0,
      temperatureMax: day.tempmax ?? day.temp ?? 0,
      conditions: day.conditions ?? WEATHER_DEFAULTS.CONDITION,
      icon: day.icon ?? WEATHER_DEFAULTS.ICON,
      windSpeed: day.windspeed ?? 0,
      humidity: day.humidity ?? 0,
      precipitationProbability: day.precipprob ?? 0,
      sunrise,
      sunset,
      dayLengthMinutes: getDayLengthMinutes(sunrise, sunset),
      hours: mapHours(day.hours ?? []),
    };
  });
