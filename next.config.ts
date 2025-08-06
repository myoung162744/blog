import type { NextConfig } from "next";

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  // Enable image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Enable compression
  compress: true,
  
  // Optimize CSS
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  

  
  // Optimize bundle
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@vercel/analytics', '@vercel/speed-insights'],
  },
  
  // Enable strict mode for better React optimizations
  reactStrictMode: true,
  

  
  // Performance optimizations
  poweredByHeader: false, // Remove X-Powered-By header
  
  // Enable webpack optimizations
  webpack: (config, { isServer }) => {
    // Tree shaking optimizations
    if (!isServer) {
      config.optimization.usedExports = true;
    }
    return config;
  },
};

export default withBundleAnalyzer(nextConfig);
