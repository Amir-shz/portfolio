import ScheduleForm from "@/components/dashboard/ScheduleForm";
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
    <div className=" flex gap-2">
      <form
        action=""
        className="w-full flex flex-col rounded-md bg-purple-50 shadow-shadow4 border border-purple-100 p-4 "
      >
        <p className=" text-center font-medium">
          جهت ایجاد زمان بندی فرم زیر را پر کنید
        </p>
        <ScheduleForm schedules={schedules} />
      </form>
      <div className="w-full h-[calc(100vh-5.5rem)] flex flex-col rounded-md bg-purple-50 shadow-shadow4 border border-purple-100 overflow-y-scroll noScrollBar ">
        div
      </div>
    </div>
  );
}

export default page;
