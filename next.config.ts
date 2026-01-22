import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove static export since we have API routes
  // output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    scrollRestoration: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
