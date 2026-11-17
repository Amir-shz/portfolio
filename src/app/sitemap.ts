import type { MetadataRoute } from "next";
import { getPublishedSlugs } from "@/lib/blog/queries";

const url = process.env.NEXT_PUBLIC_BASE_URL;

// rebuilt at most once an hour; publishing a post also revalidates it
export const revalidate = 3600;

const staticPages: {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}[] = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/services", changeFrequency: "weekly", priority: 0.9 },
  { path: "/reservation", changeFrequency: "weekly", priority: 0.9 },
  { path: "/blog", changeFrequency: "daily", priority: 0.8 },
  { path: "/experiences", changeFrequency: "monthly", priority: 0.7 },
  { path: "/businesses", changeFrequency: "monthly", priority: 0.7 },
  { path: "/personalDevelopment", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact-me", changeFrequency: "yearly", priority: 0.6 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: `${url}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  // the static pages are still served if the database can't be reached
  let posts: Awaited<ReturnType<typeof getPublishedSlugs>> = [];
  try {
    posts = await getPublishedSlugs();
  } catch (error) {
    console.error("sitemap: could not load blog posts", error);
  }

  return [
    ...pages,
    ...posts.map((post) => ({
      url: `${url}/blog/${encodeURIComponent(post.slug)}`,
      lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
