//core
import { useCallback, useMemo, useState } from 'react';
import type { FC } from 'react';
//other
import type { IApiError } from '../../api';
import { ApiErrorContext } from './context';
import type { IApiErrorProviderProps } from './types';

export const ApiErrorProvider: FC<IApiErrorProviderProps> = ({ children }) => {
  const [apiError, setApiError] = useState<IApiError | null>(null);

  const reportApiError = useCallback((error: IApiError): void => {
    setApiError(error);
  }, []);

  const clearApiError = useCallback((): void => {
    setApiError(null);
  }, []);

  const values = useMemo(
    () => ({
      apiError,
    }),
    [apiError],
  );

  const handlers = useMemo(
    () => ({
      reportApiError,
      clearApiError,
    }),
    [clearApiError, reportApiError],
  );

  return (
    <ApiErrorContext.Provider value={{ values, handlers }}>
      {children}
    </ApiErrorContext.Provider>
  );
};
