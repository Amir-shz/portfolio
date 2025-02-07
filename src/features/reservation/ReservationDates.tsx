"use client";

import DateRadio from "@/components/ui/DateRadio";
import { useReservationStore } from "@/hooks/useReservationStore";
import useSchedules from "@/hooks/useSchedules";
import { filteredWeeksType } from "@/types/types";
import { getFourWeeksFromToday, splitIntoWeeks } from "@/utils/utils";
import { useEffect, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

function ReservationDates() {
  const { resetDateAndTimeStates, selectedDate, setSelectedDate } =
    useReservationStore();
  const [page, setPage] = useState<number>(1);
  const { isLoading, isSuccess, data: schedules } = useSchedules();

  const weeks = getFourWeeksFromToday();

  // CREATE PAGINATION FOR WEEKS
  const filteredWeeks: filteredWeeksType = splitIntoWeeks(weeks)[page - 1];

  // GET SCHEDULES DATES FOR SHOWING TO CLIENT
  const schedulesDates = schedules?.map((el: { date: string }) => el.date);

  // FOR INIT SELECTION
  let firstAvailableDate: { date: string };
  // const firstAvailableDate = useRef<string>("");

  useEffect(() => {
    // FIND FIRST AVAILABLE DATE
    firstAvailableDate = schedules?.find(
      (el: { available: number }) => el.available > 0
    );
    // FIND THE FIRST AVAILABLE DATE PAGE IN WEEKS
    const firsAvailableDateWeek = splitIntoWeeks(weeks).find((week) =>
      week.dates.some(
        (weekDates) => weekDates.date === firstAvailableDate?.date
      )
    );
    const pageNumber = firsAvailableDateWeek ? firsAvailableDateWeek.page : 1;
    // GO TO THE FIRST AVAILABLE DATE PAGE
    setPage(() => pageNumber);
    if (
      isSuccess &&
      schedulesDates.length > 0 &&
      !selectedDate &&
      firstAvailableDate
    ) {
      setSelectedDate(firstAvailableDate?.date);
    }
  }, [schedules]);

  return (
    <div className="mt-2 max-sm:mt-4">
      <div className="mb-2 flex justify-between max-sm:mb-3">
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
          <div className="grid grid-cols-7 gap-4 [&>div]:size-full [&>div]:rounded-lg w-full h-[4.5rem] [&>div]:bg-neutral-200 [&>div]:animate-pulse max-sm:grid-cols-3 max-sm:gap-3 max-sm:h-60">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div className="max-sm:col-start-2"></div>
          </div>
        ) : (
          <div className="grid grid-cols-7 gap-4 max-sm:grid-cols-3 max-sm:gap-3">
            {filteredWeeks.dates.map((el) => (
              <DateRadio
                key={el.date}
                date={el}
                available={
                  schedulesDates?.includes(el.date)
                    ? new Date(el.date).getTime() > new Date().getTime()
                      ? schedules?.filter(
                          (element: { date: string }) =>
                            element.date === el.date
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
