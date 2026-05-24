//core
import React from 'react';
import { ChevronRight, Heart } from 'lucide-react';
//components
import { Button } from '../../Button';
import { EmptyState } from '../../EmptyState';
import { ClearFavoritesConfirmation } from '../ClearFavoritesConfirmation';
import { FavoriteCityItem } from '../FavoriteCityItem';
import { FavoritesModal } from '../FavoritesModal';
//other
import type { IFavoriteCitiesSectionProps } from './types';
import { useFavoriteCitiesSection } from './hooks';
import type { IFavoriteCity } from '../../../types';
import * as S from './styled';

const PREVIEW_LIMIT = 5;

export const FavoriteCitiesSection: React.FC<IFavoriteCitiesSectionProps> = ({
  selectedWeatherId,
  onSelect,
}) => {
  const { values, handlers } = useFavoriteCitiesSection();
  const hasFavorites = values.favoritesCount > 0;
  const isScrollable = values.favoritesCount > PREVIEW_LIMIT;

  return (
    <S.Section aria-labelledby='favorite-cities-title'>
      <S.Header>
        <S.HeaderLead>
          <S.Title id='favorite-cities-title'>
            <S.HeartIcon>
              <Heart
                size={14}
                strokeWidth={1.8}
                fill='currentColor'
                aria-hidden='true'
              />
            </S.HeartIcon>
            Favorites
          </S.Title>
          <S.Count aria-label={`${values.favoritesCount} favorite cities`}>
            {values.favoritesCount}
          </S.Count>
        </S.HeaderLead>
        {hasFavorites && (
          <Button
            variant='ghost'
            tone='secondary'
            size='sm'
            aria-label='Clear all favorite cities'
            onClick={handlers.handleOpenClearConfirmation}
          >
            Clear all
          </Button>
        )}
      </S.Header>

      {!hasFavorites && (
        <EmptyState
          title='No favorites yet'
          description='Tap the heart on any city to pin it here for quick access.'
          icon={
            <Heart
              size={32}
              strokeWidth={1.7}
              fill='currentColor'
              aria-hidden='true'
            />
          }
          tone='accent'
        />
      )}

      {hasFavorites && (
        <S.List aria-label='Favorite cities' $isScrollable={isScrollable}>
          {values.favorites.map((favorite: IFavoriteCity) => (
            <FavoriteCityItem
              key={favorite.id}
              favorite={favorite}
              isSelected={selectedWeatherId === favorite.id}
              onSelect={onSelect}
              onRemove={handlers.handleRemove}
            />
          ))}
        </S.List>
      )}

      {isScrollable && (
        <S.ViewAllButton
          type='button'
          aria-label='Open all favorite cities'
          onClick={handlers.handleOpenModal}
        >
          View all favorites
          <S.ViewAllTrail>
            <S.Count aria-hidden='true'>{values.favoritesCount}</S.Count>
            <ChevronRight size={18} strokeWidth={1.8} aria-hidden='true' />
          </S.ViewAllTrail>
        </S.ViewAllButton>
      )}

      <FavoritesModal
        isOpen={values.isModalOpen}
        selectedWeatherId={selectedWeatherId}
        onClose={handlers.handleCloseModal}
        onSelect={onSelect}
      />

      <ClearFavoritesConfirmation
        favoritesCount={values.favoritesCount}
        isOpen={hasFavorites && values.isClearConfirmationOpen}
        onCancel={handlers.handleCloseClearConfirmation}
        onConfirm={handlers.handleConfirmClearAll}
      />
    </S.Section>
  );
};
