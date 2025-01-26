import SigninForm from "@/components/dashboard/SigninForm";
import Logo from "@/components/ui/Logo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ورود به حساب کاربری",
};

function Page() {
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
