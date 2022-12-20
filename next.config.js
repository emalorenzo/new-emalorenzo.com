/* eslint-disable @typescript-eslint/no-var-requires */

/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  compiler: {
    styledComponents: true,
  },
  reactStrictMode: true,

  // TODO: I'd like to have my blog on blog.emalorenzo.com
  // but I don't know how to do it yet
  // maybe using a custom server?

  // async rewrites() {
  //   return [
  //     {
  //       source: '/blog',
  //       destination: 'https://blog.emalorenzo.com',
  //     },
  //     {
  //       source: '/blog/:slug',
  //       destination: 'https://blog.emalorenzo.com/:slug',
  //     },
  //   ];
  // },
});
