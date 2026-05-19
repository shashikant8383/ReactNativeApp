const SENSITIVE_KEYS = ['authorization', 'idtoken', 'idToken', 'refreshToken', 'password', 'token'];

function isSensitiveKey(key: string) {
  const normalized = key.toLowerCase();
  return SENSITIVE_KEYS.some((sensitiveKey) => normalized.includes(sensitiveKey.toLowerCase()));
}

export function sanitizeForDebug(value: unknown): unknown {
  if (!value || typeof value !== 'object') {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(sanitizeForDebug);
  }

  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>).map(([key, nestedValue]) => [
      key,
      isSensitiveKey(key) ? '[redacted]' : sanitizeForDebug(nestedValue),
    ])
  );
}
