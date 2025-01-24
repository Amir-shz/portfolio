"use client";

import { planData } from "@/utils/utils";
import PlanCard from "./PlanCard";
import Reservation from "@/features/reservation/Reservation";
import { useReservationStore } from "@/hooks/useReservationStore";
import { useEffect, useState } from "react";
import { plansType } from "@/types/types";

function PlansBox() {
  const { showModal } = useReservationStore();
  const [plans, setPlans] = useState<plansType[]>();

  useEffect(() => {
    async function getPlans() {
      const plans = await fetch("/api/v1/plan")
        .then((data) => data.json())
        .then((data) => data.data);
      setPlans(plans);
      console.log(plans);
    }
    getPlans();
  }, []);

  return (
    <>
      {planData?.map((plan) => (
        <PlanCard
          key={plan.id}
          title={plan.title}
          time={plan.time}
          price={plan.price}
          plan={plan.plan}
        />
      ))}
      {showModal === true && <Reservation />}
    </>
  );
}

export default PlansBox;
