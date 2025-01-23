"use client";

import { planData } from "@/utils/utils";
import PlanCard from "./PlanCard";
import Reservation from "@/features/reservation/Reservation";
import { useReservationStore } from "@/hooks/useReservationStore";

function PlansBox() {
  const { showModal } = useReservationStore();
  return (
    <>
      {planData.map((plan) => (
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
