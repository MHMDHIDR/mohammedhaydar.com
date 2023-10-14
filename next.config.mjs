/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['www.researchgate.net']
  },
  experimental: {
    serverActions: true
  }
}

export default nextConfig
