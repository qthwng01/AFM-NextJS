/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['cdn.sanity.io', 'images.unsplash.com', 'static.dimuadi.vn', 'i.ibb.co', 'img.icons8.com', 'static.accesstrade.vn', 'vcdn.tikicdn.com', 'content.accesstrade.vn'],
  },
}

module.exports = nextConfig
