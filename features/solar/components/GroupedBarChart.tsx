import React from 'react';
import { View } from 'react-native';
import Svg, { G, Line, Rect, Text as SvgText } from 'react-native-svg';

import { solarColors } from '../theme/colors';

type GroupedBarChartProps = {
  labels: string[];
  plant: number[];
  twin: number[];
  width: number;
  height: number;
  maxValue: number;
  dark?: boolean;
};

export function GroupedBarChart({ labels, plant, twin, width, height, maxValue, dark = false }: GroupedBarChartProps) {
  const paddingLeft = 36;
  const paddingRight = dark ? 14 : 6;
  const paddingTop = 14;
  const paddingBottom = dark ? 44 : 28;
  const plotWidth = width - paddingLeft - paddingRight;
  const plotHeight = height - paddingTop - paddingBottom;
  const groupCount = plant.length;
  const groupWidth = plotWidth / groupCount;
  const barWidth = Math.max(3, Math.min(dark ? 8 : 5, groupWidth * 0.24));
  const gridColor = dark ? '#20324d' : '#edf0f4';
  const labelColor = dark ? '#8198c1' : '#9a9a9a';
  const ticks = maxValue <= 12 ? [0, 2, 4, 6, 8, 10, 12] : [0, 20, 40, 60, 80, 100, 120, 140];
  const shownLabelIndexes = labels.map((_, index) => Math.round((index * (groupCount - 1)) / Math.max(1, labels.length - 1)));
  const xAxisLabelY = height - (dark ? 18 : 5);

  function y(value: number) {
    return paddingTop + plotHeight - (value / maxValue) * plotHeight;
  }

  return (
    <View>
      <Svg width={width} height={height}>
        {ticks.map((tick) => {
          const tickY = y(tick);
          return (
            <G key={tick}>
              <Line x1={paddingLeft} x2={width - paddingRight} y1={tickY} y2={tickY} stroke={gridColor} strokeWidth={1} />
              <SvgText
                fill={labelColor}
                fontSize={dark ? 11 : 9}
                fontWeight="700"
                textAnchor="end"
                x={paddingLeft - 7}
                y={tickY + 4}
              >
                {tick}
              </SvgText>
            </G>
          );
        })}

        <Line x1={paddingLeft} x2={paddingLeft} y1={paddingTop} y2={paddingTop + plotHeight} stroke={gridColor} />

        {plant.map((value, index) => {
          const x = paddingLeft + index * groupWidth + groupWidth / 2 - barWidth - 1;
          const plantY = y(value);
          const twinY = y(twin[index]);
          return (
            <G key={index}>
              <Rect
                fill={solarColors.accent}
                height={paddingTop + plotHeight - plantY}
                rx={dark ? 0 : 1}
                width={barWidth}
                x={x}
                y={plantY}
              />
              <Rect
                fill={solarColors.blue}
                height={paddingTop + plotHeight - twinY}
                rx={dark ? 0 : 1}
                width={barWidth}
                x={x + barWidth + 2}
                y={twinY}
              />
            </G>
          );
        })}

        {labels.map((label, index) => {
          const sourceIndex = shownLabelIndexes[index];
          const x = paddingLeft + sourceIndex * groupWidth + groupWidth / 2;
          return (
            <SvgText
              key={`${label}-${index}`}
              fill={labelColor}
              fontSize={dark ? 11 : 9}
              fontWeight="800"
              textAnchor="middle"
              x={x}
              y={xAxisLabelY}
            >
              {label}
            </SvgText>
          );
        })}

        <SvgText
          fill={labelColor}
          fontSize={dark ? 11 : 9}
          fontWeight="800"
          rotation="-90"
          textAnchor="middle"
          x={-(paddingTop + plotHeight / 2)}
          y={9}
        >
          kWh
        </SvgText>
      </Svg>
    </View>
  );
}
