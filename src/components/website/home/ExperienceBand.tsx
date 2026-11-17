import { companies } from "../companies";
import { wrap } from "../styles";

function ExperienceBand() {
  return (
    <section aria-labelledby="experience-heading" className={`${wrap} mt-3`}>
      <div className="glass flex flex-col gap-5 rounded-[1.25rem] p-5 sm:p-6 lg:flex-row lg:items-center lg:gap-8">
        <div className="flex shrink-0 items-center gap-3 lg:border-e lg:border-ink/10 lg:pe-8">
          <p className="text-gradient py-1 text-[2.5rem] font-extrabold leading-none">+۵</p>
          <h2 id="experience-heading" className="text-sm font-semibold leading-6 text-ink">
            سال سابقه
            <br />
            کار سازمانی
          </h2>
        </div>
        <div className="min-w-0">
          <p className="text-[0.8125rem] text-ink-faint">تجربه کار در شرکت‌های به‌نامی مانند</p>
          <ul className="mt-2.5 flex flex-wrap gap-1.5">
            {companies.map((name) => (
              <li key={name} className="chip border border-white bg-white/65 text-ink">
                {name}
              </li>
            ))}
            <li className="chip px-1.5 text-ink-faint">و …</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default ExperienceBand;
