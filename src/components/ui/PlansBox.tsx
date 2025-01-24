"use client";

import PlanCard from "./PlanCard";
import Reservation from "@/features/reservation/Reservation";
import { useReservationStore } from "@/hooks/useReservationStore";
// import { useEffect, useTransition } from "react";
import PlanBoxLoader from "./PlanBoxLoader";
// import useSchedules from "@/hooks/usePlans";
import usePlans from "@/hooks/usePlans";

function PlansBox() {
  // const [isPending, startTransition] = useTransition();
  const { showModal } = useReservationStore();
  // {{planData , setPlanData}}
  const { isLoading, data: planData } = usePlans();

  // useEffect(() => {
  //   setPlanData(data);
  // }, [data, setPlanData]);

  // useEffect(() => {
  //   async function getPlans() {
  //     const plans = await fetch("/api/v1/plan")
  //       .then((data) => data.json())
  //       .then((data) => data.data);

  //     setPlanData(plans);
  //   }

  //   startTransition(async () => {
  //     await getPlans();
  //   });
  // }, [setPlanData]);

  if (isLoading) return <PlanBoxLoader />;

  return (
    <>
      {planData?.map(
        (plan: {
          _id: string;
          title: string;
          time: string;
          price: string;
          plan: string;
        }) => (
          <PlanCard
            key={plan._id}
            id={plan._id}
            title={plan.title}
            time={plan.time}
            price={plan.price}
          />
        )
      )}
      {showModal === true && <Reservation />}
    </>
  );
}

export default PlansBox;
