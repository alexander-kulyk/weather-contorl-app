//core
import React from 'react';
import { Heart } from 'lucide-react';
//components
import { EmptyState } from '../EmptyState';
//other
import { useFavoriteCitiesSection } from './hooks';
import type { IFavoriteCitiesSectionProps } from './types';
import * as S from './styled';

export const FavoriteCitiesSection: React.FC<IFavoriteCitiesSectionProps> = ({
  favorites,
  selectedWeatherId,
  onSelect,
  onRemove,
}) => {
  const hasFavorites = favorites.length > 0;

  const { renderFavorite } = useFavoriteCitiesSection({
    selectedWeatherId,
    onSelect,
    onRemove,
  });

  return (
    <S.Section aria-labelledby='favorite-cities-title'>
      <S.Header>
        <S.Title id='favorite-cities-title'>
          <Heart
            size={14}
            strokeWidth={1.8}
            fill='currentColor'
            aria-hidden='true'
          />
          Favorites
        </S.Title>
        <S.Count>{favorites.length}</S.Count>
      </S.Header>

      {!hasFavorites && (
        <EmptyState
          title='No favorite cities yet.'
          description='Add a city from results or details to keep it here.'
        />
      )}
      {hasFavorites && (
        <S.List role='list'>{favorites.map(renderFavorite)}</S.List>
      )}
    </S.Section>
  );
};
