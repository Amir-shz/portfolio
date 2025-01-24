"use client";

// import { planData } from "@/utils/utils";
import PlanCard from "./PlanCard";
import Reservation from "@/features/reservation/Reservation";
import { useReservationStore } from "@/hooks/useReservationStore";
import { useEffect } from "react";
// import { plansType } from "@/types/types";

function PlansBox() {
  const { showModal, planData, setPlanData } = useReservationStore();
  // const [plans, setPlans] = useState<plansType[]>();

  useEffect(() => {
    async function getPlans() {
      const plans = await fetch("/api/v1/plan")
        .then((data) => data.json())
        .then((data) => data.data);
      // setPlans(plans);
      setPlanData(plans);
      // console.log(plans);
    }
    getPlans();
  }, [setPlanData]);

  return (
    <>
      {planData?.map((plan) => (
        <PlanCard
          key={plan._id}
          id={plan._id}
          title={plan.title}
          time={plan.time}
          price={plan.price}
          // plan={plan.plan}
        />
      ))}
      {showModal === true && <Reservation />}
    </>
  );
}

export default PlansBox;
