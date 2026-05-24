import type { ReactNode } from 'react';
import type { AsyncStatus, IAppError, IWeatherResponse } from '../../types';

export interface IWeatherSearchProviderProps {
  children: ReactNode;
}

export interface IWeatherSearchContext {
  values: {
    searchQuery: string;
    searchResults: IWeatherResponse[];
    searchStatus: AsyncStatus;
    searchError: IAppError | null;
    hasSearchStarted: boolean;
  };
  handlers: {
    setSearchQuery: (query: string) => void;
    clearSearch: () => void;
  };
}
