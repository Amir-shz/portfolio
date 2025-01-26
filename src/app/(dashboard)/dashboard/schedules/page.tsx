import ScheduleForm from "@/components/dashboard/ScheduleForm";
import ScheduleHeader from "@/components/dashboard/ScheduleHeader";
import ScheduleRow from "@/components/dashboard/ScheduleRow";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "زمان بندی",
};

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

async function page() {
  const schedules = await fetch(`${baseUrl}/schedule`)
    .then((data) => data.json())
    .then((data) => data.data);

  return (
    <div className=" flex gap-2 max-h-[calc(100vh-3.5rem)] overflow-y-scroll p-4 -m-4 ">
      <form
        action=""
        className="w-full flex flex-col rounded-md bg-purple-50 shadow-shadow4 border border-purple-100 p-4 "
      >
        <p className=" text-center font-medium">
          جهت ایجاد زمان بندی فرم زیر را پر کنید
        </p>
        <ScheduleForm schedules={schedules} />
      </form>
      <div className="w-full h-[calc(100vh-5.5rem)] flex flex-col gap-2 rounded-md bg-purple-50 shadow-shadow4 border border-purple-100 overflow-y-scroll p-4 ">
        <ScheduleHeader />
        {schedules.map(
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
