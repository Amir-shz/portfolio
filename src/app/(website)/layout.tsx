import type { Metadata } from "next";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";

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
    <div className=" grid grid-cols-12 mx-auto max-w-[1296px] gap-6 relative max-sm:grid-cols-4 max-sm:gap-4 max-sm:mx-6">
      <div className="col-start-2 col-end-12 max-sm:col-span-full">
        <Header />
        <main className="pt-[4.5rem] max-sm:pt-8">{children}</main>
        <div className=" overflow-hidden -mx-4 px-4">
          <Footer />
        </div>
      </div>
    </div>
  );
}
