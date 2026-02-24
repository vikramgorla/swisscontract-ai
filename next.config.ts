import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['unpdf', 'pdf-parse', 'pdfjs-dist', 'mammoth'],
};

export default nextConfig;
