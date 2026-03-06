import { NextResponse } from 'next/server';
import { getAppEnv } from '../../lib/env';

export const dynamic = 'force-dynamic';

export async function GET() {
  const env = await getAppEnv();
  return NextResponse.json({
    status: 'ok',
    env,
    timestamp: new Date().toISOString(),
  });
}
