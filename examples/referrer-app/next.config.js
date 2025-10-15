/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      // {
      //   source: "/(.*)", // 모든 라우트
      //   headers: [
      //     {
      //       key: "Referrer-Policy",
      //       value: "no-referrer",
      //     },
      //   ],
      // },
    ];
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  output: "standalone",

  webpack: (config) => {
    return config;
  },
};

module.exports = nextConfig;
