import { useReservationStore } from "@/hooks/useReservationStore";
import { digitsEnToFa } from "@persian-tools/persian-tools";

function DateRadio({
  date,
  available,
}: {
  date: {
    date: string;
    jalali: { dayName: string; day: string; monthName: string };
  };
  available: number;
}) {
  const { selectedDate, handleSelectedDateChange } = useReservationStore();

  const jalaliDate = date.jalali;

  return (
    <label>
      <input
        type="radio"
        name="date"
        disabled={available === 0 ? true : false}
        value={date.date}
        onChange={handleSelectedDateChange}
        className={` size-0 absolute invisible opacity-0 ${
          selectedDate === date.date && "[&~div]:border-purple-500 "
        }`}
      />
      <div
        className={` pt-2 pb-3 px-3 rounded-xl border flex flex-col gap-[0.88rem] justify-center items-center select-none ${
          available === 0
            ? " border-neutral-200"
            : "border-neutral-300 cursor-pointer"
        } `}
      >
        <div>
          <p
            className={`mb-1 text-[0.625rem] font-medium leading-3 flex justify-center items-center gap-1 ${
              available === 0 ? "text-neutral-300" : "text-neutral-500"
            }`}
          >
            {jalaliDate.dayName}
          </p>
          <p
            className={`text-xs font-medium leading-3 ${
              available === 0 ? "text-neutral-300" : "text-neutral-800"
            }`}
          >
            {jalaliDate.day} {jalaliDate.monthName}
          </p>
        </div>
        <p
          className={`${
            available === 0 ? "text-neutral-300" : "text-success-700"
          }  text-[0.625rem] font-medium leading-[0.625rem] text-nowrap`}
        >
          {digitsEnToFa(available)} زمان موجود
        </p>
      </div>
    </label>
  );
}

export default DateRadio;
