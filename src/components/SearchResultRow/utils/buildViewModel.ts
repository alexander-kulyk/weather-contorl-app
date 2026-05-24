import {
  formatHumidity,
  formatTemperature,
  formatWindSpeed,
} from '../../../utils';
import type { IWeatherResponse } from '../../../types';
import type { ISearchResultRowViewModel } from '../types';

export const buildViewModel = (
  weather: IWeatherResponse,
): ISearchResultRowViewModel => ({
  temperature: formatTemperature(weather.current.temperature),
  wind: formatWindSpeed(weather.current.windSpeed),
  humidity: formatHumidity(weather.current.humidity),
  rowLabel: `View weather details for ${weather.city}`,
  cityMeta: weather.country || weather.resolvedAddress,
});
