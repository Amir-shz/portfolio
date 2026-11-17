import { Fingerprint, Presentation, Sprout } from "lucide-react";
import { body, h3, wrap } from "../styles";

const areas = [
  {
    icon: Sprout,
    title: "توسعه فردی",
    description: "خودشناسی عمیق، هدف‌گذاری هوشمندانه و مهارت‌های تحول‌ساز",
  },
  {
    icon: Fingerprint,
    title: "برندینگ کسب‌وکارها",
    description: "خلق برند منحصربه‌فرد و افزایش فروش",
  },
  {
    icon: Presentation,
    title: "کارگاه‌های تخصصی",
    description:
      "مهارت‌های ارتباطی موثر، مدیریت زمان و انرژی و تصمیم‌سازی استراتژیک",
  },
];

function FocusAreas() {
  return (
    <section aria-label="حوزه‌های فعالیت" className={`${wrap} mt-16 sm:mt-20`}>
      <ul className="grid gap-3 md:grid-cols-3">
        {areas.map(({ icon: Icon, title, description }) => (
          <li key={title} className="glass flex gap-3.5 rounded-[1.25rem] p-5">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-iris-tint text-iris">
              <Icon className="size-5" strokeWidth={1.7} aria-hidden />
            </span>
            <div>
              <h3 className={h3}>{title}</h3>
              <p className={`mt-1 ${body}`}>{description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default FocusAreas;
