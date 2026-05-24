import type { IFavoriteCity } from '../../../../types';

export interface IFavoriteCityItemProps {
  favorite: IFavoriteCity;
  isSelected: boolean;
  onSelect: (favorite: IFavoriteCity) => void;
  onRemove: (cityId: string) => void;
}

export interface IFavoriteCityItemRowProps {
  $isSelected: boolean;
}
