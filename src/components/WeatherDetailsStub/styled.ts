import styled from 'styled-components';

export const Card = styled.section`
  position: relative;
  min-width: 0;
  min-height: 100%;
  display: grid;
  align-content: start;
  gap: ${({ theme }) => theme.spacing[6]};
  padding: ${({ theme }) => theme.spacing[10]};
  border-radius: ${({ theme }) => theme.radius.xl};
  background: linear-gradient(135deg, #EAF2FF 0%, #FFE7D2 100%);
  box-shadow: ${({ theme }) => theme.shadows.sm};
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing[6]};
    gap: ${({ theme }) => theme.spacing[5]};
  }
`;

export const Sun = styled.div`
  position: absolute;
  top: -180px;
  right: -180px;
  width: 620px;
  height: 620px;
  border-radius: 50%;
  pointer-events: none;
  background:
    radial-gradient(circle at center, rgba(255, 180, 100, 0.85) 0%, transparent 18%),
    radial-gradient(circle at center, rgba(255, 200, 140, 0.5) 0%, transparent 34%),
    radial-gradient(circle at center, rgba(255, 215, 156, 0.28) 0%, transparent 56%);
  filter: blur(1px);

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 360px;
    height: 360px;
    top: -120px;
    right: -120px;
  }
`;

export const Header = styled.header`
  position: relative;
  z-index: 1;
  display: grid;
  gap: ${({ theme }) => theme.spacing[4]};
  max-width: 620px;
`;

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.micro.fontSize};
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  width: fit-content;
`;

export const Title = styled.h2`
  min-width: 0;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 800;
  line-height: 1.05;
  margin: 0;
  max-width: 540px;
  overflow-wrap: anywhere;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: clamp(1.875rem, 10vw, 2.375rem);
  }
`;

export const Description = styled.p`
  min-width: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  line-height: 1.55;
  margin: 0;
  max-width: 560px;
  overflow-wrap: anywhere;
`;

export const Preview = styled.div`
  position: relative;
  z-index: 1;
  min-width: 0;
  display: grid;
  gap: ${({ theme }) => theme.spacing[5]};
  padding: ${({ theme }) => theme.spacing[5]};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing[4]};
  }
`;

export const PreviewHero = styled.div`
  min-width: 0;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[4]};
`;

export const PreviewLines = styled.div`
  min-width: 0;
  display: grid;
  gap: ${({ theme }) => theme.spacing[2]};
`;

interface ILineProps {
  $width: string;
  $height?: string;
}

export const Line = styled.span<ILineProps>`
  display: block;
  width: min(${({ $width }) => $width}, 100%);
  height: ${({ $height }) => $height ?? '14px'};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.surfaceAlt};
`;

export const PreviewIcon = styled.span`
  display: inline-flex;
  color: ${({ theme }) => theme.colors.textMuted};
  opacity: 0.55;
`;

export const PreviewMetrics = styled.div`
  min-width: 0;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing[3]};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const MetricCard = styled.div`
  min-width: 0;
  display: grid;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.radius.md};
  background: rgba(255, 255, 255, 0.7);
`;

export const MetricHead = styled.div`
  min-width: 0;
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const MetricLabel = styled.span`
  min-width: 0;
  font-size: ${({ theme }) => theme.typography.micro.fontSize};
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  overflow-wrap: anywhere;
`;

export const CtaRow = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  min-width: 0;

  > button {
    max-width: 100%;
    min-width: 0;
    white-space: normal;
    overflow-wrap: anywhere;
    line-height: 1.25;
    text-align: center;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    > button {
      width: 100%;
      min-height: 56px;
      padding-top: ${({ theme }) => theme.spacing[3]};
      padding-bottom: ${({ theme }) => theme.spacing[3]};
    }
  }
`;
