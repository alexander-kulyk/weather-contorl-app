import {
  formatHumidity,
  formatPressure,
  formatTemperature,
  formatVisibility,
  formatWindDirection,
  formatWindSpeed,
  getUvDescription,
} from '../../../utils';
import type { IWeatherResponse } from '../../../types';
import type { IWeatherDetailsViewModel } from '../types';

export const buildViewModel = (
  weather: IWeatherResponse,
): IWeatherDetailsViewModel => ({
  metrics: [
    {
      id: 'wind',
      label: 'Wind',
      value: formatWindSpeed(weather.current.windSpeed),
      helper: formatWindDirection(weather.current.windDirection),
    },
    {
      id: 'humidity',
      label: 'Humidity',
      value: formatHumidity(weather.current.humidity),
    },
    {
      id: 'pressure',
      label: 'Pressure',
      value: formatPressure(weather.current.pressure),
    },
    {
      id: 'visibility',
      label: 'Visibility',
      value: formatVisibility(weather.current.visibility),
    },
    {
      id: 'uvIndex',
      label: 'UV index',
      value: String(Math.round(weather.current.uvIndex)),
      helper: getUvDescription(weather.current.uvIndex),
    },
    {
      id: 'feelsLike',
      label: 'Feels like',
      value: formatTemperature(weather.current.feelsLike),
    },
  ],
});
