import type { AsyncStatus, IAppError } from '../../../types';
import type { ISearchInputState } from '../types';

export const getSearchInputState = (
  value: string,
  status: AsyncStatus,
  error: IAppError | null,
): ISearchInputState => {
  const hasError =
    Boolean(error) && (status === 'error' || error?.code === 'NO_RESULTS');

  return {
    hasError,
    showErrorText: hasError && error?.code !== 'NO_RESULTS',
    isLoading: status === 'loading',
    hasValue: value.length > 0,
  };
};
