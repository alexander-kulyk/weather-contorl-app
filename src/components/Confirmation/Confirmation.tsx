//core
import React from 'react';
//other
import type { IConfirmationProps } from './types';
import * as S from './styled';

const DEFAULT_ARIA_LABEL = 'Confirmation';

export const Confirmation: React.FC<IConfirmationProps> = ({
  title,
  description,
  icon,
  confirmLabel = 'Confirm',
  tone = 'primary',
  layout = 'inline',
  role = 'dialog',
  ariaLabel,
  onConfirm,
}) => {
  const resolvedAriaLabel =
    ariaLabel ?? (typeof title === 'string' ? title : DEFAULT_ARIA_LABEL);

  return (
    <S.Surface $layout={layout}>
      <S.Dialog $layout={layout} role={role} aria-label={resolvedAriaLabel}>
        {icon && <S.Icon $tone={tone}>{icon}</S.Icon>}
        <S.Copy>
          <S.Title $layout={layout}>{title}</S.Title>
          {description && <S.Description>{description}</S.Description>}
        </S.Copy>
        <S.ConfirmButton type="button" $tone={tone} onClick={onConfirm}>
          {confirmLabel}
        </S.ConfirmButton>
      </S.Dialog>
    </S.Surface>
  );
};
