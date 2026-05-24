//core
import React from 'react';
import { Heart } from 'lucide-react';
//components
import { Button } from '../../Button';
import { EmptyState } from '../../EmptyState';
import { ClearFavoritesConfirmation } from '../ClearFavoritesConfirmation';
import { FavoriteCityItem } from '../FavoriteCityItem';
import { Modal } from '../../Modal';
//other
import { useFavoritesModal } from './hooks';
import type { IFavoriteCity } from '../../../types';
import type { IFavoritesModalProps } from './types';
import * as S from './styled';

const MODAL_DESCRIPTION =
  'Tap a city to view its weather, or remove cities you no longer need.';

export const FavoritesModal: React.FC<IFavoritesModalProps> = ({
  isOpen,
  selectedWeatherId,
  onClose,
  onSelect,
}) => {
  const { values, handlers } = useFavoritesModal({ onClose, onSelect });
  const hasFavorites = values.favoritesCount > 0;

  const footer = (
    <>
      <Button
        variant='outline'
        tone='secondary'
        size='md'
        onClick={onClose}
      >
        Close
      </Button>
      <Button
        variant='solid'
        tone='danger'
        size='md'
        aria-label='Clear all favorite cities'
        disabled={!hasFavorites}
        onClick={handlers.handleOpenClearConfirmation}
      >
        Clear all favorites
      </Button>
    </>
  );

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title='Favorite cities'
        description={MODAL_DESCRIPTION}
        titleIcon={
          <Heart size={18} strokeWidth={1.8} fill='currentColor' aria-hidden='true' />
        }
        headerActions={
          <S.HeaderCount aria-label={`${values.favoritesCount} favorite cities`}>
            {values.favoritesCount}
          </S.HeaderCount>
        }
        footer={footer}
        size='md'
      >
        {hasFavorites ? (
          <S.List role='list'>
            {values.favorites.map((favorite: IFavoriteCity) => (
              <FavoriteCityItem
                key={favorite.id}
                favorite={favorite}
                isSelected={selectedWeatherId === favorite.id}
                onSelect={handlers.handleSelect}
                onRemove={handlers.handleRemove}
              />
            ))}
          </S.List>
        ) : (
          <EmptyState
            title='No favorite cities yet.'
            description='Add a city from search results or details to keep it here.'
          />
        )}
      </Modal>

      <ClearFavoritesConfirmation
        favoritesCount={values.favoritesCount}
        isOpen={isOpen && hasFavorites && values.isClearConfirmationOpen}
        onCancel={handlers.handleCloseClearConfirmation}
        onConfirm={handlers.handleConfirmClearAll}
      />
    </>
  );
};
