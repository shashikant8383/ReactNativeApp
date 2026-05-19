import React, { PropsWithChildren } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { solarColors } from '../theme/colors';

type PhoneFrameProps = PropsWithChildren<{
  variant?: 'dark' | 'light';
}>;

export function PhoneFrame({ children, variant = 'light' }: PhoneFrameProps) {
  const contentStyle = [styles.appSurface, variant === 'dark' && styles.darkSurface];

  if (Platform.OS !== 'web') {
    return (
      <SafeAreaView edges={['top', 'right', 'bottom', 'left']} style={contentStyle}>
        {children}
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.webPreviewScreen}>
      <View style={[styles.webPreviewFrame, variant === 'dark' && styles.darkSurface]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  appSurface: {
    flex: 1,
    backgroundColor: '#f7f8fb',
  },
  darkSurface: {
    backgroundColor: solarColors.navy,
  },
  webPreviewScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: solarColors.background,
    padding: 18,
  },
  webPreviewFrame: {
    width: '100%',
    maxWidth: 390,
    height: '100%',
    maxHeight: 820,
    overflow: 'hidden',
    borderWidth: 10,
    borderColor: solarColors.phoneBorder,
    borderRadius: 42,
    backgroundColor: '#f7f8fb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.22,
    shadowRadius: 28,
    elevation: 10,
  },
});
