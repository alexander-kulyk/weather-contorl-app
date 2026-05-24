//core
import React, { useCallback, useMemo } from 'react';
import { useTheme } from 'styled-components';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
//components
import { EmptyState } from '../EmptyState';
//other
import { formatTemperature } from '../../utils';
import {
  formatTemperatureTick,
  getChartMargin,
  getChartSummary,
  getTooltipStyle,
  getVisibleHours,
  mapHoursToChartPoints,
} from './utils';
import type { IHourlyChartPoint, IHourlyForecastChartProps } from './types';
import * as S from './styled';

export const HourlyForecastChart: React.FC<IHourlyForecastChartProps> = ({
  hours,
  themeKey,
}) => {
  const theme = useTheme();
  const weatherTheme = theme.weatherThemes[themeKey];

  const visibleHours = useMemo(() => getVisibleHours(hours), [hours]);

  const chartData = useMemo<IHourlyChartPoint[]>(
    () => mapHoursToChartPoints(visibleHours),
    [visibleHours],
  );

  const summary = useMemo<string>(
    () => getChartSummary(chartData),
    [chartData],
  );
  const chartMargin = useMemo(
    () => getChartMargin(),
    [],
  );
  const tooltipStyle = useMemo<React.CSSProperties>(
    () => getTooltipStyle(theme),
    [theme],
  );

  const formatTick = useCallback(
    (value: string | number): string => formatTemperatureTick(value),
    [],
  );

  if (chartData.length === 0) {
    return <EmptyState title='Hourly forecast data is not available.' />;
  }

  return (
    <S.Section aria-labelledby='hourly-forecast-title'>
      <S.Header>
        <S.Title id='hourly-forecast-title'>Hourly forecast</S.Title>
        <S.Meta>Next 24 hours, every 3h</S.Meta>
      </S.Header>
      <S.Summary>{summary}</S.Summary>
      <S.ChartPanel $themeKey={themeKey} aria-hidden='true'>
        <ResponsiveContainer width='100%' height='100%'>
          <AreaChart data={chartData} margin={chartMargin}>
            <CartesianGrid stroke='rgba(11, 18, 32, 0.08)' vertical={false} />
            <XAxis
              dataKey='time'
              axisLine={false}
              tickLine={false}
              tick={{ fill: weatherTheme.inkSoft, fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: weatherTheme.inkSoft, fontSize: 12 }}
              tickFormatter={formatTick}
              width={44}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              labelStyle={{ color: theme.colors.textPrimary, fontWeight: 700 }}
              itemStyle={{ color: theme.colors.primary }}
            />
            <Area
              type='monotone'
              dataKey='temperature'
              name='Temperature'
              unit='°'
              stroke={weatherTheme.metricTint}
              strokeWidth={3}
              fill={weatherTheme.metricTint}
              fillOpacity={0.16}
              dot={{ r: 4, strokeWidth: 2, fill: theme.colors.surface }}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </S.ChartPanel>
      <table className='sr-only'>
        <caption>Hourly temperature forecast</caption>
        <thead>
          <tr>
            <th scope='col'>Time</th>
            <th scope='col'>Temperature</th>
            <th scope='col'>Condition</th>
          </tr>
        </thead>
        <tbody>
          {chartData.map((point: IHourlyChartPoint) => (
            <tr key={point.time}>
              <td>{point.time}</td>
              <td>{formatTemperature(point.temperature)}</td>
              <td>{point.conditions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </S.Section>
  );
};
