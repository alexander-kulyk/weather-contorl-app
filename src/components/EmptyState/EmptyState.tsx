//core
import React from 'react';
//other
import { getEmptyStateIcon } from './utils';
import type { IEmptyStateProps } from './types';
import * as S from './styled';

export const EmptyState: React.FC<IEmptyStateProps> = ({ title, description, icon }) => {
  const renderedIcon = getEmptyStateIcon(icon);

  return (
    <S.Wrapper>
      <S.Content>
        <S.Icon>{renderedIcon}</S.Icon>
        <S.Title>{title}</S.Title>
        {description && <S.Description>{description}</S.Description>}
      </S.Content>
    </S.Wrapper>
  );
};
