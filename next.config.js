/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    formats: ['image/webp'],
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
