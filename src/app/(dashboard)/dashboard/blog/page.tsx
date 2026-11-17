import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { ChevronLeft, ChevronRight, FilePlus2, ImageOff, Newspaper } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import BlogTabs from "@/components/dashboard/blog/BlogTabs";
import AdminFilters from "@/components/dashboard/blog/AdminFilters";
import PostRowActions from "@/components/dashboard/blog/PostRowActions";
import PostStatusPill from "@/components/dashboard/blog/PostStatusPill";
import { getCategoriesWithCounts, getPostsForAdmin } from "@/lib/blog/queries";
import { faNumber, formatJalali } from "@/lib/blog/format";
import type { AdminPostRow } from "@/lib/blog/types";
import { requireSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "بلاگ",
};

function Thumb({ post, className }: { post: AdminPostRow; className: string }) {
  return (
    <span className={`relative block shrink-0 overflow-hidden rounded-lg bg-iris-wash ${className}`}>
      {post.coverImage ? (
        <Image src={post.coverImage.url} alt="" fill sizes="96px" className="object-cover" />
      ) : (
        <ImageOff className="absolute inset-0 m-auto size-4 text-ink-faint" aria-hidden />
      )}
    </span>
  );
}

function dateOf(post: AdminPostRow) {
  return post.status === "published"
    ? formatJalali(post.publishedAt)
    : `ویرایش ${formatJalali(post.updatedAt)}`;
}

async function Page({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string; category?: string; page?: string }>;
}) {
  await requireSession();
  const sp = await searchParams;
  const [data, categories] = await Promise.all([
    getPostsForAdmin({
      status: sp.status,
      q: sp.q,
      category: sp.category,
      page: Number(sp.page) || 1,
    }),
    getCategoriesWithCounts({ publishedOnly: false }),
  ]);

  const pageHref = (page: number) => {
    const p = new URLSearchParams(
      Object.entries(sp).filter(([, v]) => typeof v === "string" && v) as [string, string][],
    );
    p.set("page", String(page));
    return `/dashboard/blog?${p.toString()}`;
  };

  return (
    <>
      <PageHeader title="بلاگ" description="نوشته‌ها را بنویسید، ویرایش و منتشر کنید.">
        <Link href="/dashboard/blog/new" className="btn btn-primary btn-sm px-4">
          <FilePlus2 className="size-4" aria-hidden />
          نوشته جدید
        </Link>
      </PageHeader>
      <BlogTabs />
      <AdminFilters counts={data.counts} categories={categories} />

      {data.items.length === 0 ? (
        <div className="glass grid place-items-center rounded-[1.25rem] px-6 py-14 text-center">
          <span className="grid size-11 place-items-center rounded-xl bg-iris-tint text-iris">
            <Newspaper className="size-5" aria-hidden />
          </span>
          <p className="mt-3 text-sm font-semibold text-ink">
            {data.counts.all === 0 ? "هنوز نوشته‌ای ندارید." : "نوشته‌ای با این فیلترها پیدا نشد."}
          </p>
          {data.counts.all === 0 && (
            <Link href="/dashboard/blog/new" className="btn btn-primary btn-sm mt-4 px-4">
              نوشتن اولین نوشته
            </Link>
          )}
        </div>
      ) : (
        <>
          <section className="glass hidden rounded-[1.25rem] p-3 lg:block">
            <div className="relative overflow-x-auto">
              <table className="w-full min-w-[52rem] border-separate border-spacing-y-1 text-[0.8125rem]">
                <thead>
                  <tr className="text-[0.75rem] text-ink-faint">
                    <th className="px-3 py-2 text-start font-medium">نوشته</th>
                    <th className="px-3 py-2 text-start font-medium">دسته</th>
                    <th className="px-3 py-2 text-start font-medium">وضعیت</th>
                    <th className="px-3 py-2 text-start font-medium">تاریخ</th>
                    <th className="px-3 py-2 text-start font-medium">مطالعه</th>
                    <th className="px-3 py-2">
                      <span className="sr-only">عملیات</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.items.map((post) => (
                    <tr key={post.id} className="bg-white/60 text-ink transition-colors hover:bg-white/90">
                      <td className="rounded-s-xl px-3 py-2.5">
                        <div className="flex items-center gap-3">
                          <Thumb post={post} className="h-10 w-14" />
                          <div className="min-w-0">
                            <Link
                              href={`/dashboard/blog/${post.id}/edit`}
                              className="line-clamp-1 font-semibold hover:text-iris"
                            >
                              {post.title}
                            </Link>
                            <span dir="ltr" className="block truncate text-start text-[0.6875rem] text-ink-faint">
                              /blog/{post.slug}
                            </span>
                          </div>
                          {post.featured && (
                            <span className="chip shrink-0 bg-iris-tint py-0 text-[0.6875rem] text-iris-deep">
                              ویژه
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-2.5 text-ink-soft">
                        {post.category?.name ?? "—"}
                      </td>
                      <td className="px-3 py-2.5">
                        <PostStatusPill status={post.status} />
                      </td>
                      <td className="whitespace-nowrap px-3 py-2.5 text-ink-soft">{dateOf(post)}</td>
                      <td className="whitespace-nowrap px-3 py-2.5 text-ink-soft">
                        {faNumber(post.readingTime)} دقیقه
                      </td>
                      <td className="rounded-e-xl px-3 py-2">
                        <div className="flex justify-end">
                          <PostRowActions id={post.id} slug={post.slug} title={post.title} status={post.status} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:hidden">
            {data.items.map((post) => (
              <li key={post.id} className="rounded-[1.125rem] border border-white bg-white/60 p-3.5">
                <div className="flex gap-3">
                  <Thumb post={post} className="h-16 w-20" />
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/dashboard/blog/${post.id}/edit`}
                      className="line-clamp-2 text-[0.9375rem] font-semibold leading-7 text-ink hover:text-iris"
                    >
                      {post.title}
                    </Link>
                    <p className="text-[0.75rem] text-ink-faint">
                      {post.category?.name ?? "بدون دسته"} · {dateOf(post)}
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between gap-3 border-t border-ink/[0.06] pt-3">
                  <PostStatusPill status={post.status} />
                  <PostRowActions id={post.id} slug={post.slug} title={post.title} status={post.status} />
                </div>
              </li>
            ))}
          </ul>

          {data.pageCount > 1 && (
            <nav aria-label="صفحه‌بندی" className="mt-5 flex items-center justify-center gap-2 text-[0.8125rem]">
              {data.page > 1 && (
                <Link href={pageHref(data.page - 1)} className="btn btn-glass btn-sm">
                  <ChevronRight className="size-4" aria-hidden />
                  قبلی
                </Link>
              )}
              <span className="text-ink-soft">
                صفحه {faNumber(data.page)} از {faNumber(data.pageCount)}
              </span>
              {data.page < data.pageCount && (
                <Link href={pageHref(data.page + 1)} className="btn btn-glass btn-sm">
                  بعدی
                  <ChevronLeft className="size-4" aria-hidden />
                </Link>
              )}
            </nav>
          )}
        </>
      )}
    </>
  );
}

export default Page;
