import type {
  IVisualCrossingCurrentConditions,
  IVisualCrossingDay,
  IWeatherCurrentConditions,
} from '../../../types';
import { SETTINGS } from '../../settings';

export const processCurrentConditions = (
  current: IVisualCrossingCurrentConditions | undefined,
  firstDay: IVisualCrossingDay | undefined,
): IWeatherCurrentConditions => ({
  datetime: current?.datetime ?? SETTINGS.DEFAULT_TIME,
  temperature: current?.temp ?? firstDay?.temp ?? 0,
  feelsLike: current?.feelslike ?? current?.temp ?? firstDay?.temp ?? 0,
  humidity: current?.humidity ?? firstDay?.humidity ?? 0,
  windSpeed: current?.windspeed ?? firstDay?.windspeed ?? 0,
  windDirection: current?.winddir ?? 0,
  pressure: current?.pressure ?? 0,
  visibility: current?.visibility ?? 0,
  uvIndex: current?.uvindex ?? 0,
  conditions:
    current?.conditions ?? firstDay?.conditions ?? SETTINGS.DEFAULT_CONDITION,
  icon: current?.icon ?? firstDay?.icon ?? 'clear-day',
  sunrise: current?.sunrise ?? firstDay?.sunrise ?? SETTINGS.DEFAULT_TIME,
  sunset: current?.sunset ?? firstDay?.sunset ?? SETTINGS.DEFAULT_TIME,
});
