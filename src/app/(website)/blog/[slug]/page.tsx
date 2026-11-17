import { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleView from "@/components/blog/ArticleView";
import { postHref } from "@/components/blog/PostCard";
import { getPostBySlug, getPublishedSlugs, getRelatedPosts } from "@/lib/blog/queries";

// Pages are built on demand and refreshed by the dashboard actions; the
// hourly revalidate is a backstop (e.g. for posts scheduled in the future).
export const revalidate = 3600;
export const dynamicParams = true;

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";

function decode(slug: string) {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

export async function generateStaticParams() {
  try {
    const slugs = await getPublishedSlugs();
    return slugs.map(({ slug }) => ({ slug }));
  } catch {
    // build must not fail when the database is unreachable
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const post = await getPostBySlug(decode((await params).slug));
  if (!post) return { title: "نوشته پیدا نشد" };

  const title = post.seo.title || post.title;
  const description = post.seo.description || post.excerpt;
  const url = `${baseUrl}${postHref(post.slug)}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      locale: "fa_IR",
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post.updatedAt,
      authors: post.authorName ? [post.authorName] : undefined,
      tags: post.tags,
      images: post.coverImage
        ? [
            {
              url: post.coverImage.url,
              width: post.coverImage.width || undefined,
              height: post.coverImage.height || undefined,
              alt: post.coverImage.alt || post.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: post.coverImage ? "summary_large_image" : "summary",
      title,
      description,
    },
  };
}

async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const post = await getPostBySlug(decode((await params).slug));
  if (!post) notFound();

  const related = await getRelatedPosts(post);
  const url = `${baseUrl}${postHref(post.slug)}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seo.description || post.excerpt,
    image: post.coverImage ? [post.coverImage.url] : undefined,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { "@type": "Person", name: post.authorName || "فاطمه سادات شفیعی" },
    mainEntityOfPage: url,
    inLanguage: "fa-IR",
    keywords: post.tags.join(", ") || undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        // JSON.stringify output with "<" escaped cannot break out of the tag
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <ArticleView post={post} related={related} url={url} />
    </>
  );
}

export default Page;
