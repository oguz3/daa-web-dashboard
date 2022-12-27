/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://ensarkavak.fun/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
