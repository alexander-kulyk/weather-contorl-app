import type { IFavoriteCity } from '../../../../types';

export interface IFavoriteCitiesSectionProps {
  selectedWeatherId?: string;
  onSelect: (favorite: IFavoriteCity) => void;
}

export interface IFavoriteListProps {
  $isScrollable: boolean;
}
