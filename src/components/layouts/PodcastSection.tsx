import Link from "next/link";
import { ArrowLeft, Headphones, Play } from "lucide-react";

const CASTBOX_URL = "https://castbox.fm/vc/6739140";

function PodcastSection(): React.ReactNode {
  const bars = [32, 52, 72, 60, 84, 65, 100, 80, 52, 68, 44, 90];

  return (
    <section aria-labelledby="podcast-heading" className="mt-2">
      <div className="overflow-hidden rounded-[2rem] border border-neutral-300 bg-neutral-100 shadow-shadow3 max-sm:rounded-[1.5rem]">
        <div className="grid grid-cols-[1.05fr_1.35fr] gap-8 p-8 max-lg:gap-6 max-lg:p-6 max-sm:grid-cols-1 max-sm:p-5">
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-[22rem] rounded-[1.75rem] border border-neutral-300 bg-neutral-50 p-4 shadow-shadow2 max-sm:max-w-full">
              <div className="relative overflow-hidden rounded-[1.5rem] border border-neutral-300 bg-neutral-100 p-4">
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-p4_SB_desktop text-purple-500 max-sm:text-p4_SB_mobile">
                    پادکست
                  </span>
                  <div className="flex size-11 items-center justify-center rounded-full bg-purple-500 text-neutral-50 shadow-shadow4">
                    <Play className="size-4 fill-current" />
                  </div>
                </div>

                <div className="mt-5 rounded-[1.25rem] border border-neutral-300 bg-neutral-50 p-3 shadow-shadow2">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-p3_SB_desktop text-neutral-700 max-sm:text-p3_SB_mobile">
                        مسیرهای آرام
                      </p>
                      <p className="mt-1 text-p4_R_desktop text-neutral-500 max-sm:text-p4_R_mobile">
                        ۳۸ دقیقه
                      </p>
                    </div>
                    <div className="flex size-12 items-center justify-center rounded-full bg-purple-50 text-purple-500">
                      <Headphones className="size-5" />
                    </div>
                  </div>

                  <div className="mt-4 flex h-12 items-end justify-between gap-[0.2rem]">
                    {bars.map((bar, index) => (
                      <span
                        key={index}
                        className="w-full rounded-full bg-purple-200/80"
                        style={{ height: `${bar}%` }}
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between rounded-[1.25rem] border border-neutral-300 bg-neutral-100 px-3 py-2">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-purple-500" />
                    <span className="text-p4_SB_desktop text-neutral-600 max-sm:text-p4_SB_mobile">
                      ۱۲ قسمت جدید
                    </span>
                  </div>
                  <div className="text-p4_SB_desktop text-neutral-500 max-sm:text-p4_SB_mobile">
                    CASTBOX
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-5 max-sm:order-2">
            <h2
              id="podcast-heading"
              className="text-right text-h4_SB_desktop text-neutral-700 max-sm:text-h4_SB_mobile max-sm:leading-5"
            >
              پادکست‌های من
            </h2>

            <p className="text-right text-p1_M_desktop leading-[1.9rem] text-neutral-600 max-sm:text-p1_M_mobile max-sm:leading-7">
              «اینجا از درس‌خوندن و داستان رتبه‌های برتر کنکور تمام رشته‌ها، تا
              ساختن آینده، انتخاب شغل و مسیر حرفه‌ای حرف میزنیم.»
            </p>

            <div className="flex justify-start max-sm:justify-stretch">
              <Link
                href={CASTBOX_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="شنیدن پادکست‌ها در کست‌باکس"
                className="group inline-flex items-center gap-3 rounded-xl bg-purple-500 px-5 py-3 max-sm:px-4 text-base font-bold leading-[1.125rem] text-neutral-50 shadow-shadow4 transition-all duration-300 hover:bg-purple-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-100 max-sm:w-full max-sm:justify-center"
              >
                <span className="flex size-9 items-center justify-center rounded-full bg-white/10 transition-colors duration-300 group-hover:bg-white/15">
                  <Headphones className="size-4" />
                </span>
                <span className="max-sm:text-sm sm:hidden">
                  شنیدن پادکست‌ها
                </span>
                <span className="max-sm:text-sm max-sm:hidden">
                  شنیدن پادکست‌ها در کست‌باکس
                </span>
                <ArrowLeft className="size-4 transition-transform duration-300 group-hover:translate-x-[-2px]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PodcastSection;
