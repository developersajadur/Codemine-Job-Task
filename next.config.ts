import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['images.unsplash.com', 'res.cloudinary.com', 'https://images.unsplash.com'], // Add other trusted domains here
  },
};

export default nextConfig;
