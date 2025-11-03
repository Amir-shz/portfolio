import ScheduleAllDelBtn from "@/components/dashboard/ScheduleAllDelBtn";
import ScheduleOneDelBtn from "@/components/dashboard/ScheduleOneDelBtn";
import ScheduleReserveBtn from "@/components/dashboard/ScheduleReserveBtn";
import { deleteSchedule } from "@/lib/actions";
import dbConnect from "@/lib/mongoose";
import Schedule from "@/models/scheduleModel";
import { getJalaliDetails } from "@/utils/utils";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { Metadata } from "next";
// import { headers } from "next/headers";
import Link from "next/link";
import { HiOutlineChevronLeft } from "react-icons/hi2";

// const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const metadata: Metadata = {
  title: "زمان‌بندی",
};

async function page({ params }: { params: Promise<{ scheduleId: string }> }) {
  const scheduleId = (await params).scheduleId;
  // const header = await headers();

  // const schedule = await fetch(`${baseUrl}/schedule/${scheduleId}`, {
  //   headers: header,
  // })
  //   .then((res) => res.json())
  //   .then((data) => data.data);

  await dbConnect();

  const schedule = await Schedule.findById(scheduleId);

  const { _id, date, hours } = schedule;
  const { day, monthName, year, dayName } = getJalaliDetails(new Date(date));
  const formattedDate = `${dayName} ${day} ${monthName} ${year}`;

  return (
    <div className="max-h-[calc(100vh-5.5rem)] overflow-y-scroll p-4 max-sm:max-h-dvh hide-scrollbar ">
      <div className=" flex items-center justify-between mb-4">
        <p className="text-lg font-medium">{formattedDate}</p>
        <Link
          href="/dashboard/schedules"
          className=" size-8 bg-purple-400 text-neutral-50 flex justify-center items-center rounded-full hover:bg-purple-500 duration-200 flex-shrink-0"
        >
          <HiOutlineChevronLeft size={24} />
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4 max-sm:grid-cols-1">
        {hours.map(
          (hour: { hour: string; isAvailable: boolean; _id: string }) => (
            <div
              key={hour._id}
              className="bg-purple-50 p-4 rounded-md shadow-shadow4 flex items-center justify-between"
            >
              <div className=" flex items-center justify-between gap-4">
                <p className="text-lg font-medium">
                  ساعت: {digitsEnToFa(hour.hour)}
                </p>
                <p
                  className={`text-sm font-medium ${
                    hour.isAvailable ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {hour.isAvailable ? "موجود" : "رزرو شده"}
                </p>
              </div>
              <div className=" flex gap-1">
                <ScheduleReserveBtn id={_id} hour={hour.hour} />
                <ScheduleOneDelBtn id={_id} hour={hour.hour} />
              </div>
            </div>
          )
        )}
      </div>
      <form
        action={deleteSchedule}
        className=" w-full flex justify-center mt-10 max-sm:mb-16 max-sm:mt-6"
      >
        <input type="hidden" name="id" value={_id} />
        <ScheduleAllDelBtn />
      </form>
    </div>
  );
}

export default page;
