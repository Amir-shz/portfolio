import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Logo from "@/components/ui/Logo";
import Link from "next/link";
import {
  HiOutlineCalendar,
  HiOutlineClock,
  // HiOutlineDocumentText,
  HiOutlineHome,
} from "react-icons/hi2";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-10 bg-neutral-50 h-dvh overflow-hidden ">
      <div className="col-span-2 flex flex-col gap-2 px-2 bg-purple-50 h-screen">
        <div className=" flex justify-center my-10">
          <Logo />
        </div>
        <Link
          href="/dashboard"
          className=" w-full bg-purple-400 hover:bg-purple-500 duration-300 rounded-lg py-4 flex items-center gap-2 pr-8 text-neutral-50 text-lg font-semibold leading-5"
        >
          <HiOutlineHome size={24} className=" stroke-2" />
          <p>خانه</p>
        </Link>
        <Link
          href="/dashboard/reservations"
          className=" w-full bg-purple-400 hover:bg-purple-500 duration-300 rounded-lg py-4 flex items-center gap-2 pr-8 text-neutral-50 text-lg font-semibold leading-5"
        >
          <HiOutlineCalendar size={24} className=" stroke-2" />
          <p>رزرو ها</p>
        </Link>
        {/* <Link
          href="/dashboard/plans"
          className=" w-full bg-purple-400 hover:bg-purple-500 duration-300 rounded-lg py-4 flex items-center gap-2 pr-8 text-neutral-50 text-lg font-semibold leading-5"
        >
          <HiOutlineDocumentText size={24} className=" stroke-2" />
          <p>پلن ها</p>
        </Link> */}
        <Link
          href="/dashboard/schedules"
          className=" w-full bg-purple-400 hover:bg-purple-500 duration-300 rounded-lg py-4 flex items-center gap-2 pr-8 text-neutral-50 text-lg font-semibold leading-5"
        >
          <HiOutlineClock size={24} className=" stroke-2" />
          <p>زمان بندی</p>
        </Link>
      </div>
      <div className=" col-span-8">
        <DashboardHeader />
        <div className=" p-4">{children}</div>
      </div>
    </div>
  );
}
