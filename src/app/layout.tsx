import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import Header from "@/components/layouts/Header";

const Vazirmatn = localFont({
  src: [
    {
      path: "../fonts/Vazirmatn-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../fonts/Vazirmatn-ExtraLight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../fonts/Vazirmatn-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/Vazirmatn-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Vazirmatn-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Vazirmatn-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/Vazirmatn-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/Vazirmatn-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../fonts/Vazirmatn-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--vazirmatn",
});

export const metadata: Metadata = {
  title: "فاطمه شفیعی",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${Vazirmatn.variable} ${Vazirmatn.className} antialiased bg-background`}
      >
        <div className=" grid grid-cols-12 mx-auto max-w-[1296px] gap-6 max-xl:mx-9">
          <div className="col-start-2 col-end-12 max-xl:col-span-full">
            <Header />
            <main className="pt-[4.5rem]  max-lg:pt-12">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
