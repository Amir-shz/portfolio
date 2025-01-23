"use client";

import { useReservationStore } from "@/hooks/useReservationStore";
import ReservationDetail from "./ReservationDetail";
import ReservationDates from "./ReservationDates";
import ReservationTimes from "./ReservationTimes";
import { getFourWeeksFromToday } from "@/utils/utils";
import { useEffect, useState } from "react";
import { dbData } from "@/data/data";
import { scheduleDataType } from "@/types/types";

function ReservationStepOne({ plan }: { plan: string | undefined }) {
  const { selectedDate, selectedTime, handleStep } = useReservationStore();
  const [filteredData, setFilteredData] = useState<scheduleDataType>();
  const [reservationsData, setReservationsData] = useState<scheduleDataType[]>(
    []
  );

  useEffect(() => {
    // get selected date data from DB
    setFilteredData(() => dbData.filter((el) => el.date === selectedDate)[0]);

    // all data from DB
    setReservationsData(() => dbData.map((el) => el));

    // console.log(reservationsData);
  }, [selectedDate]);

  const fourWeekDetail = getFourWeeksFromToday();

  return (
    <>
      <ReservationDetail plan={plan} />
      <ReservationDates
        weeks={fourWeekDetail}
        reservationsData={reservationsData}
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
