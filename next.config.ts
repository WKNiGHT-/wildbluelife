import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/suggest-a-company", destination: "/suggest", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/hello-world", destination: "/", permanent: true },
      { source: "/recommendation-list", destination: "/", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/photos/**",
      },
    ],
  },
};

export default nextConfig;
