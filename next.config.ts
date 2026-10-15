import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yxyizbnfjrwrnmwhkvme.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/catalogs/KOLEEX-Catalog-2025.pdf",
        headers: [
          {
            key: "Content-Disposition",
            value: 'attachment; filename="KOLEEX-Catalog-2025.pdf"',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
