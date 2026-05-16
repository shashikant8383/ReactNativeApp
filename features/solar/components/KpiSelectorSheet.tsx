import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';

import { KpiOption, kpiOptions } from '../data/monitoring';
import { translations } from '../i18n/translations';
import { solarColors } from '../theme/colors';

type KpiSelectorSheetProps = {
  isVisible: boolean;
  selectedKpi: KpiOption;
  t: (typeof translations)['EN'];
  onClose: () => void;
  onSelect: (kpi: KpiOption) => void;
};

const sheetHeight = 360;

export function KpiSelectorSheet({ isVisible, selectedKpi, t, onClose, onSelect }: KpiSelectorSheetProps) {
  const translateY = useRef(new Animated.Value(sheetHeight)).current;

  useEffect(() => {
    if (!isVisible) {
      translateY.setValue(sheetHeight);
      return;
    }

    Animated.timing(translateY, {
      duration: 240,
      toValue: 0,
      useNativeDriver: true,
    }).start();
  }, [isVisible, translateY]);

  if (!isVisible) {
    return null;
  }

  return (
    <View style={styles.overlay}>
      <Pressable accessibilityLabel="Close KPI selector" onPress={onClose} style={styles.scrim} />
      <Animated.View style={[styles.sheet, { transform: [{ translateY }] }]}>
        <View style={styles.handle} />
        <Text style={styles.title}>{t.selectKpi}</Text>
        <View style={styles.options}>
          {kpiOptions.map((option) => (
            <Pressable key={option} onPress={() => onSelect(option)} style={styles.optionRow}>
              <Text style={styles.optionText}>{t.kpis[option]}</Text>
              {selectedKpi === option && <Text style={styles.check}>✓</Text>}
            </Pressable>
          ))}
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    zIndex: 15,
  },
  scrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.48)',
  },
  sheet: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    minHeight: sheetHeight,
    overflow: 'hidden',
    paddingTop: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.16,
    shadowRadius: 18,
    elevation: 18,
  },
  handle: {
    alignSelf: 'center',
    backgroundColor: '#dddddd',
    borderRadius: 2,
    height: 5,
    marginBottom: 22,
    width: 52,
  },
  title: {
    color: solarColors.text,
    fontSize: 18,
    fontWeight: '900',
    paddingHorizontal: 26,
    paddingBottom: 16,
  },
  options: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#eceef2',
  },
  optionRow: {
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eceef2',
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 58,
    paddingHorizontal: 26,
  },
  optionText: {
    color: '#20242c',
    fontSize: 18,
    fontWeight: '700',
  },
  check: {
    color: '#171b22',
    fontSize: 20,
    fontWeight: '900',
  },
});
