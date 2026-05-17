import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

import { GroupedBarChart } from './GroupedBarChart';
import { KpiOption, MetricRange, metricRanges } from '../data/monitoring';
import { useLiveEnergyData } from '../hooks/useLiveEnergyData';
import { translations } from '../i18n/translations';
import { solarColors } from '../theme/colors';

const chartWidth = Math.min(Dimensions.get('window').width - 64, 330);

type EnergyChartCardProps = {
  selectedKpi: KpiOption;
  activeRange: MetricRange;
  onKpiPress: () => void;
  onFullScreenPress: () => void;
  onRangeChange: (range: MetricRange) => void;
  t: (typeof translations)['EN'];
};

export function EnergyChartCard({
  selectedKpi,
  activeRange,
  onKpiPress,
  onFullScreenPress,
  onRangeChange,
  t,
}: EnergyChartCardProps) {
  const energyChartData = useLiveEnergyData(activeRange, [t.plantMeasurement, t.digitalTwin]);
  const isLineChart = activeRange === 'Hour';
  const maxValue = activeRange === 'Day' ? 12 : 140;

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>{t.realTimeMetrics}</Text>
      <Pressable onPress={onKpiPress} style={styles.dropdown}>
        <Text style={styles.dropdownText}>{t.kpis[selectedKpi]}</Text>
        <Text style={styles.dropdownArrow}>▾</Text>
      </Pressable>

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
        <Pressable onPress={onFullScreenPress} style={styles.fullScreenButton}>
          <Text style={styles.fullScreenText}>⤢ {t.fullScreen}</Text>
        </Pressable>
      </View>

      {isLineChart ? (
        <LineChart
          data={energyChartData}
          width={chartWidth}
          height={190}
          yAxisSuffix=""
          yAxisInterval={1}
          chartConfig={{
            backgroundGradientFrom: solarColors.surface,
            backgroundGradientTo: solarColors.surface,
            decimalPlaces: 1,
            color: (opacity = 1) => 'rgba(21, 32, 51, ' + opacity + ')',
            labelColor: (opacity = 1) => 'rgba(102, 112, 133, ' + opacity + ')',
            fillShadowGradientFrom: '#7f8794',
            fillShadowGradientFromOpacity: 0.18,
            fillShadowGradientTo: '#7f8794',
            fillShadowGradientToOpacity: 0.18,
            propsForBackgroundLines: {
              stroke: '#eef1f5',
              strokeDasharray: '0',
            },
            propsForDots: {
              r: '2.5',
              strokeWidth: '1',
              stroke: solarColors.surface,
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
        <View style={styles.chart}>
          <GroupedBarChart
            labels={energyChartData.labels}
            plant={energyChartData.plant}
            twin={energyChartData.twin}
            width={chartWidth}
            height={190}
            maxValue={maxValue}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: solarColors.surface,
    borderRadius: 8,
    marginTop: 14,
    padding: 12,
  },
  sectionTitle: {
    color: solarColors.text,
    fontSize: 13,
    fontWeight: '900',
    marginBottom: 10,
  },
  dropdown: {
    alignItems: 'center',
    backgroundColor: solarColors.mutedSurface,
    borderRadius: 8,
    flexDirection: 'row',
    height: 42,
    justifyContent: 'space-between',
    paddingHorizontal: 14,
  },
  dropdownText: {
    color: '#111827',
    fontSize: 13,
    fontWeight: '800',
  },
  dropdownArrow: {
    color: '#6b7280',
    fontSize: 12,
  },
  segmentedControl: {
    backgroundColor: '#edeff4',
    borderRadius: 8,
    flexDirection: 'row',
    height: 38,
    marginTop: 10,
    padding: 3,
  },
  segment: {
    alignItems: 'center',
    borderRadius: 7,
    flex: 1,
    justifyContent: 'center',
  },
  segmentActive: {
    backgroundColor: solarColors.surface,
  },
  segmentText: {
    color: '#6b7280',
    fontSize: 11,
    fontWeight: '700',
  },
  segmentTextActive: {
    color: '#111827',
    fontWeight: '900',
  },
  legendRow: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 10,
  },
  legendItem: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  legendDot: {
    borderRadius: 4,
    height: 8,
    marginRight: 4,
    width: 8,
  },
  plantDot: {
    backgroundColor: solarColors.accent,
  },
  twinDot: {
    backgroundColor: solarColors.blue,
  },
  legendText: {
    color: solarColors.textMuted,
    fontSize: 9,
    fontWeight: '700',
  },
  fullScreenButton: {
    backgroundColor: '#f4f6f9',
    borderRadius: 8,
    marginLeft: 'auto',
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  fullScreenText: {
    color: '#1f2937',
    fontSize: 9,
    fontWeight: '800',
  },
  chart: {
    alignSelf: 'center',
    marginTop: 8,
    borderRadius: 8,
  },
});
