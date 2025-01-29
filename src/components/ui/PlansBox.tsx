"use client";

import PlanCard from "./PlanCard";
import Reservation from "@/features/reservation/Reservation";
import { useReservationStore } from "@/hooks/useReservationStore";
import PlanBoxLoader from "./PlanBoxLoader";
import usePlans from "@/hooks/usePlans";

function PlansBox() {
  const { showModal } = useReservationStore();

  const { isLoading, data: planData } = usePlans();

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
