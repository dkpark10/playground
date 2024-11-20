/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: process.env.NODE_ENV === "development",
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: "standalone",
  webpack: (config) => {
    return config;
  },
};

module.exports = nextConfig;
