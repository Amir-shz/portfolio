"use client";

import { useReservationStore } from "@/hooks/useReservationStore";
import ReservationDetail from "./ReservationDetail";
import ReservationDates from "./ReservationDates";
import ReservationTimes from "./ReservationTimes";
import { getFourWeeksFromToday } from "@/utils/utils";
import { useEffect, useState } from "react";
// import { dbData } from "@/data/data";
import { scheduleDataType } from "@/types/types";
import useSchedules from "@/hooks/useSchedules";
// import useSchedules from "@/hooks/usePlans";

function ReservationStepOne() {
  const { selectedDate, selectedTime, handleStep } = useReservationStore();
  const { isLoading, data: schedules } = useSchedules();
  const [filteredData, setFilteredData] = useState<scheduleDataType>();
  const [reservationsData, setReservationsData] = useState<scheduleDataType[]>(
    []
  );

  // const [isPending, startTransition] = useTransition();

  useEffect(() => {
    // async function getSchedules() {
    //   const schedules = await fetch("/api/v1/schedule")
    //     .then((data) => data.json())
    //     .then((data) => data.data);

    //   console.log(schedules);
    setReservationsData(() => schedules);
    setFilteredData(
      () => reservationsData?.filter((el) => el.date === selectedDate)[0]
    );
    // }

    // startTransition(async () => {
    //   await getSchedules();
    // });

    // console.log(reservationsData);

    // get selected date data from DB
    // setFilteredData(() => dbData.filter((el) => el.date === selectedDate)[0]);

    // all data from DB
    // setReservationsData(() => dbData.map((el) => el));

    // console.log(reservationsData);
  }, [schedules, selectedDate, reservationsData]);

  const fourWeekDetail: {
    date: string;
    jalali: { dayName: string; day: string; monthName: string };
  }[] = getFourWeeksFromToday();

  return (
    <>
      <ReservationDetail />
      {isLoading ? (
        <div className=" my-2 rounded-lg w-[650px] h-[70px] bg-neutral-200 animate-pulse"></div>
      ) : (
        <ReservationDates
          weeks={fourWeekDetail}
          reservationsData={reservationsData}
        />
      )}
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
