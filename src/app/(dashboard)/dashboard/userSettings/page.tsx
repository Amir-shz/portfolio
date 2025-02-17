import { auth } from "@/auth";
import ChangePassForm from "@/components/dashboard/ChangePassForm";
import ChangeUserDataForm from "@/components/dashboard/ChangeUserDataForm";
import SignupForm from "@/components/dashboard/SignupForm";
import UserDelBtn from "@/components/dashboard/UserDelBtn";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "تنظیمات کاربر",
};

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

async function Page() {
  const session = await auth();
  const header = await headers();

  const users = await fetch(`${baseUrl}/user`, { headers: header })
    .then((data) => data.json())
    .then((data) => data.data);

  const currentUser = await fetch(`${baseUrl}/user/${session?.user?.email}`, {
    headers: header,
  })
    .then((data) => data.json())
    .then((data) => data.data);

  return (
    <div className=" grid grid-cols-2 gap-4  max-h-[calc(100vh-5.5rem)] overflow-y-scroll p-4 max-sm:noScrollBar max-sm:max-h-dvh  hide-scrollbar max-sm:[&>div:last-child]:mb-14">
      <div className=" bg-purple-50 rounded-md shadow-shadow4 border border-purple-100 p-4 max-sm:col-span-2">
        <p className="mb-6 mt-2 text-center font-semibold text-neutral-700">
          برای ایجاد حساب جدید فرم زیر را پر کنید
        </p>
        <SignupForm />
      </div>
      <div className=" bg-purple-50 rounded-md shadow-shadow4 border border-purple-100 p-4 flex flex-col   justify-between max-sm:col-span-2 max-sm:gap-2 max-sm:p-0 max-sm:py-4">
        <SessionProvider>
          <ChangeUserDataForm user={currentUser} />
          <ChangePassForm email={currentUser.email} />
        </SessionProvider>
      </div>

      {currentUser.role === "OWNER" && (
        <div className=" bg-purple-50 rounded-md shadow-shadow4 border border-purple-100 col-span-2  py-2 max-sm:col-span-2 max-sm:overflow-x-scroll hide-scrollbar">
          <div className="max-sm:w-max flex flex-col gap-2">
            {users.map(
              (
                user: {
                  _id: string;
                  name: string;
                  email: string;
                  createdAt: Date;
                  role: "ADMIN" | "OWNER";
                },
                index: number
              ) => (
                <div
                  key={user._id}
                  className=" grid grid-cols-[44px_repeat(3,1fr)_100px]  items-center gap-2 [&_input]:outline-none [&_input]:py-2 [&_input]:px-4 [&_input]:rounded-md [&_input]:bg-neutral-50 [&_input]:border [&_input]:border-purple-200 [&_input]:w-full "
                >
                  <p className=" self-center justify-self-center bg-purple-400 text-neutral-50 size-8 flex justify-center items-center rounded-full">
                    {digitsEnToFa(index + 1)}
                  </p>

                  <p className="flex gap-2 items-center">
                    <span>{user.name}</span>
                    <span className=" text-xs translate-y-px text-neutral-500">
                      ({user.role})
                    </span>
                  </p>

                  <p>{user.email}</p>

                  <p>
                    <span className="text-sm font-bold">ساخته شده در: </span>
                    <span className=" text-sm text-purple-600 font-medium">
                      {new Date(user.createdAt).toLocaleString("fa-IR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </p>

                  <UserDelBtn id={user._id} role={user.role} />
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
