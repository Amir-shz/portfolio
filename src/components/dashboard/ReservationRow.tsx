import { getJalaliDetails } from "@/utils/utils";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import ReservationRowBtns from "./ReservationRowBtns";
import { reservationType } from "@/types/types";
import Link from "next/link";
import { planData } from "@/data/planData";

async function ReservationRow({
  reservation,
}: {
  reservation: reservationType;
}) {
  const {
    _id,
    fullName,
    phone,
    selectedTime,
    selectedDate,
    status,
    plan,
    description,
  } = reservation;

  const {
    title: planName,
    time: planTime,
    price: planPrice,
  } = planData.filter((el) => el.id === Number(plan))[0];

  const { day, monthName, year } = getJalaliDetails(new Date(selectedDate));

  return (
    <div className="flex w-full max-sm:w-[1024px]">
      <Link
        href={`/dashboard/reservations/${_id}`}
        className=" hover:bg-purple-100 duration-200 rounded-md w-full grid grid-cols-11 items-center p-3 [&>p]:border-l [&>p]:border-l-neutral-300 [&>p]:flex [&>p]:justify-center  [&>p]:text-sm  [&>p]:items-center [&>p:nth-child(6)]:border-l-0  [&>p:last-of-type]:line-clamp-3  basis-[90%] "
      >
        <p className=" col-span-2">{fullName}</p>
        <p className=" col-span-2">{digitsEnToFa(phone)}</p>
        <p>
          {day} {monthName} {year}
        </p>
        <p>{digitsEnToFa(selectedTime)}</p>
        <p
          className={`
          text-neutral-50 rounded-lg justify-self-center py-1 px-2 text-sm border-none
          ${status === "new" ? " bg-success-500  " : " bg-warning-500 "}`}
        >
          {status === "new" ? "جدید" : "تمام شده"}
        </p>
        <p className="border-r border-r-neutral-300">{planName}</p>
        <div className=" text-xs font-semibold leading-5 border-x border-x-neutral-300 flex flex-col justify-center items-center">
          <p>{planPrice === "free" ? "رایگان" : `${planPrice}`}</p>
          <p>{planTime}</p>
        </div>
        <p className=" col-span-2 px-2">{description}</p>
      </Link>
      <div className=" flex items-center gap-2 justify-center basis-[10%] ">
        <ReservationRowBtns id={_id} status={status} />
      </div>
    </div>
  );
}

export default ReservationRow;
