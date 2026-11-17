"use client";

// Floating glass island navigation with a morphing services panel.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ChevronDown, Compass, Fingerprint, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import BrandLogo from "@/components/system/BrandLogo";
import { wrap } from "./styles";
import { phone, socials } from "./contact";
import SocialIcon from "./SocialIcon";

const serviceLinks = [
  {
    href: "/businesses",
    label: "کسب و کارها",
    desc: "هویت برند و رشد سازمان",
    icon: Fingerprint,
  },
  {
    href: "/personalDevelopment",
    label: "توسعه فردی",
    desc: "رشد فردی و مسیر شغلی",
    icon: Compass,
  },
];

const mobileLinks = [
  { href: "/", label: "صفحه اصلی" },
  { href: "/services", label: "رزرو نوبت" },
  { href: "/businesses", label: "کسب و کارها" },
  { href: "/personalDevelopment", label: "توسعه فردی" },
  { href: "/experiences", label: "سوابق" },
  { href: "/blog", label: "بلاگ" },
  { href: "/contact-me", label: "ارتباط با من" },
];

const spring = { type: "spring", stiffness: 450, damping: 36 } as const;

function HoverPill({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <motion.span
      layoutId="nav-hover-pill"
      className="absolute inset-0 -z-10 rounded-full bg-white shadow-[0_6px_16px_-10px_rgba(54,34,120,0.5)] xl:bg-white/80"
      transition={spring}
    />
  );
}

function SiteHeader() {
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const panelId = useId();
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setServicesOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setServicesOpen(false);
        setMobileOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
    if (mobileOpen) closeBtnRef.current?.focus();
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [mobileOpen]);

  const servicesActive = serviceLinks.some((s) => s.href === pathname);

  const linkClass = (active: boolean) =>
    cn(
      "relative z-0 flex cursor-pointer items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200",
      active ? "text-iris-deep" : "text-ink-soft hover:text-ink",
    );

  const activeDot = (
    <span
      aria-hidden
      className="absolute bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-iris"
    />
  );

  const navItem = (key: string, href: string, label: string) => (
    <li
      className="relative"
      onMouseEnter={() => {
        setHovered(key);
        setServicesOpen(false);
      }}
    >
      <Link
        href={href}
        aria-current={pathname === href ? "page" : undefined}
        className={linkClass(pathname === href)}
      >
        <HoverPill show={hovered === key} />
        {label}
        {pathname === href && activeDot}
      </Link>
    </li>
  );

  return (
    <header className="sticky top-0 z-40 pt-3 sm:pt-4">
      <div className={wrap}>
        <div className="glass relative flex items-center justify-between gap-4 rounded-full py-1.5 pe-1.5 ps-4 sm:ps-5">
          <Link href="/" aria-label="صفحه اصلی" className="shrink-0 rounded-full">
            <BrandLogo className="h-6 sm:h-[1.625rem]" />
          </Link>

          <nav
            aria-label="منوی اصلی"
            className="hidden md:block"
            onMouseLeave={() => {
              setHovered(null);
              setServicesOpen(false);
            }}
          >
            <ul className="flex items-center gap-0.5">
              {navItem("home", "/", "صفحه اصلی")}
              <li
                className="relative"
                onMouseEnter={() => {
                  setHovered("services");
                  setServicesOpen(true);
                }}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                    setServicesOpen(false);
                  }
                }}
              >
                <button
                  type="button"
                  aria-expanded={servicesOpen}
                  aria-controls={panelId}
                  onClick={() => setServicesOpen((o) => !o)}
                  className={linkClass(servicesActive)}
                >
                  <HoverPill show={hovered === "services"} />
                  خدمات
                  <ChevronDown
                    aria-hidden
                    className={cn(
                      "size-3.5 transition-transform duration-200",
                      servicesOpen && "rotate-180",
                    )}
                  />
                  {servicesActive && activeDot}
                </button>

                <div className="absolute right-1/2 top-full translate-x-1/2 pt-3">
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        id={panelId}
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 32,
                          mass: 0.6,
                        }}
                        className="glass-strong w-[19rem] rounded-2xl p-1.5"
                      >
                        <ul>
                          {serviceLinks.map(({ href, label, desc, icon: Icon }) => (
                            <li key={href}>
                              <Link
                                href={href}
                                aria-current={pathname === href ? "page" : undefined}
                                className="group flex items-center gap-3 rounded-xl p-2.5 transition-colors duration-150 hover:bg-iris-wash"
                              >
                                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-iris-tint text-iris transition-colors group-hover:bg-iris group-hover:text-white">
                                  <Icon className="size-5" strokeWidth={1.6} aria-hidden />
                                </span>
                                <span>
                                  <span className="block text-sm font-semibold text-ink">{label}</span>
                                  <span className="block text-xs leading-5 text-ink-soft">
                                    {desc}
                                  </span>
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </li>
              {navItem("experiences", "/experiences", "سوابق")}
              {navItem("blog", "/blog", "بلاگ")}
              {navItem("contact", "/contact-me", "ارتباط با من")}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/services"
              className="btn btn-primary btn-sm rounded-full px-4"
            >
              رزرو نوبت
            </Link>
            <button
              type="button"
              aria-label="باز کردن منو"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
              className="icon-btn size-9 border border-white bg-white/70 text-ink hover:bg-white md:hidden"
            >
              <Menu className="size-[1.125rem]" aria-hidden />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="absolute inset-0 bg-plum/45"
              onClick={() => setMobileOpen(false)}
              aria-hidden
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="منو"
              initial={{ y: -24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ type: "spring", stiffness: 380, damping: 34 }}
              className="glass-strong relative mx-3 mt-3 max-h-[calc(100dvh-1.5rem)] overflow-y-auto rounded-3xl p-4"
            >
              <div className="flex items-center justify-between">
                <BrandLogo className="h-6" />
                <button
                  ref={closeBtnRef}
                  type="button"
                  aria-label="بستن منو"
                  onClick={() => setMobileOpen(false)}
                  className="icon-btn size-9 border border-ink/10 bg-white/70 text-ink"
                >
                  <X className="size-[1.125rem]" aria-hidden />
                </button>
              </div>

              <nav aria-label="منوی موبایل" className="mt-3">
                <ul className="grid gap-0.5">
                  {mobileLinks.map(({ href, label }) => {
                    const active = pathname === href;
                    return (
                      <li key={href}>
                        <Link
                          href={href}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "flex items-center justify-between rounded-xl px-3.5 py-3 text-[0.9375rem] font-semibold transition-colors",
                            active
                              ? "bg-iris-tint text-iris-deep"
                              : "text-ink hover:bg-iris-wash",
                          )}
                        >
                          {label}
                          <ArrowLeft
                            aria-hidden
                            className={cn("size-4", active ? "text-iris" : "text-ink-faint")}
                          />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-iris-wash px-3.5 py-2.5">
                <a href={phone.href} className="text-[0.8125rem] font-semibold text-iris-deep">
                  {phone.display}
                  <span className="ms-1 font-medium text-ink-soft">({phone.note})</span>
                </a>
                <div className="flex gap-1.5">
                  {socials.map((s) => (
                    <a
                      key={s.key}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.label}
                      className="icon-btn size-9 bg-white text-iris hover:bg-iris hover:text-white"
                    >
                      <SocialIcon name={s.key} className="size-4" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default SiteHeader;
