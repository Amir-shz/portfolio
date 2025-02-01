"use client";
import { createSchedule } from "@/lib/actions";
import { useRef, useState } from "react";
import { DatePicker } from "zaman";

function ScheduleForm({
  schedules,
}: {
  schedules: {
    _id: string;
    date: string;
    hours: Array<{ hour: string; isAvailable: boolean }>;
  }[];
}) {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>();
  const [isError, setIsError] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const timeInputRef = useRef<HTMLInputElement | null>(null);

  function handleSubmit() {
    const dates = schedules.map((el: { date: string | undefined }) => el.date);
    const convertedDate = date?.toLocaleDateString("en-CA");

    if (dates.includes(convertedDate)) {
      const { hours } = schedules.filter(
        (el: { date: string }) => el.date === convertedDate
      )[0];
      const hoursArr = hours.map(
        (el: { hour: string | undefined; isAvailable: boolean }) => el.hour
      );

      if (hoursArr.includes(time)) {
        setIsError(true);
        setIsSuccess(false);
        return;
      }
    }

    // add schedule
    createSchedule({ date: date?.toLocaleDateString("en-Ca"), time });
    setIsError(false);
    setIsSuccess(true);
  }

  return (
    <div className=" flex flex-col gap-4 mt-4 max-sm:gap-2">
      <label className="flex flex-col gap-1 datePickerStyle">
        <p className=" text-sm font-semibold">تاریخ:</p>
        <DatePicker onChange={(e) => setDate(e.value)} />
      </label>
      <label className="flex  flex-col gap-1 datePickerStyle">
        <p className=" text-sm font-semibold">ساعت:</p>
        <input
          type="time"
          id="time"
          name="time"
          min="00:00"
          max="23:59"
          step="600"
          ref={timeInputRef}
          onChange={(e) => setTime(e.target.value)}
          onClick={() => {
            if (timeInputRef.current) {
              timeInputRef.current.showPicker();
            }
          }}
        ></input>
      </label>
      <span
        className={` ${
          isError || isSuccess ? "opacity-100" : "opacity-0"
        } text-sm font-medium 
        ${isError && "text-error-700"}
        ${isSuccess && "text-success-600"}
        `}
      >
        {isError && "زمان انتخاب شده از قبل در جدول زمان بندی موجود است"}
        {isSuccess && "زمان بندی با موفقیت اضافه شد"}
        {!isError && !isSuccess && "for first height"}
      </span>

      <button
        className=" text-neutral-50 text-base font-bold leading-[1.125rem] py-3 px-10 mt-8 self-center rounded-xl bg-purple-400 hover:bg-purple-500 duration-300 disabled:bg-neutral-400 max-sm:mt-0"
        onClick={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        تایید
      </button>
    </div>
  );
}

export default ScheduleForm;
