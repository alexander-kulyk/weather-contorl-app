//core
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
//other
import type { ILoadingSkeletonProps } from './types';
import * as S from './styled';

export const LoadingSkeleton: React.FC<ILoadingSkeletonProps> = ({
  variant = 'rows',
  rows = 3,
}) => {
  if (variant === 'details') {
    return (
      <S.DetailWrapper aria-label="Loading weather details">
        <Skeleton width="38%" height={44} />
        <Skeleton width="26%" height={96} />
        <Skeleton count={2} height={112} />
        <Skeleton height={220} />
      </S.DetailWrapper>
    );
  }

  return (
    <S.Wrapper aria-label="Loading weather data">
      <Skeleton count={rows} height={64} borderRadius={14} />
    </S.Wrapper>
  );
};
