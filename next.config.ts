import type { NextConfig } from "next";

const isPreprod = process.env.NEXT_PUBLIC_ENV === 'preprod';

const nextConfig: NextConfig = {
  serverExternalPackages: ['unpdf', 'mammoth'],
  // Enable standalone output for self-hosted deployment (Jelastic)
  // Only in preprod — production uses Vercel's native build
  ...(isPreprod && { output: 'standalone' }),
};

export default nextConfig;
