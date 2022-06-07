/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [process.env.STRAPI_IMAGES_DOMAIN],
  },
};

module.exports = nextConfig;
