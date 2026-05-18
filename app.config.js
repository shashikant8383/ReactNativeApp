const fs = require('fs');
const path = require('path');

const appJson = require('./app.json');

const VALID_APP_ENVS = ['dev', 'stage', 'prod'];

function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return {};
  }

  return fs
    .readFileSync(filePath, 'utf8')
    .split(/\r?\n/)
    .reduce((env, line) => {
      const trimmed = line.trim();

      if (!trimmed || trimmed.startsWith('#')) {
        return env;
      }

      const separatorIndex = trimmed.indexOf('=');
      if (separatorIndex === -1) {
        return env;
      }

      const key = trimmed.slice(0, separatorIndex).trim();
      const rawValue = trimmed.slice(separatorIndex + 1).trim();
      const value = rawValue.replace(/^['"]|['"]$/g, '');

      return { ...env, [key]: value };
    }, {});
}

function loadEnvironment() {
  const appEnv = process.env.APP_ENV || process.env.EXPO_PUBLIC_APP_ENV || 'dev';

  if (!VALID_APP_ENVS.includes(appEnv)) {
    throw new Error(`Invalid APP_ENV "${appEnv}". Use one of: ${VALID_APP_ENVS.join(', ')}`);
  }

  const root = __dirname;
  const envValues = {
    ...parseEnvFile(path.join(root, '.env')),
    ...parseEnvFile(path.join(root, `.env.${appEnv}`)),
    ...parseEnvFile(path.join(root, '.env.local')),
    ...parseEnvFile(path.join(root, `.env.${appEnv}.local`)),
    ...process.env,
  };

  return { appEnv, envValues };
}

module.exports = () => {
  const { appEnv, envValues } = loadEnvironment();

  return {
    ...appJson.expo,
    extra: {
      ...appJson.expo.extra,
      appEnv,
      firebaseApiKey: envValues.EXPO_PUBLIC_FIREBASE_API_KEY,
      firebaseAuthBaseUrl:
        envValues.EXPO_PUBLIC_FIREBASE_AUTH_BASE_URL || 'https://identitytoolkit.googleapis.com/v1',
      firebaseClientType: envValues.EXPO_PUBLIC_FIREBASE_CLIENT_TYPE || 'CLIENT_TYPE_WEB',
    },
  };
};
