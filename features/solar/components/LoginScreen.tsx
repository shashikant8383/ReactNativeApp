import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { BrandLogo } from './BrandLogo';
import { PhoneFrame } from './PhoneFrame';
import { hasLoginSession, saveLoginSession } from '../auth/session';
import { solarColors } from '../theme/colors';

export function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function restoreSession() {
      try {
        if (await hasLoginSession()) {
          router.replace('/Dashboard');
          return;
        }
      } finally {
        if (isMounted) {
          setIsCheckingSession(false);
        }
      }
    }

    restoreSession();

    return () => {
      isMounted = false;
    };
  }, []);

  async function handleLogin() {
    if (email.trim() !== '' && password.trim() !== '') {
      await saveLoginSession();
      router.replace('/Dashboard');
      return;
    }

    alert('Please enter username and password');
  }

  if (isCheckingSession) {
    return <PhoneFrame variant="dark" />;
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.keyboard}>
      <PhoneFrame variant="dark">
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=900&q=80' }}
          imageStyle={styles.heroImage}
          style={styles.hero}
        >
          <View style={styles.heroTint} />
        </ImageBackground>

        <View style={styles.formPanel}>
          <BrandLogo size="large" />
          <Text style={styles.subtitle}>SOLAR PLANT MONITORING</Text>

          <Text style={styles.label}>USERNAME / EMAIL</Text>
          <TextInput
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="Enter your username"
            placeholderTextColor="#71809b"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>PASSWORD</Text>
          <TextInput
            placeholder="Enter your password"
            placeholderTextColor="#71809b"
            secureTextEntry={true}
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>LOG IN</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.forgot}>Forgot password?</Text>
          </TouchableOpacity>
        </View>
      </PhoneFrame>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
  },
  hero: {
    height: 250,
    justifyContent: 'flex-end',
  },
  heroImage: {
    resizeMode: 'cover',
  },
  heroTint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(141, 28, 35, 0.58)',
  },
  formPanel: {
    flex: 1,
    backgroundColor: solarColors.navy,
    paddingHorizontal: 28,
    paddingTop: 30,
  },
  subtitle: {
    color: '#91a2be',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 28,
    marginTop: 4,
    textAlign: 'center',
  },
  label: {
    color: solarColors.textSoft,
    fontSize: 11,
    fontWeight: '800',
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: solarColors.navyLine,
    borderRadius: 10,
    backgroundColor: solarColors.navySoft,
    color: '#ffffff',
    fontSize: 15,
    marginBottom: 18,
    paddingHorizontal: 16,
  },
  button: {
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 11,
    backgroundColor: solarColors.accent,
    marginTop: 2,
    shadowColor: solarColors.accent,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.22,
    shadowRadius: 16,
    elevation: 4,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '900',
  },
  forgot: {
    color: '#8697b5',
    fontSize: 13,
    marginTop: 20,
    textAlign: 'center',
  },
});
