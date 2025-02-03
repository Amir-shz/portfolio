import { auth } from "@/auth";
import { logOut } from "@/lib/actions";
import Link from "next/link";
import {
  HiOutlineArrowLeftStartOnRectangle,
  HiOutlineHome,
  HiOutlineUser,
} from "react-icons/hi2";
import UserPhoto from "./UserPhoto";
import { headers } from "next/headers";
import MobileDashboardMenu from "./MobileDashboardMenu";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

async function DashboardHeader() {
  const session = await auth();

  const header = await headers();

  const user = await fetch(`${baseUrl}/user/${session?.user?.email}`, {
    headers: header,
  })
    .then((data) => data.json())
    .then((data) => data.data);

  return (
    <header className=" bg-purple-50 h-14 flex items-center justify-between px-8 max-sm:px-4 max-sm:flex-row-reverse max-sm:h-16">
      <div className=" flex gap-2 items-center max-sm:flex-row-reverse">
        <UserPhoto img={user?.photo} name={user?.name[0]} />
        <p className="font-semibold">{user?.name}</p>
      </div>
      <p className=" text-purple-700 font-semibold text-lg max-sm:hidden">
        {new Date().toLocaleDateString("fa-IR")}
      </p>

      <MobileDashboardMenu />

      <div className=" flex items-center gap-2 max-sm:hidden">
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
          <HiOutlineUser size={24} className=" text-neutral-50" />
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
