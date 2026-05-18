import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_SESSION_KEY = 'solarprime.authenticated';

export async function saveLoginSession() {
  await AsyncStorage.setItem(AUTH_SESSION_KEY, 'true');
}

export async function clearLoginSession() {
  await AsyncStorage.removeItem(AUTH_SESSION_KEY);
}

export async function hasLoginSession() {
  return (await AsyncStorage.getItem(AUTH_SESSION_KEY)) === 'true';
}
