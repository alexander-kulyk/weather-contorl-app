import type { ConfirmationRole } from '../types';

export const checkIsModalRole = (role: ConfirmationRole): boolean =>
  role === 'dialog' || role === 'alertdialog';
