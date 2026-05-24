import { useCallback, useState } from 'react';
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

  const handleSelect = useCallback(
    (favorite: IFavoriteCity): void => {
      onSelect(favorite);
      onClose();
    },
    [onClose, onSelect],
  );

  const handleRemove = useCallback(
    (cityId: string): void => {
      favoritesHandlers.removeFavorite(cityId);
    },
    [favoritesHandlers],
  );

  const handleOpenClearConfirmation = useCallback((): void => {
    setIsClearConfirmationOpen(true);
  }, []);

  const handleCloseClearConfirmation = useCallback((): void => {
    setIsClearConfirmationOpen(false);
  }, []);

  const handleConfirmClearAll = useCallback((): void => {
    favoritesHandlers.clearFavorites();
    setIsClearConfirmationOpen(false);
  }, [favoritesHandlers]);

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
