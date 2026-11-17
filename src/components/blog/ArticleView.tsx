import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays, ChevronLeft, Clock3, Hash, RefreshCw } from "lucide-react";
import photo from "@/../public/fateme3.jpg";
import { wrap } from "@/components/website/styles";
import { faNumber, formatJalali } from "@/lib/blog/format";
import type { PostCardData, PostDetailData } from "@/lib/blog/types";
import ArticleContent from "./ArticleContent";
import ReadingProgress from "./ReadingProgress";
import ShareButtons from "./ShareButtons";
import { TableOfContents, TableOfContentsCollapsible } from "./TableOfContents";
import { PostCard } from "./PostCard";

const sameDay = (a: string | null, b: string | null) =>
  Boolean(a && b) && formatJalali(a) === formatJalali(b);

function ArticleView({
  post,
  related = [],
  url,
  banner,
}: {
  post: PostDetailData;
  related?: PostCardData[];
  url: string;
  banner?: React.ReactNode;
}) {
  const updated = post.publishedAt && !sameDay(post.publishedAt, post.updatedAt) ? post.updatedAt : null;

  return (
    <>
      <ReadingProgress targetId="article-body" />
      <article className={`${wrap} pt-6 sm:pt-10`}>
        {banner}

        <nav aria-label="مسیر صفحه" className="text-[0.75rem] text-ink-faint">
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link href="/" className="hover:text-iris">
                خانه
              </Link>
            </li>
            <li className="flex items-center gap-1">
              <ChevronLeft className="size-3" aria-hidden />
              <Link href="/blog" className="hover:text-iris">
                بلاگ
              </Link>
            </li>
            {post.category && (
              <li className="flex items-center gap-1">
                <ChevronLeft className="size-3" aria-hidden />
                <Link href={`/blog?category=${encodeURIComponent(post.category.slug)}`} className="hover:text-iris">
                  {post.category.name}
                </Link>
              </li>
            )}
          </ol>
        </nav>

        <header className="mx-auto mt-5 max-w-3xl text-center">
          {post.category && (
            <Link
              href={`/blog?category=${encodeURIComponent(post.category.slug)}`}
              className="eyebrow hover:bg-white"
            >
              {post.category.name}
            </Link>
          )}
          <h1 className="mt-3 text-[clamp(1.625rem,3.2vw,2.375rem)] font-extrabold leading-[1.55] text-ink">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="mx-auto mt-3 max-w-2xl text-[0.9375rem] leading-[1.95] text-ink-soft sm:text-base">
              {post.excerpt}
            </p>
          )}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[0.75rem] text-ink-faint">
            {post.authorName && (
              <span className="inline-flex items-center gap-1.5 text-ink-soft">
                <span
                  aria-hidden
                  className="grid size-6 place-items-center rounded-full bg-gradient-to-br from-iris to-iris-soft text-[0.6875rem] font-bold text-white"
                >
                  {post.authorName.trim().charAt(0)}
                </span>
                {post.authorName}
              </span>
            )}
            {post.publishedAt && (
              <span className="inline-flex items-center gap-1">
                <CalendarDays className="size-3.5" aria-hidden />
                <time dateTime={post.publishedAt}>{formatJalali(post.publishedAt)}</time>
              </span>
            )}
            <span className="inline-flex items-center gap-1">
              <Clock3 className="size-3.5" aria-hidden />
              {faNumber(post.readingTime)} دقیقه مطالعه
            </span>
            {updated && (
              <span className="inline-flex items-center gap-1">
                <RefreshCw className="size-3.5" aria-hidden />
                به‌روزرسانی: <time dateTime={updated}>{formatJalali(updated)}</time>
              </span>
            )}
          </div>
        </header>

        {post.coverImage && (
          <div className="glass mx-auto mt-7 max-w-4xl rounded-[1.5rem] p-2">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[1.125rem] bg-iris-wash">
              <Image
                src={post.coverImage.url}
                alt={post.coverImage.alt || post.title}
                fill
                priority
                sizes="(min-width: 1024px) 880px, 94vw"
                className="object-cover"
              />
            </div>
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="min-w-0 lg:col-span-8">
            <div className="mb-4 lg:hidden">
              <TableOfContentsCollapsible headings={post.headings} />
            </div>
            <div
              id="article-body"
              className="rounded-[1.5rem] border border-white/80 bg-white px-5 py-7 shadow-sm sm:px-9 sm:py-10 xl:bg-white/80 xl:shadow-glass xl:backdrop-blur-lg"
            >
              <ArticleContent html={post.contentHtml} />

              {post.tags.length > 0 && (
                <ul aria-label="برچسب‌ها" className="mt-8 flex flex-wrap gap-1.5 border-t border-ink/[0.06] pt-6">
                  {post.tags.map((tag) => (
                    <li key={tag}>
                      <Link
                        href={`/blog?tag=${encodeURIComponent(tag)}`}
                        className="chip bg-iris-wash text-iris-deep hover:bg-iris hover:text-white"
                      >
                        <Hash className="size-3" aria-hidden />
                        {tag}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <ShareButtons url={url} title={post.title} />
              </div>
            </div>
          </div>

          <aside className="hidden lg:col-span-4 lg:block">
            <div className="sticky top-24 grid gap-4">
              <TableOfContents headings={post.headings} />
              <div className="glass-dark rounded-[1.25rem] p-5">
                <div className="flex items-center gap-3">
                  <span className="relative size-12 shrink-0 overflow-hidden rounded-full ring-2 ring-white/20">
                    <Image src={photo} alt="" fill sizes="48px" className="object-cover object-top" />
                  </span>
                  <div>
                    <p className="text-sm font-bold">فاطمه سادات شفیعی</p>
                    <p className="text-[0.75rem] text-white/60">روانشناس صنعتی و سازمانی</p>
                  </div>
                </div>
                <p className="mt-3 text-[0.8125rem] leading-7 text-white/70">
                  برای گفت‌وگو درباره مسیر فردی یا سازمانی‌تان، یک جلسه مشاوره رزرو کنید.
                </p>
                <Link href="/services" className="btn btn-light btn-sm mt-4 w-full">
                  رزرو نوبت
                  <ArrowLeft className="size-3.5" aria-hidden />
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* author / CTA on phones and tablets */}
        <div className="glass-dark mt-6 flex flex-col gap-4 rounded-[1.25rem] p-5 sm:flex-row sm:items-center lg:hidden">
          <div className="flex flex-1 items-center gap-3">
            <span className="relative size-12 shrink-0 overflow-hidden rounded-full ring-2 ring-white/20">
              <Image src={photo} alt="" fill sizes="48px" className="object-cover object-top" />
            </span>
            <div>
              <p className="text-sm font-bold">فاطمه سادات شفیعی</p>
              <p className="text-[0.75rem] text-white/60">روانشناس صنعتی و سازمانی</p>
            </div>
          </div>
          <Link href="/services" className="btn btn-light btn-sm">
            رزرو نوبت
            <ArrowLeft className="size-3.5" aria-hidden />
          </Link>
        </div>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className={`${wrap} mt-16 sm:mt-20`}>
          <div className="flex items-end justify-between gap-4">
            <h2 id="related-heading" className="text-[clamp(1.25rem,2vw,1.5rem)] font-extrabold text-ink">
              نوشته‌های مرتبط
            </h2>
            <Link href="/blog" className="inline-flex items-center gap-1 text-sm font-medium text-iris hover:underline">
              همه نوشته‌ها
              <ArrowLeft className="size-3.5" aria-hidden />
            </Link>
          </div>
          <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <li key={p.id}>
                <PostCard post={p} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}

export default ArticleView;
