import { isApiError, isRequestCanceled } from '../../../api';
import { weatherService } from '../../../services';
import { toAppError } from '../../../utils';
import type {
  IFetchSelectedCityWeatherParams,
  SelectedWeatherOutcome,
} from '../types';

export const fetchSelectedCityWeather = async ({
  city,
  onApiError,
  signal,
}: IFetchSelectedCityWeatherParams): Promise<SelectedWeatherOutcome> => {
  try {
    const weather = await weatherService.fetchByCity(city, signal);

    if (signal.aborted) {
      return { kind: 'aborted' };
    }

    return { kind: 'success', weather };
  } catch (requestError: unknown) {
    if (signal.aborted || isRequestCanceled(requestError)) {
      return { kind: 'aborted' };
    }

    if (isApiError(requestError)) {
      onApiError?.(requestError);
    }

    return { kind: 'error', error: toAppError(requestError) };
  }
};
