import { useCallback, useState } from 'react';
import { useFavoritesContext } from '../../../../context';
import type { IFavoriteCity } from '../../../../types';

interface IUseFavoriteCitiesSectionReturn {
  values: {
    favorites: IFavoriteCity[];
    favoritesCount: number;
    isModalOpen: boolean;
  };
  handlers: {
    handleRemove: (cityId: string) => void;
    handleClearAll: () => void;
    handleOpenModal: () => void;
    handleCloseModal: () => void;
  };
}

export const useFavoriteCitiesSection = (): IUseFavoriteCitiesSectionReturn => {
  const { values: favoritesValues, handlers: favoritesHandlers } =
    useFavoritesContext();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleRemove = useCallback(
    (cityId: string): void => {
      favoritesHandlers.removeFavorite(cityId);
    },
    [favoritesHandlers],
  );

  const handleClearAll = useCallback((): void => {
    favoritesHandlers.clearFavorites();
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
      isModalOpen,
    },
    handlers: {
      handleRemove,
      handleClearAll,
      handleOpenModal,
      handleCloseModal,
    },
  };
};
