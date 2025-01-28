import { auth } from "@/auth";
import SigninForm from "@/components/dashboard/SigninForm";
import Logo from "@/components/ui/Logo";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "ورود به حساب کاربری",
};

async function Page() {
  const session = await auth();

  if (session?.user) redirect("/dashboard");

  return (
    <div className=" bg-purple-100 h-dvh w-screen">
      <div className="flex items-center justify-center h-full w-2/5 mx-auto">
        <div className=" w-full flex flex-col gap-10 justify-center items-center bg-neutral-100/50 p-10 rounded-lg">
          <Logo />
          <p className="-mb-4  font-semibold text-neutral-700">
            ورود به حساب کاربری
          </p>
          <SigninForm />
        </div>
      </div>
    </div>
  );
}

export default Page;
