import { Metadata } from "next";
import PageIntro from "@/components/website/PageIntro";
import PlansSection from "@/components/website/services/PlansSection";
import ContactPanel from "@/components/website/ContactPanel";
import { wrap } from "@/components/website/styles";

export const metadata: Metadata = {
  title: "خدمات من",
  description:
    "ارائه مشاوره‌های تخصصی در سه حوزه: 1. مشاوره سازمانی: تحلیل عملکرد، بهبود فرهنگ سازمانی و توسعه تیم. 2. توسعه فردی: هدف‌گذاری، خودشناسی و مهارت‌آموزی. 3. مشاوره تحصیلی: ترسیم مسیر تحصیلی، تقویت یادگیری و مدیریت استرس.",
};

// The booking flow, in the order the visitor goes through it.
const steps = [
  { n: "۱", title: "انتخاب جلسه", text: "یکی از پلن‌های زیر را انتخاب کنید." },
  { n: "۲", title: "تاریخ و ساعت", text: "از نوبت‌های خالی چهار هفته آینده." },
  { n: "۳", title: "واریز و تایید", text: "با ارسال رسید، نوبت قطعی می‌شود." },
];

function Page() {
  return (
    <>
      <PageIntro
        eyebrow="رزرو آنلاین"
        title="رزرو نوبت"
        lead="بهره‌گیری از خدمات و مشاوره؛ جلسه مناسب خود را انتخاب کنید."
      >
        <ol className="mt-6 grid gap-2 sm:grid-cols-3">
          {steps.map((s) => (
            <li
              key={s.n}
              className="flex items-center gap-3 rounded-xl border border-white/70 bg-white/45 p-3 backdrop-blur-lg"
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-iris text-sm font-bold text-white">
                {s.n}
              </span>
              <span>
                <span className="block text-sm font-bold text-ink">{s.title}</span>
                <span className="block text-[0.75rem] leading-5 text-ink-soft">{s.text}</span>
              </span>
            </li>
          ))}
        </ol>
      </PageIntro>
      <section aria-label="جلسات مشاوره" className={`${wrap} mt-8 sm:mt-10`}>
        <PlansSection />
      </section>
      <section aria-label="راه های ارتباطی" className={`${wrap} mt-16 sm:mt-20`}>
        <ContactPanel />
      </section>
    </>
  );
}

export default Page;
