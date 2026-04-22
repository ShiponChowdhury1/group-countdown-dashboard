import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.ngrok-free.app",
      },
      {
        protocol: "http",
        hostname: "**.ngrok-free.app",
      },
    ],
  },
};

export default nextConfig;
