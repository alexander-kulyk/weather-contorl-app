//core
import React from 'react';
//other
import type { IButtonProps } from './types';
import * as S from './styled';

export const Button: React.FC<IButtonProps> = ({
  variant = 'solid',
  tone = 'primary',
  size = 'md',
  shape = 'square',
  iconOnly = false,
  fullWidth = false,
  justify = 'center',
  leadingIcon,
  trailingIcon,
  type = 'button',
  children,
  ...rest
}) => (
  <S.StyledButton
    type={type}
    $variant={variant}
    $tone={tone}
    $size={size}
    $shape={shape}
    $iconOnly={iconOnly}
    $fullWidth={fullWidth}
    $justify={justify}
    {...rest}
  >
    {leadingIcon && <S.IconSlot aria-hidden='true'>{leadingIcon}</S.IconSlot>}
    {children}
    {trailingIcon && <S.IconSlot aria-hidden='true'>{trailingIcon}</S.IconSlot>}
  </S.StyledButton>
);
