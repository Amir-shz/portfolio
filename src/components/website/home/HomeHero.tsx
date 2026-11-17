"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowLeft, Award, GraduationCap, Headphones, Play } from "lucide-react";
import photo from "@/../public/fateme2.jpg";
import GlassPortrait, { GlassChip } from "../GlassPortrait";
import SocialIcon from "../SocialIcon";
import { email, socials } from "../contact";
import { wrap } from "../styles";

const credentials = [
  {
    icon: Award,
    text: (
      <>
        رتبه <b className="font-bold text-iris">۵۲</b> کنکور کارشناسی
      </>
    ),
  },
  {
    icon: Award,
    text: (
      <>
        رتبه <b className="font-bold text-iris">۴</b> کنکور کارشناسی ارشد
      </>
    ),
  },
  {
    icon: GraduationCap,
    text: <>کارشناسی روانشناسی، دانشگاه شهید بهشتی</>,
  },
  {
    icon: GraduationCap,
    text: <>ارشد روانشناسی صنعتی و سازمانی، دانشگاه اصفهان</>,
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

function HomeHero() {
  // Initial state is identical on server and client (no hydration drift);
  // MotionConfig reducedMotion="user" drops the movement, and the timing
  // collapses here for people who ask for reduced motion.
  const reduce = useReducedMotion();
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: reduce ? { duration: 0 } : { duration: 0.6, delay, ease },
  });

  return (
    <section className={`${wrap} pt-8 sm:pt-12 lg:pt-14`}>
      <div className="grid items-center gap-x-12 lg:grid-cols-12">
        <div className="lg:col-span-7 lg:self-end">
          <motion.span {...rise(0.05)} className="eyebrow">
            <span aria-hidden className="size-1.5 rounded-full bg-iris" />
            روانشناس صنعتی و سازمانی
          </motion.span>
          <motion.h1
            {...rise(0.12)}
            className="text-gradient mt-4 py-1 text-[clamp(2rem,4.2vw,2.875rem)] font-extrabold leading-[1.45]"
          >
            فاطمه سادات شفیعی
          </motion.h1>
          <motion.p
            {...rise(0.2)}
            className="mt-2 max-w-[30rem] text-[0.9375rem] leading-[1.95] text-ink-soft sm:text-base"
          >
            ارائه مشاوره‌های تخصصی در زمینه‌های سازمانی، فردی و تحصیلی برای
            بهبود عملکرد و توسعه فردی.
          </motion.p>
        </div>

        <div className="mt-8 lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:mt-0">
          <GlassPortrait
            src={photo}
            alt="فاطمه سادات شفیعی"
            priority
            className="max-w-[280px] sm:max-w-[320px] lg:max-w-[340px]"
          >
            <GlassChip className="float-slow -right-4 top-8 sm:-right-9">
              <b className="block text-[0.9375rem] font-bold text-iris">رتبه ۴</b>
              کنکور کارشناسی ارشد
            </GlassChip>
            <GlassChip className="float-slower -left-4 bottom-20 sm:-left-9">
              <b className="block text-[0.9375rem] font-bold text-iris">+۵ سال</b>
              سابقه سازمانی
            </GlassChip>
            <GlassChip className="bottom-4 right-4 flex items-center gap-2 py-1.5 ps-1.5">
              <span className="grid size-6 place-items-center rounded-full bg-iris text-white">
                <Play className="size-3 fill-current" aria-hidden />
              </span>
              <span className="text-ink">پادکست مسیرهای آرام</span>
            </GlassChip>
          </GlassPortrait>
        </div>

        <div className="lg:col-span-7 lg:self-start">
          <motion.div
            {...rise(0.28)}
            className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-4"
          >
            <div className="flex flex-wrap gap-2.5 max-sm:w-full">
              <Link href="/services" className="btn btn-primary max-sm:flex-1">
                رزرو جلسه مشاوره
                <ArrowLeft className="size-4" aria-hidden />
              </Link>
              <a href="#podcast" className="btn btn-glass max-sm:flex-1">
                <Headphones className="size-4 text-iris" aria-hidden />
                شنیدن پادکست
              </a>
            </div>
            <span aria-hidden className="hidden h-6 w-px bg-ink/10 sm:block" />
            <ul aria-label="راه های ارتباطی" className="flex items-center gap-1.5">
              {[...socials, email].map((s) => (
                <li key={s.key}>
                  <a
                    href={s.href}
                    target={s.key === "email" ? undefined : "_blank"}
                    rel="noreferrer"
                    aria-label={s.label}
                    className="icon-btn size-9 border border-white/70 bg-white/50 text-ink-soft backdrop-blur-lg hover:bg-iris hover:text-white"
                  >
                    <SocialIcon name={s.key} className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.ul {...rise(0.36)} className="mt-9 grid gap-2 sm:grid-cols-2">
            {credentials.map(({ icon: Icon, text }, i) => (
              <li
                key={i}
                className="flex items-center gap-2.5 rounded-xl border border-white/70 bg-white/45 px-3 py-2.5 text-[0.8125rem] leading-6 text-ink-soft backdrop-blur-lg"
              >
                <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-iris-tint text-iris">
                  <Icon className="size-3.5" aria-hidden />
                </span>
                <span>{text}</span>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}

export default HomeHero;
