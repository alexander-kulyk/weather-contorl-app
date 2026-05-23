//core
import React from 'react';
import { AlertTriangle, Search } from 'lucide-react';
//components
import { EmptyState } from '../EmptyState';
import { ErrorMessage } from '../ErrorMessage';
import { LoadingSkeleton } from '../LoadingSkeleton';
import { SearchResultRow } from '../SearchResultRow';
//other
import type { ISearchResultsListProps } from './types';
import type { IWeatherResponse } from '../../types';
import * as S from './styled';

const SEARCH_RESULTS_ERROR_MESSAGE = 'Could not load weather data.';

export const SearchResultsList: React.FC<ISearchResultsListProps> = ({
  results,
  status,
  error,
  hasSearchStarted,
  selectedWeatherId,
  isFavorite,
  onSelect,
  onToggleFavorite,
}) => {
  const hasResults = results.length > 0;
  const hasNoResults =
    hasSearchStarted && status === 'success' && !hasResults;
  const showInitialEmpty = !hasSearchStarted && status !== 'loading';
  const resultCount = results.length;

  return (
    <S.Section aria-labelledby="search-results-title">
      <S.Header>
        <S.Label id="search-results-title">
          <Search size={15} strokeWidth={1.7} aria-hidden="true" />
          Results - {resultCount}
        </S.Label>
        {hasResults && <S.Hint>Click a row to view details</S.Hint>}
      </S.Header>

      {showInitialEmpty && (
        <EmptyState title="Start by typing a city name to check the weather." />
      )}
      {status === 'loading' && <LoadingSkeleton rows={2} />}
      {status === 'error' && error && (
        <ErrorMessage message={SEARCH_RESULTS_ERROR_MESSAGE} />
      )}
      {hasNoResults && (
        <S.ResultNotice role="status" $variant="error">
          <AlertTriangle size={22} strokeWidth={1.7} aria-hidden="true" />
          <S.ResultNoticeText>
            No cities found. Check the spelling and try again.
          </S.ResultNoticeText>
        </S.ResultNotice>
      )}
      {hasResults && (
        <S.List role="list" aria-label="Weather search results">
          {results.map((weather: IWeatherResponse) => (
            <SearchResultRow
              key={weather.id}
              weather={weather}
              isSelected={selectedWeatherId === weather.id}
              isFavorite={isFavorite(weather.id)}
              onSelect={onSelect}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </S.List>
      )}
    </S.Section>
  );
};
