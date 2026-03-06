import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    env: process.env.NEXT_PUBLIC_ENV || 'unknown',
    timestamp: new Date().toISOString(),
  });
}
