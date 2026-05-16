import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { kpis } from '../data/monitoring';
import { translations } from '../i18n/translations';
import { solarColors } from '../theme/colors';

type KpiCardsProps = {
  t: (typeof translations)['EN'];
};

export function KpiCards({ t }: KpiCardsProps) {
  const labels = [t.powerGenerated, t.financialSavings];

  return (
    <View style={styles.row}>
      {kpis.map((kpi, index) => (
        <View key={kpi.label} style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.label}>{labels[index]}</Text>
            <Text style={styles.badge}>{t.periodMonth}</Text>
          </View>
          <Text style={styles.value}>
            {kpi.value} <Text style={styles.unit}>{kpi.unit}</Text>
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  card: {
    backgroundColor: solarColors.surface,
    borderRadius: 8,
    flex: 1,
    padding: 12,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    color: '#39475b',
    fontSize: 10,
    fontWeight: '800',
  },
  badge: {
    backgroundColor: solarColors.mutedSurface,
    borderRadius: 7,
    color: '#8a94a6',
    fontSize: 8,
    fontWeight: '800',
    overflow: 'hidden',
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  value: {
    color: solarColors.accentDark,
    fontSize: 18,
    fontWeight: '900',
    marginTop: 6,
  },
  unit: {
    color: '#5f6b7a',
    fontSize: 10,
    fontWeight: '800',
  },
});
