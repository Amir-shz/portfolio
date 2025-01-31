import {
  HiOutlineBanknotes,
  HiOutlineCalendarDays,
  HiOutlineClock,
} from "react-icons/hi2";
import { planData } from "@/data/planData";
import Count from "./Count";

function DashboardStats({
  reservations,
}: {
  reservations: { status: string; plan: number }[];
}) {
  const reservationsNum = reservations.length;

  const newReservationsNum = reservations.reduce((acc, cur) => {
    return cur.status === "new" ? acc + 1 : acc;
  }, 0);

  // sum of price

  const plans = reservations.map((reservation) => reservation.plan);

  const prices = plans.flatMap((el) =>
    planData.filter((planEl) => planEl.id === el).map((el) => el.price)
  );

  const persianToEnglish = (s: string) =>
    s.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString());

  const extractNumber = (str: string) => {
    const englishNumbers = persianToEnglish(str);
    return parseInt(englishNumbers.replace(/\D/g, ""), 10);
  };

  const pricesNums = prices.map((price) => extractNumber(price));
  const somePrices =
    pricesNums.reduce((acc, cur) => (!Number.isNaN(cur) ? cur + acc : acc), 0) *
    1000;

  return (
    <>
      <div className=" col-span-2 flex items-center p-4 justify-between w-full bg-blue-50 border border-blue-100 shadow-md rounded-lg">
        <div>
          <p className=" font-semibold text-neutral-500 mb-2">رزروهای امروز</p>
          <p className=" font-semibold text-xl text-neutral-700">
            <Count value={reservationsNum} />
            <span className=" text-neutral-400 text-sm"> رزرو</span>
          </p>
        </div>
        <div className=" bg-blue-200 p-4 rounded-full">
          <HiOutlineCalendarDays className=" text-blue-600 size-7 stroke-2" />
        </div>
      </div>
      <div className=" col-span-2 flex items-center p-4 justify-between w-full bg-green-50 border border-yellow-100 shadow-md rounded-lg">
        <div>
          <p className=" font-semibold text-neutral-500 mb-2">رزروهای جدید</p>
          <p className=" font-semibold text-xl text-neutral-700">
            <Count value={newReservationsNum} />
            <span className=" text-neutral-400 text-sm"> رزرو</span>
          </p>
        </div>
        <div className=" bg-green-200 p-4 rounded-full">
          <HiOutlineClock className=" text-green-600 size-7 stroke-2" />
        </div>
      </div>
      <div className=" col-span-2 flex items-center p-4 justify-between w-full bg-amber-50 border border-green-100 shadow-md rounded-lg">
        <div>
          <p className=" font-semibold text-neutral-500 mb-2">
            درآمد امروز
            <span className=" text-neutral-400 text-xs"> (بدون‌منعطف‌ها)</span>
          </p>
          <p className=" font-semibold text-xl text-neutral-700">
            <Count value={somePrices} isPrice />+
            <span className=" text-neutral-400 text-sm"> تومان</span>
          </p>
        </div>
        <div className=" bg-amber-200 p-4 rounded-full">
          <HiOutlineBanknotes className=" text-amber-600 size-7 stroke-2" />
        </div>
      </div>
    </>
  );
}

export default DashboardStats;
