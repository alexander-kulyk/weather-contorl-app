import { httpClient } from './httpClient';
import {
  handleApiError,
  isRequestCanceled,
  normalizedCityGuard,
} from './utils';
import type { IVisualCrossingTimelineResponse } from './types';

const fetchTimelineDto = async (
  city: string,
  signal?: AbortSignal,
): Promise<{ data: IVisualCrossingTimelineResponse; normalizedCity: string }> => {
  const normalizedCity = normalizedCityGuard(city);

  try {
    const response = await httpClient.get<IVisualCrossingTimelineResponse>(
      `/${encodeURIComponent(normalizedCity)}`,
      {
        params: { include: 'current,days,hours' },
        signal,
      },
    );

    return { data: response.data, normalizedCity };
  } catch (error: unknown) {
    if (isRequestCanceled(error)) {
      throw error;
    }

    throw handleApiError(error);
  }
};

export const weatherApi = {
  fetchTimelineDto,
};
