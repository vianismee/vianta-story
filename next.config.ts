import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tryxsqrmydfswcnghrbt.supabase.co",
        pathname: "/storage/v1/object/public/blog-images/**", // Path ke bucket gambar Anda
      },
    ],
  },
  /* config options here */
};

export default nextConfig;