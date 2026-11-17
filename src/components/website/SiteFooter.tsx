import Link from "next/link";
import { ArrowLeft, Phone } from "lucide-react";
import BrandLogo from "@/components/system/BrandLogo";
import { wrap } from "./styles";
import { email, phone, socials } from "./contact";
import SocialIcon from "./SocialIcon";

const footerLinks = [
  { href: "/", label: "صفحه اصلی" },
  { href: "/services", label: "رزرو نوبت" },
  { href: "/businesses", label: "کسب و کارها" },
  { href: "/personalDevelopment", label: "توسعه فردی" },
  { href: "/experiences", label: "سوابق" },
  { href: "/blog", label: "بلاگ" },
  { href: "/contact-me", label: "ارتباط با من" },
];

function SiteFooter() {
  return (
    <footer className={`${wrap} mt-20 pb-4 sm:mt-28 sm:pb-6`}>
      <div className="glass-dark rounded-[1.5rem] px-5 py-7 sm:px-8 sm:py-8">
        {/* CTA row */}
        <div className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-lg font-bold leading-8">یک گفت‌وگو می‌تواند مسیر را روشن کند.</p>
            <p className="text-[0.8125rem] text-white/55">
              مشاوره سازمانی، فردی و تحصیلی؛ نوبت را آنلاین رزرو کنید.
            </p>
          </div>
          <Link href="/services" className="btn btn-light btn-sm shrink-0 px-4 max-sm:w-full">
            رزرو نوبت
            <ArrowLeft className="size-3.5" aria-hidden />
          </Link>
        </div>

        <div className="grid gap-7 pt-6 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <BrandLogo className="h-6 text-white" />
            <p className="mt-2 max-w-[16rem] text-[0.8125rem] leading-6 text-white/50">
              فاطمه سادات شفیعی، روانشناس صنعتی و سازمانی
            </p>
            <ul className="mt-4 flex gap-1.5">
              {socials.map((s) => (
                <li key={s.key}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="icon-btn size-9 border border-white/10 bg-white/5 text-white/75 hover:border-white hover:bg-white hover:text-plum"
                  >
                    <SocialIcon name={s.key} className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="پیوندهای پانویس" className="lg:col-span-4">
            <p className="text-[0.75rem] text-white/40">دسترسی سریع</p>
            <ul className="mt-2.5 grid grid-cols-2 gap-x-6 gap-y-2 text-[0.8125rem]">
              {footerLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="rounded text-white/70 transition-colors hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <p className="text-[0.75rem] text-white/40">راه های تماس</p>
            <ul className="mt-2.5 space-y-2 text-[0.8125rem]">
              <li>
                <a
                  href={phone.href}
                  className="inline-flex flex-wrap items-center gap-2 rounded text-white/80 transition-colors hover:text-white"
                >
                  <Phone className="size-3.5 text-lilac" aria-hidden />
                  {phone.display}
                  <span className="text-white/45">({phone.note})</span>
                </a>
              </li>
              <li>
                <a
                  href={email.href}
                  className="inline-flex items-center gap-2 rounded text-white/80 transition-colors hover:text-white"
                >
                  <SocialIcon name="email" className="size-3.5 text-lilac" />
                  <span dir="ltr">{email.handle}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p
          dir="ltr"
          className="mt-7 border-t border-white/10 pt-5 text-center text-[0.6875rem] text-white/35"
        >
          All Rights Reserved by Fatemeh Shafiei &copy;
        </p>
      </div>
    </footer>
  );
}

export default SiteFooter;
