import { ApiError } from './apiError';
import { addApiDebugLog } from '../debug/debugLogger';
import { sanitizeForDebug } from '../debug/sanitize';

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
  const method = options.method ?? 'GET';
  const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...options.headers,
  };
  const startedAt = Date.now();

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    const data = await parseJson<T & FirebaseErrorBody>(response);

    addApiDebugLog({
      durationMs: Date.now() - startedAt,
      method,
      requestBody: sanitizeForDebug(options.body),
      requestHeaders: sanitizeForDebug(headers) as Record<string, string>,
      responseBody: sanitizeForDebug(data),
      status: response.status,
      url,
    });

    if (!response.ok) {
      const code = data?.error?.message;
      throw new ApiError(code || `Request failed with status ${response.status}`, response.status, code);
    }

    return data as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    addApiDebugLog({
      durationMs: Date.now() - startedAt,
      error: sanitizeForDebug(error instanceof Error ? { message: error.message, name: error.name } : error),
      method,
      requestBody: sanitizeForDebug(options.body),
      requestHeaders: sanitizeForDebug(headers) as Record<string, string>,
      url,
    });

    throw error;
  }
}
