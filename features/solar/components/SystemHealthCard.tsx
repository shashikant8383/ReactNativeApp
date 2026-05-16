import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';

import { systemHealth } from '../data/monitoring';
import { translations } from '../i18n/translations';
import { solarColors } from '../theme/colors';

type SystemHealthCardProps = {
  t: (typeof translations)['EN'];
};

export function SystemHealthCard({ t }: SystemHealthCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>{t.systemHealth}</Text>
      <View style={styles.chartWrap}>
        <ProgressChart
          data={{ data: [systemHealth / 100] }}
          width={220}
          height={150}
          strokeWidth={20}
          radius={48}
          hideLegend={true}
          chartConfig={{
            backgroundGradientFrom: solarColors.surface,
            backgroundGradientTo: solarColors.surface,
            color: (opacity = 1) => 'rgba(80, 191, 111, ' + opacity + ')',
          }}
        />
        <View style={styles.scoreOverlay}>
          <Text style={styles.score}>{systemHealth}%</Text>
          <Text style={styles.label}>{t.systemHealth}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: solarColors.surface,
    borderRadius: 8,
    marginTop: 10,
    padding: 12,
  },
  sectionTitle: {
    color: solarColors.text,
    fontSize: 13,
    fontWeight: '900',
    marginBottom: 10,
  },
  chartWrap: {
    alignItems: 'center',
    height: 150,
    justifyContent: 'center',
  },
  scoreOverlay: {
    alignItems: 'center',
    position: 'absolute',
  },
  score: {
    color: solarColors.success,
    fontSize: 26,
    fontWeight: '900',
  },
  label: {
    color: '#99a2b1',
    fontSize: 9,
    fontWeight: '800',
  },
});
