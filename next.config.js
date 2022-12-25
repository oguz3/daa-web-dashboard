/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://170.64.130.211/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
