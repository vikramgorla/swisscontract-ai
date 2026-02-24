// Rate limiting — in-memory, per Vercel instance.
// Resets on cold start, but effective for abuse prevention.

const LIMIT = 5;
const WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours

interface RateEntry { count: number; resetAt: number; }
const store = new Map<string, RateEntry>();

export function checkRateLimit(ip: string): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const entry = store.get(ip);

  if (!entry || now > entry.resetAt) {
    const resetAt = now + WINDOW_MS;
    store.set(ip, { count: 1, resetAt });
    return { allowed: true, remaining: LIMIT - 1, resetAt };
  }
  if (entry.count >= LIMIT) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }
  entry.count += 1;
  return { allowed: true, remaining: LIMIT - entry.count, resetAt: entry.resetAt };
}
