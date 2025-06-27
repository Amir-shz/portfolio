import ScheduleForm from "@/components/dashboard/ScheduleForm";
import ScheduleHeader from "@/components/dashboard/ScheduleHeader";
import ScheduleRow from "@/components/dashboard/ScheduleRow";
import { Metadata } from "next";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "زمان بندی",
};

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

async function page() {
  const header = await headers();
  const schedules = await fetch(`${baseUrl}/schedule`, { headers: header })
    .then((data) => data.json())
    .then((data) => data.data);

  return (
    <div className=" flex gap-2 max-h-[calc(100vh-3.5rem)] overflow-y-scroll p-4 -m-4 max-sm:flex-col max-sm:m-0 max-sm:max-h-dvh max-sm:overflow-scroll hide-scrollbar ">
      <form
        action=""
        className="w-full flex flex-col rounded-md bg-purple-50 shadow-shadow4 border border-purple-100 p-4 "
      >
        <p className=" text-center font-medium">
          جهت ایجاد زمان بندی فرم زیر را پر کنید
        </p>
        <ScheduleForm schedules={schedules} />
      </form>
      <div className="w-full h-[calc(100vh-5.5rem)] flex flex-col gap-2 rounded-md bg-purple-50 shadow-shadow4 border border-purple-100 overflow-y-scroll p-4 max-sm:mb-14 max-sm:overflow-visible max-h-full max-sm:p-2 max-sm:gap-3 max-sm:h-full ">
        <ScheduleHeader />
        {schedules.reverse().map(
          (el: {
            _id: string;
            date: string;
            hours: Array<{ hour: string; isAvailable: boolean }>;
          }) => (
            <ScheduleRow key={el._id} schedule={el} />
          )
        )}
      </div>
    </div>
  );
}

export default page;
