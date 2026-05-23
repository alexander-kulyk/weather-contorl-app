//core
import React, { useCallback } from 'react';
import { LoaderCircle, Search, X } from 'lucide-react';
//other
import type { ISearchInputProps } from './types';
import * as S from './styled';

const SEARCH_INPUT_ID = 'city-search';
const SEARCH_ERROR_ID = 'city-search-error';

export const SearchInput: React.FC<ISearchInputProps> = ({
  value,
  status,
  error,
  onChange,
  onClear,
  disabled = false,
}) => {
  const hasError = status === 'error' && Boolean(error);
  const isLoading = status === 'loading';
  const hasValue = value.length > 0;
  const describedBy = hasError ? SEARCH_ERROR_ID : undefined;

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      onChange(event.target.value);
    },
    [onChange],
  );

  return (
    <S.Wrapper>
      <S.Label htmlFor={SEARCH_INPUT_ID}>Search</S.Label>
      <S.Field $hasError={hasError}>
        <S.IconSlot $isLoading={isLoading}>
          {isLoading ? (
            <LoaderCircle size={20} strokeWidth={1.5} aria-hidden="true" />
          ) : (
            <Search size={20} strokeWidth={1.5} aria-hidden="true" />
          )}
        </S.IconSlot>
        <S.Input
          id={SEARCH_INPUT_ID}
          type="search"
          value={value}
          placeholder="Search city..."
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={describedBy}
          autoComplete="off"
          onChange={handleChange}
        />
        {hasValue && (
          <S.ClearButton type="button" aria-label="Clear city search" onClick={onClear}>
            <X size={16} strokeWidth={1.8} aria-hidden="true" />
          </S.ClearButton>
        )}
      </S.Field>
      {hasError && <S.ErrorText id={SEARCH_ERROR_ID}>{error?.message}</S.ErrorText>}
    </S.Wrapper>
  );
};
