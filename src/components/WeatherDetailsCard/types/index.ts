import type { ForecastRange, IAppError, IWeatherMetric, IWeatherResponse } from '../../../types';

export interface IWeatherDetailsCardProps {
  weather: IWeatherResponse | null;
  status: 'idle' | 'loading' | 'success' | 'error';
  error: IAppError | null;
  forecastRange: ForecastRange;
  isFavorite: boolean;
  onToggleFavorite: (weather: IWeatherResponse) => void;
  onForecastRangeChange: (range: ForecastRange) => void;
  onRetry: () => void;
}

export interface IWeatherDetailsViewModel {
  metrics: IWeatherMetric[];
}
