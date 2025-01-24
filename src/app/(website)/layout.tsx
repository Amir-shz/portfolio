import type { Metadata } from "next";
import Header from "@/components/layouts/Header";
import Link from "next/link";
import { HiOutlineUser } from "react-icons/hi2";

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
    <div className=" grid grid-cols-12 mx-auto max-w-[1296px] gap-6 relative">
      <div className="col-start-2 col-end-12">
        <Header />
        <main className="pt-[4.5rem] max-lg:pt-12">{children}</main>
      </div>

      {/* link to dashboard */}
      <Link
        href="/dashboard"
        className=" fixed bottom-4 right-4 bg-purple-300 p-4 rounded-full"
      >
        <HiOutlineUser size={24} className=" text-neutral-50 stroke-2" />
      </Link>
    </div>
  );
}
