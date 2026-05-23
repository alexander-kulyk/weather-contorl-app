import type { IVisualCrossingTimelineResponse, IWeatherResponse } from '../../../types';
import { getWeatherThemeKey } from '../../../utils';
import { processCurrentConditions } from './processCurrentConditions';
import { processDaysData } from './processDaysData';

export const processTimelineResponse = (
  response: IVisualCrossingTimelineResponse,
  fallbackCity: string,
): IWeatherResponse => {
  const resolvedAddress =
    response.resolvedAddress ?? response.address ?? fallbackCity;
  const addressParts = resolvedAddress
    .split(',')
    .map((part: string) => part.trim());
  const firstDay = response.days?.[0];
  const current = processCurrentConditions(response.currentConditions, firstDay);
  const city = addressParts[0] ?? fallbackCity;
  const country = addressParts.at(-1) ?? '';

  return {
    id: createWeatherId(resolvedAddress),
    city,
    resolvedAddress,
    country,
    timezone: response.timezone ?? 'Local time',
    latitude: response.latitude ?? 0,
    longitude: response.longitude ?? 0,
    current,
    days: processDaysData(response.days ?? []),
    themeKey: getWeatherThemeKey(current.conditions, current.icon),
    updatedAt: new Date().toISOString(),
  };
};

const createWeatherId = (address: string): string =>
  address.trim().toLowerCase().replace(/\s+/g, '-');
