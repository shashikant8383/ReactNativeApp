import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { plantInfo } from '../data/monitoring';
import { translations } from '../i18n/translations';
import { solarColors } from '../theme/colors';

type PlantSummaryCardProps = {
  t: (typeof translations)['EN'];
};

export function PlantSummaryCard({ t }: PlantSummaryCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        <Text style={styles.titleAccent}>{t.plant}:</Text> {plantInfo.name.replace('Plant: ', '')}
      </Text>
      <Text style={styles.address}>{plantInfo.address}</Text>
      <View style={styles.metaRow}>
        <Text style={styles.metaText}>{t.power}: {plantInfo.power}</Text>
        <Text style={styles.metaText}>{t.install}: {plantInfo.installDate}</Text>
        <View style={styles.statusPill}>
          <Text style={styles.statusText}>✓ {t.active}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: solarColors.surface,
    borderRadius: 8,
    padding: 12,
    shadowColor: '#1b2b46',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 2,
  },
  title: {
    color: '#1a2231',
    fontSize: 12,
    fontWeight: '900',
  },
  titleAccent: {
    color: solarColors.accent,
  },
  address: {
    color: '#5c7aa1',
    fontSize: 10,
    marginTop: 4,
  },
  metaRow: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 8,
  },
  metaText: {
    color: '#1c2635',
    fontSize: 10,
    fontWeight: '800',
  },
  statusPill: {
    backgroundColor: '#e8f9ef',
    borderRadius: 8,
    marginLeft: 'auto',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusText: {
    color: '#3da665',
    fontSize: 10,
    fontWeight: '900',
  },
});
