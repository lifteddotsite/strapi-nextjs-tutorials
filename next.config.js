/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      process.env.CONTENTFUL_IMAGES_DOMAIN,
      process.env.STRAPI_IMAGES_DOMAIN,
    ],
  },
};

module.exports = nextConfig;
