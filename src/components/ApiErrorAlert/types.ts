import type { IApiError } from '../../api';

export interface IApiErrorAlertProps {
  position?: 'top-right' | 'top-center' | 'bottom-right';
}

export interface IApiErrorDetails {
  title: string;
  description: string;
  error: IApiError;
}
