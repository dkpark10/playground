/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  output: "standalone",

  webpack: (config) => {
    return config;
  },
};

module.exports = nextConfig;
