//core
import React from 'react';
import { Search } from 'lucide-react';
//other
import type { IEmptyStateProps } from './types';
import * as S from './styled';

export const EmptyState: React.FC<IEmptyStateProps> = ({ title, description, icon }) => {
  const fallbackIcon = <Search size={22} strokeWidth={1.5} aria-hidden="true" />;
  const renderedIcon = icon ?? fallbackIcon;

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
