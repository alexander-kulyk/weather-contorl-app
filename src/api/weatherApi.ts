//core
import axios from 'axios';
//other
import {
  createApiError,
  handleApiError,
  isRequestCanceled,
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
  const weather = await requestTimelineWeather(city, signal);

  return [weather];
};

export const getWeatherByCity = async (
  city: string,
  signal?: AbortSignal,
): Promise<IWeatherResponse> => requestTimelineWeather(city, signal);

const requestTimelineWeather = async (
  city: string,
  signal?: AbortSignal,
): Promise<IWeatherResponse> => {
  const apiKey = import.meta.env.VITE_VISUAL_CROSSING_API_KEY;
  const normalizedCity = city.trim();

  if (!apiKey) {
    throw createApiError(
      'MISSING_API_KEY',
      'Missing VITE_VISUAL_CROSSING_API_KEY environment variable.',
    );
  }

  if (!normalizedCity) {
    throw createApiError(
      'NO_RESULTS',
      'No cities found. Check the spelling and try again.',
    );
  }

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
