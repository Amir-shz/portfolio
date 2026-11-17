import { getJalaliDetails } from "@/utils/utils";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

function ScheduleRow({
  schedule,
}: {
  schedule: {
    _id: string;
    date: string;
    hours: Array<{ hour: string; isAvailable: boolean }>;
  };
}) {
  const { _id, date, hours } = schedule;
  const { day, monthName, year, dayName } = getJalaliDetails(new Date(date));
  const isPast = new Date(date) < new Date();

  return (
    <li
      className={cn(
        "flex flex-wrap items-center gap-3 rounded-xl border border-white bg-white/65 p-3 sm:flex-nowrap sm:p-3.5",
        isPast && "opacity-60",
      )}
    >
      <div className="w-full shrink-0 sm:w-44">
        <p className="text-xs font-semibold text-ink-faint">{dayName}</p>
        <p className="font-bold text-ink">
          {day} {monthName} {year}
        </p>
      </div>
      <ul className="flex min-w-0 flex-1 flex-wrap gap-1.5">
        {hours.map((hour) => (
          <li
            key={hour.hour}
            className={cn(
              "chip py-1 text-[0.8125rem]",
              hour.isAvailable ? "bg-ok-tint text-ok-deep" : "bg-danger-tint text-danger-deep",
            )}
          >
            {digitsEnToFa(hour.hour)}
            <span className="sr-only">{hour.isAvailable ? "آزاد" : "رزرو شده"}</span>
          </li>
        ))}
      </ul>
      <Link
        href={`/dashboard/schedules/${_id}`}
        aria-label={`ویرایش ساعت‌های ${day} ${monthName}`}
        className="icon-btn size-9 shrink-0 bg-iris-wash text-iris hover:bg-iris hover:text-white"
      >
        <Pencil className="size-4" aria-hidden />
      </Link>
    </li>
  );
}

export default ScheduleRow;
