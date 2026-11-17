import { lead, wrap } from "./styles";

// Shared opening block for inner pages: eyebrow, one title, a lead.
function PageIntro({
  eyebrow,
  title,
  lead: leadText,
  children,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className={`${wrap} pt-10 sm:pt-14`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h1 className="text-gradient mt-3 py-1 text-[clamp(1.75rem,3.2vw,2.5rem)] font-extrabold leading-[1.45]">
        {title}
      </h1>
      {leadText && <p className={`mt-1.5 max-w-[38rem] ${lead}`}>{leadText}</p>}
      {children}
    </section>
  );
}

export default PageIntro;
