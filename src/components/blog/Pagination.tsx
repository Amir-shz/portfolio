import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const fa = (n: number) => n.toLocaleString("fa-IR");

/** Page numbers with gaps: 1 … 4 5 6 … 12 */
function pagesToShow(page: number, count: number): (number | "gap")[] {
  const set = new Set([1, count, page - 1, page, page + 1].filter((p) => p >= 1 && p <= count));
  const sorted = [...set].sort((a, b) => a - b);
  const out: (number | "gap")[] = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) out.push("gap");
    out.push(p);
  });
  return out;
}

function Pagination({
  page,
  pageCount,
  hrefFor,
}: {
  page: number;
  pageCount: number;
  hrefFor: (page: number) => string;
}) {
  if (pageCount <= 1) return null;
  const btn = "grid h-10 min-w-10 place-items-center rounded-xl px-3 text-sm font-medium transition-colors";
  return (
    <nav aria-label="صفحه‌بندی نوشته‌ها" className="mt-10 flex flex-wrap items-center justify-center gap-1.5">
      {page > 1 ? (
        <Link href={hrefFor(page - 1)} rel="prev" className={cn(btn, "glass shadow-none hover:bg-white")} aria-label="صفحه قبل">
          <ChevronRight className="size-4" aria-hidden />
        </Link>
      ) : null}
      {pagesToShow(page, pageCount).map((p, i) =>
        p === "gap" ? (
          <span key={`gap-${i}`} aria-hidden className="px-1 text-ink-faint">
            …
          </span>
        ) : (
          <Link
            key={p}
            href={hrefFor(p)}
            aria-current={p === page ? "page" : undefined}
            aria-label={`صفحه ${fa(p)}`}
            className={cn(
              btn,
              p === page ? "bg-iris text-white shadow-iris" : "glass shadow-none text-ink-soft hover:bg-white hover:text-ink",
            )}
          >
            {fa(p)}
          </Link>
        ),
      )}
      {page < pageCount ? (
        <Link href={hrefFor(page + 1)} rel="next" className={cn(btn, "glass shadow-none hover:bg-white")} aria-label="صفحه بعد">
          <ChevronLeft className="size-4" aria-hidden />
        </Link>
      ) : null}
    </nav>
  );
}

export default Pagination;
