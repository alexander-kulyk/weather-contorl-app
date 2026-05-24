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
