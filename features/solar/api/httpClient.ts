import { ApiError } from './apiError';

type JsonObject = Record<string, unknown>;

type ApiRequestOptions = {
  body?: JsonObject;
  headers?: Record<string, string>;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
};

type FirebaseErrorBody = {
  error?: {
    code?: number;
    message?: string;
  };
};

async function parseJson<T>(response: Response): Promise<T | undefined> {
  const text = await response.text();

  if (!text) {
    return undefined;
  }

  return JSON.parse(text) as T;
}

export async function apiRequest<T>(url: string, options: ApiRequestOptions = {}) {
  const response = await fetch(url, {
    method: options.method ?? 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const data = await parseJson<T & FirebaseErrorBody>(response);

  if (!response.ok) {
    const code = data?.error?.message;
    throw new ApiError(code || `Request failed with status ${response.status}`, response.status, code);
  }

  return data as T;
}
