/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // When real photography is supplied from a CDN or headless CMS, add its
    // hostname here. Local files in /public work with no configuration.
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
  async redirects() {
    return [
      // Location 001 was renamed from "American Colonial" to "The American
      // House" — no longer an architectural claim. Preserve the old URL.
      {
        source: '/:lang(en|es)/locations/american-colonial',
        destination: '/:lang/locations/the-american-house',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
