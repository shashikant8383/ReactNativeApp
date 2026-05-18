export class ApiError extends Error {
  status: number;
  code?: string;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

export function getUserFriendlyAuthError(error: unknown) {
  if (error instanceof ApiError) {
    switch (error.code) {
      case 'EMAIL_NOT_FOUND':
      case 'INVALID_PASSWORD':
      case 'INVALID_LOGIN_CREDENTIALS':
      case 'USER_DISABLED':
        return 'Invalid email or password';
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        return 'Too many attempts. Please try again later.';
      case 'MISSING_PASSWORD':
        return 'Please enter your password';
      case 'INVALID_EMAIL':
        return 'Please enter a valid email';
      default:
        return error.message || 'Login failed. Please try again.';
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Something went wrong. Please try again.';
}
