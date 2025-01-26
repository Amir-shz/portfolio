import { auth } from "@/auth";
import { logOut } from "@/lib/actions";
// import Image from "next/image";
import Link from "next/link";
import {
  HiOutlineArrowLeftStartOnRectangle,
  HiOutlineHome,
  HiOutlineUser,
} from "react-icons/hi2";
import UserPhoto from "./UserPhoto";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

async function DashboardHeader() {
  const session = await auth();

  const user = await fetch(`${baseUrl}/user/${session?.user?.email}`)
    .then((data) => data.json())
    .then((data) => data.data);

  return (
    <header className=" bg-purple-50 h-14 flex items-center justify-between px-8">
      <div className=" flex gap-2 items-center">
        {!user?.photo && (
          <div className=" size-11 bg-neutral-500 rounded-full flex justify-center items-center text-neutral-50 text-xl font-medium">
            {user?.name[0]}
          </div>
        )}
        {user?.photo && (
          <UserPhoto img={user.photo} />
          // <Image
          //   alt="user profile"
          //   src={`${user.photo}`}
          //   width={44}
          //   height={44}
          // />
        )}
        <p className="font-semibold">{user?.name}</p>
      </div>
      <p className=" text-purple-700 font-semibold text-lg">
        {new Date().toLocaleDateString("fa-IR")}
      </p>
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
