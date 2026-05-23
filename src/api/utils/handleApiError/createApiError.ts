import type { WeatherErrorCode } from '../../../types';
import type { IApiError } from '../../types';

export const createApiError = (
  code: WeatherErrorCode,
  message: string,
): IApiError =>
  Object.assign(new Error(message), {
    name: 'ApiError',
    code,
  });
