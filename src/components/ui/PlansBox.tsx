"use client";

import PlanCard from "./PlanCard";
import Reservation from "@/features/reservation/Reservation";
import { useReservationStore } from "@/hooks/useReservationStore";
import { useEffect } from "react";

function PlansBox() {
  const { showModal, planData, setPlanData } = useReservationStore();

  useEffect(() => {
    async function getPlans() {
      const plans = await fetch("/api/v1/plan")
        .then((data) => data.json())
        .then((data) => data.data);

      setPlanData(plans);
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
