import type { IFavoriteCity } from '../../types';

export interface IFavoriteCitiesSectionProps {
  favorites: IFavoriteCity[];
  selectedWeatherId?: string;
  onSelect: (favorite: IFavoriteCity) => void;
  onRemove: (cityId: string) => void;
}
