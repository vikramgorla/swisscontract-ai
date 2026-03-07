import { headers } from 'next/headers';

/**
 * Returns true if Traefik has injected X-Show-Banner: true.
 * Used to show the preprod banner and add noindex meta tag.
 * Safe default: false (production behaviour).
 */
export async function isBannerEnabled(): Promise<boolean> {
  try {
    const h = await headers();
    return h.get('x-show-banner') === 'true';
  } catch {
    return false;
  }
}

/**
 * Returns true if Traefik has injected X-Debug-Enabled: true.
 * Used to gate verbose debug logging in API routes.
 * Safe default: false (no debug output in production).
 */
export async function isDebugEnabled(): Promise<boolean> {
  try {
    const h = await headers();
    return h.get('x-debug-enabled') === 'true';
  } catch {
    return false;
  }
}
# test 20260307T161749
