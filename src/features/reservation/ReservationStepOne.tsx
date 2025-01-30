"use client";

import { useReservationStore } from "@/hooks/useReservationStore";
import ReservationDetail from "./ReservationDetail";
import ReservationDates from "./ReservationDates";
import ReservationTimes from "./ReservationTimes";
import { getFourWeeksFromToday } from "@/utils/utils";
import { useEffect, useState } from "react";
import { scheduleDataType } from "@/types/types";
import useSchedules from "@/hooks/useSchedules";

// handleSelectedDateInit
function ReservationStepOne() {
  const { selectedDate, selectedTime, handleStep } = useReservationStore();
  const { isLoading, data: schedules } = useSchedules();
  const [filteredData, setFilteredData] = useState<scheduleDataType>();
  const [schedulesData, setSchedulesData] = useState<scheduleDataType[]>([]);

  // useEffect(() => {
  //   const firstAvailableSchedule = schedules?.filter(
  //     (el) => el.available > 0
  //   )[0];

  //   const firstDate = firstAvailableSchedule?.date;

  //   const firstTime = firstAvailableSchedule?.hours.filter(
  //     (el) => (el.isAvailable = true)
  //   )[0].hour;

  //   console.log(firstDate);
  //   console.log(firstTime);
  //   handleSelectedDateInit(firstDate, firstTime);
  // }, [schedules, handleSelectedDateInit]);

  useEffect(() => {
    setSchedulesData(() => schedules);
    setFilteredData(
      () => schedulesData?.filter((el) => el.date === selectedDate)[0]
    );
  }, [schedules, selectedDate, schedulesData]);

  const fourWeekDetail: {
    date: string;
    jalali: { dayName: string; day: string; monthName: string };
  }[] = getFourWeeksFromToday();

  return (
    <>
      <ReservationDetail />
      <ReservationDates
        weeks={fourWeekDetail}
        schedulesData={schedulesData}
        isLoading={isLoading}
      />
      <ReservationTimes hours={filteredData?.hours} />
      <button
        className=" text-neutral-50 text-base font-bold leading-[1.125rem] py-3 px-6 mt-8 w-full rounded-xl bg-purple-400 hover:bg-purple-500 duration-300 disabled:bg-neutral-400"
        disabled={!selectedDate || !selectedTime}
        onClick={() => handleStep(2)}
      >
        تایید
      </button>
    </>
  );
}

export default ReservationStepOne;
