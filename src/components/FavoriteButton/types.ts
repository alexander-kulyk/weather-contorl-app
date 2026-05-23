export interface IFavoriteButtonProps {
  cityName: string;
  isFavorite: boolean;
  onToggle: () => void;
  disabled?: boolean;
  variant?: 'plain' | 'soft';
}
