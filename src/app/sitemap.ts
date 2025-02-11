import type { MetadataRoute } from "next";

const url = process.env.NEXT_PUBLIC_BASE_URL;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${url}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${url}/about-me`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${url}/contact-me`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${url}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
