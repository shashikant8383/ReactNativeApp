import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { BrandLogo } from './BrandLogo';
import { LanguageCode, userProfile } from '../data/monitoring';
import { solarColors } from '../theme/colors';

type DashboardHeaderProps = {
  selectedLanguage: LanguageCode;
  onLanguagePress: () => void;
  onMenuPress: () => void;
};

export function DashboardHeader({ selectedLanguage, onLanguagePress, onMenuPress }: DashboardHeaderProps) {
  return (
    <View style={styles.header}>
      <BrandLogo />
      <View style={styles.headerActions}>
        <Pressable onPress={onLanguagePress} style={styles.languagePill}>
          <Text style={styles.languageText}>{selectedLanguage}</Text>
          <Text style={styles.languageArrow}>▾</Text>
        </Pressable>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{userProfile.initials}</Text>
        </View>
        <Pressable
          accessibilityLabel="Open menu"
          hitSlop={10}
          onPress={onMenuPress}
          style={styles.menuButton}
        >
          <Text style={styles.menu}>☰</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 78,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: solarColors.navy,
    paddingHorizontal: 18,
    paddingTop: 14,
  },
  headerActions: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  languagePill: {
    alignItems: 'center',
    backgroundColor: '#1d3152',
    borderRadius: 10,
    flexDirection: 'row',
    height: 26,
    paddingHorizontal: 8,
  },
  languageText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '800',
  },
  languageArrow: {
    color: solarColors.textSoft,
    fontSize: 10,
    marginLeft: 4,
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: '#304a78',
    borderRadius: 16,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  avatarText: {
    color: '#dbe5ff',
    fontSize: 10,
    fontWeight: '900',
  },
  menu: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '900',
  },
  menuButton: {
    alignItems: 'center',
    height: 32,
    justifyContent: 'center',
    width: 24,
  },
});
