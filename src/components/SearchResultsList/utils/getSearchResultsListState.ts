import type { AsyncStatus } from '../../../types';
import type { ISearchResultsListState } from '../types';

export const getSearchResultsListState = (
  resultCount: number,
  hasSearchStarted: boolean,
  status: AsyncStatus,
): ISearchResultsListState => {
  const hasResults = resultCount > 0;

  return {
    hasResults,
    hasNoResults: hasSearchStarted && status === 'success' && !hasResults,
    showInitialEmpty: !hasSearchStarted && status !== 'loading',
    resultCount,
  };
};
