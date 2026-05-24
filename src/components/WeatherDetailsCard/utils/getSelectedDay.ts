import type { IWeatherDay, IWeatherResponse } from '../../../types';

export const getSelectedDay = (
  weather: IWeatherResponse | null,
): IWeatherDay | null => weather?.days[0] ?? null;
