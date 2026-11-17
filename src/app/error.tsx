"use client"; // Error boundaries must be Client Components

import Link from "next/link";
import { useEffect } from "react";
import { RotateCcw, TriangleAlert } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    document.title = "با مشکل مواجه شدیم";

    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="grid min-h-dvh place-items-center px-4 py-10">
      <div className="glass-strong w-full max-w-md rounded-[1.5rem] p-7 text-center sm:p-10">
        <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-danger-tint text-danger">
          <TriangleAlert className="size-8" strokeWidth={1.5} aria-hidden />
        </span>
        <h1 className="mt-5 text-xl font-bold text-ink">با مشکلی مواجه شدیم</h1>
        {error.message && (
          <p className="mx-auto mt-1.5 max-w-sm break-words text-sm leading-7 text-ink-soft">
            {error.message}
          </p>
        )}
        {error.digest && (
          <p dir="ltr" className="mt-2 font-mono text-xs text-ink-faint">
            {error.digest}
          </p>
        )}
        <div className="mt-7 flex flex-wrap justify-center gap-2.5">
          <button type="button" className="btn btn-primary max-sm:flex-1" onClick={() => reset()}>
            <RotateCcw className="size-4" aria-hidden />
            تلاش مجدد
          </button>
          <Link href="/" className="btn btn-glass max-sm:flex-1">
            بازگشت به خانه
          </Link>
        </div>
      </div>
    </main>
  );
}
