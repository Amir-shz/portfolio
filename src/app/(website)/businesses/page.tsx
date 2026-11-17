import { Metadata } from "next";
import Image from "next/image";
import { Fingerprint, HardHat, Megaphone, UsersRound } from "lucide-react";
import PathPage from "@/components/website/paths/PathPage";
import GlassPortrait, { GlassChip } from "@/components/website/GlassPortrait";
import { companies } from "@/components/website/companies";
import { body, h2, sectionGap, wrap } from "@/components/website/styles";
import meetingImg from "../../../../public/images/meeting.jpg";
import fieldImg from "../../../../public/images/field.jpg";

export const metadata: Metadata = {
  title: "کسب و کارها",
};

function page() {
  return (
    <PathPage
      eyebrow="برای کسب‌وکارها"
      title="چرا برندت آن‌طور که باید نمیفروشد و تیمت آن‌طور که باید کار نمیکند؟"
      paragraphs={[
        "مدیر عزیز، بیایید تعارف را کنار بگذاریم. شما میتوانید بهترین محصول دنیا را داشته باشید، اما اگر دغدغه مشتری را موشکافی نکنید، پیام برندتان به دل مخاطب ننشیند و تیمتان بی‌انگیزه باشد، در بازار بی‌رحم امروز بازنده‌اید.",
        "من با تجربه حضور در برندهای بزرگی مثل فولاد مبارکه، ذوب‌آهن، صنعت مس ایران و شرکت‌هایی مثل هنزا بُتُن و داکولایت و یاتاقان گلدن، یاد گرفته‌ام که سودآوری سازمان شما به یک چیز بند است: هویت برند قدرتمند",
      ]}
      visual={
        <GlassPortrait
          src={meetingImg}
          alt="فاطمه شفیعی در جلسه سازمانی، کنار نمودار فرایند روی نمایشگر"
          priority
          animate={false}
          objectPosition="object-[12%_50%]"
          className="max-w-[280px] sm:max-w-[330px]"
        >
          <GlassChip className="float-slow -right-4 top-7 sm:-right-8">
            <b className="block text-[0.9375rem] font-bold text-iris">استراتژی برند</b>
            و عارضه‌یابی سازمان
          </GlassChip>
          <GlassChip className="float-slower -left-4 bottom-8 sm:-left-8">
            <b className="block text-[0.9375rem] font-bold text-iris">+۵ سال</b>
            همکاری با سازمان‌ها
          </GlassChip>
        </GlassPortrait>
      }
      sectionTitle="خدمات من برای کسب‌وکار شما"
      offerings={[
        {
          title: "استراتژی برند",
          description:
            "حلّ مشکلِ «دیده نشدن و نفروختن» با تکیه بر شناخت دقیق مخاطب محصول شما، بهبود لحن پیام و هویت برند. سناریوهای تبلیغاتی و کمپین‌های شما طوری نوشته میشود که بر عمق ناخودآگاهِ مخاطب تاثیر گذاشته و به مشتری وفادار شما تبدیل گردد.",
          icon: <Fingerprint />,
        },
        {
          title: "مارکتینگ",
          description:
            "با تسلط بر الگوریتم‌های اینستاگرام و طراحی وبسایت‌های شکیل، بسترهای فروش دیجیتال شما هموار میگردد.",
          icon: <Megaphone />,
        },
        {
          title: "عارضه‌یابی منابع انسانی",
          description:
            "درمان «افت عملکرد و بهره‌وری پرسنل» با پیدا کردن گره‌های کور ارتباطی سازمان، طراحی ارزیابی عملکرد، و سیستم‌های انگیزشی که منجر به خلق تیمی متعهد و جنگنده برای اجرای اهدافتان میشود.",
          icon: <UsersRound />,
        },
      ]}
    >
      <section aria-labelledby="field-heading" className={`${wrap} ${sectionGap}`}>
        <div className="glass grid gap-5 rounded-[1.5rem] p-2 lg:grid-cols-2 lg:items-center lg:gap-8">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[1.125rem] bg-iris-tint">
            <Image
              src={fieldImg}
              alt="فاطمه شفیعی با کلاه ایمنی در سالن تولید یک کارخانه"
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 540px, 92vw"
              className="object-cover"
            />
          </div>
          <div className="px-3 pb-4 sm:px-4 lg:py-4 lg:pe-6">
            <span className="eyebrow">
              <HardHat className="size-3.5" aria-hidden />
              تجربه میدانی
            </span>
            <h2 id="field-heading" className={`${h2} mt-3`}>
              از سالن تولید تا اتاق مدیریت
            </h2>
            <p className={`mt-2 ${body}`}>
              مشاوره‌ها بر پایه حضور در خود سازمان‌هاست؛ کنار تیم‌ها، در محیط
              واقعی کار. تجربه همکاری با مجموعه‌هایی مانند:
            </p>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {companies.slice(0, 7).map((name) => (
                <li
                  key={name}
                  className="chip border border-white bg-white/65 text-ink"
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </PathPage>
  );
}

export default page;
