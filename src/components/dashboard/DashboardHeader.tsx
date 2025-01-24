import { logOut } from "@/lib/actions";
import Link from "next/link";
import {
  HiOutlineArrowLeftStartOnRectangle,
  HiOutlineCog8Tooth,
  HiOutlineHome,
} from "react-icons/hi2";

const user = {
  name: "امیر شریف زاده",
  // photo: "",
};

function DashboardHeader() {
  return (
    <header className=" bg-purple-50 h-14 flex items-center justify-between px-8">
      <div className=" flex gap-2 items-center">
        <div className=" size-11 bg-neutral-500 rounded-full"></div>
        <p className="font-semibold">{user.name}</p>
      </div>
      <div className=" flex items-center gap-2">
        <Link
          href="/"
          className=" flex justify-center items-center bg-purple-400 hover:bg-purple-500 duration-200 rounded-full p-2"
        >
          <HiOutlineHome size={24} className=" text-neutral-50" />
        </Link>

        <Link
          href="/dashboard/userSettings"
          className=" flex justify-center items-center bg-purple-400 hover:bg-purple-500 duration-200 rounded-full p-2"
        >
          <HiOutlineCog8Tooth size={24} className=" text-neutral-50" />
        </Link>

        <form action={logOut}>
          <button className=" flex justify-center items-center bg-error-500 hover:bg-error-700 duration-200 rounded-full p-2">
            <HiOutlineArrowLeftStartOnRectangle
              size={24}
              className=" text-neutral-50"
            />
          </button>
        </form>
      </div>
    </header>
  );
}

export default DashboardHeader;
