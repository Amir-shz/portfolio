import TimeRadio from "@/components/ui/TimeRadio";
import { useReservationStore } from "@/hooks/useReservationStore";
import useSchedules from "@/hooks/useSchedules";
import { scheduleDataType } from "@/types/types";
import { useEffect, useState } from "react";

function ReservationTimes() {
  const { selectedDate } = useReservationStore();
  const { data: schedules } = useSchedules();
  const [availableTimes, setAvailableTimes] = useState<scheduleDataType>();

  useEffect(() => {
    setAvailableTimes(
      () =>
        schedules?.filter((el: { date: string }) => el.date === selectedDate)[0]
    );
  }, [schedules, selectedDate]);

  const hours = availableTimes?.hours;

  return (
    <div className="mt-4">
      <div className="mb-2 max-sm:mb-3">
        <p className="text-neutral-700 text-base font-semibold leading-4">
          زمان
        </p>
      </div>
      <div className=" grid grid-cols-6 gap-x-6 gap-y-2 max-sm:grid-cols-4 max-sm:gap-x-4">
        {hours?.map((hour) => (
          <TimeRadio key={hour.hour} hour={hour} />
        ))}
      </div>
    </div>
  );
}

export default ReservationTimes;
