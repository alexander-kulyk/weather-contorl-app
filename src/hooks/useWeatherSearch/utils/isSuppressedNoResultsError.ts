import type { IApiError } from '../../../api';

const LOCATION_NOT_FOUND_MESSAGE = 'No valid locations could be determined';
const ADDRESS_TOO_SHORT_MESSAGE =
  'Address is too short to be uniquely identified';
const SUPPRESSED_NO_RESULTS_MESSAGES = [
  LOCATION_NOT_FOUND_MESSAGE,
  ADDRESS_TOO_SHORT_MESSAGE,
] as const;

export const isSuppressedNoResultsError = (error: IApiError): boolean =>
  error.code === 'NO_RESULTS' &&
  SUPPRESSED_NO_RESULTS_MESSAGES.some((message: string): boolean =>
    Boolean(error.details?.includes(message)),
  );
