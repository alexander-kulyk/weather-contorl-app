import type { IHourlyChartPoint } from '../types';
import type { IWeatherHour } from '../../../types';

export const mapHoursToChartPoints = (
  hours: IWeatherHour[],
): IHourlyChartPoint[] =>
  hours.map((hour: IWeatherHour): IHourlyChartPoint => ({
    time: hour.timeLabel,
    temperature: Math.round(hour.temperature),
    conditions: hour.conditions,
  }));
