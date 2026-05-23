import type { IVisualCrossingDay, IWeatherDay } from '../../../types';
import {
  formatDateLabel,
  formatDayLabel,
  getDayLengthMinutes,
} from '../../../utils';
import { SETTINGS } from '../../settings';
import { processHoursData } from './processHoursData';

export const processDaysData = (days: IVisualCrossingDay[]): IWeatherDay[] =>
  days.map((day: IVisualCrossingDay, index: number) => {
    const datetime = day.datetime ?? new Date().toISOString().slice(0, 10);
    const sunrise = day.sunrise ?? SETTINGS.DEFAULT_TIME;
    const sunset = day.sunset ?? SETTINGS.DEFAULT_TIME;

    return {
      datetime,
      dayLabel: formatDayLabel(datetime, index),
      dateLabel: formatDateLabel(datetime),
      temperature: day.temp ?? 0,
      temperatureMin: day.tempmin ?? day.temp ?? 0,
      temperatureMax: day.tempmax ?? day.temp ?? 0,
      conditions: day.conditions ?? SETTINGS.DEFAULT_CONDITION,
      icon: day.icon ?? 'clear-day',
      windSpeed: day.windspeed ?? 0,
      humidity: day.humidity ?? 0,
      precipitationProbability: day.precipprob ?? 0,
      sunrise,
      sunset,
      dayLengthMinutes: getDayLengthMinutes(sunrise, sunset),
      hours: processHoursData(day.hours ?? []),
    };
  });
