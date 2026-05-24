import { useCallback, useState } from 'react';
import { useFavoritesContext } from '../../../../context';
import type { IFavoriteCity } from '../../../../types';

interface IUseFavoriteCitiesSectionReturn {
  values: {
    favorites: IFavoriteCity[];
    favoritesCount: number;
    isClearConfirmationOpen: boolean;
    isModalOpen: boolean;
  };
  handlers: {
    handleRemove: (cityId: string) => void;
    handleOpenClearConfirmation: () => void;
    handleCloseClearConfirmation: () => void;
    handleConfirmClearAll: () => void;
    handleOpenModal: () => void;
    handleCloseModal: () => void;
  };
}

export const useFavoriteCitiesSection = (): IUseFavoriteCitiesSectionReturn => {
  const { values: favoritesValues, handlers: favoritesHandlers } =
    useFavoritesContext();
  const [isClearConfirmationOpen, setIsClearConfirmationOpen] =
    useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

  const handleOpenModal = useCallback((): void => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback((): void => {
    setIsModalOpen(false);
  }, []);

  return {
    values: {
      favorites: favoritesValues.favorites,
      favoritesCount: favoritesValues.favoritesCount,
      isClearConfirmationOpen,
      isModalOpen,
    },
    handlers: {
      handleRemove,
      handleOpenClearConfirmation,
      handleCloseClearConfirmation,
      handleConfirmClearAll,
      handleOpenModal,
      handleCloseModal,
    },
  };
};
