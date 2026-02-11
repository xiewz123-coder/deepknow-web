import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  // Disable strict mode for development
  reactStrictMode: false,
};

export default nextConfig;
