"use client";
import { createSchedule } from "@/lib/actions";
import { useRef, useState, useTransition } from "react";
import { DatePicker } from "zaman";
import { CircleAlert, CircleCheck } from "lucide-react";

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
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const timeInputRef = useRef<HTMLInputElement | null>(null);
  const isError = errorMessage !== "";

  function handleSubmit() {
    const dates = schedules.map((el: { date: string | undefined }) => el.date);
    const convertedDate = date?.toLocaleDateString("en-CA");

    if (dates.includes(convertedDate)) {
      const { hours } = schedules.filter((el: { date: string }) => el.date === convertedDate)[0];
      const hoursArr = hours.map(
        (el: { hour: string | undefined; isAvailable: boolean }) => el.hour,
      );

      if (hoursArr.includes(time)) {
        setErrorMessage("زمان انتخاب شده از قبل در جدول زمان بندی موجود است");
        setIsSuccess(false);
        return;
      }
    }

    // add schedule (the server validates again and returns any error)
    startTransition(async () => {
      const result = await createSchedule({
        date: date?.toLocaleDateString("en-CA"),
        time,
      });

      if (result?.error) {
        setErrorMessage(result.error);
        setIsSuccess(false);
        return;
      }

      setErrorMessage("");
      setIsSuccess(true);
    });
  }

  return (
    <div className="mt-5 grid gap-4">
      <label className="datePickerStyle grid gap-1.5">
        <span className="text-sm font-bold text-ink-soft">تاریخ</span>
        <DatePicker
          accentColor="#5B2BD9"
          round="x2"
          onChange={(e) => {
            setDate(e.value);
            setIsSuccess(false);
            setErrorMessage("");
          }}
        />
      </label>
      <label className="grid gap-1.5">
        <span className="text-sm font-bold text-ink-soft">ساعت</span>
        <input
          type="time"
          id="time"
          name="time"
          min="00:00"
          max="23:59"
          step="600"
          ref={timeInputRef}
          className="input cursor-pointer"
          onChange={(e) => {
            setTime(e.target.value);
            setIsSuccess(false);
            setErrorMessage("");
          }}
          onClick={() => {
            timeInputRef.current?.showPicker?.();
          }}
        />
      </label>

      <div aria-live="polite" className="min-h-6">
        {isError && (
          <p className="flex items-start gap-2 rounded-xl bg-danger-tint px-3.5 py-2.5 text-sm font-semibold leading-6 text-danger-deep">
            <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
            {errorMessage}
          </p>
        )}
        {isSuccess && (
          <p className="flex items-center gap-2 rounded-xl bg-ok-tint px-3.5 py-2.5 text-sm font-semibold text-ok-deep">
            <CircleCheck className="size-4 shrink-0" aria-hidden />
            زمان بندی با موفقیت اضافه شد
          </p>
        )}
      </div>

      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={isPending || !date || !time}
        onClick={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {isPending ? <span className="loaderDotMiniWhite my-2" /> : "افزودن به زمان‌بندی"}
      </button>
    </div>
  );
}

export default ScheduleForm;
