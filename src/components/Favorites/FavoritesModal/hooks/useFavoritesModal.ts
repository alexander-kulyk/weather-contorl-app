import { useCallback } from 'react';
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
  };
  handlers: {
    handleSelect: (favorite: IFavoriteCity) => void;
    handleRemove: (cityId: string) => void;
    handleClearAll: () => void;
  };
}

export const useFavoritesModal = ({
  onClose,
  onSelect,
}: IUseFavoritesModalParams): IUseFavoritesModalReturn => {
  const { values: favoritesValues, handlers: favoritesHandlers } =
    useFavoritesContext();

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

  const handleClearAll = useCallback((): void => {
    favoritesHandlers.clearFavorites();
  }, [favoritesHandlers]);

  return {
    values: {
      favorites: favoritesValues.favorites,
      favoritesCount: favoritesValues.favoritesCount,
    },
    handlers: {
      handleSelect,
      handleRemove,
      handleClearAll,
    },
  };
};
