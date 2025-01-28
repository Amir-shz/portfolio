// import { data } from "motion/react-client";
import ReservationRowBtns from "@/components/dashboard/ReservationRowBtns";
import { getJalaliDetails } from "@/utils/utils";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { Metadata } from "next";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "رزرو",
};

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

async function page({
  params,
}: {
  params: Promise<{ reservationId: string }>;
}) {
  const reservationId = (await params).reservationId;

  const header = await headers();

  const {
    _id,
    selectedDate,
    selectedTime,
    plan: planId,
    fullName,
    phone,
    description,
    status,
    createdAt,
  } = await fetch(`${baseUrl}/reservation/${reservationId}`, {
    headers: header,
  })
    .then((data) => data.json())
    .then((data) => data.data);

  const {
    plan: planName,
    title: planTitle,
    time: planTime,
    price: planPrice,
  } = await fetch(`${baseUrl}/plan/${planId}`)
    .then((data) => data.json())
    .then((data) => data.data);

  const { day, monthName, year } = getJalaliDetails(new Date(selectedDate));
  const {
    day: createdDay,
    monthName: createdMonthName,
    year: createdYear,
  } = getJalaliDetails(new Date(createdAt));

  // console.log(plan);

  return (
    <div className=" rounded-md bg-purple-50 shadow-shadow4 p-4 max-h-[calc(100vh-5.5rem)] overflow-y-scroll ">
      <div className="grid grid-cols-4 gap-4 [&>P]:text-center">
        <p className="bg-purple-400 text-neutral-50 rounded-md leading-10 text-lg font-medium">
          نام و نام‌خانوادگی
        </p>
        <p className="bg-purple-400 text-neutral-50 rounded-md leading-10 text-lg font-medium">
          شماره همراه
        </p>
        <p className="bg-purple-400 text-neutral-50 rounded-md leading-10 text-lg font-medium">
          تاریخ رزرو
        </p>
        <p className="bg-purple-400 text-neutral-50 rounded-md leading-10 text-lg font-medium">
          ساعت رزرو
        </p>
        {/*  */}
        <p>{fullName}</p>
        <p>{digitsEnToFa(phone)}</p>
        <p>
          {day} {monthName} {year}
        </p>
        <p>{digitsEnToFa(selectedTime)}</p>
      </div>
      <div className="grid grid-cols-4 gap-4 [&>P]:text-center my-10 items-center">
        <p className="bg-purple-400 text-neutral-50 rounded-md leading-10 text-lg font-medium">
          زمان ایجاد رزرو
        </p>
        <p className="bg-purple-400 text-neutral-50 rounded-md leading-10 text-lg font-medium">
          وضعیت
        </p>
        <p className="bg-purple-400 text-neutral-50 rounded-md leading-10 text-lg font-medium">
          قیمت و طول جلسه
        </p>
        <p className="bg-purple-400 text-neutral-50 rounded-md leading-10 text-lg font-medium">
          نام و شماره طرح
        </p>
        {/*  */}
        <p>
          {createdDay} {createdMonthName} {createdYear}
        </p>
        <p
          className={`
          text-neutral-50 rounded-lg justify-self-center py-1 px-2 text-sm border-none
          ${status === "new" ? " bg-success-500  " : " bg-warning-500 "}`}
        >
          {status === "new" ? "جدید" : "تمام شده"}
        </p>
        <div className=" flex flex-col gap-1 justify-center items-center">
          <p>{planPrice === "free" ? "رایگان" : `${planPrice} تومان`}</p>
          <p>{planTime}</p>
        </div>
        <div className="flex flex-col gap-1 justify-center items-center">
          <p>نام: {planTitle}</p>
          <p>شماره: {planName}</p>
        </div>
      </div>
      <div className=" flex flex-col items-center gap-2 justify-center ">
        <p className=" text-center mb-1 bg-purple-400 text-neutral-50 rounded-md leading-10 text-lg font-medium w-2/3 ">
          توضیحات
        </p>
        <p className="mb-10 w-2/3 px-2">{description}</p>
      </div>
      <div className=" flex items-center gap-2 justify-center ">
        <ReservationRowBtns id={_id} status={status} />
      </div>
    </div>
  );
}

export default page;
