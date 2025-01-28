import ScheduleAllDelBtn from "@/components/dashboard/ScheduleAllDelBtn";
import ScheduleOneDelBtn from "@/components/dashboard/ScheduleOneDelBtn";
import { deleteSchedule } from "@/lib/actions";
import { getJalaliDetails } from "@/utils/utils";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { Metadata } from "next";
import { headers } from "next/headers";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const metadata: Metadata = {
  title: "زمان‌بندی",
};

async function page({ params }: { params: Promise<{ scheduleId: string }> }) {
  const scheduleId = (await params).scheduleId;
  const header = await headers();

  const schedule = await fetch(`${baseUrl}/schedule/${scheduleId}`, {
    headers: header,
  })
    .then((res) => res.json())
    .then((data) => data.data);

  // console.log(schedule);

  const { _id, date, hours } = schedule;
  const { day, monthName, year } = getJalaliDetails(new Date(date));
  const formattedDate = `${day} ${monthName} ${year}`;

  return (
    <div className="max-h-[calc(100vh-5.5rem)] overflow-y-scroll p-4 ">
      <p className=" text-center text-lg font-medium">{formattedDate}</p>
      <div className="grid grid-cols-2 gap-4 mt-4">
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
              <div>
                <ScheduleOneDelBtn id={_id} hour={hour.hour} />
              </div>
            </div>
          )
        )}
      </div>
      <form
        action={deleteSchedule}
        className=" w-full flex justify-center mt-10"
      >
        <input type="hidden" name="id" value={_id} />
        <ScheduleAllDelBtn />
      </form>
    </div>
  );
}

export default page;
