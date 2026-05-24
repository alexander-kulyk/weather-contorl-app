//core
import React, { useEffect } from 'react';
//other
import { checkIsModalRole, getConfirmationAriaLabel } from './utils';
import type { IConfirmationProps } from './types';
import * as S from './styled';

export const Confirmation: React.FC<IConfirmationProps> = ({
  title,
  description,
  icon,
  confirmLabel = 'Confirm',
  tone = 'primary',
  layout = 'page',
  role = 'dialog',
  ariaLabel,
  onConfirm,
}) => {
  const resolvedAriaLabel = getConfirmationAriaLabel(title, ariaLabel);
  const isModalRole = checkIsModalRole(role);

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

  return (
    <S.Overlay $layout={layout}>
      <S.Dialog
        $layout={layout}
        role={role}
        aria-label={resolvedAriaLabel}
        aria-modal={isModalRole}
      >
        {icon && <S.Icon $tone={tone}>{icon}</S.Icon>}
        <S.Copy>
          <S.Title $layout={layout}>{title}</S.Title>
          {description && <S.Description>{description}</S.Description>}
        </S.Copy>
        <S.ConfirmButton
          variant='solid'
          tone={tone}
          size='lg'
          shape='pill'
          $layout={layout}
          autoFocus
          onClick={onConfirm}
        >
          {confirmLabel}
        </S.ConfirmButton>
      </S.Dialog>
    </S.Overlay>
  );
};
