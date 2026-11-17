"use client";

import DateRadio from "@/components/ui/DateRadio";
import { useReservationStore } from "@/hooks/useReservationStore";
import useSchedules from "@/hooks/useSchedules";
import { filteredWeeksType } from "@/types/types";
import { getFourWeeksFromToday, splitIntoWeeks } from "@/utils/utils";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { digitsEnToFa } from "@persian-tools/persian-tools";

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

  useEffect(() => {
    // FIND FIRST AVAILABLE DATE
    const today = new Date().toLocaleDateString("en-CA");

    // eslint-disable-next-line
    firstAvailableDate = schedules?.find(
      (el: { available: number; date: string }) =>
        el.available > 0 && el.date > today,
    );
    // FIND THE FIRST AVAILABLE DATE PAGE IN WEEKS
    const firsAvailableDateWeek = splitIntoWeeks(weeks).find((week) =>
      week.dates.some((weekDates) => weekDates.date === firstAvailableDate?.date),
    );
    const pageNumber = firsAvailableDateWeek ? firsAvailableDateWeek.page : 1;
    // GO TO THE FIRST AVAILABLE DATE PAGE
    setPage(() => pageNumber);
    if (isSuccess && schedulesDates.length > 0 && !selectedDate && firstAvailableDate) {
      setSelectedDate(firstAvailableDate?.date);
    }
  }, [schedules]);

  return (
    <div>
      <div className="mb-2.5 flex items-center justify-between">
        <p id="reservation-date-label" className="text-sm font-semibold text-ink">
          انتخاب تاریخ
        </p>
        <div className="flex items-center gap-1.5">
          <span className="me-1 text-[0.75rem] text-ink-faint">
            هفته {digitsEnToFa(page)} از ۴
          </span>
          <button
            type="button"
            aria-label="هفته قبل"
            className="icon-btn size-8 border border-white bg-white/70 text-ink hover:bg-white"
            disabled={page === 1}
            onClick={() => {
              setPage(page - 1);
              resetDateAndTimeStates();
            }}
          >
            <ChevronRight className="size-3.5" aria-hidden />
          </button>
          <button
            type="button"
            aria-label="هفته بعد"
            className="icon-btn size-8 border border-white bg-white/70 text-ink hover:bg-white"
            disabled={page === 4}
            onClick={() => {
              setPage(page + 1);
              resetDateAndTimeStates();
            }}
          >
            <ChevronLeft className="size-3.5" aria-hidden />
          </button>
        </div>
      </div>
      {isLoading ? (
        <div aria-hidden className="grid grid-cols-4 gap-1.5 sm:grid-cols-7">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="h-[4.5rem] animate-pulse rounded-xl bg-white/60" />
          ))}
        </div>
      ) : (
        <div
          role="radiogroup"
          aria-labelledby="reservation-date-label"
          className="grid grid-cols-4 gap-1.5 sm:grid-cols-7"
        >
          {filteredWeeks.dates.map((el) => (
            <DateRadio
              key={el.date}
              date={el}
              available={
                schedulesDates?.includes(el.date)
                  ? new Date(el.date).getTime() > new Date().getTime()
                    ? schedules?.filter(
                        (element: { date: string }) => element.date === el.date,
                      )[0].available
                    : 0
                  : 0
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ReservationDates;
