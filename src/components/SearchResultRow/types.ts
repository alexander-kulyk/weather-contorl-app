import type { IWeatherResponse } from '../../types';

export interface ISearchResultRowProps {
  weather: IWeatherResponse;
  isSelected: boolean;
  isFavorite: boolean;
  onSelect: (weather: IWeatherResponse) => void;
  onToggleFavorite: (weather: IWeatherResponse) => void;
  disabled?: boolean;
}
