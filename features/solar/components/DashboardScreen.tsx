import * as ScreenOrientation from 'expo-screen-orientation';
import React, { useEffect, useState } from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';

import { isInAppDebugConsoleEnabled } from '../config/env';
import { KpiOption, LanguageCode, MetricRange } from '../data/monitoring';
import { InAppDebugConsole } from '../debug/InAppDebugConsole';
import { translations } from '../i18n/translations';
import { solarColors } from '../theme/colors';
import { DashboardHeader } from './DashboardHeader';
import { EnergyChartCard } from './EnergyChartCard';
import { FullScreenChart } from './FullScreenChart';
import { KpiCards } from './KpiCards';
import { KpiSelectorSheet } from './KpiSelectorSheet';
import { LanguageSelectorSheet } from './LanguageSelectorSheet';
import { PhoneFrame } from './PhoneFrame';
import { PlantSummaryCard } from './PlantSummaryCard';
import { ProfileMenu } from './ProfileMenu';
import { SystemHealthCard } from './SystemHealthCard';

export function DashboardScreen() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isKpiSheetOpen, setIsKpiSheetOpen] = useState(false);
  const [isLanguageSheetOpen, setIsLanguageSheetOpen] = useState(false);
  const [isFullScreenChartOpen, setIsFullScreenChartOpen] = useState(false);
  const [selectedKpi, setSelectedKpi] = useState<KpiOption>('Specific Energy');
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>('EN');
  const [activeRange, setActiveRange] = useState<MetricRange>('Hour');
  const t = translations[selectedLanguage];
  const isDebugConsoleEnabled = isInAppDebugConsoleEnabled();

  useEffect(() => {
    if (!isFullScreenChartOpen && Platform.OS !== 'web') {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP).catch(() => undefined);
    }
  }, [isFullScreenChartOpen]);

  return (
    <PhoneFrame variant="dark">
      <View style={styles.container}>
        <DashboardHeader
          selectedLanguage={selectedLanguage}
          onLanguagePress={() => setIsLanguageSheetOpen(true)}
          onMenuPress={() => setIsMenuOpen(true)}
        />
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <PlantSummaryCard t={t} />
          <EnergyChartCard
            selectedKpi={selectedKpi}
            activeRange={activeRange}
            onKpiPress={() => setIsKpiSheetOpen(true)}
            onFullScreenPress={() => setIsFullScreenChartOpen(true)}
            onRangeChange={setActiveRange}
            t={t}
          />
          <KpiCards t={t} />
          <SystemHealthCard t={t} />
        </ScrollView>
        <KpiSelectorSheet
          isVisible={isKpiSheetOpen}
          selectedKpi={selectedKpi}
          t={t}
          onClose={() => setIsKpiSheetOpen(false)}
          onSelect={(kpi) => {
            setSelectedKpi(kpi);
            setIsKpiSheetOpen(false);
          }}
        />
        <LanguageSelectorSheet
          isVisible={isLanguageSheetOpen}
          selectedLanguage={selectedLanguage}
          title={t.selectLanguage}
          onClose={() => setIsLanguageSheetOpen(false)}
          onSelect={(language) => {
            setSelectedLanguage(language);
            setIsLanguageSheetOpen(false);
          }}
        />
        <ProfileMenu isVisible={isMenuOpen} t={t} onClose={() => setIsMenuOpen(false)} />
        <FullScreenChart
          isVisible={isFullScreenChartOpen}
          selectedKpi={selectedKpi}
          activeRange={activeRange}
          onRangeChange={setActiveRange}
          t={t}
          onClose={() => setIsFullScreenChartOpen(false)}
        />
        <InAppDebugConsole enabled={isDebugConsoleEnabled && !isFullScreenChartOpen} />
      </View>
    </PhoneFrame>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: solarColors.background,
  },
  content: {
    padding: 12,
    paddingBottom: 28,
  },
});
