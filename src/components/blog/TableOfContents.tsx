"use client";

import { useEffect, useState } from "react";
import { ListTree } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Heading } from "@/lib/blog/types";

/**
 * The current section is the last heading that has scrolled above the
 * reading line. Position-based, so fast scrolling or jumping never skips a
 * section (an IntersectionObserver band can miss headings that jump past it).
 */
function useActiveHeading(ids: string[]) {
  const [active, setActive] = useState<string | null>(ids[0] ?? null);
  const key = ids.join("|");
  useEffect(() => {
    const els = key
      .split("|")
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = Math.min(140, window.innerHeight * 0.3);
      let current = els[0].id;
      for (const el of els) {
        if (el.getBoundingClientRect().top <= line) current = el.id;
        else break;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [key]);
  return active;
}

function Links({ headings, active }: { headings: Heading[]; active: string | null }) {
  return (
    <ol className="grid gap-0.5 border-s border-ink/10">
      {headings.map((h) => (
        <li key={h.id}>
          <a
            href={`#${h.id}`}
            aria-current={active === h.id ? "location" : undefined}
            className={cn(
              "-ms-px block border-s-2 py-1.5 text-[0.8125rem] leading-6 transition-colors",
              h.level === 3 ? "ps-6" : "ps-3",
              active === h.id
                ? "border-iris font-semibold text-iris-deep"
                : "border-transparent text-ink-soft hover:text-ink",
            )}
          >
            {h.text}
          </a>
        </li>
      ))}
    </ol>
  );
}

/** Desktop: sticky list with the current section highlighted. */
export function TableOfContents({ headings }: { headings: Heading[] }) {
  const active = useActiveHeading(headings.map((h) => h.id));
  if (headings.length < 2) return null;
  return (
    <nav aria-label="فهرست مطالب" className="glass rounded-[1.25rem] p-4">
      <p className="mb-2 flex items-center gap-2 text-sm font-bold text-ink">
        <ListTree className="size-4 text-iris" aria-hidden />
        فهرست مطالب
      </p>
      <Links headings={headings} active={active} />
    </nav>
  );
}

/** Phones/tablets: a collapsible list above the article. */
export function TableOfContentsCollapsible({ headings }: { headings: Heading[] }) {
  const active = useActiveHeading(headings.map((h) => h.id));
  if (headings.length < 2) return null;
  return (
    <details className="glass group rounded-[1.25rem] p-4 [&_summary::-webkit-details-marker]:hidden">
      <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-bold text-ink">
        <ListTree className="size-4 text-iris" aria-hidden />
        فهرست مطالب
        <span className="ms-auto text-[0.75rem] font-normal text-ink-faint group-open:hidden">نمایش</span>
        <span className="ms-auto hidden text-[0.75rem] font-normal text-ink-faint group-open:inline">بستن</span>
      </summary>
      <div className="mt-3">
        <Links headings={headings} active={active} />
      </div>
    </details>
  );
}
