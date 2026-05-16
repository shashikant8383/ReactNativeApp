import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';

import { LanguageCode, languageOptions } from '../data/monitoring';
import { solarColors } from '../theme/colors';

type LanguageSelectorSheetProps = {
  isVisible: boolean;
  selectedLanguage: LanguageCode;
  title: string;
  onClose: () => void;
  onSelect: (language: LanguageCode) => void;
};

const sheetHeight = 450;

export function LanguageSelectorSheet({
  isVisible,
  selectedLanguage,
  title,
  onClose,
  onSelect,
}: LanguageSelectorSheetProps) {
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
      <Pressable accessibilityLabel="Close language selector" onPress={onClose} style={styles.scrim} />
      <Animated.View style={[styles.sheet, { transform: [{ translateY }] }]}>
        <View style={styles.handle} />
        <Text style={styles.title}>{title}</Text>
        <View style={styles.options}>
          {languageOptions.map((language) => (
            <Pressable
              key={language.code}
              onPress={() => onSelect(language.code)}
              style={styles.optionRow}
            >
              <View style={[styles.codeBadge, { backgroundColor: language.color }]}>
                <Text style={styles.codeText}>{language.code}</Text>
              </View>
              <View style={styles.languageTextWrap}>
                <Text style={styles.languageName}>{language.name}</Text>
                <Text style={styles.languageSubtext}>{language.nativeName}</Text>
              </View>
              {selectedLanguage === language.code && <Text style={styles.check}>✓</Text>}
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
    minHeight: 68,
    paddingHorizontal: 26,
  },
  codeBadge: {
    alignItems: 'center',
    borderRadius: 5,
    height: 34,
    justifyContent: 'center',
    marginRight: 16,
    width: 52,
  },
  codeText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '900',
  },
  languageTextWrap: {
    flex: 1,
  },
  languageName: {
    color: '#20242c',
    fontSize: 18,
    fontWeight: '900',
  },
  languageSubtext: {
    color: '#a9a9a9',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 1,
  },
  check: {
    color: solarColors.accent,
    fontSize: 22,
    fontWeight: '900',
  },
});
