import type { WeatherThemeKey } from '../theme';

export interface IWeatherHour {
  datetime: string;
  timeLabel: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  precipitationProbability: number;
  conditions: string;
  icon: string;
}

export interface IWeatherDay {
  datetime: string;
  dayLabel: string;
  dateLabel: string;
  temperature: number;
  temperatureMin: number;
  temperatureMax: number;
  conditions: string;
  icon: string;
  windSpeed: number;
  humidity: number;
  precipitationProbability: number;
  sunrise: string;
  sunset: string;
  dayLengthMinutes: number;
  hours: IWeatherHour[];
}

export interface IWeatherCurrentConditions {
  datetime: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  pressure: number;
  visibility: number;
  uvIndex: number;
  conditions: string;
  icon: string;
  sunrise: string;
  sunset: string;
}

export interface IWeatherResponse {
  id: string;
  city: string;
  resolvedAddress: string;
  country: string;
  timezone: string;
  latitude: number;
  longitude: number;
  current: IWeatherCurrentConditions;
  days: IWeatherDay[];
  themeKey: WeatherThemeKey;
  updatedAt: string;
}

export interface IFavoriteCity {
  id: string;
  city: string;
  resolvedAddress: string;
  country: string;
  temperature: number;
  conditions: string;
  icon: string;
  updatedAt: string;
}

export interface IWeatherMetric {
  id: string;
  label: string;
  value: string;
  helper?: string;
}

export interface IVisualCrossingHour {
  datetime?: string;
  temp?: number;
  feelslike?: number;
  humidity?: number;
  windspeed?: number;
  precipprob?: number;
  conditions?: string;
  icon?: string;
}

export interface IVisualCrossingDay {
  datetime?: string;
  temp?: number;
  tempmin?: number;
  tempmax?: number;
  conditions?: string;
  icon?: string;
  windspeed?: number;
  humidity?: number;
  precipprob?: number;
  sunrise?: string;
  sunset?: string;
  hours?: IVisualCrossingHour[];
}

export interface IVisualCrossingCurrentConditions {
  datetime?: string;
  temp?: number;
  feelslike?: number;
  humidity?: number;
  windspeed?: number;
  winddir?: number;
  pressure?: number;
  visibility?: number;
  uvindex?: number;
  conditions?: string;
  icon?: string;
  sunrise?: string;
  sunset?: string;
}

export interface IVisualCrossingTimelineResponse {
  address?: string;
  resolvedAddress?: string;
  timezone?: string;
  latitude?: number;
  longitude?: number;
  currentConditions?: IVisualCrossingCurrentConditions;
  days?: IVisualCrossingDay[];
}
