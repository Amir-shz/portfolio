"use client";

import DateRadio from "@/components/ui/DateRadio";
import { useReservationStore } from "@/hooks/useReservationStore";
import { filteredWeeksType, scheduleDataType } from "@/types/types";
import { splitIntoWeeks } from "@/utils/utils";
import { useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

function ReservationDates({
  weeks,
  schedulesData,
  isLoading,
}: {
  weeks: {
    date: string;
    jalali: { dayName: string; day: string; monthName: string };
  }[];
  schedulesData: scheduleDataType[];
  isLoading: boolean;
}) {
  const [page, setPage] = useState<number>(1);
  const { resetDateAndTimeStates } = useReservationStore();

  const filteredWeeks: filteredWeeksType = splitIntoWeeks(weeks)[page - 1];
  const reservations = schedulesData?.map((el) => el.date);

  return (
    <div className="mt-2">
      <div className="mb-2 flex justify-between">
        <p className="text-neutral-700 text-base font-semibold leading-4">
          تاریخ
        </p>
        <div className="flex gap-4">
          <button
            className="[&>svg]:size-6 [&>svg]:disabled:text-neutral-300 text-neutral-800"
            disabled={page === 1 ? true : false}
            onClick={() => {
              setPage(page - 1);
              resetDateAndTimeStates();
            }}
          >
            <HiChevronRight />
          </button>
          <button
            className="[&>svg]:size-6 [&>svg]:disabled:text-neutral-300 text-neutral-800"
            disabled={page === 4 ? true : false}
            onClick={() => {
              setPage(page + 1);
              resetDateAndTimeStates();
            }}
          >
            <HiChevronLeft />
          </button>
        </div>
      </div>
      <div>
        {isLoading ? (
          <div className="grid grid-cols-7 gap-4 [&>div]:size-full [&>div]:rounded-lg w-full h-[4.5rem] [&>div]:bg-neutral-200 [&>div]:animate-pulse">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : (
          <div className="grid grid-cols-7 gap-4">
            {filteredWeeks.dates.map((el, index) => (
              <DateRadio
                key={index}
                date={el}
                available={
                  reservations?.includes(el.date)
                    ? new Date(el.date).getTime() > new Date().getTime()
                      ? schedulesData?.filter(
                          (element) => element.date === el.date
                        )[0].available
                      : 0
                    : 0
                }
              />
            ))}{" "}
          </div>
        )}
      </div>
    </div>
  );
}

export default ReservationDates;
