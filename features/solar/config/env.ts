import Constants from 'expo-constants';

export type AppEnv = 'dev' | 'stage' | 'prod';

type ExpoExtraConfig = {
  appEnv?: AppEnv;
  firebaseApiKey?: string;
  firebaseAuthBaseUrl?: string;
  firebaseClientType?: string;
};

type RuntimeConfig = {
  appEnv: AppEnv;
  firebaseApiKey: string;
  firebaseAuthBaseUrl: string;
  firebaseClientType: string;
};

function getExpoExtra() {
  return (Constants.expoConfig?.extra ?? {}) as ExpoExtraConfig;
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
    firebaseApiKey,
    firebaseAuthBaseUrl: extra.firebaseAuthBaseUrl ?? 'https://identitytoolkit.googleapis.com/v1',
    firebaseClientType: extra.firebaseClientType ?? 'CLIENT_TYPE_WEB',
  };
}
