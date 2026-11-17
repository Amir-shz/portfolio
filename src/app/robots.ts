import type { MetadataRoute } from "next";

const url = process.env.NEXT_PUBLIC_BASE_URL;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard/", "/login", "/api/", "/blog/preview/"],
    },
    sitemap: `${url}/sitemap.xml`,
  };
}
