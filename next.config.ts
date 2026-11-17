import type { NextConfig } from "next";
import { supabasePublicBucketUrl } from "./src/lib/storage";

const nextConfig: NextConfig = {
  serverExternalPackages: ["libheif-js"],
  images: {
    remotePatterns: [
      ...(supabasePublicBucketUrl ? [new URL(`${supabasePublicBucketUrl}**`)] : []),
      {
        // Keep existing Liara image URLs working.
        protocol: "https",
        hostname: "*.storage.c2.liara.space",
        port: "",
        pathname: "/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
