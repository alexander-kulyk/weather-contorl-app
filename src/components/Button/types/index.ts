import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'soft';
export type ButtonTone =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'success'
  | 'warning';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonShape = 'square' | 'pill';
export type ButtonJustify = 'center' | 'between' | 'start';

export interface IButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  variant?: ButtonVariant;
  tone?: ButtonTone;
  size?: ButtonSize;
  shape?: ButtonShape;
  iconOnly?: boolean;
  fullWidth?: boolean;
  justify?: ButtonJustify;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  children?: ReactNode;
}

export interface IStyledButtonProps {
  $variant: ButtonVariant;
  $tone: ButtonTone;
  $size: ButtonSize;
  $shape: ButtonShape;
  $iconOnly: boolean;
  $fullWidth: boolean;
  $justify: ButtonJustify;
}
