"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useId, useState, useTransition } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { faNumber } from "@/lib/blog/format";
import type { CategoryRef } from "@/lib/blog/types";

const STATUSES = [
  { key: "", label: "همه" },
  { key: "published", label: "منتشرشده" },
  { key: "draft", label: "پیش‌نویس" },
] as const;

function AdminFilters({
  counts,
  categories,
}: {
  counts: { all: number; published: number; draft: number };
  categories: CategoryRef[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");
  const [, startTransition] = useTransition();
  const searchId = useId();
  const catId = useId();

  const status = params.get("status") ?? "";
  const category = params.get("category") ?? "";

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

  // debounced search written to the URL
  useEffect(() => {
    if ((params.get("q") ?? "") === q.trim()) return;
    const t = setTimeout(() => {
      startTransition(() => router.replace(href({ q: q.trim() }), { scroll: false }));
    }, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  const countFor = (key: string) =>
    key === "published" ? counts.published : key === "draft" ? counts.draft : counts.all;

  return (
    <div className="mb-4 flex flex-wrap items-center gap-2.5">
      <div className="flex gap-1 rounded-xl border border-white/70 bg-white p-1 xl:bg-white/50 xl:backdrop-blur-lg">
        {STATUSES.map((s) => (
          <Link
            key={s.key || "all"}
            href={href({ status: s.key })}
            aria-current={status === s.key ? "page" : undefined}
            scroll={false}
            className={cn(
              "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[0.8125rem] font-medium transition-colors",
              status === s.key ? "bg-white text-iris-deep shadow-sm" : "text-ink-soft hover:text-ink",
            )}
          >
            {s.label}
            <span className="text-[0.6875rem] text-ink-faint">{faNumber(countFor(s.key))}</span>
          </Link>
        ))}
      </div>

      <div className="relative min-w-[12rem] flex-1 sm:max-w-xs">
        <label htmlFor={searchId} className="sr-only">
          جستجو در نوشته‌ها
        </label>
        <Search className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-ink-faint" aria-hidden />
        <input
          id={searchId}
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="جستجو در نوشته‌ها…"
          title="جستجو در عنوان، نامک یا برچسب"
          className="input min-h-0 py-2 pe-3 ps-9 text-sm"
        />
      </div>

      <div>
        <label htmlFor={catId} className="sr-only">
          دسته‌بندی
        </label>
        <select
          id={catId}
          value={category}
          onChange={(e) => router.replace(href({ category: e.target.value }), { scroll: false })}
          className="input min-h-0 cursor-pointer py-2 pe-8 text-sm"
        >
          <option value="">همه دسته‌ها</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default AdminFilters;
