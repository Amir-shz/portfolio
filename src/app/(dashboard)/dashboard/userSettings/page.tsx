import SignupForm from "@/components/dashboard/SignupForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "تنظیمات کاربر",
};

function Page() {
  return (
    <div>
      <SignupForm />
    </div>
  );
}

export default Page;
