import { useReservationStore } from "@/hooks/useReservationStore";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { cn } from "@/lib/utils";

function TimeRadio({ hour }: { hour: { hour: string; isAvailable: boolean } }) {
  const { selectedTime, handleSelectedTimeChange } = useReservationStore();
  const selected = selectedTime === hour.hour;
  const disabled = !hour.isAvailable;

  return (
    <label className={cn("block", disabled ? "cursor-not-allowed" : "cursor-pointer")}>
      <input
        type="radio"
        name="time"
        disabled={disabled}
        value={hour.hour}
        checked={selected}
        onChange={handleSelectedTimeChange}
        className="peer sr-only"
      />
      <div
        className={cn(
          "flex select-none justify-center rounded-xl border py-2.5 text-sm font-semibold transition-[background-color,border-color,box-shadow,color] duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-iris peer-focus-visible:ring-offset-2",
          disabled && "border-transparent bg-white/30 text-ink-faint/70 line-through decoration-ink-faint/40",
          !disabled && !selected && "border-white bg-white/70 text-ink hover:border-iris/40 hover:bg-white",
          selected && "border-iris bg-iris text-white shadow-iris",
        )}
      >
        {digitsEnToFa(hour.hour)}
      </div>
    </label>
  );
}

export default TimeRadio;
