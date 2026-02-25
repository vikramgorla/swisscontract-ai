import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['unpdf', 'mammoth', 'pdfjs-dist'],
};

export default nextConfig;
