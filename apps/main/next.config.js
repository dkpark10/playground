const { version } = require("./package.json");
const isRunBundleAnalyze = process.env.ANALYZE === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: process.env.NODE_ENV === "development",

  eslint: {
    ignoreDuringBuilds: true,
  },

  output: "standalone",

  experimental: {
    serverActions: true,
  },

  publicRuntimeConfig: {
    version,
  },
  
  webpack: (config) => {
    return config;
  },
};

module.exports = isRunBundleAnalyze ? require("@next/bundle-analyzer")()(nextConfig) : nextConfig;
