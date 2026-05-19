import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect } from 'react';
import { Platform, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { KpiOption, MetricRange, metricRanges } from '../data/monitoring';
import { useLiveEnergyData } from '../hooks/useLiveEnergyData';
import { translations } from '../i18n/translations';
import { solarColors } from '../theme/colors';
import { GroupedBarChart } from './GroupedBarChart';

type FullScreenChartProps = {
  isVisible: boolean;
  selectedKpi: KpiOption;
  activeRange: MetricRange;
  onRangeChange: (range: MetricRange) => void;
  t: (typeof translations)['EN'];
  onClose: () => void;
};

export function FullScreenChart({
  isVisible,
  selectedKpi,
  activeRange,
  onRangeChange,
  t,
  onClose,
}: FullScreenChartProps) {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const energyChartData = useLiveEnergyData(activeRange, [t.plantMeasurement, t.digitalTwin]);
  const isLineChart = activeRange === 'Hour';
  const maxValue = activeRange === 'Day' ? 12 : 140;
  const horizontalPadding = 16;
  const verticalPadding = 12;
  const availableWidth = width - insets.left - insets.right - horizontalPadding * 2;
  const availableHeight = height - insets.top - insets.bottom - verticalPadding * 2;
  const chartWidth = Math.max(320, availableWidth);
  const chartHeight = isLineChart
    ? Math.max(160, Math.min(230, availableHeight - 156))
    : Math.max(150, Math.min(205, availableHeight - 154));

  useEffect(() => {
    if (!isVisible || Platform.OS === 'web') {
      return undefined;
    }

    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE).catch(() => undefined);

    return () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP).catch(() => undefined);
    };
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  return (
    <View
      style={[
        styles.overlay,
        {
          paddingBottom: Math.max(verticalPadding, insets.bottom + 6),
          paddingLeft: Math.max(horizontalPadding, insets.left + horizontalPadding),
          paddingRight: Math.max(horizontalPadding, insets.right + horizontalPadding),
          paddingTop: Math.max(verticalPadding, insets.top + 8),
        },
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{t.kpis[selectedKpi]}</Text>
        <Pressable onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeText}>× {t.close}</Text>
        </Pressable>
      </View>

      <View style={styles.segmentedControl}>
        {metricRanges.map((range) => (
          <Pressable
            key={range}
            onPress={() => onRangeChange(range)}
            style={[styles.segment, activeRange === range && styles.segmentActive]}
          >
            <Text style={[styles.segmentText, activeRange === range && styles.segmentTextActive]}>
              {t.ranges[range]}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.legendRow}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, styles.plantDot]} />
          <Text style={styles.legendText}>{t.plantMeasurement}</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, styles.twinDot]} />
          <Text style={styles.legendText}>{t.digitalTwin}</Text>
        </View>
      </View>

      <View style={styles.chartWrap}>
        {isLineChart ? (
          <LineChart
            data={energyChartData}
            width={chartWidth}
            height={chartHeight}
            yAxisSuffix=""
            yAxisInterval={1}
            chartConfig={{
              backgroundGradientFrom: solarColors.navy,
              backgroundGradientTo: solarColors.navy,
              decimalPlaces: 1,
              color: (opacity = 1) => 'rgba(148, 170, 205, ' + opacity + ')',
              labelColor: (opacity = 1) => 'rgba(138, 160, 198, ' + opacity + ')',
              fillShadowGradientFrom: '#7f8794',
              fillShadowGradientFromOpacity: 0.32,
              fillShadowGradientTo: '#7f8794',
              fillShadowGradientToOpacity: 0.32,
              propsForBackgroundLines: {
                stroke: '#21324c',
                strokeDasharray: '0',
              },
              propsForDots: {
                r: '4',
                strokeWidth: '2',
                stroke: solarColors.navy,
              },
            }}
            bezier
            fromZero
            segments={4}
            style={styles.chart}
            withShadow={true}
            withInnerLines={true}
            withOuterLines={false}
          />
        ) : (
          <GroupedBarChart
            dark
            labels={energyChartData.labels}
            plant={energyChartData.plant}
            twin={energyChartData.twin}
            width={chartWidth}
            height={chartHeight}
            maxValue={maxValue}
          />
        )}
      </View>

      <Text style={styles.period}>14 Apr - 13 May 2026</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: solarColors.navy,
    zIndex: 30,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '900',
  },
  closeButton: {
    alignItems: 'center',
    backgroundColor: '#213862',
    borderRadius: 9,
    height: 31,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  closeText: {
    color: '#dbe6fb',
    fontSize: 13,
    fontWeight: '800',
  },
  segmentedControl: {
    backgroundColor: '#22375d',
    borderRadius: 9,
    flexDirection: 'row',
    height: 34,
    marginBottom: 8,
    padding: 3,
  },
  segment: {
    alignItems: 'center',
    borderRadius: 7,
    flex: 1,
    justifyContent: 'center',
  },
  segmentActive: {
    backgroundColor: '#3a5790',
  },
  segmentText: {
    color: '#8ba0c7',
    fontSize: 12,
    fontWeight: '800',
  },
  segmentTextActive: {
    color: '#ffffff',
  },
  legendRow: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    minHeight: 24,
    marginBottom: 12,
  },
  legendItem: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  legendDot: {
    borderRadius: 6,
    height: 12,
    marginRight: 7,
    width: 12,
  },
  plantDot: {
    backgroundColor: solarColors.accent,
  },
  twinDot: {
    backgroundColor: solarColors.blue,
  },
  legendText: {
    color: '#9fb0cc',
    fontSize: 12,
    fontWeight: '800',
  },
  chartWrap: {
    alignItems: 'center',
    flexShrink: 1,
    justifyContent: 'center',
    marginTop: 2,
  },
  chart: {
    borderRadius: 8,
  },
  period: {
    alignSelf: 'flex-end',
    color: '#8098c1',
    fontSize: 12,
    fontWeight: '800',
    lineHeight: 16,
    marginTop: 8,
  },
});
