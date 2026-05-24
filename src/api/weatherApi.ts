//core
import axios from 'axios';
//other
import {
  apiKeyGuard,
  handleApiError,
  isRequestCanceled,
  normalizedCityGuard,
  processTimelineResponse,
} from './utils';
import type {
  IVisualCrossingTimelineResponse,
  IWeatherResponse,
} from '../types';
import { API } from './constants';

export const searchWeatherByCity = async (
  city: string,
  signal?: AbortSignal,
): Promise<IWeatherResponse[]> => {
  const weather = await fetchTimelineWeather(city, signal);

  return [weather];
};

export const fetchWeatherByCity = async (
  city: string,
  signal?: AbortSignal,
): Promise<IWeatherResponse> => fetchTimelineWeather(city, signal);

const fetchTimelineWeather = async (
  city: string,
  signal?: AbortSignal,
): Promise<IWeatherResponse> => {
  const apiKey = apiKeyGuard(import.meta.env.VITE_VISUAL_CROSSING_API_KEY);
  const normalizedCity = normalizedCityGuard(city);

  try {
    const response = await axios.get<IVisualCrossingTimelineResponse>(
      `${API.BASE_URL}/${encodeURIComponent(normalizedCity)}`,
      {
        params: {
          unitGroup: 'metric',
          include: 'current,days,hours',
          key: apiKey,
          contentType: 'json',
        },
        signal,
      },
    );

    return processTimelineResponse(response.data, normalizedCity);
  } catch (error: unknown) {
    if (isRequestCanceled(error)) {
      throw error;
    }

    throw handleApiError(error);
  }
};
