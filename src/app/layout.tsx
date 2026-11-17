import localFont from "next/font/local";
import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import PWAInstallPrompt from "@/components/ui/PWAInstallPrompt";
import { Toaster } from "@/components/ui/toaster";
import Script from "next/script";

// IRAN Yekan, the app's only typeface (files in src/fonts/iranyekan).
const iranYekan = localFont({
  src: [
    { path: "../fonts/iranyekan/IRANYekanWebThin.woff2", weight: "100", style: "normal" },
    { path: "../fonts/iranyekan/IRANYekanWebLight.woff2", weight: "300", style: "normal" },
    { path: "../fonts/iranyekan/IRANYekanWebRegular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/iranyekan/IRANYekanWebMedium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/iranyekan/IRANYekanWebBold.woff2", weight: "700", style: "normal" },
    { path: "../fonts/iranyekan/IRANYekanWebExtraBold.woff2", weight: "800", style: "normal" },
    { path: "../fonts/iranyekan/IRANYekanWebBlack.woff2", weight: "900", style: "normal" },
    { path: "../fonts/iranyekan/IRANYekanWebExtraBlack.woff2", weight: "950", style: "normal" },
  ],
  variable: "--font-yekan",
  display: "swap",
});

function siteUrl() {
  try {
    return new URL(process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000");
  } catch {
    return new URL("http://localhost:3000");
  }
}

// absolute URLs for Open Graph / Twitter images (blog covers etc.)
export const metadata: Metadata = {
  metadataBase: siteUrl(),
};

export const viewport: Viewport = {
  themeColor: "#F3F1F8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-DWMG1QLPHQ"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DWMG1QLPHQ');
          `}
        </Script>

        {/* Google Tag Manager */}
        <Script id="gtm-head" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-T3QG8FJ9');
          `}
        </Script>
      </head>
      <body
        className={`${iranYekan.variable} ${iranYekan.className}`}
      >
        {/* GTM NoScript */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-T3QG8FJ9"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        {children}

        <PWAInstallPrompt />
        <Toaster />
      </body>
    </html>
  );
}
