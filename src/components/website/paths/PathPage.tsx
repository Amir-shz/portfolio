import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { body, h2, h3, sectionGap, wrap } from "../styles";

export interface Offering {
  title: string;
  description: string;
  icon: React.ReactNode;
}

// Long-form landing shared by /businesses and /personalDevelopment:
// a glass hero (text + framed photo), then the offerings as glass cards.
function PathPage({
  eyebrow,
  title,
  paragraphs,
  visual,
  sectionTitle,
  offerings,
  children,
}: {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  visual: React.ReactNode;
  sectionTitle: string;
  offerings: Offering[];
  children?: React.ReactNode;
}) {
  return (
    <>
      <section className={`${wrap} pt-6 sm:pt-10`}>
        <div className="glass grid items-center gap-10 rounded-[1.5rem] px-5 py-8 sm:px-8 sm:py-10 lg:grid-cols-12 lg:gap-12 lg:px-10">
          <div className="lg:col-span-7">
            <span className="eyebrow">{eyebrow}</span>
            <h1 className="mt-4 text-[clamp(1.375rem,2.4vw,1.875rem)] font-extrabold leading-[1.75] text-ink">
              {title}
            </h1>
            <div className={`mt-4 max-w-[62ch] space-y-3 ${body}`}>
              {paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap gap-2.5">
              <Link href="/services" className="btn btn-primary max-sm:flex-1">
                شروع مسیر
                <ArrowLeft className="size-4" aria-hidden />
              </Link>
              <Link href="/contact-me" className="btn btn-glass max-sm:flex-1">
                سوال دارم
              </Link>
            </div>
          </div>
          <div className="max-lg:-order-1 lg:col-span-5">{visual}</div>
        </div>
      </section>

      <section aria-labelledby="offerings-heading" className={`${wrap} ${sectionGap}`}>
        <h2 id="offerings-heading" className={h2}>
          {sectionTitle}
        </h2>
        <ul className="mt-6 grid gap-3 md:grid-cols-3">
          {offerings.map((o) => (
            <li key={o.title} className="glass flex flex-col rounded-[1.25rem] p-5">
              <span className="grid size-10 place-items-center rounded-xl bg-iris-tint text-iris [&>svg]:size-5 [&>svg]:stroke-[1.7]">
                {o.icon}
              </span>
              <h3 className={`mt-4 ${h3}`}>{o.title}</h3>
              <p className={`mt-1.5 ${body}`}>{o.description}</p>
            </li>
          ))}
        </ul>
      </section>

      {children}
    </>
  );
}

export default PathPage;
