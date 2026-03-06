import { headers } from 'next/headers';

/**
 * Returns the current environment name, injected by Traefik via X-App-Env header.
 * Falls back to the APP_ENV environment variable (for local dev),
 * then to 'production' as a safe default.
 *
 * Never hardcodes domain names or environment strings.
 */
export async function getAppEnv(): Promise<string> {
  try {
    const headersList = await headers();
    const fromHeader = headersList.get('x-app-env');
    if (fromHeader) return fromHeader;
  } catch {
    // headers() throws outside request context (e.g. during build)
  }
  return process.env.APP_ENV ?? 'production';
}

export async function isProd(): Promise<boolean> {
  return (await getAppEnv()) === 'production';
}
