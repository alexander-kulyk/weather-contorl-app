import type { IVisualCrossingTimelineResponse } from '../../../api';
import type { IWeatherResponse } from '../../../types';
import { mapCurrentConditions } from './mapCurrentConditions';
import { mapDays } from './mapDays';

export const mapTimelineResponse = (
  response: IVisualCrossingTimelineResponse,
  fallbackCity: string,
): IWeatherResponse => {
  const resolvedAddress =
    response.resolvedAddress ?? response.address ?? fallbackCity;
  const addressParts = resolvedAddress
    .split(',')
    .map((part: string) => part.trim());
  const firstDay = response.days?.[0];
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
    current: mapCurrentConditions(response.currentConditions, firstDay),
    days: mapDays(response.days ?? []),
    updatedAt: new Date().toISOString(),
  };
};

const createWeatherId = (address: string): string =>
  address.trim().toLowerCase().replace(/\s+/g, '-');
