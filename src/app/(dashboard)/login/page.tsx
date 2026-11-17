import { auth } from "@/auth";
import SigninForm from "@/components/dashboard/SigninForm";
import BrandLogo from "@/components/system/BrandLogo";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "ورود به حساب کاربری",
};

async function Page() {
  const session = await auth();

  if (session?.user) redirect("/dashboard");

  return (
    <main className="grid min-h-dvh place-items-center px-4 py-10">
      <div className="w-full max-w-[24rem]">
        <div className="glass-strong rounded-[1.5rem] p-6 sm:p-8">
          <Link href="/" aria-label="صفحه اصلی" className="inline-block">
            <BrandLogo className="h-7" />
          </Link>
          <h1 className="mt-6 text-xl font-bold text-ink">ورود به حساب کاربری</h1>
          <p className="mt-1 text-[0.8125rem] leading-6 text-ink-faint">
            برای مدیریت نوبت‌ها و زمان‌بندی وارد شوید.
          </p>
          <SigninForm />
        </div>
        <Link
          href="/"
          className="btn btn-ghost btn-sm mx-auto mt-4 flex w-fit"
        >
          <ArrowRight className="size-4" aria-hidden />
          بازگشت به سایت
        </Link>
      </div>
    </main>
  );
}

export default Page;
