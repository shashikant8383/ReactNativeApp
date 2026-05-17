import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

import { GroupedBarChart } from './GroupedBarChart';
import { KpiOption, metricRanges, MetricRange } from '../data/monitoring';
import { useLiveEnergyData } from '../hooks/useLiveEnergyData';
import { translations } from '../i18n/translations';
import { solarColors } from '../theme/colors';

type FullScreenChartProps = {
  isVisible: boolean;
  selectedKpi: KpiOption;
  activeRange: MetricRange;
  onRangeChange: (range: MetricRange) => void;
  t: (typeof translations)['EN'];
  onClose: () => void;
};

const screen = Dimensions.get('window');
const chartWidth = Math.max(300, screen.width - 34);
const chartHeight = Math.max(470, screen.height - 270);

export function FullScreenChart({
  isVisible,
  selectedKpi,
  activeRange,
  onRangeChange,
  t,
  onClose,
}: FullScreenChartProps) {
  const energyChartData = useLiveEnergyData(activeRange, [t.plantMeasurement, t.digitalTwin]);
  const isLineChart = activeRange === 'Hour';
  const maxValue = activeRange === 'Day' ? 12 : 140;

  if (!isVisible) {
    return null;
  }

  return (
    <View style={styles.overlay}>
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
    paddingHorizontal: 18,
    paddingTop: 36,
    paddingBottom: 22,
    zIndex: 30,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  title: {
    color: '#ffffff',
    fontSize: 19,
    fontWeight: '900',
  },
  closeButton: {
    alignItems: 'center',
    backgroundColor: '#213862',
    borderRadius: 10,
    height: 34,
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  closeText: {
    color: '#dbe6fb',
    fontSize: 14,
    fontWeight: '800',
  },
  segmentedControl: {
    backgroundColor: '#22375d',
    borderRadius: 10,
    flexDirection: 'row',
    height: 44,
    marginBottom: 14,
    padding: 4,
  },
  segment: {
    alignItems: 'center',
    borderRadius: 8,
    flex: 1,
    justifyContent: 'center',
  },
  segmentActive: {
    backgroundColor: '#3a5790',
  },
  segmentText: {
    color: '#8ba0c7',
    fontSize: 13,
    fontWeight: '800',
  },
  segmentTextActive: {
    color: '#ffffff',
  },
  legendRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 18,
    marginBottom: 8,
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
    fontSize: 13,
    fontWeight: '800',
  },
  chartWrap: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  chart: {
    borderRadius: 8,
    marginLeft: -12,
  },
  period: {
    alignSelf: 'flex-end',
    color: '#8098c1',
    fontSize: 12,
    fontWeight: '800',
    marginTop: 4,
  },
});
