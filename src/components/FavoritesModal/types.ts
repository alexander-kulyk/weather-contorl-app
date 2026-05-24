import type { IFavoriteCity } from '../../types';

export interface IFavoritesModalProps {
  isOpen: boolean;
  selectedWeatherId?: string;
  onClose: () => void;
  onSelect: (favorite: IFavoriteCity) => void;
}

export interface IClearAllButtonProps {
  disabled?: boolean;
}
