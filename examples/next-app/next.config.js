const isRunBundleAnalyze = process.env.ANALYZE === 'true';

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  output: 'standalone',

  webpack: (config) => {
    return config;
  },
};

module.exports = isRunBundleAnalyze ? require('@next/bundle-analyzer')()(nextConfig) : nextConfig;
