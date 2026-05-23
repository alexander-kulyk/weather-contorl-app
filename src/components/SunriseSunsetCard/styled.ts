import styled from 'styled-components';
import type { WeatherThemeKey } from '../../theme';

interface ICardProps {
  $themeKey: WeatherThemeKey;
}

export const Section = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing[4]};
`;

export const Title = styled.h2`
  color: inherit;
  font-size: ${({ theme }) => theme.typography.sectionTitle.fontSize};
  font-weight: ${({ theme }) => theme.typography.sectionTitle.fontWeight};
`;

export const Card = styled.div<ICardProps>`
  display: grid;
  grid-template-columns: minmax(180px, 0.8fr) repeat(3, 1fr);
  align-items: center;
  gap: ${({ theme }) => theme.spacing[6]};
  padding: ${({ theme }) => theme.spacing[6]};
  border: 1px solid rgba(255, 255, 255, 0.54);
  border-radius: ${({ theme }) => theme.radius.lg};
  color: ${({ theme, $themeKey }) => theme.weatherThemes[$themeKey].ink};
  background: ${({ theme, $themeKey }) => theme.weatherThemes[$themeKey].card};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const Arc = styled.div`
  position: relative;
  width: min(100%, 240px);
  aspect-ratio: 2 / 1;
  border-top: 1px dashed rgba(240, 163, 35, 0.62);
  border-radius: 240px 240px 0 0;
  background: linear-gradient(180deg, rgba(240, 163, 35, 0.14), transparent 72%);

  &::after {
    content: '';
    position: absolute;
    top: -10px;
    left: 62%;
    width: 22px;
    height: 22px;
    border: 5px solid rgba(255, 255, 255, 0.7);
    border-radius: 50%;
    background: #ffc85a;
  }
`;

export const Metric = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[2]};
`;

export const Label = styled.span<ICardProps>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme, $themeKey }) => theme.weatherThemes[$themeKey].inkSoft};
  font-size: ${({ theme }) => theme.typography.micro.fontSize};
  font-weight: ${({ theme }) => theme.typography.micro.fontWeight};
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const Value = styled.span`
  font-size: 1.5rem;
  font-weight: 800;
  line-height: 1.2;
`;
