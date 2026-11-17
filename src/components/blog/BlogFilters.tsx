"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useId, useState, useTransition } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CategoryWithCount } from "@/lib/blog/types";

function BlogFilters({ categories }: { categories: CategoryWithCount[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");
  const [isPending, startTransition] = useTransition();
  const searchId = useId();

  const category = params.get("category") ?? "";
  const tag = params.get("tag") ?? "";

  const href = (patch: Record<string, string>) => {
    const next = new URLSearchParams(params.toString());
    for (const [k, v] of Object.entries(patch)) {
      if (v) next.set(k, v);
      else next.delete(k);
    }
    next.delete("page");
    const qs = next.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  };

  useEffect(() => {
    if ((params.get("q") ?? "") === q.trim()) return;
    const t = setTimeout(() => {
      startTransition(() => router.replace(href({ q: q.trim() }), { scroll: false }));
    }, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  const chip = (active: boolean) =>
    cn(
      "chip shrink-0 border transition-colors",
      active
        ? "border-iris bg-iris text-white"
        : "border-white/70 bg-white text-ink-soft hover:bg-white hover:text-ink xl:bg-white/55 xl:backdrop-blur-lg xl:hover:bg-white",
    );

  const visible = categories.filter((c) => c.count > 0);

  return (
    <div className="grid gap-3">
      <div className="relative max-w-md">
        <label htmlFor={searchId} className="sr-only">
          جستجو در نوشته‌ها
        </label>
        <Search
          aria-hidden
          className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-ink-faint"
        />
        <input
          id={searchId}
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="جستجو در نوشته‌ها…"
          className="input pe-10 ps-10"
        />
        {isPending && (
          <span className="spinner absolute left-3.5 top-1/2 size-3.5 -translate-y-1/2 border-2 text-iris" />
        )}
      </div>

      {(visible.length > 0 || tag) && (
        <nav aria-label="دسته‌بندی‌ها" className="-mx-4 overflow-x-auto px-4 pb-1 noScrollBar sm:mx-0 sm:px-0">
          <ul className="flex w-max gap-1.5 sm:w-auto sm:flex-wrap">
            <li>
              <Link href={href({ category: "" })} scroll={false} aria-current={!category ? "page" : undefined} className={chip(!category)}>
                همه
              </Link>
            </li>
            {visible.map((c) => (
              <li key={c.id}>
                <Link
                  href={href({ category: c.slug })}
                  scroll={false}
                  aria-current={category === c.slug ? "page" : undefined}
                  className={chip(category === c.slug)}
                >
                  {c.name}
                  <span className={cn("text-[0.6875rem]", category === c.slug ? "text-white/75" : "text-ink-faint")}>
                    {c.count.toLocaleString("fa-IR")}
                  </span>
                </Link>
              </li>
            ))}
            {tag && (
              <li>
                <Link
                  href={href({ tag: "" })}
                  scroll={false}
                  aria-label={`حذف فیلتر برچسب ${tag}`}
                  className="chip shrink-0 border border-iris/30 bg-iris-tint text-iris-deep hover:bg-iris hover:text-white"
                >
                  #{tag}
                  <X className="size-3.5" aria-hidden />
                </Link>
              </li>
            )}
          </ul>
        </nav>
      )}
    </div>
  );
}

export default BlogFilters;
