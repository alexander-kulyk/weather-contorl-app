import type { ReactNode } from 'react';
import type { IApiError } from '../../api';

export interface IApiErrorProviderProps {
  children: ReactNode;
}

export interface IApiErrorContext {
  values: {
    apiError: IApiError | null;
  };
  handlers: {
    reportApiError: (error: IApiError) => void;
    clearApiError: () => void;
  };
}
