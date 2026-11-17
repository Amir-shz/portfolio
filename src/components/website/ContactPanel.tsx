import { ArrowUpLeft, Phone } from "lucide-react";
import { email, phone, socials } from "./contact";
import SocialIcon from "./SocialIcon";

// Phone (secretary) + social accounts, shared by the services and contact pages.
function ContactPanel({ headingLevel = "h2" }: { headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  const accounts = [...socials, email];
  return (
    <div className="grid gap-3 lg:grid-cols-12">
      <div className="glass-dark rounded-[1.5rem] p-6 sm:p-8 lg:col-span-5">
        <Heading className="text-[0.8125rem] font-medium text-white/55">راه های تماس</Heading>
        <a
          href={phone.href}
          className="mt-4 block text-[clamp(1.5rem,3vw,2rem)] font-extrabold leading-tight transition-colors hover:text-lilac"
        >
          {phone.display}
        </a>
        <p className="mt-1 text-[0.8125rem] text-white/55">({phone.note})</p>
        <a href={phone.href} className="btn btn-light btn-sm mt-6 px-4 max-sm:w-full">
          <Phone className="size-3.5" aria-hidden />
          تماس
        </a>
      </div>

      <div className="glass rounded-[1.5rem] p-3 sm:p-4 lg:col-span-7">
        <Heading className="px-2.5 pt-2 text-[0.8125rem] font-medium text-ink-faint">
          حساب های مجازی
        </Heading>
        <ul className="mt-2 grid gap-0.5">
          {accounts.map((s) => (
            <li key={s.key}>
              <a
                href={s.href}
                target={s.key === "email" ? undefined : "_blank"}
                rel="noreferrer"
                className="group flex items-center gap-3 rounded-xl p-2.5 transition-colors duration-200 hover:bg-white/70"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-iris-tint text-iris transition-colors duration-200 group-hover:bg-iris group-hover:text-white">
                  <SocialIcon name={s.key} className="size-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[0.9375rem] font-semibold text-ink">{s.label}</span>
                  <span
                    dir="ltr"
                    className="block truncate text-end text-[0.75rem] text-ink-faint"
                  >
                    {s.key === "email" ? s.handle : `@${s.handle}`}
                  </span>
                </span>
                <ArrowUpLeft
                  aria-hidden
                  className="size-4 shrink-0 text-ink-faint transition-transform duration-200 group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:text-iris"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ContactPanel;
