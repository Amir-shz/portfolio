import ReservationRowBtns from "@/components/dashboard/ReservationRowBtns";
import { planData } from "@/data/planData";
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
    description: planDescription,
    title: planTitle,
    time: planTime,
    price: planPrice,
  } = planData.filter((el) => el.id === Number(planId))[0];

  const { day, monthName, year } = getJalaliDetails(new Date(selectedDate));
  const {
    day: createdDay,
    monthName: createdMonthName,
    year: createdYear,
  } = getJalaliDetails(new Date(createdAt));

  return (
    <div className=" max-h-[calc(100vh-5.5rem)] hide-scrollbar max-sm:max-h-dvh overflow-y-scroll -m-2 max-sm:m-0">
      <div className=" rounded-md bg-purple-50  shadow-shadow4 border border-purple-100 p-4 m-4 max-sm:mb-20 max-sm:m-4 max-sm:p-2 ">
        <div className="grid grid-cols-4 gap-4 [&_P]:text-center  [&>div]:flex [&>div]:flex-col [&>div]:gap-2 max-sm:grid-cols-2">
          <div>
            <p className="bg-purple-400 text-neutral-50 rounded-md leading-10 text-lg font-medium max-sm:text-base max-sm:font-normal max-sm:py-1 ">
              نام و نام‌خانوادگی
            </p>
            <p>{fullName}</p>
          </div>
          <div>
            <p className="bg-purple-400 text-neutral-50 rounded-md leading-10 text-lg font-medium max-sm:text-base max-sm:font-normal max-sm:py-1 ">
              شماره همراه
            </p>
            <p>{digitsEnToFa(phone)}</p>
          </div>
          <div>
            <p className="bg-purple-400 text-neutral-50 rounded-md leading-10 text-lg font-medium max-sm:text-base max-sm:font-normal max-sm:py-1 ">
              تاریخ رزرو
            </p>
            <p>
              {day} {monthName} {year}
            </p>
          </div>
          <div>
            <p className="bg-purple-400 text-neutral-50 rounded-md leading-10 text-lg font-medium max-sm:text-base max-sm:font-normal max-sm:py-1 ">
              ساعت رزرو
            </p>
            <p>{digitsEnToFa(selectedTime)}</p>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 [&_P]:text-center my-10 items-start [&>div]:flex [&>div]:flex-col [&>div]:gap-2 max-sm:grid-cols-2">
          <div>
            <p className="bg-purple-400 text-neutral-50 rounded-md leading-10 text-lg font-medium max-sm:text-base max-sm:font-normal max-sm:py-1">
              زمان ایجاد رزرو
            </p>
            <p>
              {createdDay} {createdMonthName} {createdYear}
            </p>
          </div>
          <div>
            <p className="bg-purple-400 text-neutral-50 rounded-md leading-10 text-lg font-medium max-sm:text-base max-sm:font-normal max-sm:py-1">
              وضعیت
            </p>
            <p
              className={`
          text-neutral-50 rounded-lg  self-center py-1 px-2 text-sm border-none
          ${status === "new" ? " bg-success-500  " : " bg-warning-500 "}`}
            >
              {status === "new" ? "جدید" : "تمام شده"}
            </p>
          </div>
          <div>
            <p className="bg-purple-400 text-neutral-50 rounded-md leading-10 text-lg font-medium max-sm:text-base max-sm:font-normal max-sm:py-1">
              قیمت و طول جلسه
            </p>
            <div className=" flex flex-col gap-1 justify-center items-center">
              <p>{planPrice === "free" ? "رایگان" : `${planPrice} تومان`}</p>
              <p>{planTime}</p>
            </div>
          </div>
          <div>
            <p className="bg-purple-400 text-neutral-50 rounded-md leading-10 text-lg font-medium max-sm:text-base max-sm:font-normal max-sm:py-1">
              نام و توضیح طرح
            </p>
            <div className="flex flex-col gap-1 justify-center items-center">
              <p>نام: {planTitle}</p>
              <p>توضیح: {planDescription}</p>
            </div>
          </div>
        </div>
        <div className=" flex flex-col items-center gap-2 justify-center ">
          <p className=" text-center mb-1 bg-purple-400 text-neutral-50 rounded-md leading-10 text-lg font-medium w-2/3 max-sm:w-full max-sm:text-base max-sm:font-normal max-sm:py-1 ">
            توضیحات
          </p>
          <p className="mb-10 w-2/3 px-2 max-sm:w-full">{description}</p>
        </div>
        <div className=" flex items-center gap-2 justify-center ">
          <ReservationRowBtns id={_id} status={status} />
        </div>
      </div>
    </div>
  );
}

export default page;
