const { version } = require("./package.json");
const isRunBundleAnalyze = process.env.ENABLE_BUNDLE_ANALYZER === "enabled";

const mapModuleIds = (fn) => (compiler) => {
  const { context } = compiler.options;

  compiler.hooks.compilation.tap("ChangeModuleIdsPlugin", (compilation) => {
    compilation.hooks.beforeModuleIds.tap("ChangeModuleIdsPlugin", (modules) => {
      const { chunkGraph } = compilation;
    });
  });
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: process.env.NODE_ENV === "development",
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: "standalone",
  images: {
    domains: ["shop.zumst.com", "static.hubzum.zumst.com"],
  },
  experimental: {
    serverActions: true,
  },
  publicRuntimeConfig: {
    version,
  },
  webpack: (config, options) => {
    return config;
  },
};

module.exports = true ? require("@next/bundle-analyzer")()(nextConfig) : nextConfig;
