//core
import React from 'react';
import { Heart } from 'lucide-react';
//other
import { getFavoriteButtonLabel } from './utils';
import type { IFavoriteButtonProps } from './types';
import * as S from './styled';

export const FavoriteButton: React.FC<IFavoriteButtonProps> = ({
  cityName,
  isFavorite,
  onToggle,
  disabled = false,
  variant = 'plain',
}) => {
  const accessibleLabel = getFavoriteButtonLabel(cityName, isFavorite);

  const handleClick = (): void => {
    onToggle();
  };

  return (
    <S.Button
      type='button'
      aria-label={accessibleLabel}
      aria-pressed={isFavorite}
      disabled={disabled}
      $isFavorite={isFavorite}
      $variant={variant}
      onClick={handleClick}
    >
      <Heart
        size={18}
        strokeWidth={1.8}
        fill={isFavorite ? 'currentColor' : 'none'}
        aria-hidden='true'
      />
    </S.Button>
  );
};
