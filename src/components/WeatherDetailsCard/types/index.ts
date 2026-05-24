import type {
  AsyncStatus,
  IAppError,
  IWeatherMetric,
  IWeatherResponse,
} from '../../../types';

export interface IWeatherDetailsCardProps {
  weather: IWeatherResponse | null;
  status: AsyncStatus;
  error: IAppError | null;
  isFavorite: boolean;
  onToggleFavorite: (weather: IWeatherResponse) => void;
  onRetry: () => void;
}

export interface IWeatherDetailsViewModel {
  metrics: IWeatherMetric[];
}
