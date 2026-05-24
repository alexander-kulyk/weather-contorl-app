import type { IWeatherResponse } from '../../types';

export interface ISearchResultRowProps {
  weather: IWeatherResponse;
  isSelected: boolean;
  isFavorite: boolean;
  onSelect: (weather: IWeatherResponse) => void;
  onToggleFavorite: (weather: IWeatherResponse) => void;
  disabled?: boolean;
}

export interface ISearchResultRowViewModel {
  temperature: string;
  wind: string;
  humidity: string;
  rowLabel: string;
  cityMeta: string;
}
