import { weatherApi } from '../../api';
import type { IWeatherResponse } from '../../types';
import { mapTimelineResponse } from './mappers';

const fetchByCity = async (
  city: string,
  signal?: AbortSignal,
): Promise<IWeatherResponse> => {
  const { data, normalizedCity } = await weatherApi.fetchTimelineDto(
    city,
    signal,
  );

  return mapTimelineResponse(data, normalizedCity);
};

export const weatherService = {
  fetchByCity,
};
