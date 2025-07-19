import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  experimental: {
    serverActions: { bodySizeLimit: "10mb" },
  },
  images: {
    remotePatterns: [
      {
        hostname: "technodevlabs.s3.eu-west-2.amazonaws.com",
        protocol: "https",
        port: "",
      },
      { hostname: "s3.eu-west-2.amazonaws.com", protocol: "https", port: "" },
      { hostname: "lh3.googleusercontent.com", protocol: "https", port: "" },
      {
        hostname: "hubspot-credentials-na1.s3.amazonaws.com",
        protocol: "https",
        port: "",
      },
    ],
  },
};

export default nextConfig;
