"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { testimonialsData } from "@/data/testimonialsData";
import { cn } from "@/lib/utils";
import { h2, sectionGap, wrap } from "../styles";

const total = testimonialsData.length;
const pad = (n: number) => digitsEnToFa(String(n).padStart(2, "0"));

function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [panning, setPanning] = useState(false);

  const go = (next: number) => setIndex((next + total) % total);

  return (
    <section
      aria-labelledby="testimonials-heading"
      aria-roledescription="carousel"
      className={`${wrap} ${sectionGap}`}
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="eyebrow">تجربه مراجعان</span>
          <h2 id="testimonials-heading" className={`${h2} mt-3`}>
            صداهایی از دل جلسات
          </h2>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="me-2 text-[0.8125rem] font-medium text-ink-faint" aria-hidden>
            {pad(index + 1)} / {pad(total)}
          </span>
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="نظر قبلی"
            className="icon-btn size-9 border border-white/70 bg-white/55 text-ink backdrop-blur-lg hover:bg-iris hover:text-white"
          >
            <ChevronRight className="size-4" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="نظر بعدی"
            className="icon-btn size-9 border border-white/70 bg-white/55 text-ink backdrop-blur-lg hover:bg-iris hover:text-white"
          >
            <ChevronLeft className="size-4" aria-hidden />
          </button>
        </div>
      </div>

      <div
        className={cn(
          "glass relative mt-6 overflow-hidden rounded-[1.5rem] px-5 pb-6 pt-7 sm:px-10 sm:pb-8 sm:pt-9",
          (paused || panning) && "w-paused",
        )}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <Quote
          aria-hidden
          className="mb-4 size-7 rotate-180 fill-iris/80 text-iris/80"
        />

        {/* Every quote shares one grid cell, so the card keeps the height of
            the longest one and never jumps between slides. */}
        <motion.div
          className="relative grid cursor-grab select-none touch-pan-y touch-pinch-zoom items-center active:cursor-grabbing"
          aria-live={paused ? "polite" : "off"}
          onPanStart={() => setPanning(true)}
          onPanEnd={(event, { offset }) => {
            setPanning(false);
            const distance = Math.abs(offset.x);
            if (event.type !== "pointerup" || distance < 48 || distance <= Math.abs(offset.y)) return;

            go(index + (offset.x > 0 ? 1 : -1));
          }}
        >
          {testimonialsData.map((t, i) => {
            const active = i === index;
            return (
              <figure
                key={t.id}
                aria-hidden={!active}
                className={cn(
                  "col-start-1 row-start-1 transition-[opacity,transform] duration-500 ease-out",
                  active
                    ? "visible translate-y-0 opacity-100"
                    : "invisible translate-y-2 opacity-0",
                )}
              >
                <blockquote className="max-w-[62ch] text-[0.9375rem] leading-[2] text-ink sm:text-base">
                  {t.testimonial}
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <span
                    aria-hidden
                    className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-iris to-iris-soft text-sm font-bold text-white"
                  >
                    {t.name.trim().charAt(0)}
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-ink">{t.name}</span>
                    <span className="block text-[0.75rem] text-ink-faint">مراجع</span>
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </motion.div>

        <div className="mt-7 flex gap-1" role="tablist" aria-label="انتخاب نظر">
          {testimonialsData.map((t, i) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`نظر ${digitsEnToFa(String(i + 1))}`}
              onClick={() => go(i)}
              className="group relative h-6 flex-1"
            >
              <span className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 overflow-hidden rounded-full bg-ink/10 transition-colors group-hover:bg-ink/20">
                {i < index && <span className="absolute inset-0 bg-iris/40" />}
                {i === index && (
                  <span
                    key={index}
                    className="w-fill absolute inset-0 bg-iris"
                    onAnimationEnd={() => go(index + 1)}
                  />
                )}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
