/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // When real photography is supplied from a CDN or headless CMS, add its
    // hostname here. Local files in /public work with no configuration.
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
};

export default nextConfig;
