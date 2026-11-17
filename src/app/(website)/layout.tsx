import type { Metadata } from "next";
import SiteHeader from "@/components/website/SiteHeader";
import SiteFooter from "@/components/website/SiteFooter";
import MotionRoot from "@/components/website/MotionRoot";

export const metadata: Metadata = {
  title: {
    template: "فاطمه شفیعی | %s",
    default: "فاطمه شفیعی | صفحه اصلی",
  },
  description: "",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MotionRoot>
      <div className="flex min-h-dvh flex-col overflow-x-clip">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:right-4 focus:top-4 focus:z-[60] focus:rounded-2xl focus:bg-iris focus:px-5 focus:py-3 focus:font-bold focus:text-white"
        >
          پرش به محتوا
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </div>
    </MotionRoot>
  );
}
