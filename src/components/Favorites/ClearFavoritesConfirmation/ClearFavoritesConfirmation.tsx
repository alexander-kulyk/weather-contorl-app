//core
import React from 'react';
import { AlertTriangle } from 'lucide-react';
//components
import { Confirmation } from '../../Confirmation';
//other
import { getClearFavoritesDescription } from './utils';
import type { IClearFavoritesConfirmationProps } from './types';

const WARNING_ICON_SIZE = 40;

export const ClearFavoritesConfirmation: React.FC<
  IClearFavoritesConfirmationProps
> = ({ favoritesCount, isOpen, onCancel, onConfirm }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <Confirmation
      title='Clear all favorites?'
      description={getClearFavoritesDescription(favoritesCount)}
      icon={
        <AlertTriangle
          size={WARNING_ICON_SIZE}
          strokeWidth={1.7}
          aria-hidden='true'
        />
      }
      confirmLabel='Clear all'
      cancelLabel='Cancel'
      tone='danger'
      layout='inline'
      role='alertdialog'
      ariaLabel='Clear all favorite cities'
      onCancel={onCancel}
      onConfirm={onConfirm}
    />
  );
};
