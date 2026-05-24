import type {
  IVisualCrossingCurrentConditions,
  IVisualCrossingDay,
} from '../../../api';
import type { IWeatherCurrentConditions } from '../../../types';
import { WEATHER_DEFAULTS } from '../constants';

export const mapCurrentConditions = (
  current: IVisualCrossingCurrentConditions | undefined,
  firstDay: IVisualCrossingDay | undefined,
): IWeatherCurrentConditions => ({
  datetime: current?.datetime ?? WEATHER_DEFAULTS.TIME,
  temperature: current?.temp ?? firstDay?.temp ?? 0,
  feelsLike: current?.feelslike ?? current?.temp ?? firstDay?.temp ?? 0,
  humidity: current?.humidity ?? firstDay?.humidity ?? 0,
  windSpeed: current?.windspeed ?? firstDay?.windspeed ?? 0,
  windDirection: current?.winddir ?? 0,
  pressure: current?.pressure ?? 0,
  visibility: current?.visibility ?? 0,
  uvIndex: current?.uvindex ?? 0,
  conditions:
    current?.conditions ?? firstDay?.conditions ?? WEATHER_DEFAULTS.CONDITION,
  icon: current?.icon ?? firstDay?.icon ?? WEATHER_DEFAULTS.ICON,
  sunrise: current?.sunrise ?? firstDay?.sunrise ?? WEATHER_DEFAULTS.TIME,
  sunset: current?.sunset ?? firstDay?.sunset ?? WEATHER_DEFAULTS.TIME,
});
