//core
import React from 'react';
import { ArrowLeft, CloudSun, MapPin } from 'lucide-react';
//components
import { Button } from '../Button';
import { SEARCH_INPUT_ID } from '../SearchInput';
//other
import { getMetricIcon } from '../../utils';
import { STUB_METRICS, type IStubMetric } from './constants';
import * as S from './styled';

const PREVIEW_ICON_SIZE = 56;

export const WeatherDetailsStub: React.FC = () => {
  const handleFocusSearch = (): void => {
    if (typeof document === 'undefined') {
      return;
    }

    document.getElementById(SEARCH_INPUT_ID)?.focus();
  };

  return (
    <S.Card aria-labelledby='weather-stub-title'>
      <S.Sun aria-hidden='true' />

      <S.Header>
        <S.Badge>
          <MapPin size={14} strokeWidth={1.8} aria-hidden='true' />
          No city selected
        </S.Badge>
        <S.Title id='weather-stub-title'>
          Select a city to see its weather
        </S.Title>
        <S.Description>
          Search for a city on the left, or tap one of your favorites. You'll
          see the current conditions, an hourly chart, a 15-day forecast and
          sunrise &amp; sunset times here.
        </S.Description>
      </S.Header>

      <S.Preview aria-hidden='true'>
        <S.PreviewHero>
          <S.PreviewLines>
            <S.Line $width='260px' $height='18px' />
            <S.Line $width='160px' $height='12px' />
          </S.PreviewLines>
          <S.PreviewIcon>
            <CloudSun size={PREVIEW_ICON_SIZE} strokeWidth={1.5} />
          </S.PreviewIcon>
        </S.PreviewHero>

        <S.PreviewMetrics>
          {STUB_METRICS.map((metric: IStubMetric) => (
            <S.MetricCard key={metric.id}>
              <S.MetricHead>
                {getMetricIcon(metric.id)}
                <S.MetricLabel>{metric.label}</S.MetricLabel>
              </S.MetricHead>
              <S.Line $width='80%' $height='10px' />
            </S.MetricCard>
          ))}
        </S.PreviewMetrics>
      </S.Preview>

      <S.CtaRow>
        <Button
          variant='solid'
          tone='primary'
          size='md'
          shape='pill'
          leadingIcon={<ArrowLeft size={16} strokeWidth={1.8} />}
          onClick={handleFocusSearch}
        >
          Start typing a city name in the search above
        </Button>
      </S.CtaRow>
    </S.Card>
  );
};
