import { router } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';

import { clearLoginSession } from '../auth/session';
import { userProfile } from '../data/monitoring';
import { translations } from '../i18n/translations';
import { solarColors } from '../theme/colors';

type ProfileMenuProps = {
  isVisible: boolean;
  t: (typeof translations)['EN'];
  onClose: () => void;
};

const drawerWidth = Math.min(Dimensions.get('window').width * 0.74, 310);

export function ProfileMenu({ isVisible, t, onClose }: ProfileMenuProps) {
  const translateX = useRef(new Animated.Value(drawerWidth)).current;

  async function handleLogout() {
    await clearLoginSession();
    router.replace('/');
  }

  useEffect(() => {
    if (!isVisible) {
      translateX.setValue(drawerWidth);
      return;
    }

    Animated.timing(translateX, {
      duration: 240,
      toValue: 0,
      useNativeDriver: true,
    }).start();
  }, [isVisible, translateX]);

  if (!isVisible) {
    return null;
  }

  return (
    <View style={styles.overlay}>
      <Pressable accessibilityLabel="Close menu" onPress={onClose} style={styles.scrim} />
      <Animated.View style={[styles.drawer, { transform: [{ translateX }] }]}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarLarge}>
            <Text style={styles.avatarLargeText}>{userProfile.initials}</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{userProfile.name}</Text>
            <Text style={styles.profileEmail}>{userProfile.email}</Text>
          </View>
        </View>

        <View style={styles.menuList}>
          <Pressable onPress={onClose} style={styles.navItem}>
            <View style={styles.iconBox}>
              <Text style={styles.navIcon}>▦</Text>
            </View>
            <Text style={styles.navText}>{t.dashboard}</Text>
          </Pressable>
          <Pressable style={styles.navItem}>
            <View style={[styles.iconBox, styles.keyIconBox]}>
              <Text style={styles.navIcon}>⌘</Text>
            </View>
            <Text style={styles.navText}>{t.changePassword}</Text>
          </Pressable>
          <Pressable onPress={handleLogout} style={styles.navItem}>
            <View style={[styles.iconBox, styles.logoutIconBox]}>
              <Text style={[styles.navIcon, styles.logoutIcon]}>↩</Text>
            </View>
            <Text style={[styles.navText, styles.logoutText]}>{t.logout}</Text>
          </Pressable>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    zIndex: 20,
  },
  scrim: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.46)',
  },
  drawer: {
    backgroundColor: '#ffffff',
    height: '100%',
    shadowColor: '#000',
    shadowOffset: { width: -8, height: 0 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    width: drawerWidth,
    elevation: 12,
  },
  profileHeader: {
    backgroundColor: solarColors.navy,
    gap: 14,
    minHeight: 180,
    paddingHorizontal: 28,
    paddingTop: 42,
    paddingBottom: 26,
  },
  avatarLarge: {
    alignItems: 'center',
    backgroundColor: '#304a78',
    borderRadius: 32,
    height: 64,
    justifyContent: 'center',
    width: 64,
  },
  avatarLargeText: {
    color: '#dbe5ff',
    fontSize: 22,
    fontWeight: '900',
  },
  profileInfo: {
    gap: 4,
  },
  profileName: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '900',
  },
  profileEmail: {
    color: '#9badc9',
    fontSize: 14,
    fontWeight: '700',
  },
  menuList: {
    backgroundColor: '#ffffff',
    flex: 1,
    paddingTop: 28,
  },
  navItem: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 18,
    minHeight: 76,
    paddingHorizontal: 28,
  },
  iconBox: {
    alignItems: 'center',
    backgroundColor: '#edf4ff',
    borderRadius: 9,
    height: 46,
    justifyContent: 'center',
    width: 46,
  },
  keyIconBox: {
    backgroundColor: '#fff5e8',
  },
  logoutIconBox: {
    backgroundColor: '#fdecea',
  },
  navIcon: {
    color: solarColors.accent,
    fontSize: 20,
    fontWeight: '900',
  },
  logoutIcon: {
    color: '#d94d32',
  },
  navText: {
    color: '#2b3039',
    fontSize: 18,
    fontWeight: '900',
  },
  logoutText: {
    color: '#d94d32',
  },
});
