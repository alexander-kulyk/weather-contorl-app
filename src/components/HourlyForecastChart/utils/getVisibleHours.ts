import type { IWeatherHour } from '../../../types';

const HOUR_STEP = 3;
const MAX_POINTS = 9;

export const getVisibleHours = (hours: IWeatherHour[]): IWeatherHour[] =>
  hours
    .filter((_hour: IWeatherHour, index: number): boolean => index % HOUR_STEP === 0)
    .slice(0, MAX_POINTS);
