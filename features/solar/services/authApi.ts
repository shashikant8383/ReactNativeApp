import { apiRequest } from '../api/httpClient';
import { getRuntimeConfig } from '../config/env';

export type LoginResponse = {
  displayName?: string;
  email: string;
  expiresIn: string;
  idToken: string;
  kind: string;
  localId: string;
  refreshToken: string;
  registered: boolean;
};

type LoginRequest = {
  email: string;
  password: string;
};

export async function loginWithPassword({ email, password }: LoginRequest) {
  const config = getRuntimeConfig();
  const url = `${config.firebaseAuthBaseUrl}/accounts:signInWithPassword?key=${config.firebaseApiKey}`;

  return apiRequest<LoginResponse>(url, {
    method: 'POST',
    body: {
      returnSecureToken: true,
      email,
      password,
      clientType: config.firebaseClientType,
    },
  });
}
