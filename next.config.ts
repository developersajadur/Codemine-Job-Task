import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['https://images.unsplash.com', 'https://i.ibb.co', 'i.ibb.co'], 
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};

export default nextConfig;
