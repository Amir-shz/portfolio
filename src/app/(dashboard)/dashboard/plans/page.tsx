import PlanHeader from "@/components/dashboard/PlanHeader";
import PlanRow from "@/components/dashboard/PlanRow";
import { planType } from "@/types/types";
import { Metadata } from "next";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "پلن ها",
};
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

async function page() {
  const plans = await fetch(`${baseUrl}/plan`)
    .then((data) => data.json())
    .then((data) => data.data);

  return (
    <div className="w-full flex flex-col rounded-md bg-purple-50 shadow-shadow4 border border-purple-100">
      <PlanHeader />
      {plans.length > 0 &&
        plans.map((plan: planType) => <PlanRow key={plan._id} plan={plan} />)}
    </div>
  );
}

export default page;
