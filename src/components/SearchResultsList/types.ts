import type { AsyncStatus, IAppError, IWeatherResponse } from '../../types';

export interface ISearchResultsListProps {
  results: IWeatherResponse[];
  status: AsyncStatus;
  error: IAppError | null;
  hasSearchStarted: boolean;
  selectedWeatherId?: string;
  isFavorite: (cityId: string) => boolean;
  onSelect: (weather: IWeatherResponse) => void;
  onToggleFavorite: (weather: IWeatherResponse) => void;
}

export interface ISearchResultsListState {
  hasResults: boolean;
  hasNoResults: boolean;
  showInitialEmpty: boolean;
  resultCount: number;
}
