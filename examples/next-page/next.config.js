const { version } = require('./package.json');
const isRunBundleAnalyze = process.env.ENABLE_BUNDLE_ANALYZER === 'enabled';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: process.env.NODE_ENV === 'development',

  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    domains: ['via.placeholder.com']
  },

  output: 'standalone',

  experimental: {
    serverActions: true,
  },

  publicRuntimeConfig: {
    version,
  },

  compiler: {
    emotion: true,
  },

  webpack: (config) => {
    return config;
  },
};

module.exports = isRunBundleAnalyze ? require('@next/bundle-analyzer')()(nextConfig) : nextConfig;
