export interface IApiErrorAlertProps {
  position?: 'top-right' | 'top-center' | 'bottom-right' | 'bottom-left';
}

export interface IApiErrorDetails {
  title: string;
  description: string;
  statusLabel: string;
  codeLabel: string;
}
