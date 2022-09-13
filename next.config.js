/* eslint-disable @typescript-eslint/no-var-requires */

/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  compiler: {
    styledComponents: true,
  },
  experimental: {
    concurrentFeatures: true,
  },
  reactStrictMode: false,
  async rewrites() {
    return {
      fallback: [
        {
          source: '/blog',
          destination: 'https://blog.emalorenzo.com',
        },
        {
          source: '/blog/:slug',
          destination: 'https://blog.emalorenzo.com/:slug',
        },
      ],
    };
  },
});
