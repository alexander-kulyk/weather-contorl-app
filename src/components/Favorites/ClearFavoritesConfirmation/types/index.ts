export interface IClearFavoritesConfirmationProps {
  favoritesCount: number;
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}
