//core
import React, { useCallback } from 'react';
import { Heart } from 'lucide-react';
//other
import type { IFavoriteButtonProps } from './types';
import * as S from './styled';

export const FavoriteButton: React.FC<IFavoriteButtonProps> = ({
  cityName,
  isFavorite,
  onToggle,
  disabled = false,
  variant = 'plain',
}) => {
  const accessibleLabel = isFavorite
    ? `Remove ${cityName} from favorites`
    : `Add ${cityName} to favorites`;

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>): void => {
      event.stopPropagation();
      onToggle();
    },
    [onToggle],
  );

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLButtonElement>): void => {
    event.stopPropagation();
  }, []);

  return (
    <S.Button
      type="button"
      aria-label={accessibleLabel}
      aria-pressed={isFavorite}
      disabled={disabled}
      $isFavorite={isFavorite}
      $variant={variant}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <Heart
        size={18}
        strokeWidth={1.8}
        fill={isFavorite ? 'currentColor' : 'none'}
        aria-hidden="true"
      />
    </S.Button>
  );
};
