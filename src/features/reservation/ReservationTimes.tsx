import TimeRadio from "@/components/ui/TimeRadio";
import { useReservationStore } from "@/hooks/useReservationStore";
import useSchedules from "@/hooks/useSchedules";
import { scheduleDataType } from "@/types/types";
import { useEffect, useState } from "react";
import { CalendarClock } from "lucide-react";

function ReservationTimes() {
  const { selectedDate } = useReservationStore();
  const { data: schedules } = useSchedules();
  const [availableTimes, setAvailableTimes] = useState<scheduleDataType>();

  useEffect(() => {
    setAvailableTimes(
      () => schedules?.filter((el: { date: string }) => el.date === selectedDate)[0],
    );
  }, [schedules, selectedDate]);

  const hours = availableTimes?.hours;

  return (
    <div>
      <p id="reservation-time-label" className="mb-2.5 text-sm font-semibold text-ink">
        انتخاب ساعت
      </p>
      {hours && hours.length > 0 ? (
        <div
          role="radiogroup"
          aria-labelledby="reservation-time-label"
          className="grid grid-cols-3 gap-1.5 sm:grid-cols-6"
        >
          {hours.map((hour) => (
            <TimeRadio key={hour.hour} hour={hour} />
          ))}
        </div>
      ) : (
        <p className="flex items-center gap-3 rounded-xl border border-dashed border-iris/25 bg-white/40 px-3.5 py-3 text-[0.8125rem] text-ink-soft">
          <CalendarClock className="size-4 shrink-0 text-iris" aria-hidden />
          {selectedDate
            ? "برای این روز ساعت خالی ثبت نشده است."
            : "اول یک تاریخ با نوبت خالی انتخاب کنید."}
        </p>
      )}
    </div>
  );
}

export default ReservationTimes;
