import { CalendarDays, CircleDollarSign, Sparkles } from "lucide-react";
import { planData } from "@/data/planData";
import { cn } from "@/lib/utils";
import Count from "./Count";

function StatCard({
  label,
  hint,
  icon: Icon,
  tone,
  children,
}: {
  label: string;
  hint?: string;
  icon: typeof CalendarDays;
  tone: "iris" | "ok" | "warn";
  children: React.ReactNode;
}) {
  return (
    <div className="glass flex items-center justify-between gap-4 rounded-[1.25rem] p-4">
      <div className="min-w-0">
        <p className="text-[0.8125rem] text-ink-soft">
          {label}
          {hint && <span className="ms-1 text-xs text-ink-faint">({hint})</span>}
        </p>
        <p className="mt-2 text-2xl font-bold leading-none text-ink">{children}</p>
      </div>
      <span
        className={cn(
          "grid size-9 shrink-0 place-items-center rounded-xl",
          tone === "iris" && "bg-iris-tint text-iris",
          tone === "ok" && "bg-ok-tint text-ok",
          tone === "warn" && "bg-warn-tint text-warn",
        )}
      >
        <Icon className="size-5" strokeWidth={1.7} aria-hidden />
      </span>
    </div>
  );
}

function DashboardStats({
  reservations,
}: {
  reservations: { status: string; plan: number }[];
}) {
  const reservationsNum = reservations.length;

  const newReservationsNum = reservations.reduce((acc, cur) => {
    return cur.status === "new" ? acc + 1 : acc;
  }, 0);

  // sum of price
  const plans = reservations.map((reservation) => reservation.plan);

  const prices = plans.flatMap((el) =>
    planData.filter((planEl) => planEl.id === el).map((el) => el.price),
  );

  const persianToEnglish = (s: string) =>
    s.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString());

  const extractNumber = (str: string) => {
    const englishNumbers = persianToEnglish(str);
    return parseInt(englishNumbers.replace(/\D/g, ""), 10);
  };

  const pricesNums = prices.map((price) => extractNumber(price));
  const somePrices =
    pricesNums.reduce((acc, cur) => (!Number.isNaN(cur) ? cur + acc : acc), 0) * 1000;

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
      <StatCard label="رزروهای امروز" icon={CalendarDays} tone="iris">
        <Count value={reservationsNum} />
        <span className="ms-1 text-[0.75rem] text-ink-faint">رزرو</span>
      </StatCard>
      <StatCard label="رزروهای جدید" icon={Sparkles} tone="ok">
        <Count value={newReservationsNum} />
        <span className="ms-1 text-[0.75rem] text-ink-faint">رزرو</span>
      </StatCard>
      <StatCard label="درآمد امروز" hint="بدون منعطف‌ها" icon={CircleDollarSign} tone="warn">
        <Count value={somePrices} isPrice />
        <span className="ms-1 text-[0.75rem] text-ink-faint">تومان</span>
      </StatCard>
    </div>
  );
}

export default DashboardStats;
