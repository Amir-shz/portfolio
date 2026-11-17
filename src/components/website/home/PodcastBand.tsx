import { Headphones, Play } from "lucide-react";
import { h2, lead, sectionGap, wrap } from "../styles";

const CASTBOX_URL = "https://castbox.fm/vc/6739140";
const bars = [32, 52, 72, 60, 84, 65, 100, 80, 52, 68, 44, 90, 58, 76, 40, 62, 48, 70, 56, 82];

function PodcastBand() {
  return (
    <section
      id="podcast"
      aria-labelledby="podcast-heading"
      className={`${wrap} ${sectionGap} scroll-mt-24`}
    >
      <div className="glass grid items-center gap-8 rounded-[1.5rem] p-5 sm:p-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <span className="eyebrow">
            <Headphones className="size-3.5" aria-hidden />
            پادکست
          </span>
          <h2 id="podcast-heading" className={`${h2} mt-3`}>
            پادکست‌های من
          </h2>
          <p className={`mt-2 max-w-[34rem] ${lead}`}>
            «اینجا از درس‌خوندن و داستان رتبه‌های برتر کنکور تمام رشته‌ها، تا
            ساختن آینده، انتخاب شغل و مسیر حرفه‌ای حرف میزنیم.»
          </p>
          <a
            href={CASTBOX_URL}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary mt-6 max-sm:w-full"
          >
            <Headphones className="size-4" aria-hidden />
            شنیدن در کست‌باکس
          </a>
        </div>

        <div className="lg:col-span-5">
          <a
            href={CASTBOX_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="پخش پادکست‌ها در کست‌باکس"
            className="w-player glass-dark group block rounded-[1.25rem] p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base font-bold">مسیرهای آرام</p>
                <p className="text-[0.75rem] text-white/55">۳۸ دقیقه</p>
              </div>
              <span className="grid size-10 place-items-center rounded-full bg-iris text-white shadow-iris transition-transform duration-300 group-hover:scale-105">
                <Play className="size-4 fill-current" aria-hidden />
              </span>
            </div>

            <div aria-hidden className="mt-5 flex h-10 items-end gap-[3px]">
              {bars.map((h, i) => (
                <span
                  key={i}
                  className="w-bar w-full rounded-full bg-gradient-to-t from-iris-soft to-lilac"
                  style={{ height: `${h}%`, animationDelay: `${(i % 5) * 0.12}s` }}
                />
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-[0.75rem]">
              <span className="flex items-center gap-1.5 text-white/70">
                <span className="size-1.5 rounded-full bg-sage" />
                ۱۲ قسمت جدید
              </span>
              <span dir="ltr" className="font-medium text-white/40">
                CASTBOX
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

export default PodcastBand;
