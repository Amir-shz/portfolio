import type { Metadata } from "next";
import Header from "@/components/layouts/Header";

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
    <div className=" grid grid-cols-12 mx-auto max-w-[1296px] gap-6">
      <div className="col-start-2 col-end-12">
        <Header />
        <main className="pt-[4.5rem] max-lg:pt-12">{children}</main>
      </div>
    </div>
  );
}
