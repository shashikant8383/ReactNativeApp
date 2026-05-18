import AsyncStorage from '@react-native-async-storage/async-storage';

import { LoginResponse } from '../services/authApi';

const AUTH_SESSION_KEY = 'solarprime.auth.session';
const LEGACY_AUTH_SESSION_KEY = 'solarprime.authenticated';

export type AuthSession = {
  displayName?: string;
  email: string;
  expiresAt: number;
  idToken: string;
  localId: string;
  refreshToken: string;
};

export async function saveLoginSession(response: LoginResponse) {
  const expiresInSeconds = Number(response.expiresIn || 0);
  const session: AuthSession = {
    displayName: response.displayName,
    email: response.email,
    expiresAt: Date.now() + expiresInSeconds * 1000,
    idToken: response.idToken,
    localId: response.localId,
    refreshToken: response.refreshToken,
  };

  await AsyncStorage.multiSet([
    [AUTH_SESSION_KEY, JSON.stringify(session)],
    [LEGACY_AUTH_SESSION_KEY, 'true'],
  ]);
}

export async function getLoginSession() {
  const rawSession = await AsyncStorage.getItem(AUTH_SESSION_KEY);

  if (!rawSession) {
    return null;
  }

  try {
    return JSON.parse(rawSession) as AuthSession;
  } catch {
    await clearLoginSession();
    return null;
  }
}

export async function clearLoginSession() {
  await AsyncStorage.multiRemove([AUTH_SESSION_KEY, LEGACY_AUTH_SESSION_KEY]);
}

export async function hasLoginSession() {
  const session = await getLoginSession();

  if (session?.refreshToken) {
    return true;
  }

  return (await AsyncStorage.getItem(LEGACY_AUTH_SESSION_KEY)) === 'true';
}
