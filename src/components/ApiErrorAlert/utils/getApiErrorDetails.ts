import type { IApiError } from '../../../api';
import type { IApiErrorDetails } from '../types';
import { getApiErrorDescription } from './getApiErrorDescription';

export const getApiErrorDetails = (
  apiError: IApiError | null,
): IApiErrorDetails | null => {
  if (!apiError) {
    return null;
  }

  return {
    title: apiError.message,
    description: getApiErrorDescription(apiError.code),
    statusLabel: apiError.status ? `${apiError.status}` : 'No status',
    codeLabel: apiError.code,
  };
};
