import { useReservationStore } from "@/hooks/useReservationStore";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { cn } from "@/lib/utils";

function DateRadio({
  date,
  available,
}: {
  date: {
    date: string;
    jalali: { dayName: string; day: string; monthName: string };
  };
  available: number;
}) {
  const { selectedDate, handleSelectedDateChange } = useReservationStore();

  const jalaliDate = date.jalali;
  const disabled = available === 0;
  const selected = selectedDate === date.date;

  return (
    <label className={cn("block", disabled ? "cursor-not-allowed" : "cursor-pointer")}>
      <input
        type="radio"
        name="date"
        disabled={disabled}
        value={date.date}
        checked={selected}
        onChange={handleSelectedDateChange}
        className="peer sr-only"
      />
      <div
        className={cn(
          "flex h-full select-none flex-col items-center justify-center gap-0.5 rounded-xl border px-1 py-2.5 text-center transition-[background-color,border-color,box-shadow,color] duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-iris peer-focus-visible:ring-offset-2",
          disabled && "border-transparent bg-white/30 text-ink-faint/70",
          !disabled && !selected && "border-white bg-white/70 text-ink hover:border-iris/40 hover:bg-white",
          selected && "border-iris bg-iris text-white shadow-iris",
        )}
      >
        <span className={cn("text-[0.6875rem] font-medium", !disabled && !selected && "text-ink-soft")}>
          {jalaliDate.dayName}
        </span>
        <span className="text-[0.8125rem] font-semibold leading-5">
          {jalaliDate.day} {jalaliDate.monthName}
        </span>
        <span
          className={cn(
            "mt-0.5 whitespace-nowrap text-[0.6875rem] font-semibold",
            disabled ? "" : selected ? "text-white/85" : "text-ok-deep",
          )}
        >
          {disabled ? "بدون نوبت" : `${digitsEnToFa(available)} نوبت خالی`}
        </span>
      </div>
    </label>
  );
}

export default DateRadio;
