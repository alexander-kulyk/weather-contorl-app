import styled from 'styled-components';
import type { WeatherThemeKey } from '../../theme';

interface ICardProps {
  $themeKey: WeatherThemeKey;
}

export const Card = styled.article<ICardProps>`
  display: grid;
  gap: ${({ theme }) => theme.spacing[8]};
  padding: ${({ theme }) => theme.spacing[8]};
  border-radius: ${({ theme }) => theme.radius.xl};
  color: ${({ theme, $themeKey }) => theme.weatherThemes[$themeKey].ink};
  background: ${({ theme, $themeKey }) => theme.weatherThemes[$themeKey].gradient};
  box-shadow: ${({ theme }) => theme.shadows.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing[5]};
    gap: ${({ theme }) => theme.spacing[6]};
  }
`;

export const Hero = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: ${({ theme }) => theme.spacing[6]};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const CityBlock = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[4]};
`;

export const Location = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[1]};
`;

export const CityName = styled.h2`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  font-size: 2.25rem;
  font-weight: 800;
  line-height: 1.1;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

export const Address = styled.p<ICardProps>`
  color: ${({ theme, $themeKey }) => theme.weatherThemes[$themeKey].inkSoft};
`;

export const Temperature = styled.p`
  font-size: ${({ theme }) => theme.typography.weatherNumber.fontSize};
  font-weight: ${({ theme }) => theme.typography.weatherNumber.fontWeight};
  line-height: ${({ theme }) => theme.typography.weatherNumber.lineHeight};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.typography.weatherNumber.mobileFontSize};
  }
`;

export const ConditionBlock = styled.div`
  display: grid;
  align-content: start;
  justify-items: end;
  gap: ${({ theme }) => theme.spacing[4]};
  text-align: right;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    justify-items: start;
    text-align: left;
  }
`;

export const ConditionIcon = styled.div`
  color: inherit;
`;

export const ConditionText = styled.p`
  font-size: 1.625rem;
  font-weight: 700;
  line-height: 1.2;
`;

export const SoftText = styled.p<ICardProps>`
  color: ${({ theme, $themeKey }) => theme.weatherThemes[$themeKey].inkSoft};
  font-size: ${({ theme }) => theme.typography.small.fontSize};
`;

export const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(172px, 1fr));
  gap: ${({ theme }) => theme.spacing[3]};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(3, minmax(150px, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[4]};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    align-items: start;
    flex-direction: column;
  }
`;

export const SectionTitle = styled.h2`
  color: inherit;
  font-size: ${({ theme }) => theme.typography.sectionTitle.fontSize};
  font-weight: ${({ theme }) => theme.typography.sectionTitle.fontWeight};
`;
