import { Metadata } from "next";
import Link from "next/link";
import { SearchX } from "lucide-react";
import PageIntro from "@/components/website/PageIntro";
import { wrap } from "@/components/website/styles";
import BlogFilters from "@/components/blog/BlogFilters";
import Pagination from "@/components/blog/Pagination";
import { CompactCard, FeaturedCard, PostCard } from "@/components/blog/PostCard";
import {
  getCategoriesWithCounts,
  getFeaturedPosts,
  getPublishedPosts,
} from "@/lib/blog/queries";
import { faNumber } from "@/lib/blog/format";

export const dynamic = "force-dynamic";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";

type SP = { page?: string; category?: string; tag?: string; q?: string };

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<SP>;
}): Promise<Metadata> {
  const sp = await searchParams;
  const filtered = Boolean(sp.q || sp.tag || sp.category || (sp.page && sp.page !== "1"));
  return {
    title: "بلاگ",
    description:
      "نوشته‌های فاطمه سادات شفیعی درباره رشد فردی، مسیر شغلی، کنکور و روانشناسی صنعتی و سازمانی.",
    alternates: { canonical: `${baseUrl}/blog` },
    // filtered/paged views shouldn't compete with the main page in search
    robots: filtered ? { index: false, follow: true } : undefined,
  };
}

async function Page({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const page = Math.max(1, Number(sp.page) || 1);
  const filtered = Boolean(sp.q?.trim() || sp.tag || sp.category);
  const showFeatured = page === 1 && !filtered;

  const [categories, featured, list] = await Promise.all([
    getCategoriesWithCounts(),
    showFeatured ? getFeaturedPosts(3) : Promise.resolve([]),
    getPublishedPosts({ page, category: sp.category, tag: sp.tag, q: sp.q }),
  ]);

  const featuredIds = new Set(featured.map((p) => p.id));
  const gridPosts = list.items.filter((p) => !featuredIds.has(p.id));
  const activeCategory = categories.find((c) => c.slug === sp.category);

  const hrefFor = (p: number) => {
    const params = new URLSearchParams();
    if (sp.category) params.set("category", sp.category);
    if (sp.tag) params.set("tag", sp.tag);
    if (sp.q) params.set("q", sp.q);
    if (p > 1) params.set("page", String(p));
    const qs = params.toString();
    return qs ? `/blog?${qs}` : "/blog";
  };

  const heading = sp.q?.trim()
    ? `نتایج جستجو برای «${sp.q.trim()}»`
    : sp.tag
      ? `نوشته‌های برچسب #${sp.tag}`
      : activeCategory
        ? `نوشته‌های ${activeCategory.name}`
        : featured.length
          ? "تازه‌ترین نوشته‌ها"
          : "همه نوشته‌ها";

  return (
    <>
      <PageIntro
        eyebrow="بلاگ"
        title="نوشته‌ها"
        lead="یادداشت‌هایی درباره رشد فردی، مسیر شغلی، کنکور و روانشناسی صنعتی و سازمانی."
      >
        <div className="mt-6">
          <BlogFilters categories={categories} />
        </div>
      </PageIntro>

      {showFeatured && featured.length > 0 && (
        <section aria-label="نوشته‌های برگزیده" className={`${wrap} mt-8`}>
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <FeaturedCard post={featured[0]} />
            </div>
            {featured.length > 1 && (
              <ul className="grid grid-cols-1 content-start gap-3 lg:col-span-2">
                {featured.slice(1).map((p) => (
                  <li key={p.id}>
                    <CompactCard post={p} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

      <section aria-labelledby="posts-heading" className={`${wrap} mt-12`}>
        {(gridPosts.length > 0 || filtered) && (
          <div className="mb-5 flex flex-wrap items-end justify-between gap-2">
            <h2 id="posts-heading" className="text-[clamp(1.125rem,2vw,1.375rem)] font-extrabold text-ink">
              {heading}
            </h2>
            {filtered && (
              <span className="text-[0.8125rem] text-ink-faint">{faNumber(list.total)} نوشته</span>
            )}
          </div>
        )}

        {gridPosts.length > 0 ? (
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {gridPosts.map((p) => (
              <li key={p.id}>
                <PostCard post={p} />
              </li>
            ))}
          </ul>
        ) : filtered || (!featured.length && list.total === 0) ? (
          <div className="glass grid place-items-center rounded-[1.5rem] px-6 py-14 text-center">
            <span className="grid size-11 place-items-center rounded-xl bg-iris-tint text-iris">
              <SearchX className="size-5" aria-hidden />
            </span>
            <p className="mt-3 text-[0.9375rem] font-semibold text-ink">
              {filtered ? "نوشته‌ای با این مشخصات پیدا نشد." : "به‌زودی اولین نوشته‌ها اینجا منتشر می‌شوند."}
            </p>
            {filtered && (
              <Link href="/blog" className="btn btn-glass btn-sm mt-4">
                نمایش همه نوشته‌ها
              </Link>
            )}
          </div>
        ) : null}

        <Pagination page={list.page} pageCount={list.pageCount} hrefFor={hrefFor} />
      </section>
    </>
  );
}

export default Page;
