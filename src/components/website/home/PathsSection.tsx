import Image from "next/image";
import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";
import businessesImg from "@/../public/images/meeting.jpg";
import personalImg from "@/../public/images/laptop.jpg";
import { body, h2, sectionGap, wrap } from "../styles";

const paths = [
  {
    href: "/businesses",
    kicker: "برای کسب‌وکارها",
    title: "هویت برند و رشد سازمان",
    description:
      "ویترین برندت رو اصولی بچین، دغدغه مشتریات رو بشناس و یه تیم کاربلد تشکیل بده تا صدای برندت به شکیل‌ترین شکل ممکن و در کمترین زمان به گوش مخاطبات برسه.",
    image: businessesImg,
    imageAlt: "فاطمه شفیعی در جلسه سازمانی، کنار نمودار فرایند روی نمایشگر",
    imagePosition: "object-[30%_50%]",
    tags: ["استراتژی برند", "عارضه‌یابی منابع انسانی"],
  },
  {
    href: "/personalDevelopment",
    kicker: "برای افراد",
    title: "رشد فردی و مسیر شغلی",
    description:
      "اگه کامواهای فکریت توی ذهن شلوغ پلوغت، درمورد انتخاب رشته و شغل و ساختن یه لایف استایل تراز گره خوردن، وقت کشیدن یه نفس راحته؛ چون قراره دونه دونه‌شونو باهم باز کنیم.",
    image: personalImg,
    imageAlt: "فاطمه شفیعی پشت لپ‌تاپ، آماده جلسه مشاوره",
    imagePosition: "object-[50%_22%]",
    tags: ["کنکور", "مسیر شغلی", "خودشناسی"],
  },
];

function PathsSection() {
  return (
    <section aria-labelledby="paths-heading" className={`${wrap} ${sectionGap}`}>
      <span className="eyebrow">دو مسیر، یک هدف</span>
      <h2 id="paths-heading" className={`${h2} mt-3`}>
        خدمات من
      </h2>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {paths.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            className="glass group flex flex-col rounded-[1.5rem] p-2 transition-[background-color,box-shadow] duration-300 hover:bg-white/70 hover:shadow-glass-lg"
          >
            <div className="relative aspect-[16/9] overflow-hidden rounded-[1.125rem] bg-iris-tint">
              <Image
                src={p.image}
                alt={p.imageAlt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 540px, 92vw"
                className={`object-cover ${p.imagePosition} transition-transform duration-700 ease-out group-hover:scale-[1.03]`}
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-plum/30 via-transparent to-transparent"
              />
              <ul className="absolute inset-x-3 bottom-3 flex flex-wrap gap-1">
                {p.tags.map((tag) => (
                  <li
                    key={tag}
                    className="chip border border-white/70 bg-white/75 text-[0.75rem] text-ink backdrop-blur-md"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-1 flex-col px-3 pb-3 pt-4 sm:px-4">
              <span className="text-[0.75rem] font-medium text-iris">{p.kicker}</span>
              <h3 className="mt-0.5 text-lg font-bold leading-8 text-ink">{p.title}</h3>
              <p className={`mt-1.5 flex-1 ${body}`}>{p.description}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-ink">
                <span className="grid size-8 place-items-center rounded-full bg-iris text-white shadow-iris transition-transform duration-300 group-hover:-translate-x-0.5">
                  <ArrowUpLeft className="size-4" aria-hidden />
                </span>
                بیشتر بخوانید
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default PathsSection;
