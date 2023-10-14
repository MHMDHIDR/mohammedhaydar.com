/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.sanity.io']
  },
  experimental: {
    serverActions: true
  }
}

export default nextConfig
