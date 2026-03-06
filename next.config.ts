import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['unpdf', 'mammoth'],
  // Disable turbopack — use webpack for stable builds on VPS
  // Turbopack has intermittent SWC binding failures on this architecture
  experimental: {
    turbo: undefined,
  },
};

export default nextConfig;
