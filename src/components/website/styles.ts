// Layout and type recipes for the public website. Surfaces, buttons and
// fields live in src/styles/globals.css (.glass, .btn-*, .field) and are
// shared with the booking flow and the dashboard.
//
// Type scale (modular): 12 · 13 · 15 · 17 · 22–30 (h2) · 28–40 (page h1) · 32–46 (hero).
// Weights: 800 for titles, 700 for card titles, 500 for labels, 400 for body.
// Persian script must never get letter-spacing, so no tracking-* utilities.

export const wrap = "mx-auto w-full max-w-[1140px] px-4 sm:px-6 lg:px-8";

export const sectionGap = "mt-16 sm:mt-24";

/** Inner-page title (h1) */
export const h1 =
  "text-[clamp(1.75rem,3.2vw,2.5rem)] font-extrabold leading-[1.45] text-ink";

/** Section title (h2) */
export const h2 =
  "text-[clamp(1.375rem,2.3vw,1.875rem)] font-extrabold leading-[1.5] text-ink";

/** Card title (h3) */
export const h3 = "text-base font-bold leading-7 text-ink sm:text-[1.0625rem]";

/** Intro paragraph under a title */
export const lead = "text-[clamp(0.9375rem,1.3vw,1.0625rem)] leading-[1.95] text-ink-soft";

/** Regular running text */
export const body = "text-[0.9375rem] leading-[1.9] text-ink-soft";
