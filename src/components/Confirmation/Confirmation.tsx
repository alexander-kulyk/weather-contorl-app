//core
import React, { useEffect } from 'react';
import { X } from 'lucide-react';
//other
import { checkIsModalRole, getConfirmationAriaLabel } from './utils';
import type { IConfirmationProps } from './types';
import * as S from './styled';

export const Confirmation: React.FC<IConfirmationProps> = ({
  title,
  description,
  icon,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  tone = 'primary',
  layout = 'page',
  role = 'dialog',
  ariaLabel,
  onCancel,
  onConfirm,
}) => {
  const resolvedAriaLabel = getConfirmationAriaLabel(title, ariaLabel);
  const isModalRole = checkIsModalRole(role);
  const hasCancelAction = Boolean(onCancel);
  const actionShape = layout === 'page' ? 'pill' : 'square';

  useEffect((): (() => void) | undefined => {
    if (typeof document === 'undefined') {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    return (): void => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect((): (() => void) | undefined => {
    if (!onCancel || typeof window === 'undefined') {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onCancel();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return (): void => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onCancel]);

  return (
    <S.Overlay $layout={layout}>
      <S.Dialog
        $layout={layout}
        role={role}
        aria-label={resolvedAriaLabel}
        aria-modal={isModalRole}
      >
        {onCancel && (
          <S.CloseButton
            variant='ghost'
            tone='secondary'
            size='sm'
            shape='pill'
            iconOnly
            aria-label='Close confirmation'
            onClick={onCancel}
          >
            <X size={20} strokeWidth={1.8} aria-hidden='true' />
          </S.CloseButton>
        )}
        {icon && (
          <S.Icon $tone={tone} $layout={layout}>
            {icon}
          </S.Icon>
        )}
        <S.Copy>
          <S.Title $layout={layout}>{title}</S.Title>
          {description && <S.Description>{description}</S.Description>}
        </S.Copy>
        <S.Actions $layout={layout} $hasCancel={hasCancelAction}>
          {onCancel && (
            <S.CancelButton
              variant='outline'
              tone='secondary'
              size='lg'
              shape={actionShape}
              $layout={layout}
              autoFocus
              onClick={onCancel}
            >
              {cancelLabel}
            </S.CancelButton>
          )}
          <S.ConfirmButton
            variant='solid'
            tone={tone}
            size='lg'
            shape={actionShape}
            $layout={layout}
            autoFocus={!hasCancelAction}
            onClick={onConfirm}
          >
            {confirmLabel}
          </S.ConfirmButton>
        </S.Actions>
      </S.Dialog>
    </S.Overlay>
  );
};
