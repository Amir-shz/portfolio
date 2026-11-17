import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock3, Feather } from "lucide-react";
import { cn } from "@/lib/utils";
import { faNumber, formatJalali } from "@/lib/blog/format";
import type { PostCardData } from "@/lib/blog/types";

export const postHref = (slug: string) => `/blog/${encodeURIComponent(slug)}`;

function Cover({
  post,
  sizes,
  className,
  priority = false,
}: {
  post: PostCardData;
  sizes: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-iris-wash", className)}>
      {post.coverImage ? (
        <Image
          src={post.coverImage.url}
          alt={post.coverImage.alt || ""}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      ) : (
        <div
          aria-hidden
          className="absolute inset-0 grid place-items-center bg-[radial-gradient(60%_70%_at_80%_20%,rgba(205,187,247,0.9),transparent_70%),radial-gradient(50%_60%_at_10%_90%,rgba(246,205,183,0.8),transparent_70%)]"
        >
          <Feather className="size-8 text-iris/60" />
        </div>
      )}
    </div>
  );
}

function Meta({ post, className }: { post: PostCardData; className?: string }) {
  return (
    <p className={cn("flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.75rem] text-ink-faint", className)}>
      {post.publishedAt && (
        <span className="inline-flex items-center gap-1">
          <CalendarDays className="size-3.5" aria-hidden />
          <time dateTime={post.publishedAt}>{formatJalali(post.publishedAt)}</time>
        </span>
      )}
      <span className="inline-flex items-center gap-1">
        <Clock3 className="size-3.5" aria-hidden />
        {faNumber(post.readingTime)} دقیقه
      </span>
    </p>
  );
}

/** Standard card for grids. */
export function PostCard({ post, headingLevel = "h3" }: { post: PostCardData; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <article className="glass group relative flex h-full flex-col rounded-[1.25rem] p-2 transition-[box-shadow,background-color] duration-300 hover:bg-iris-wash hover:shadow-glass-lg xl:hover:bg-white/70">
      <Cover
        post={post}
        sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 92vw"
        className="aspect-[16/10] rounded-[0.875rem]"
      />
      <div className="flex flex-1 flex-col px-2.5 pb-2.5 pt-3.5">
        {post.category && (
          <span className="text-[0.75rem] font-medium text-iris">{post.category.name}</span>
        )}
        <Heading className="mt-0.5 line-clamp-2 text-base font-bold leading-7 text-ink">
          <Link href={postHref(post.slug)} className="after:absolute after:inset-0 after:rounded-[1.25rem] focus-visible:outline-none">
            {post.title}
          </Link>
        </Heading>
        {post.excerpt && (
          <p className="mt-1.5 line-clamp-3 flex-1 text-[0.875rem] leading-7 text-ink-soft">{post.excerpt}</p>
        )}
        <Meta post={post} className="mt-3" />
      </div>
    </article>
  );
}

/** Large card for the top of the blog. */
export function FeaturedCard({ post }: { post: PostCardData }) {
  return (
    <article className="glass group relative flex h-full flex-col rounded-[1.5rem] p-2 transition-[box-shadow,background-color] duration-300 hover:bg-iris-wash hover:shadow-glass-lg xl:hover:bg-white/70">
      <Cover
        post={post}
        priority
        sizes="(min-width: 1024px) 640px, 92vw"
        className="aspect-[16/9] rounded-[1.125rem]"
      />
      <div className="flex flex-1 flex-col px-3 pb-3 pt-4 sm:px-4">
        <div className="flex flex-wrap items-center gap-2">
          {post.featured && <span className="chip bg-iris text-[0.6875rem] text-white">ویژه</span>}
          {post.category && <span className="text-[0.75rem] font-medium text-iris">{post.category.name}</span>}
        </div>
        <h2 className="mt-1.5 text-[clamp(1.125rem,2vw,1.5rem)] font-extrabold leading-[1.6] text-ink">
          <Link href={postHref(post.slug)} className="after:absolute after:inset-0 after:rounded-[1.5rem] focus-visible:outline-none">
            {post.title}
          </Link>
        </h2>
        {post.excerpt && (
          <p className="mt-2 line-clamp-3 text-[0.9375rem] leading-[1.9] text-ink-soft">{post.excerpt}</p>
        )}
        <Meta post={post} className="mt-auto pt-4" />
      </div>
    </article>
  );
}

/** Horizontal card used beside the featured one. */
export function CompactCard({ post }: { post: PostCardData }) {
  return (
    <article className="glass group relative flex gap-3 rounded-[1.25rem] p-2 transition-[box-shadow,background-color] duration-300 hover:bg-iris-wash hover:shadow-glass-lg xl:hover:bg-white/70">
      <Cover post={post} sizes="180px" className="aspect-[4/3] w-[38%] shrink-0 rounded-[0.875rem]" />
      <div className="flex min-w-0 flex-1 flex-col py-1.5 pe-1.5">
        {post.category && <span className="text-[0.6875rem] font-medium text-iris">{post.category.name}</span>}
        <h3 className="mt-0.5 line-clamp-3 text-[0.9375rem] font-bold leading-7 text-ink">
          <Link href={postHref(post.slug)} className="after:absolute after:inset-0 after:rounded-[1.25rem] focus-visible:outline-none">
            {post.title}
          </Link>
        </h3>
        <Meta post={post} className="mt-auto pt-2" />
      </div>
    </article>
  );
}
