import { useState } from 'react';
import { useFavoritesContext } from '../../../../context';
import type { IFavoriteCity } from '../../../../types';

interface IUseFavoritesModalParams {
  onClose: () => void;
  onSelect: (favorite: IFavoriteCity) => void;
}

interface IUseFavoritesModalReturn {
  values: {
    favorites: IFavoriteCity[];
    favoritesCount: number;
    isClearConfirmationOpen: boolean;
  };
  handlers: {
    handleSelect: (favorite: IFavoriteCity) => void;
    handleRemove: (cityId: string) => void;
    handleOpenClearConfirmation: () => void;
    handleCloseClearConfirmation: () => void;
    handleConfirmClearAll: () => void;
  };
}

export const useFavoritesModal = ({
  onClose,
  onSelect,
}: IUseFavoritesModalParams): IUseFavoritesModalReturn => {
  const { values: favoritesValues, handlers: favoritesHandlers } =
    useFavoritesContext();
  const [isClearConfirmationOpen, setIsClearConfirmationOpen] =
    useState<boolean>(false);

  const handleSelect = (favorite: IFavoriteCity): void => {
    onSelect(favorite);
    onClose();
  };

  const handleRemove = (cityId: string): void => {
    favoritesHandlers.removeFavorite(cityId);
  };

  const handleOpenClearConfirmation = (): void => {
    setIsClearConfirmationOpen(true);
  };

  const handleCloseClearConfirmation = (): void => {
    setIsClearConfirmationOpen(false);
  };

  const handleConfirmClearAll = (): void => {
    favoritesHandlers.clearFavorites();
    setIsClearConfirmationOpen(false);
  };

  return {
    values: {
      favorites: favoritesValues.favorites,
      favoritesCount: favoritesValues.favoritesCount,
      isClearConfirmationOpen,
    },
    handlers: {
      handleSelect,
      handleRemove,
      handleOpenClearConfirmation,
      handleCloseClearConfirmation,
      handleConfirmClearAll,
    },
  };
};
