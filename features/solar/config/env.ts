import Constants from 'expo-constants';

export type AppEnv = 'dev' | 'stage' | 'prod';

type ExpoExtraConfig = {
  appEnv?: AppEnv;
  firebaseApiKey?: string;
  firebaseAuthBaseUrl?: string;
  firebaseClientType?: string;
  enableInAppDebugConsole?: string;
};

type RuntimeConfig = {
  appEnv: AppEnv;
  enableInAppDebugConsole: boolean;
  firebaseApiKey: string;
  firebaseAuthBaseUrl: string;
  firebaseClientType: string;
};

function getExpoExtra() {
  return (Constants.expoConfig?.extra ?? {}) as ExpoExtraConfig;
}

export function isInAppDebugConsoleEnabled() {
  const extra = getExpoExtra();
  return extra.enableInAppDebugConsole === 'true';
}

export function getRuntimeConfig(): RuntimeConfig {
  const extra = getExpoExtra();
  const firebaseApiKey = extra.firebaseApiKey;

  if (!firebaseApiKey) {
    throw new Error(
      'Missing EXPO_PUBLIC_FIREBASE_API_KEY. Add it to .env.dev, .env.stage, or .env.prod.'
    );
  }

  return {
    appEnv: extra.appEnv ?? 'dev',
    enableInAppDebugConsole: isInAppDebugConsoleEnabled(),
    firebaseApiKey,
    firebaseAuthBaseUrl: extra.firebaseAuthBaseUrl ?? 'https://identitytoolkit.googleapis.com/v1',
    firebaseClientType: extra.firebaseClientType ?? 'CLIENT_TYPE_WEB',
  };
}
