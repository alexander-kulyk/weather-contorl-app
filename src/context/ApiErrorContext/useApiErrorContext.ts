import { useContext } from 'react';
import { ApiErrorContext } from './context';
import type { IApiErrorContext } from './types';

export const useApiErrorContext = (): IApiErrorContext => {
  const contextValue = useContext(ApiErrorContext);

  if (!contextValue) {
    throw new Error('useApiErrorContext must be used inside ApiErrorProvider.');
  }

  return contextValue;
};
