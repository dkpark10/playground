/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  output: "export",

  basePath: '/playground',

  assetPrefix: '/playground',

  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    unoptimized: true,
  },

  webpack: (config) => {
    return config;
  },
};

module.exports = nextConfig;
