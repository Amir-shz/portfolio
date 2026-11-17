import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BrandLogo from "@/components/system/BrandLogo";

export const metadata: Metadata = {
  title: "صفحه مورد نظر یافت نشد",
};

function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center px-4 py-10">
      <div className="glass-strong w-full max-w-md rounded-[1.5rem] p-7 text-center sm:p-10">
        <Link href="/" aria-label="صفحه اصلی" className="inline-block">
          <BrandLogo className="h-7" />
        </Link>
        <p
          aria-hidden
          className="text-gradient mt-5 py-2 text-[clamp(3.5rem,12vw,5.5rem)] font-extrabold leading-none"
        >
          ۴۰۴
        </p>
        <h1 className="mt-3 text-xl font-bold text-ink">صفحه مورد نظر یافت نشد</h1>
        <p className="mx-auto mt-1.5 max-w-sm text-sm leading-7 text-ink-soft">
          ممکن است آدرس اشتباه باشد یا این صفحه جابه‌جا شده باشد.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-2.5">
          <Link href="/" className="btn btn-primary max-sm:flex-1">
            بازگشت به خانه
            <ArrowLeft className="size-4" aria-hidden />
          </Link>
          <Link href="/services" className="btn btn-glass max-sm:flex-1">
            رزرو نوبت
          </Link>
        </div>
      </div>
    </main>
  );
}

export default NotFound;
