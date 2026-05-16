import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { solarColors } from '../theme/colors';

type BrandLogoProps = {
  size?: 'small' | 'large';
};

export function BrandLogo({ size = 'small' }: BrandLogoProps) {
  return (
    <Text style={[styles.logo, size === 'large' && styles.logoLarge]}>
      SOLAR<Text style={styles.logoAccent}>PRIME</Text>
    </Text>
  );
}

const styles = StyleSheet.create({
  logo: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0,
  },
  logoLarge: {
    fontSize: 24,
    textAlign: 'center',
  },
  logoAccent: {
    color: solarColors.accent,
  },
});
