export function humanizeAuthError(message: string): string {
  const m = message.toLowerCase();
  if (
    m.includes('invalid login credentials') ||
    m.includes('invalid credentials') ||
    m.includes('wrong password') ||
    m.includes('user not found')
  ) {
    return 'Incorrect email or password. Please try again.';
  }
  if (m.includes('email not confirmed') || m.includes('email_not_confirmed')) {
    return 'Please verify your email address before signing in.';
  }
  if (
    m.includes('too many requests') ||
    m.includes('rate limit') ||
    m.includes('over_email_send_rate_limit')
  ) {
    return 'Too many attempts. Please wait a moment and try again.';
  }
  if (m.includes('network') || m.includes('fetch') || m.includes('failed to fetch')) {
    return 'No internet connection. Check your network and try again.';
  }
  if (m.includes('user already registered') || m.includes('already been registered')) {
    return 'An account with this email already exists.';
  }
  if (m.includes('password') && m.includes('weak')) {
    return 'Password is too weak. Please choose a stronger password.';
  }
  if (m.includes('signup') && m.includes('disabled')) {
    return 'Account registration is currently disabled.';
  }
  return 'Something went wrong. Please try again.';
}
