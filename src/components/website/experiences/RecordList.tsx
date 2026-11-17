import { digitsEnToFa } from "@persian-tools/persian-tools";

// One column of the résumé page. Education entries are written as
// "title-institution"; the institution is set in a quieter tone.
function RecordList({
  title,
  icon,
  items,
  splitInstitution = false,
}: {
  title: string;
  icon: React.ReactNode;
  items: string[];
  splitInstitution?: boolean;
}) {
  return (
    <section className="glass rounded-[1.5rem] p-4 sm:p-6">
      <div className="flex items-center justify-between gap-4 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-xl bg-iris text-white [&>svg]:size-[1.125rem] [&>svg]:stroke-[1.7]">
            {icon}
          </span>
          <h2 className="text-lg font-bold text-ink">{title}</h2>
        </div>
        <span className="chip bg-iris-wash text-[0.75rem] text-iris-deep">
          {digitsEnToFa(String(items.length))} مورد
        </span>
      </div>
      <ul className="grid gap-1.5">
        {items.map((item) => {
          const cut = splitInstitution ? item.indexOf("-") : -1;
          const main = cut > 0 ? item.slice(0, cut).trim() : item.trim();
          const sub = cut > 0 ? item.slice(cut + 1).trim() : null;
          return (
            <li
              key={item}
              className="flex gap-2.5 rounded-xl border border-white/70 bg-white/55 px-3.5 py-2.5 text-[0.875rem] leading-7"
            >
              <span
                aria-hidden
                className="mt-[0.6875rem] size-1.5 shrink-0 rounded-full bg-iris-soft"
              />
              <span>
                <span className="font-medium text-ink">{main}</span>
                {sub && <span className="block text-[0.8125rem] text-ink-faint">{sub}</span>}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default RecordList;
