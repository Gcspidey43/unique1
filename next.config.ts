import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove static export since we have API routes
  // output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    serverActions: true,
    scrollRestoration: true,
  },
  // Enable server components for edge runtime
  reactStrictMode: true,
};

export default nextConfig;
