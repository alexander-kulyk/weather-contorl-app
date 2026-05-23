import axios from 'axios';
import type { WeatherErrorCode } from '../types';
import type {
  IVisualCrossingCurrentConditions,
  IVisualCrossingDay,
  IVisualCrossingHour,
  IVisualCrossingTimelineResponse,
  IWeatherCurrentConditions,
  IWeatherDay,
  IWeatherHour,
  IWeatherResponse,
} from '../types';
import { formatDateLabel, formatDayLabel, formatHourLabel, getDayLengthMinutes } from '../utils';
import { getWeatherThemeKey } from '../utils';

const BASE_URL =
  'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';
const DEFAULT_CONDITION = 'Clear';
const DEFAULT_TIME = '00:00:00';

export class WeatherApiError extends Error {
  public readonly code: WeatherErrorCode;

  public constructor(code: WeatherErrorCode, message: string) {
    super(message);
    this.name = 'WeatherApiError';
    this.code = code;
  }
}

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

export const isWeatherRequestCanceled = (error: unknown): boolean => axios.isCancel(error);

const requestTimelineWeather = async (
  city: string,
  signal?: AbortSignal,
): Promise<IWeatherResponse> => {
  const apiKey = import.meta.env.VITE_VISUAL_CROSSING_API_KEY;
  const normalizedCity = city.trim();

  if (!apiKey) {
    throw new WeatherApiError(
      'MISSING_API_KEY',
      'Missing VITE_VISUAL_CROSSING_API_KEY environment variable.',
    );
  }

  if (!normalizedCity) {
    throw new WeatherApiError('NO_RESULTS', 'No cities found. Check the spelling and try again.');
  }

  try {
    const response = await axios.get<IVisualCrossingTimelineResponse>(
      `${BASE_URL}/${encodeURIComponent(normalizedCity)}`,
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

    return mapTimelineResponse(response.data, normalizedCity);
  } catch (error: unknown) {
    if (axios.isCancel(error)) {
      throw error;
    }

    throw toWeatherApiError(error);
  }
};

const toWeatherApiError = (error: unknown): WeatherApiError => {
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return new WeatherApiError('NETWORK', 'You appear to be offline. Check your internet connection.');
  }

  if (axios.isAxiosError(error)) {
    const status = error.response?.status;

    if (status === 400 || status === 404) {
      return new WeatherApiError('NO_RESULTS', 'No cities found. Check the spelling and try again.');
    }

    if (status === 401 || status === 403 || status === 429) {
      return new WeatherApiError(
        'API_LIMIT',
        'Weather data is temporarily unavailable. Please try again later.',
      );
    }

    if (!error.response) {
      return new WeatherApiError('NETWORK', 'You appear to be offline. Check your internet connection.');
    }
  }

  return new WeatherApiError('API', 'Could not load weather data. Please try again.');
};

const mapTimelineResponse = (
  response: IVisualCrossingTimelineResponse,
  fallbackCity: string,
): IWeatherResponse => {
  const resolvedAddress = response.resolvedAddress ?? response.address ?? fallbackCity;
  const addressParts = resolvedAddress.split(',').map((part: string) => part.trim());
  const firstDay = response.days?.[0];
  const current = mapCurrentConditions(response.currentConditions, firstDay);
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
    days: mapDays(response.days ?? []),
    themeKey: getWeatherThemeKey(current.conditions, current.icon),
    updatedAt: new Date().toISOString(),
  };
};

const mapCurrentConditions = (
  current: IVisualCrossingCurrentConditions | undefined,
  firstDay: IVisualCrossingDay | undefined,
): IWeatherCurrentConditions => ({
  datetime: current?.datetime ?? DEFAULT_TIME,
  temperature: current?.temp ?? firstDay?.temp ?? 0,
  feelsLike: current?.feelslike ?? current?.temp ?? firstDay?.temp ?? 0,
  humidity: current?.humidity ?? firstDay?.humidity ?? 0,
  windSpeed: current?.windspeed ?? firstDay?.windspeed ?? 0,
  windDirection: current?.winddir ?? 0,
  pressure: current?.pressure ?? 0,
  visibility: current?.visibility ?? 0,
  uvIndex: current?.uvindex ?? 0,
  conditions: current?.conditions ?? firstDay?.conditions ?? DEFAULT_CONDITION,
  icon: current?.icon ?? firstDay?.icon ?? 'clear-day',
  sunrise: current?.sunrise ?? firstDay?.sunrise ?? DEFAULT_TIME,
  sunset: current?.sunset ?? firstDay?.sunset ?? DEFAULT_TIME,
});

const mapDays = (days: IVisualCrossingDay[]): IWeatherDay[] =>
  days.map((day: IVisualCrossingDay, index: number) => {
    const datetime = day.datetime ?? new Date().toISOString().slice(0, 10);
    const sunrise = day.sunrise ?? DEFAULT_TIME;
    const sunset = day.sunset ?? DEFAULT_TIME;

    return {
      datetime,
      dayLabel: formatDayLabel(datetime, index),
      dateLabel: formatDateLabel(datetime),
      temperature: day.temp ?? 0,
      temperatureMin: day.tempmin ?? day.temp ?? 0,
      temperatureMax: day.tempmax ?? day.temp ?? 0,
      conditions: day.conditions ?? DEFAULT_CONDITION,
      icon: day.icon ?? 'clear-day',
      windSpeed: day.windspeed ?? 0,
      humidity: day.humidity ?? 0,
      precipitationProbability: day.precipprob ?? 0,
      sunrise,
      sunset,
      dayLengthMinutes: getDayLengthMinutes(sunrise, sunset),
      hours: mapHours(day.hours ?? []),
    };
  });

const mapHours = (hours: IVisualCrossingHour[]): IWeatherHour[] =>
  hours.map((hour: IVisualCrossingHour) => {
    const datetime = hour.datetime ?? DEFAULT_TIME;

    return {
      datetime,
      timeLabel: formatHourLabel(datetime),
      temperature: hour.temp ?? 0,
      feelsLike: hour.feelslike ?? hour.temp ?? 0,
      humidity: hour.humidity ?? 0,
      windSpeed: hour.windspeed ?? 0,
      precipitationProbability: hour.precipprob ?? 0,
      conditions: hour.conditions ?? DEFAULT_CONDITION,
      icon: hour.icon ?? 'clear-day',
    };
  });

const createWeatherId = (address: string): string =>
  address.trim().toLowerCase().replace(/\s+/g, '-');
