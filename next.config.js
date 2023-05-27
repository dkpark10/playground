const isRunBundleAnalyze = process.env.ANALYZE === "true";

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: isRunBundleAnalyze,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: process.env.NODE_ENV === "development",
};

module.exports = isRunBundleAnalyze ? withBundleAnalyzer(nextConfig) : nextConfig;
