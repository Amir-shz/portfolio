import { getJalaliDetails } from "@/utils/utils";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import Link from "next/link";
import { HiOutlinePencil } from "react-icons/hi2";

function ScheduleRow({
  schedule,
}: {
  schedule: {
    _id: string;
    date: string;
    hours: Array<{ hour: string; isAvailable: boolean }>;
  };
}) {
  const { _id, date, hours } = schedule;
  const { day, monthName, year } = getJalaliDetails(new Date(date));
  const isPast = new Date(date) < new Date();

  return (
    <div className=" grid grid-cols-7 items-center">
      <p
        className={`col-span-2 text-sm  font-semibold border-l border-l-neutral-300 text-center ${
          isPast && "text-neutral-400 font-normal"
        }`}
      >
        {day} {monthName} {year}
      </p>
      <div className="col-span-4 font-semibold text-sm border-l border-l-neutral-300 flex flex-wrap">
        {hours.map((hour: { hour: string; isAvailable: boolean }) => (
          <span
            key={hour.hour}
            className={`p-2 ${
              hour.isAvailable ? "text-green-500" : "text-red-500"
            }`}
          >
            {digitsEnToFa(hour.hour)}
          </span>
        ))}
      </div>
      <Link
        href={`/dashboard/schedules/${_id}`}
        className="flex justify-center bg-warning-500 rounded-full justify-self-center p-2 hover:bg-warning-600 duration-200"
      >
        <HiOutlinePencil size={20} className=" text-neutral-50 stroke-2" />
      </Link>
    </div>
  );
}

export default ScheduleRow;
