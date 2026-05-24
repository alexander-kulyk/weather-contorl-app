//core
import React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
//components
import { Button } from '../Button';
//other
import { useModalBehavior } from './hooks';
import type { IModalProps } from './types';
import * as S from './styled';

export const Modal: React.FC<IModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  titleIcon,
  headerActions,
  children,
  footer,
  size = 'md',
  closeOnOverlayClick = true,
  showCloseButton = true,
}) => {
  const { surfaceRef, titleId, descriptionId } = useModalBehavior({
    isOpen,
    onClose,
  });

  const handleOverlayClick = (): void => {
    if (!closeOnOverlayClick) {
      return;
    }

    onClose();
  };

  const handleSurfaceClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    event.stopPropagation();
  };

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <S.Overlay onClick={handleOverlayClick}>
      <S.Surface
        ref={surfaceRef}
        role='dialog'
        aria-modal='true'
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        $size={size}
        onClick={handleSurfaceClick}
      >
        <S.Header>
          <S.TitleRow>
            {titleIcon && <S.TitleIcon aria-hidden='true'>{titleIcon}</S.TitleIcon>}
            <S.Title id={titleId}>{title}</S.Title>
            {headerActions && <S.HeaderActions>{headerActions}</S.HeaderActions>}
          </S.TitleRow>
          {showCloseButton && (
            <Button
              variant='ghost'
              tone='secondary'
              size='sm'
              shape='pill'
              iconOnly
              aria-label='Close dialog'
              onClick={onClose}
            >
              <X size={18} strokeWidth={1.8} aria-hidden='true' />
            </Button>
          )}
        </S.Header>

        {description && (
          <S.Description id={descriptionId}>{description}</S.Description>
        )}

        <S.Body>{children}</S.Body>

        {footer && <S.Footer>{footer}</S.Footer>}
      </S.Surface>
    </S.Overlay>,
    document.body,
  );
};
