import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Title row at the top of every dashboard page.
function PageHeader({
  title,
  description,
  backHref,
  children,
}: {
  title: string;
  description?: React.ReactNode;
  backHref?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div className="flex min-w-0 items-center gap-3">
        {backHref && (
          <Link
            href={backHref}
            aria-label="بازگشت"
            className="icon-btn size-9 glass text-iris shadow-none hover:bg-white"
          >
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        )}
        <div className="min-w-0">
          <h1 className="text-xl font-bold text-ink sm:text-[1.375rem]">{title}</h1>
          {description && (
            <p className="mt-1 text-sm leading-6 text-ink-soft">{description}</p>
          )}
        </div>
      </div>
      {children && <div className="flex flex-wrap items-center gap-2">{children}</div>}
    </div>
  );
}

export default PageHeader;
