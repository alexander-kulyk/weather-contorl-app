import { isApiError } from '../../../api';
import type { IApiError } from '../../../api';
import { isSuppressedNoResultsError } from './isSuppressedNoResultsError';

export const shouldReportApiError = (error: unknown): error is IApiError =>
  isApiError(error) && !isSuppressedNoResultsError(error);
